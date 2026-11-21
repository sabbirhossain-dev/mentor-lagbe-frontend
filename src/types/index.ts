export type Role = "student" | "tutor" | "admin";
export type Plan = "free" | "pro";

export interface UserProfile {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: Role;
  plan: Plan;
  image?: string | null;
  phone?: string;
  bio?: string;
  createdAt?: string;
}

export interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: string;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Application {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorName: string;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
  updatedAt?: string;
}

export interface PaymentRecord {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: Role;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: string;
}

export interface StudentStats {
  totalApplied: number;
  accepted: number;
  pending: number;
  rejected: number;
  plan: Plan;
}

export interface TutorStats {
  totalPosted: number;
  activeApproved: number;
  totalApplicants: number;
  plan: Plan;
}

export interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  pendingTuitions: number;
  approvedTuitions: number;
  totalRevenue: number;
}
