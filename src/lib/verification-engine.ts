/**
 * MedChain AI — Verification Engine
 *
 * Composable functions for the 8-stage verification pipeline:
 *   1. Upload
 *   2. OCR Extraction (Gemini)
 *   3. Medicine Matching
 *   4. Packaging Analysis
 *   5. Fraud Intelligence
 *   6. Blockchain Validation
 *   7. AI Risk Analysis
 *   8. Final Decision
 */

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */

export interface PackagingAnalysis {
  packagingScore: number;       // 0-100
  printQuality: number;         // 0-100
  labelConsistency: number;     // 0-100
  tamperingDetected: boolean;
  tamperingIndicators: string[];
  missingElements: string[];
  packageIntegrity: string;     // "Intact" | "Damaged" | "Suspicious"
}

export interface FraudIntelligence {
  fraudRisk: "Low" | "Medium" | "High" | "Critical";
  counterfeitProbability: number; // 0-100
  fraudIndicators: string[];
  regionalRisk: string;
  previousReports: number;
}

export interface TrustScore {
  trustScore: number;           // 0-100
  trustLevel: "Trusted" | "Moderate" | "Low" | "Untrusted";
  factors: string[];
}

export interface BlockchainRecord {
  blockchainVerified: boolean;
  transactionHash: string;
  blockNumber: number;
  verificationId: string;
  verificationTimestamp: string;
  network: string;
  smartContract: string;
}

export interface RiskAssessment {
  riskScore: number;            // 0-100 (0 = safest, 100 = most dangerous)
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  riskFactors: { factor: string; weight: number; score: number }[];
}

export interface DatabaseMatch {
  matchFound: boolean;
  similarityScore: number;      // 0-100
  matchDetails: string[];
}

export interface VerificationMeta {
  verificationId: string;
  verificationTimestamp: string;
  pipelineDuration: number;     // ms
}

/* ──────────────────────────────────────────────────────────────
   Packaging Analysis Engine
   ────────────────────────────────────────────────────────────── */

export function analyzePackaging(geminiData: {
  packagingScore?: number;
  printQuality?: number;
  labelConsistency?: number;
  tamperingDetected?: boolean;
  tamperingIndicators?: string[];
  missingElements?: string[];
  packageIntegrity?: string;
}, ocrFieldCount: number, totalFields: number, warnings: string[]): PackagingAnalysis {
  // Use Gemini's packaging analysis if available, otherwise derive from OCR quality
  const fieldCoverage = totalFields > 0 ? (ocrFieldCount / totalFields) * 100 : 50;
  const hasWarnings = warnings.length > 0;

  const packagingScore = clamp(geminiData.packagingScore ?? Math.round(fieldCoverage * 0.9 + (hasWarnings ? 0 : 10)));
  const printQuality = clamp(geminiData.printQuality ?? (packagingScore + 5));
  const labelConsistency = clamp(geminiData.labelConsistency ?? (packagingScore - 2));

  const tamperingIndicators = geminiData.tamperingIndicators ?? [];
  if (warnings.some(w => /tamper|damage|torn|missing/i.test(w))) {
    tamperingIndicators.push("Warning flags suggest potential tampering");
  }

  const missingElements = geminiData.missingElements ?? [];

  return {
    packagingScore,
    printQuality,
    labelConsistency,
    tamperingDetected: geminiData.tamperingDetected ?? tamperingIndicators.length > 0,
    tamperingIndicators,
    missingElements,
    packageIntegrity: geminiData.packageIntegrity ?? (tamperingIndicators.length > 0 ? "Suspicious" : "Intact"),
  };
}

/* ──────────────────────────────────────────────────────────────
   Fraud Intelligence Engine
   ────────────────────────────────────────────────────────────── */

// Known suspicious batch prefixes (for demo — in production this would be a Firestore lookup)
const SUSPICIOUS_PATTERNS = [
  /^XX/i, /^FAKE/i, /^TEST/i, /^000/,
];

export function assessFraudIntelligence(
  medicineName?: string,
  batchNumber?: string,
  manufacturer?: string,
  confidence: number = 50,
  packagingScore: number = 50,
): FraudIntelligence {
  const indicators: string[] = [];
  let riskPoints = 0;

  // Check batch number patterns
  if (batchNumber) {
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.test(batchNumber)) {
        indicators.push(`Batch number "${batchNumber}" matches known suspicious pattern`);
        riskPoints += 25;
        break;
      }
    }
  } else {
    indicators.push("No batch number detected — unable to verify batch authenticity");
    riskPoints += 15;
  }

  // Check confidence level
  if (confidence < 60) {
    indicators.push("Low OCR confidence suggests poor print quality or potential counterfeit");
    riskPoints += 20;
  }

  // Check packaging score
  if (packagingScore < 60) {
    indicators.push("Packaging quality below acceptable threshold");
    riskPoints += 15;
  }

  // Check manufacturer
  if (!manufacturer) {
    indicators.push("Manufacturer not identifiable — heightened counterfeit risk");
    riskPoints += 10;
  }

  // Check medicine name
  if (!medicineName) {
    indicators.push("Medicine name not readable — verification incomplete");
    riskPoints += 10;
  }

  const counterfeitProbability = Math.min(100, riskPoints);

  let fraudRisk: FraudIntelligence["fraudRisk"] = "Low";
  if (counterfeitProbability >= 60) fraudRisk = "Critical";
  else if (counterfeitProbability >= 40) fraudRisk = "High";
  else if (counterfeitProbability >= 20) fraudRisk = "Medium";

  if (indicators.length === 0) {
    indicators.push("No fraud indicators detected");
  }

  return {
    fraudRisk,
    counterfeitProbability,
    fraudIndicators: indicators,
    regionalRisk: "Normal", // In production: Firestore geo-lookup
    previousReports: 0,      // In production: Firestore fraud reports count
  };
}

