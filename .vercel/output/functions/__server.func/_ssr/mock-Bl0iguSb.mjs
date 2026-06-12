const stats = {
  totalScans: 14238,
  avgAuthenticity: 94.2,
  nearbyAlerts: 7,
  trustedPharmacies: 412
};
const verificationTrends = [
  { day: "Mon", scans: 240, fraud: 18 },
  { day: "Tue", scans: 312, fraud: 22 },
  { day: "Wed", scans: 280, fraud: 15 },
  { day: "Thu", scans: 398, fraud: 31 },
  { day: "Fri", scans: 420, fraud: 24 },
  { day: "Sat", scans: 360, fraud: 19 },
  { day: "Sun", scans: 290, fraud: 12 }
];
const riskDistribution = [
  { name: "Low", value: 72, color: "var(--emerald)" },
  { name: "Medium", value: 21, color: "var(--warn)" },
  { name: "High", value: 7, color: "var(--destructive)" }
];
const fraudActivity = [
  { month: "Jan", reports: 32 },
  { month: "Feb", reports: 41 },
  { month: "Mar", reports: 28 },
  { month: "Apr", reports: 54 },
  { month: "May", reports: 47 },
  { month: "Jun", reports: 62 },
  { month: "Jul", reports: 71 }
];
const scanHistory = [
  { id: "MX-9831", name: "Paracetamol 500mg", manufacturer: "Pfizer", score: 96, risk: "Low", date: "2025-06-10" },
  { id: "MX-9830", name: "Amoxicillin 250mg", manufacturer: "Cipla", score: 88, risk: "Low", date: "2025-06-09" },
  { id: "MX-9829", name: "Azithromycin 500mg", manufacturer: "Sun Pharma", score: 62, risk: "Medium", date: "2025-06-08" },
  { id: "MX-9828", name: "Insulin Glargine", manufacturer: "Sanofi", score: 34, risk: "High", date: "2025-06-08" },
  { id: "MX-9827", name: "Metformin 850mg", manufacturer: "Merck", score: 91, risk: "Low", date: "2025-06-07" },
  { id: "MX-9826", name: "Atorvastatin 20mg", manufacturer: "Lupin", score: 78, risk: "Low", date: "2025-06-06" }
];
const pharmacies = [
  { id: "PH-01", name: "Apollo Pharmacy", distance: "0.4 km", trust: 98, verified: true, address: "MG Road, Bengaluru" },
  { id: "PH-02", name: "MedPlus Health Services", distance: "0.9 km", trust: 94, verified: true, address: "Indiranagar, Bengaluru" },
  { id: "PH-03", name: "Wellness Forever", distance: "1.2 km", trust: 91, verified: true, address: "Koramangala, Bengaluru" },
  { id: "PH-04", name: "1mg Local Store", distance: "1.8 km", trust: 88, verified: true, address: "HSR Layout, Bengaluru" },
  { id: "PH-05", name: "City Care Pharmacy", distance: "2.1 km", trust: 72, verified: false, address: "BTM, Bengaluru" },
  { id: "PH-06", name: "Sunrise Medicals", distance: "2.6 km", trust: 65, verified: false, address: "JP Nagar, Bengaluru" }
];
const fraudHotspots = [
  { city: "Mumbai", risk: "High", reports: 142, lat: "19.07", lng: "72.87" },
  { city: "Delhi", risk: "High", reports: 128, lat: "28.61", lng: "77.20" },
  { city: "Bengaluru", risk: "Medium", reports: 71, lat: "12.97", lng: "77.59" },
  { city: "Chennai", risk: "Medium", reports: 58, lat: "13.08", lng: "80.27" },
  { city: "Hyderabad", risk: "Low", reports: 31, lat: "17.38", lng: "78.48" },
  { city: "Pune", risk: "Low", reports: 22, lat: "18.52", lng: "73.85" }
];
const notifications = [
  { id: 1, title: "High-risk batch detected near you", time: "2m ago", level: "high" },
  { id: 2, title: "Verification completed: Paracetamol 500mg", time: "1h ago", level: "info" },
  { id: 3, title: "New trusted pharmacy added: Apollo Pharmacy", time: "3h ago", level: "success" },
  { id: 4, title: "Counterfeit alert: Azithromycin (Batch AZ-7741)", time: "5h ago", level: "high" },
  { id: 5, title: "Weekly fraud report ready", time: "1d ago", level: "info" }
];
const blockchainRecords = [
  { hash: "0x9f3a...c821", medicine: "Paracetamol 500mg", batch: "PCM-2241", time: "2m ago", status: "Confirmed" },
  { hash: "0x18bd...a9f0", medicine: "Amoxicillin 250mg", batch: "AMX-1130", time: "11m ago", status: "Confirmed" },
  { hash: "0x77ee...4421", medicine: "Insulin Glargine", batch: "INS-0921", time: "1h ago", status: "Confirmed" },
  { hash: "0xabcd...10ef", medicine: "Metformin 850mg", batch: "MET-3318", time: "3h ago", status: "Confirmed" }
];
export {
  stats as a,
  fraudActivity as b,
  blockchainRecords as c,
  fraudHotspots as f,
  notifications as n,
  pharmacies as p,
  riskDistribution as r,
  scanHistory as s,
  verificationTrends as v
};
