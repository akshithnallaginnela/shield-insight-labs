export type FeedCategory = "WhatsApp" | "Telegram" | "Recruiter" | "Banking" | "Internship" | "SMS";
export type FeedSeverity = "low" | "medium" | "high";

export interface FeedItem {
  id: string;
  title: string;
  category: FeedCategory;
  severity: FeedSeverity;
  description: string;
  minutesAgo: number;
  reporter: string;
}

export const FEED: FeedItem[] = [
  { id: "1", title: "Fake Telegram Task Scam", category: "Telegram", severity: "high", description: "Victims asked to 'rate hotels' on Telegram bot, then pressured to deposit ₹5,000 to unlock earnings.", minutesAgo: 4, reporter: "anon_92" },
  { id: "2", title: "WhatsApp Part-time Job Scam", category: "WhatsApp", severity: "high", description: "Recruiter claims to be from Amazon HR, offers ₹3,000/day for liking YouTube videos.", minutesAgo: 11, reporter: "priya.k" },
  { id: "3", title: "Fake HR Verification — TCS", category: "Recruiter", severity: "high", description: "Offer letter sent from tcs-careers.xyz asking for ₹2,500 'training fee'.", minutesAgo: 28, reporter: "raj_dev" },
  { id: "4", title: "SBI KYC Suspension SMS", category: "Banking", severity: "high", description: "SMS claims account will be blocked unless KYC updated via shortened link.", minutesAgo: 47, reporter: "anita.s" },
  { id: "5", title: "Unpaid Internship Phishing", category: "Internship", severity: "medium", description: "Email claims 'AICTE certified' internship, requests Aadhaar + bank details upfront.", minutesAgo: 63, reporter: "mohit" },
  { id: "6", title: "OTP Theft via Fake Delivery", category: "SMS", severity: "high", description: "Caller pretends to be courier agent, asks for OTP to 'reschedule delivery'.", minutesAgo: 90, reporter: "anon_77" },
  { id: "7", title: "Crypto Investment WhatsApp Group", category: "WhatsApp", severity: "medium", description: "Random add to 'VIP signals' group promising 30% daily returns.", minutesAgo: 124, reporter: "neha" },
  { id: "8", title: "Fake Flipkart Recruiter", category: "Recruiter", severity: "high", description: "Offers data-entry role at ₹40k/month from a @gmail.com address.", minutesAgo: 160, reporter: "vikas.b" },
  { id: "9", title: "HDFC Reward Points Expiry", category: "Banking", severity: "medium", description: "Phishing link 'hdfc-rewards.top' to harvest net-banking credentials.", minutesAgo: 200, reporter: "anon_45" },
  { id: "10", title: "Telegram 'Work From Home' Bot", category: "Telegram", severity: "high", description: "Pyramid task scam — small early payouts to lure larger deposits.", minutesAgo: 245, reporter: "shreya" },
  { id: "11", title: "Fake Google Careers Email", category: "Recruiter", severity: "high", description: "google-hiring.click domain offering remote SDE role with upfront laptop fee.", minutesAgo: 300, reporter: "arjun" },
  { id: "12", title: "Electricity Bill Disconnection Scam", category: "SMS", severity: "high", description: "SMS threatens disconnection at 9PM unless app installed via APK link.", minutesAgo: 360, reporter: "kiran.m" },
  { id: "13", title: "Wedding Invite APK", category: "WhatsApp", severity: "high", description: "APK attachment masquerading as wedding card — installs banking trojan.", minutesAgo: 410, reporter: "deepak" },
  { id: "14", title: "Fake Internshala Recruiter DM", category: "Internship", severity: "medium", description: "Sends 'shortlist' message redirecting to a Telegram channel.", minutesAgo: 480, reporter: "anon_11" },
  { id: "15", title: "PAN Card Update Phishing", category: "Banking", severity: "medium", description: "Email pretending to be Income Tax dept., link to fake login portal.", minutesAgo: 560, reporter: "swati" },
  { id: "16", title: "Fake Microsoft Off-Campus Drive", category: "Recruiter", severity: "high", description: "Telegram channel asking for ₹999 'assessment fee' for 'MS off-campus'.", minutesAgo: 640, reporter: "harsh" },
  { id: "17", title: "FedEx Customs Hold Scam", category: "SMS", severity: "high", description: "Caller claims parcel contains contraband, demands UPI transfer to 'clear case'.", minutesAgo: 720, reporter: "anon_03" },
  { id: "18", title: "WhatsApp '+92' Random Add", category: "WhatsApp", severity: "low", description: "Foreign number adds you to group with investment-pitch messages.", minutesAgo: 820, reporter: "tanya" },
];