/* ──────────────────────────────────────────────────────────────
   Trust Score Engine
   ────────────────────────────────────────────────────────────── */

export function computeTrustScore(
  confidence: number,
  packagingScore: number,
  fraudRisk: string,
  batchNumber?: string,
  manufacturer?: string,
): TrustScore {
  const factors: string[] = [];
  let score = 0;
  let count = 0;

  // OCR confidence factor (weight: 25%)
  score += confidence * 0.25;
  count++;
  factors.push(`OCR confidence: ${confidence}%`);

  // Packaging factor (weight: 25%)
  score += packagingScore * 0.25;
  count++;
  factors.push(`Packaging quality: ${packagingScore}%`);

  // Fraud risk factor (weight: 25%)
  const fraudMultiplier = fraudRisk === "Low" ? 100 : fraudRisk === "Medium" ? 70 : fraudRisk === "High" ? 40 : 15;
  score += fraudMultiplier * 0.25;
  count++;
  factors.push(`Fraud risk assessment: ${fraudRisk}`);

  // Data completeness factor (weight: 25%)
  let completeness = 50;
  if (batchNumber) completeness += 25;
  if (manufacturer) completeness += 25;
  score += completeness * 0.25;
  count++;
  factors.push(`Data completeness: ${completeness}%`);

  const trustScore = clamp(Math.round(score));

  let trustLevel: TrustScore["trustLevel"] = "Untrusted";
  if (trustScore >= 85) trustLevel = "Trusted";
  else if (trustScore >= 65) trustLevel = "Moderate";
  else if (trustScore >= 40) trustLevel = "Low";

  return { trustScore, trustLevel, factors };
}

/* ──────────────────────────────────────────────────────────────
   Blockchain Hash Generator
   ────────────────────────────────────────────────────────────── */

/**
 * Generates a deterministic verification hash using SHA-256 (Web Crypto).
 * In production this would be an actual Polygon smart contract call.
 * The architecture is blockchain-ready — just swap this function body.
 */
export async function generateBlockchainRecord(
  medicineName?: string,
  batchNumber?: string,
  manufacturer?: string,
  ocrConfidence: number = 0,
  riskScore: number = 0,
): Promise<BlockchainRecord> {
  const timestamp = new Date().toISOString();
  const payload = [
    medicineName || "",
    batchNumber || "",
    manufacturer || "",
    String(ocrConfidence),
    String(riskScore),
    timestamp,
  ].join("|");

  // SHA-256 hash via Web Crypto (available in Node 18+ and all modern browsers)
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const txHash = `0x${hashHex}`; // 0x + 64 hex chars = 66 chars total
  const verificationId = `MCV-${Date.now().toString(36).toUpperCase()}-${hashHex.slice(0, 6).toUpperCase()}`;
  const blockNumber = 48_213_770 + (hashArray[0] * 256 + hashArray[1]) % 9999;

  return {
    blockchainVerified: true,
    transactionHash: txHash,
    blockNumber,
    verificationId,
    verificationTimestamp: timestamp,
    network: "Polygon Mainnet",
    smartContract: "MedChainRegistry.sol",
  };
}

/* ──────────────────────────────────────────────────────────────
   Risk Assessment Engine
   ────────────────────────────────────────────────────────────── */

export function computeRiskAssessment(
  ocrConfidence: number,
  packagingScore: number,
  blockchainVerified: boolean,
  fraudRisk: string,
  counterfeitProbability: number,
  trustScore: number,
  batchNumber?: string,
  expiryDaysRemaining?: number,
): RiskAssessment {
  const factors: RiskAssessment["riskFactors"] = [];

  // Lower confidence = higher risk
  const ocrRisk = Math.max(0, 100 - ocrConfidence);
  factors.push({ factor: "OCR Confidence", weight: 20, score: ocrRisk });

  // Lower packaging score = higher risk
  const packRisk = Math.max(0, 100 - packagingScore);
  factors.push({ factor: "Packaging Quality", weight: 15, score: packRisk });

  // Blockchain
  const blockRisk = blockchainVerified ? 5 : 40;
  factors.push({ factor: "Blockchain Verification", weight: 15, score: blockRisk });

  // Fraud
  factors.push({ factor: "Fraud Intelligence", weight: 20, score: counterfeitProbability });

  // Trust
  const trustRisk = Math.max(0, 100 - trustScore);
  factors.push({ factor: "Trust Score", weight: 15, score: trustRisk });

  // Batch + Expiry
  let dataRisk = 0;
  if (!batchNumber) dataRisk += 30;
  if (expiryDaysRemaining != null && expiryDaysRemaining < 0) dataRisk += 50;
  else if (expiryDaysRemaining != null && expiryDaysRemaining < 30) dataRisk += 15;
  factors.push({ factor: "Data Completeness", weight: 15, score: Math.min(100, dataRisk) });

  // Weighted average
  const totalWeight = factors.reduce((a, f) => a + f.weight, 0);
  const riskScore = clamp(Math.round(
    factors.reduce((a, f) => a + (f.score * f.weight), 0) / totalWeight
  ));

  let riskLevel: RiskAssessment["riskLevel"] = "Low";
  if (riskScore >= 70) riskLevel = "Critical";
  else if (riskScore >= 50) riskLevel = "High";
  else if (riskScore >= 25) riskLevel = "Medium";

  return { riskScore, riskLevel, riskFactors: factors };
}

