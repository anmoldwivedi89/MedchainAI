import { createServerFn } from "@tanstack/react-start";
import {
  analyzePackaging,
  assessFraudIntelligence,
  computeTrustScore,
  generateBlockchainRecord,
  computeRiskAssessment,
  matchMedicineDatabase,
  pipelineLog,
  type PackagingAnalysis,
  type FraudIntelligence,
  type TrustScore,
  type BlockchainRecord,
  type RiskAssessment,
  type DatabaseMatch,
  type VerificationMeta,
} from "./verification-engine";

export type AnalyzeResult = {
  isMedicine: boolean;
  confidence: number;
  description: string;
  detectedObject?: string;

  // Core identification
  medicineName?: string;
  brandName?: string;
  genericName?: string;
  manufacturer?: string;
  composition?: string;
  dosage?: string;
  packSize?: string;

  // Codes & dates
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  expiryDaysRemaining?: number;
  mrp?: string;
  serialNumber?: string;
  licenseNumber?: string;
  barcode?: string;
  qrCode?: string;

  // Regulatory
  storageInstructions?: string;
  scheduleType?: string;
  countryOfManufacture?: string;

  // Trust
  authenticityScore?: number;
  reasoning?: string[];
  warnings?: string[];
  rawText?: string;

  // Confidence panel
  fieldConfidences?: {
    detection: number;
    medicineDetection: number;
    textRecognition: number;
    fieldExtraction: number;
  };

  needsReview?: boolean;
  reviewReason?: string;

  // Friendly error envelope (set when nothing useful could be done)
  friendlyError?: {
    title: string;
    message: string;
  };

  // ── Enhanced pipeline fields ──
  packaging?: PackagingAnalysis;
  fraudIntelligence?: FraudIntelligence;
  trustInfo?: TrustScore;
  blockchain?: BlockchainRecord;
  risk?: RiskAssessment;
  databaseMatch?: DatabaseMatch;
  verificationMeta?: VerificationMeta;
};

const FIELD_KEYS = [
  "medicineName", "brandName", "genericName", "manufacturer", "composition",
  "dosage", "packSize", "batchNumber", "manufacturingDate", "expiryDate",
  "mrp", "serialNumber", "licenseNumber", "barcode", "qrCode",
  "storageInstructions", "scheduleType", "countryOfManufacture",
] as const;

