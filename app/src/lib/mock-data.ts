import { Child, Contribution, Family, Fund, FundAllocation, RegulatoryItem, Document, Projection } from "@/types";

export const mockFamilies: Family[] = [
  {
    id: "f1",
    name: "Johnson Family",
    contact_email: "johnson@example.com",
    phone: "863-555-0101",
    address: "123 Parker St, Lakeland, FL 33801",
    pin: "J482917",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "f2",
    name: "Williams Family",
    contact_email: "williams@example.com",
    phone: "863-555-0102",
    address: "456 Massachusetts Ave, Lakeland, FL 33801",
    pin: "W739204",
    created_at: "2026-01-20T00:00:00Z",
  },
  {
    id: "f3",
    name: "Davis Family",
    contact_email: "davis@example.com",
    phone: "863-555-0103",
    address: "789 Lime St, Lakeland, FL 33801",
    pin: "D158362",
    created_at: "2026-02-01T00:00:00Z",
  },
];

export const mockChildren: Child[] = [
  {
    id: "c1",
    family_id: "f1",
    first_name: "Marcus",
    last_name: "Johnson",
    dob: "2015-03-12",
    ssn_last4: "4821",
    cohort_year: 2026,
    enrollment_status: "contributions_active",
    form_4547_filed_at: "2026-02-15T00:00:00Z",
    account_opened_at: "2026-04-01T00:00:00Z",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "c2",
    family_id: "f1",
    first_name: "Aisha",
    last_name: "Johnson",
    dob: "2018-07-22",
    ssn_last4: "7193",
    cohort_year: 2026,
    enrollment_status: "account_opened",
    form_4547_filed_at: "2026-02-15T00:00:00Z",
    account_opened_at: "2026-04-01T00:00:00Z",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "c3",
    family_id: "f2",
    first_name: "Jaylen",
    last_name: "Williams",
    dob: "2012-11-05",
    ssn_last4: "3847",
    cohort_year: 2026,
    enrollment_status: "form_4547_filed",
    form_4547_filed_at: "2026-03-01T00:00:00Z",
    account_opened_at: null,
    created_at: "2026-01-20T00:00:00Z",
  },
  {
    id: "c4",
    family_id: "f3",
    first_name: "Destiny",
    last_name: "Davis",
    dob: "2020-01-30",
    ssn_last4: "6204",
    cohort_year: 2026,
    enrollment_status: "invited",
    form_4547_filed_at: null,
    account_opened_at: null,
    created_at: "2026-02-01T00:00:00Z",
  },
];

export const mockContributions: Contribution[] = [
  {
    id: "cn1",
    child_id: "c1",
    amount: 2500,
    date: "2026-07-04",
    source: "Parker Street Ministries",
    notes: "Initial contribution - Year 1",
    created_at: "2026-07-04T00:00:00Z",
  },
  {
    id: "cn2",
    child_id: "c2",
    amount: 2500,
    date: "2026-07-04",
    source: "Parker Street Ministries",
    notes: "Initial contribution - Year 1",
    created_at: "2026-07-04T00:00:00Z",
  },
];

export const mockFunds: Fund[] = [
  {
    id: "fd1",
    source: "Bell Barnett Fund / GiveWell Community Foundation",
    amount: 250000,
    date_received: "2026-06-01",
    notes: "Year 1 grant - 100 children x $2,500",
    created_at: "2026-06-01T00:00:00Z",
  },
];

export const mockFundAllocations: FundAllocation[] = [
  {
    id: "fa1",
    fund_id: "fd1",
    child_id: "c1",
    amount: 2500,
    date: "2026-07-04",
    created_at: "2026-07-04T00:00:00Z",
  },
  {
    id: "fa2",
    fund_id: "fd1",
    child_id: "c2",
    amount: 2500,
    date: "2026-07-04",
    created_at: "2026-07-04T00:00:00Z",
  },
];

export const mockRegulatoryItems: RegulatoryItem[] = [
  {
    id: "r1",
    title: "Treasury Comment Period Closes",
    description:
      "Public comment period for Trump Account regulations closes. Key items: nonprofit qualification as 'other persons', mechanics for nonprofit direct contributions, geographic designations.",
    due_date: "2026-02-20",
    status: "pending",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "r2",
    title: "Treasury Final Regulations Published",
    description:
      "Final Treasury regulations expected after comment period. Will confirm program mechanics for Pathway B contributions.",
    due_date: null,
    status: "pending",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "r3",
    title: "Trump Accounts Open for Contributions",
    description: "July 4, 2026 — First day contributions can be made to Trump Accounts.",
    due_date: "2026-07-04",
    status: "pending",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "r4",
    title: "Confirm Nonprofit 'Other Person' Status",
    description:
      "Confirm that 501(c)(3) organizations qualify as 'other persons' for individual contributions under IRC §530A.",
    due_date: null,
    status: "action_required",
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const mockDocuments: Document[] = [
  {
    id: "d1",
    child_id: "c1",
    family_id: "f1",
    file_name: "Form_4547_Johnson_Marcus.pdf",
    file_url: "#",
    category: "Form 4547",
    uploaded_by: "admin",
    created_at: "2026-02-15T00:00:00Z",
  },
];

export const mockProjections: Projection[] = [
  {
    id: "p1",
    name: "Year 1 — Initial Cohort",
    cohort_year: 2026,
    cohort_size: 100,
    contribution_per_child: 2500,
    notes: "Launch cohort. Contributions begin July 4, 2026.",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "p2",
    name: "Year 2 — Growth",
    cohort_year: 2027,
    cohort_size: 20,
    contribution_per_child: 2500,
    notes: "Add 20 new children. Continue existing 100.",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "p3",
    name: "Year 3 — Growth",
    cohort_year: 2028,
    cohort_size: 20,
    contribution_per_child: 2500,
    notes: "Add 20 new children. Continue existing 120.",
    created_at: "2026-01-01T00:00:00Z",
  },
];
