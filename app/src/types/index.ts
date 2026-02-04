export type EnrollmentStatus =
  | "identified"
  | "invited"
  | "application_started"
  | "form_4547_filed"
  | "account_opened"
  | "contributions_active";

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentStatus, string> = {
  identified: "Identified",
  invited: "Invited (PIN Issued)",
  application_started: "Application Started",
  form_4547_filed: "Form 4547 Filed",
  account_opened: "Account Opened",
  contributions_active: "Contributions Active",
};

export const ENROLLMENT_STATUS_ORDER: EnrollmentStatus[] = [
  "identified",
  "invited",
  "application_started",
  "form_4547_filed",
  "account_opened",
  "contributions_active",
];

export interface Family {
  id: string;
  name: string;
  contact_email: string | null;
  phone: string | null;
  address: string | null;
  pin: string;
  created_at: string;
}

export interface Child {
  id: string;
  family_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  ssn_last4: string | null;
  cohort_year: number;
  enrollment_status: EnrollmentStatus;
  form_4547_filed_at: string | null;
  account_opened_at: string | null;
  created_at: string;
  family?: Family;
}

export interface Contribution {
  id: string;
  child_id: string;
  amount: number;
  date: string;
  source: string;
  notes: string | null;
  created_at: string;
  child?: Child;
}

export interface Fund {
  id: string;
  source: string;
  amount: number;
  date_received: string;
  notes: string | null;
  created_at: string;
}

export interface FundAllocation {
  id: string;
  fund_id: string;
  child_id: string;
  amount: number;
  date: string;
  created_at: string;
}

export type RegulatoryStatus = "pending" | "in_progress" | "resolved" | "action_required";

export interface RegulatoryItem {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: RegulatoryStatus;
  created_at: string;
}

export interface Document {
  id: string;
  child_id: string | null;
  family_id: string | null;
  file_name: string;
  file_url: string;
  category: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface Projection {
  id: string;
  name: string;
  cohort_year: number;
  cohort_size: number;
  contribution_per_child: number;
  default_funding_age: number;
  notes: string | null;
  deleted: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  created_at: string;
}
