/**
 * MedChain AI — Scan History Persistence
 *
 * Primary:   Firestore  users/{uid}/scanHistory
 * Fallback:  localStorage  medchain.scanHistory.v2
 *
 * Exports a unified API that auto-routes:
 *   - saveScan(uid?, record)   → Firestore if uid + Firebase loaded, else localStorage
 *   - loadScanHistory(uid?)    → merges Firestore + localStorage (deduped by verificationId)
 */

import { loadFirebase, getDb } from "./firebase";

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */

export interface ScanRecord {
  verificationId: string;
  timestamp: string;
  medicineName: string;
  manufacturer: string;
  riskScore: number;
  authenticityScore: number;
  blockchainHash: string;
  imageUrl: string; // data URL thumbnail (capped)
  // UI-derived
  riskLevel?: string;
  status?: string;
}

/* ──────────────────────────────────────────────────────────────
   localStorage helpers
   ────────────────────────────────────────────────────────────── */

const LOCAL_KEY = "medchain.scanHistory.v2";
const MAX_LOCAL = 30;

export function saveScanToLocal(record: ScanRecord): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadScanHistoryFromLocal();
    const merged = [record, ...existing.filter((r) => r.verificationId !== record.verificationId)];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(merged.slice(0, MAX_LOCAL)));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function loadScanHistoryFromLocal(): ScanRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

/* ──────────────────────────────────────────────────────────────
   Firestore helpers
   ────────────────────────────────────────────────────────────── */

async function getFirestoreReady(): Promise<any | null> {
  if (typeof window === "undefined") return null;
  try {
    await loadFirebase();
    return getDb();
  } catch {
    return null;
  }
}

export async function saveScanToFirestore(uid: string, record: ScanRecord): Promise<boolean> {
  const db = await getFirestoreReady();
  if (!db) return false;
  try {
    await db
      .collection("users")
      .doc(uid)
      .collection("scanHistory")
      .doc(record.verificationId)
      .set({
        ...record,
        // Cap image URL length for Firestore (max ~1MB doc) — store only a small thumbnail
        imageUrl: record.imageUrl?.length > 200_000 ? record.imageUrl.slice(0, 200_000) : record.imageUrl,
      });
    return true;
  } catch (e) {
    console.warn("[MedChain:history] Firestore write failed, falling back to localStorage", e);
    return false;
  }
}

export async function loadScanHistoryFromFirestore(uid: string, limit = 30): Promise<ScanRecord[]> {
  const db = await getFirestoreReady();
  if (!db) return [];
  try {
    const snap = await db
      .collection("users")
      .doc(uid)
      .collection("scanHistory")
      .orderBy("timestamp", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((d: any) => d.data() as ScanRecord);
  } catch (e) {
    console.warn("[MedChain:history] Firestore read failed", e);
    return [];
  }
}

/* ──────────────────────────────────────────────────────────────
   Unified API
   ────────────────────────────────────────────────────────────── */

/**
 * Save a scan record. If `uid` is provided and Firebase is available,
 * saves to Firestore first, then always saves to localStorage as fallback.
 */
export async function saveScan(uid: string | undefined, record: ScanRecord): Promise<void> {
  // Always save to localStorage as fallback
  saveScanToLocal(record);

  // Attempt Firestore if user is authenticated
  if (uid) {
    await saveScanToFirestore(uid, record);
  }
}

/**
 * Load scan history. Merges Firestore + localStorage, deduped by verificationId.
 * Firestore records take precedence.
 */
export async function loadScanHistory(uid?: string): Promise<ScanRecord[]> {
  const localRecords = loadScanHistoryFromLocal();

  if (!uid) return localRecords;

  const firestoreRecords = await loadScanHistoryFromFirestore(uid);

  // Merge: Firestore first, then any local-only records
  const seen = new Set(firestoreRecords.map((r) => r.verificationId));
  const localOnly = localRecords.filter((r) => !seen.has(r.verificationId));
  const merged = [...firestoreRecords, ...localOnly];

  // Sort by timestamp descending
  merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return merged.slice(0, 50);
}