function tryParseJSON(raw: string): any | null {
  if (!raw) return null;
  let s = raw
    .replace(/^```json\s*/im, "")
    .replace(/^```\s*/im, "")
    .replace(/```\s*$/im, "")
    .trim();
  if (!s.startsWith("{")) {
    const a = s.indexOf("{");
    const b = s.lastIndexOf("}");
    if (a !== -1 && b > a) s = s.slice(a, b + 1);
  }
  // sanitize bad control chars that break JSON.parse
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ");
  try { return JSON.parse(s); } catch {}
  // attempt to repair stray unescaped backslashes
  try { return JSON.parse(s.replace(/\\(?!["\\/bfnrtu])/g, "\\\\")); } catch {}
  return null;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function fieldInSource(value: string | undefined, source: string): boolean {
  if (!value) return true;
  const v = norm(value);
  if (v.length < 2) return true;
  const src = norm(source);
  if (src.includes(v)) return true;
  const tokens = value.split(/\s+/).map(norm).filter((t) => t.length >= 3);
  if (tokens.length === 0) return false;
  const hits = tokens.filter((t) => src.includes(t)).length;
  return hits / tokens.length >= 0.6;
}

/* ---------------- Regex fallbacks from rawText ---------------- */
const MONTHS = "(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)";
function regexFallback(rawText: string) {
  const t = rawText.replace(/\s+/g, " ");
  const out: Record<string, string> = {};

  const batch = t.match(/\b(?:batch(?:\s*(?:no|code|number))?|b\.?\s*no|lot(?:\s*(?:no|number))?|bn)\s*[:\-.]?\s*([A-Z0-9\-\/]{3,20})/i);
  if (batch) out.batchNumber = batch[1].toUpperCase();

  const exp = t.match(
    new RegExp(`\\b(?:exp(?:iry)?(?:\\s*date)?|use\\s*before|valid\\s*till|best\\s*before)\\s*[:\\-.]?\\s*((?:\\d{1,2}[\\/\\-.]\\d{2,4})|(?:${MONTHS}[\\s\\-\\/.]\\d{2,4}))`, "i"),
  );
  if (exp) out.expiryDate = exp[1];

  const mfg = t.match(
    new RegExp(`\\b(?:mfg(?:\\.|\\s)?(?:date)?|m\\.?fd|manufactur(?:ed|ing)(?:\\s*date)?)\\s*[:\\-.]?\\s*((?:\\d{1,2}[\\/\\-.]\\d{2,4})|(?:${MONTHS}[\\s\\-\\/.]\\d{2,4}))`, "i"),
  );
  if (mfg) out.manufacturingDate = mfg[1];

  const mrp = t.match(/\b(?:m\.?r\.?p\.?|max(?:imum)?\s*retail\s*price|price)\s*[:\-.]?\s*(?:rs\.?|inr|₹|\$)?\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (mrp) out.mrp = `₹${mrp[1]}`;

  const lic = t.match(/\b(?:mfg\.?\s*lic(?:\.|ense)?\s*(?:no)?|licen[cs]e\s*(?:no)?)\s*[:\-.]?\s*([A-Z0-9\-\/]{3,20})/i);
  if (lic) out.licenseNumber = lic[1];

  return out;
}

function daysUntil(dateStr: string): number | undefined {
  if (!dateStr) return undefined;
  const s = dateStr.trim();
  // mm/yyyy or mm-yyyy
  let m = s.match(/^(\d{1,2})[\/\-.](\\d{4})$/);
  let y: number | undefined, mo: number | undefined;
  if (!m) m = s.match(/^(\d{1,2})[\/\-.](\d{4})$/);
  if (m) { mo = +m[1]; y = +m[2]; }
  m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (!y && m) {
    mo = +m[2]; y = +m[3] < 100 ? 2000 + +m[3] : +m[3];
  }
  m = s.match(/^([a-z]{3,9})[\s\-\/.] ?(\d{2,4})$/i);
  if (!y && m) {
    const idx = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
      .indexOf(m[1].slice(0,3).toLowerCase());
    if (idx >= 0) { mo = idx + 1; y = +m[2] < 100 ? 2000 + +m[2] : +m[2]; }
  }
  if (!y || !mo) return undefined;
  // last day of expiry month
  const d = new Date(Date.UTC(y, mo, 0));
  const diff = Math.round((d.getTime() - Date.now()) / 86400000);
  return diff;
}

export const analyzeMedicineImage = createServerFn({ method: "POST" })
  .inputValidator((input: { imageDataUrl: string }) => {
    if (!input?.imageDataUrl || typeof input.imageDataUrl !== "string") {
      throw new Error("imageDataUrl is required");
    }
    if (input.imageDataUrl.length > 8_000_000) {
      throw new Error("Image is too large. Please use one smaller than 6MB.");
    }
    return input;
  })
  .handler(async ({ data }): Promise<AnalyzeResult> => {
    const pipelineStart = performance.now();
    pipelineLog("init", "info", "Verification pipeline started");

    // ── Environment validation ──
    const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      pipelineLog("init", "error", "Missing API key", { 
        hasGroq: !!process.env.GROQ_API_KEY,
        hasGemini: !!process.env.GEMINI_API_KEY,
        hasLovable: !!process.env.LOVABLE_API_KEY,
      });
      return notMedicineEnvelope(
        "API Key Missing",
        "No AI API key configured. Please set GROQ_API_KEY or GEMINI_API_KEY in your environment variables.",
      );
    }

    // ── Stage 1: OCR + AI Analysis via Gemini ──
    pipelineLog("ocr", "info", "Sending image to Gemini for OCR and analysis");

    const systemPrompt = `You are MedChain AI's medicine OCR + pharmaceutical packaging verifier.

You receive ONE image. Return STRICT JSON only.

STEP 1 — Decide if this is a pharmaceutical product (medicine strip, blister pack, tablet/capsule pack, syrup bottle, injection vial, ampoule, medicine box, sachet, ointment tube, drug label, or printed prescription label). If NOT, set isMedicine=false and skip every medicine field. Examples that are NOT medicine: selfies, people, animals, food, phones, notebooks, classrooms, cosmetics, household items.

STEP 2 — Verbatim OCR. Transcribe every readable printed character on the packaging EXACTLY (preserve case, digits, slashes, units). Put it all in "rawText", joining distinct lines/blocks with "\\n". Never paraphrase, translate, or invent text.

STEP 3 — Structured extraction. Using ONLY tokens that actually appear in rawText, fill the fields below. If a value is not literally on the pack, OMIT the field. No placeholders, no guesses, no defaults like "BATCH123" or "12/2025".

STEP 4 — Packaging Analysis. Analyze the visual quality of the packaging for signs of counterfeiting:
- printQuality: 0-100 score for print clarity, color consistency, alignment
- labelConsistency: 0-100 score for label alignment, consistent fonts, proper spacing
- tamperingDetected: boolean — any visible signs of tampering, resealing, or damage
- tamperingIndicators: string[] — specific observations about suspicious elements
- missingElements: string[] — standard packaging elements that are missing (e.g., "batch number", "expiry date", "hologram")
- packageIntegrity: "Intact" | "Damaged" | "Suspicious"
- packagingScore: 0-100 overall packaging quality score

STEP 5 — Authenticity Assessment. Based on all observations:
- authenticityScore: 0-100 (how likely this is a genuine medicine)
- reasoning: string[] — specific evidence-based reasons for the score
- warnings: string[] — any concerns or red flags

Return ONLY this JSON:
{
  "isMedicine": boolean,
  "confidence": number,
  "detectionConfidence"?: number,
  "textConfidence"?: number,
  "fieldConfidence"?: number,
  "description": string,
  "detectedObject": string,
  "rawText": string,
  "medicineName"?: string,
  "brandName"?: string,
  "genericName"?: string,
  "manufacturer"?: string,
  "composition"?: string,
  "dosage"?: string,
  "packSize"?: string,
  "batchNumber"?: string,
  "manufacturingDate"?: string,
  "expiryDate"?: string,
  "mrp"?: string,
  "serialNumber"?: string,
  "licenseNumber"?: string,
  "barcode"?: string,
  "qrCode"?: string,
  "storageInstructions"?: string,
  "scheduleType"?: string,
  "countryOfManufacture"?: string,
  "authenticityScore"?: number,
  "reasoning"?: string[],
  "warnings"?: string[],
  "packagingScore"?: number,
  "printQuality"?: number,
  "labelConsistency"?: number,
  "tamperingDetected"?: boolean,
  "tamperingIndicators"?: string[],
  "missingElements"?: string[],
  "packageIntegrity"?: string
}
No markdown, no commentary, JSON only.`;

    let aiJson: any = null;
    let httpError: string | null = null;
    // Extract base64 data and MIME type from data URL
    const mimeMatch = data.imageDataUrl.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
    const mimeType = mimeMatch?.[1] || "image/jpeg";
    const base64Data = mimeMatch?.[2] || data.imageDataUrl.replace(/^data:image\/[a-z+]+;base64,/i, "");

    // Determine which API to use: Groq (GROQ_API_KEY) or Gemini (GEMINI_API_KEY)
    const groqKey = process.env.GROQ_API_KEY;
    const useGroq = !!groqKey;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

    try {
      let res: Response;

      if (useGroq) {
        // Use Groq API (OpenAI-compatible, free tier 30 RPM)
        res = await fetch(groqUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
              { role: "system", content: systemPrompt },
              {
                role: "user",
                content: [
                  { type: "text", text: "Analyze this image. Verbatim OCR first, then structured fields, then packaging analysis. JSON only." },
                  { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Data}` } },
                ],
              },
            ],
            max_tokens: 3000,
            temperature: 0.2,
          }),
        });
      } else {
        // Use Gemini API
        res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemPrompt + "\n\nAnalyze this image. Verbatim OCR first, then structured fields, then packaging analysis. JSON only." },
                  { inlineData: { mimeType, data: base64Data } },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 3000,
              temperature: 0.2,
            },
          }),
        });
      }
      if (!res.ok) {
        pipelineLog("ai", "error", `AI API returned ${res.status}`, { status: res.status, provider: useGroq ? "groq" : "gemini" });
        if (res.status === 429) httpError = "Too many scan requests. Please wait a moment and try again.";
        else if (res.status === 401 || res.status === 403) httpError = "The API key is invalid or expired. Please check your API key configuration.";
        else if (res.status === 503 || res.status === 500) httpError = "The AI service is temporarily unavailable. Please try again in a few minutes.";
        else httpError = `Failed to analyze image (HTTP ${res.status}). Please try again with a clearer photo.`;
      } else {
        const responseJson = await res.json();
        if (useGroq) {
          // Groq returns OpenAI format
          const text = responseJson?.choices?.[0]?.message?.content ?? "";
          const finish = responseJson?.choices?.[0]?.finish_reason;
          aiJson = { candidates: [{ content: { parts: [{ text }] }, finishReason: finish === "length" ? "MAX_TOKENS" : "STOP" }] };
        } else {
          aiJson = responseJson;
        }
        pipelineLog("ai", "info", "AI response received", { 
          provider: useGroq ? "groq" : "gemini",
          finishReason: aiJson?.candidates?.[0]?.finishReason,
          hasContent: !!aiJson?.candidates?.[0]?.content?.parts?.[0]?.text,
        });
      }
    } catch (e: any) {
      pipelineLog("ai", "error", "Network error contacting AI", { error: e?.message });
      httpError = "Network issue while contacting the verification engine. Please try again.";
    }

    if (httpError) {
      return notMedicineEnvelope("Unable to Analyse Image", httpError);
    }

    const finish = aiJson?.candidates?.[0]?.finishReason;
    const raw: string = aiJson?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const parsed = tryParseJSON(raw);

    if (!parsed || finish === "MAX_TOKENS") {
      console.error("[MedChain:gemini] Failed to parse response", {
        finishReason: finish,
        rawLength: raw.length,
        rawPreview: raw.slice(0, 200),
      });
      pipelineLog("parse", "error", "Failed to parse Gemini response", { 
        finishReason: finish,
        rawLength: raw.length,
        rawPreview: raw.slice(0, 200),
      });
      return notMedicineEnvelope(
        "OCR Extraction Failed",
        "OCR extraction failed. The AI could not generate a complete analysis for this image. Please try again with a clearer, well-lit photo of the medicine packaging.",
      );
    }

    const clamp = (n: any) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
    const rawText: string = typeof parsed.rawText === "string" ? parsed.rawText : "";

    const isMedicine = !!parsed.isMedicine;
    if (!isMedicine) {
      pipelineLog("detect", "info", "Image not identified as medicine", { 
        detectedObject: parsed.detectedObject,
        confidence: parsed.confidence,
      });
      return {
        isMedicine: false,
        confidence: clamp(parsed.confidence),
        description: parsed.description || "",
        detectedObject: parsed.detectedObject,
        rawText,
        friendlyError: {
          title: "Unable to Detect a Medicine",
          message: "We couldn't identify a medicine package in the uploaded image. Please upload a clear photo of a medicine strip, box, bottle, or pharmaceutical label.",
        },
      };
    }

    // ── Stage 2: Field Validation ──
    pipelineLog("fields", "info", "Validating extracted fields against rawText");

    const validated: Record<string, string | undefined> = {};
    let dropped = 0;
    for (const k of FIELD_KEYS) {
      const v = parsed[k];
      if (typeof v === "string" && v.trim()) {
        if (fieldInSource(v, rawText)) validated[k] = v.trim();
        else dropped++;
      }
    }

    // Regex fallback enrichment — only fills if AI didn't provide it
    const fb = regexFallback(rawText);
    for (const k of Object.keys(fb)) {
      if (!validated[k]) validated[k] = fb[k];
    }

    const expiryDaysRemaining = validated.expiryDate ? daysUntil(validated.expiryDate) : undefined;

    const fieldConfidences = {
      detection: clamp(parsed.detectionConfidence ?? parsed.confidence),
      medicineDetection: clamp(parsed.detectionConfidence ?? parsed.confidence),
      textRecognition: clamp(parsed.textConfidence ?? (rawText ? parsed.confidence : 0)),
      fieldExtraction: clamp(
        parsed.fieldConfidence ??
          (Object.values(validated).filter(Boolean).length / FIELD_KEYS.length) * 100,
      ),
    };

    const needsReview =
      !validated.medicineName || clamp(parsed.confidence) < 55 || dropped >= 3;

    const warnings: string[] = Array.isArray(parsed.warnings) ? parsed.warnings.slice(0, 6) : [];
    if (expiryDaysRemaining != null && expiryDaysRemaining < 0) warnings.unshift("This pack appears to be EXPIRED.");
    else if (expiryDaysRemaining != null && expiryDaysRemaining < 60) warnings.unshift(`Expires in ${expiryDaysRemaining} days.`);

    const ocrConfidence = clamp(parsed.confidence);
    const filledFieldCount = Object.values(validated).filter(Boolean).length;

    // ── Stage 3: Packaging Analysis ──
    pipelineLog("packaging", "info", "Running packaging analysis");
    const packaging = analyzePackaging(
      {
        packagingScore: parsed.packagingScore,
        printQuality: parsed.printQuality,
        labelConsistency: parsed.labelConsistency,
        tamperingDetected: parsed.tamperingDetected,
        tamperingIndicators: Array.isArray(parsed.tamperingIndicators) ? parsed.tamperingIndicators : undefined,
        missingElements: Array.isArray(parsed.missingElements) ? parsed.missingElements : undefined,
        packageIntegrity: parsed.packageIntegrity,
      },
      filledFieldCount,
      FIELD_KEYS.length,
      warnings,
    );

    // ── Stage 4: Medicine Database Matching ──
    pipelineLog("match", "info", "Matching against medicine database");
    const databaseMatch = matchMedicineDatabase(validated.medicineName, validated.manufacturer);

    // ── Stage 5: Fraud Intelligence ──
    pipelineLog("fraud", "info", "Running fraud intelligence assessment");
    const fraudIntelligence = assessFraudIntelligence(
      validated.medicineName,
      validated.batchNumber,
      validated.manufacturer,
      ocrConfidence,
      packaging.packagingScore,
    );

    // ── Stage 6: Trust Score ──
    pipelineLog("trust", "info", "Computing trust score");
    const trustInfo = computeTrustScore(
      ocrConfidence,
      packaging.packagingScore,
      fraudIntelligence.fraudRisk,
      validated.batchNumber,
      validated.manufacturer,
    );

    // ── Stage 7: Blockchain Record ──
    pipelineLog("blockchain", "info", "Generating blockchain verification record");
    const blockchain = await generateBlockchainRecord(
      validated.medicineName,
      validated.batchNumber,
      validated.manufacturer,
      ocrConfidence,
      0, // riskScore — computed next
    );

    // ── Stage 8: Risk Assessment ──
    pipelineLog("risk", "info", "Computing final risk assessment");
    const risk = computeRiskAssessment(
      ocrConfidence,
      packaging.packagingScore,
      blockchain.blockchainVerified,
      fraudIntelligence.fraudRisk,
      fraudIntelligence.counterfeitProbability,
      trustInfo.trustScore,
      validated.batchNumber,
      expiryDaysRemaining,
    );

    const pipelineDuration = Math.round(performance.now() - pipelineStart);

    const verificationMeta: VerificationMeta = {
      verificationId: blockchain.verificationId,
      verificationTimestamp: blockchain.verificationTimestamp,
      pipelineDuration,
    };

    pipelineLog("complete", "info", "Verification pipeline complete", {
      verificationId: blockchain.verificationId,
      duration: pipelineDuration,
      riskLevel: risk.riskLevel,
      riskScore: risk.riskScore,
      authenticityScore: parsed.authenticityScore,
      trustScore: trustInfo.trustScore,
    });

    return {
      isMedicine: true,
      confidence: ocrConfidence,
      description: parsed.description || "",
      detectedObject: parsed.detectedObject,
      rawText,
      ...validated,
      expiryDaysRemaining,
      authenticityScore: parsed.authenticityScore != null ? clamp(parsed.authenticityScore) : undefined,
      reasoning: Array.isArray(parsed.reasoning) ? parsed.reasoning.slice(0, 8) : undefined,
      warnings: warnings.length ? warnings : undefined,
      fieldConfidences,
      needsReview,
      reviewReason: needsReview
        ? !validated.medicineName
          ? "Medicine name could not be read from the packaging"
          : dropped >= 3
            ? "Several extracted fields did not match the visible text"
            : "Low OCR confidence"
        : undefined,
      // Enhanced pipeline results
      packaging,
      fraudIntelligence,
      trustInfo,
      blockchain,
      risk,
      databaseMatch,
      verificationMeta,
    };
  });

function notMedicineEnvelope(title: string, message: string): AnalyzeResult {
  return {
    isMedicine: false,
    confidence: 0,
    description: "",
    friendlyError: { title, message },
  };
}