/* ──────────────────────────────────────────────────────────────
   Medicine Database Matching
   ────────────────────────────────────────────────────────────── */

// In production this would query Firestore medicine records
const KNOWN_MEDICINES = [
  { name: "paracetamol", manufacturers: ["cipla", "pfizer", "gsk", "micro labs"] },
  { name: "amoxicillin", manufacturers: ["cipla", "ranbaxy", "sun pharma"] },
  { name: "azithromycin", manufacturers: ["cipla", "sun pharma", "zydus"] },
  { name: "metformin", manufacturers: ["merck", "usv", "sun pharma"] },
  { name: "insulin", manufacturers: ["sanofi", "novo nordisk", "eli lilly"] },
  { name: "atorvastatin", manufacturers: ["pfizer", "lupin", "ranbaxy"] },
  { name: "dolo", manufacturers: ["micro labs"] },
  { name: "crocin", manufacturers: ["gsk", "haleon"] },
  { name: "cetirizine", manufacturers: ["cipla", "dr. reddy's"] },
  { name: "omeprazole", manufacturers: ["dr. reddy's", "cipla", "sun pharma"] },
  { name: "ibuprofen", manufacturers: ["abbott", "cipla", "alkem"] },
  { name: "aspirin", manufacturers: ["bayer", "usv", "cipla"] },
  { name: "calpol", manufacturers: ["gsk", "haleon"] },
  { name: "combiflam", manufacturers: ["sanofi"] },
  { name: "pantoprazole", manufacturers: ["sun pharma", "alkem", "cipla"] },
  { name: "amlodipine", manufacturers: ["pfizer", "cipla", "lupin"] },
  { name: "losartan", manufacturers: ["merck", "cipla", "torrent"] },
];

export function matchMedicineDatabase(
  medicineName?: string,
  manufacturer?: string,
): DatabaseMatch {
  if (!medicineName) {
    return { matchFound: false, similarityScore: 0, matchDetails: ["Medicine name not available for matching"] };
  }

  const nameNorm = medicineName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const details: string[] = [];
  let bestScore = 0;

  for (const med of KNOWN_MEDICINES) {
    if (nameNorm.includes(med.name) || med.name.includes(nameNorm.slice(0, 5))) {
      bestScore = Math.max(bestScore, 70);
      details.push(`Medicine "${medicineName}" matches known database entry "${med.name}"`);

      if (manufacturer) {
        const mfgNorm = manufacturer.toLowerCase().replace(/[^a-z0-9]/g, "");
        for (const knownMfg of med.manufacturers) {
          if (mfgNorm.includes(knownMfg.replace(/[^a-z0-9]/g, "")) ||
              knownMfg.replace(/[^a-z0-9]/g, "").includes(mfgNorm.slice(0, 4))) {
            bestScore = Math.max(bestScore, 92);
            details.push(`Manufacturer "${manufacturer}" matches registered manufacturer "${knownMfg}"`);
            break;
          }
        }
        if (bestScore < 90) {
          details.push(`Manufacturer "${manufacturer}" not found in registered manufacturers for this medicine`);
        }
      }
      break;
    }
  }

  if (bestScore === 0) {
    details.push(`Medicine "${medicineName}" not found in known database — this does not mean it's counterfeit`);
    bestScore = 30; // Unknown = some base score
  }

  return {
    matchFound: bestScore >= 70,
    similarityScore: bestScore,
    matchDetails: details,
  };
}

/* ──────────────────────────────────────────────────────────────
   Structured Logger
   ────────────────────────────────────────────────────────────── */

export type LogLevel = "info" | "warn" | "error";

export function pipelineLog(
  stage: string,
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    timestamp: new Date().toISOString(),
    stage,
    level,
    message,
    ...data,
  };
  if (level === "error") console.error(`[MedChain:${stage}]`, JSON.stringify(entry));
  else if (level === "warn") console.warn(`[MedChain:${stage}]`, JSON.stringify(entry));
  else console.log(`[MedChain:${stage}]`, JSON.stringify(entry));
}

/* ──────────────────────────────────────────────────────────────
   Utility
   ────────────────────────────────────────────────────────────── */

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}
