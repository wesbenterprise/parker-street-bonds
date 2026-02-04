import { Child, Contribution, Family, Fund, FundAllocation, RegulatoryItem, Document, Projection, FAQ } from "@/types";

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
    default_funding_age: 10,
    notes: "Launch cohort. Contributions begin July 4, 2026.",
    deleted: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "p2",
    name: "Year 2 — Growth",
    cohort_year: 2027,
    cohort_size: 20,
    contribution_per_child: 2500,
    default_funding_age: 10,
    notes: "Add 20 new children. Continue existing 100.",
    deleted: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "p3",
    name: "Year 3 — Growth",
    cohort_year: 2028,
    cohort_size: 20,
    contribution_per_child: 2500,
    default_funding_age: 10,
    notes: "Add 20 new children. Continue existing 120.",
    deleted: false,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const mockFAQs: FAQ[] = [
  {
    id: "faq1",
    question: "What is a Trump Account?",
    answer: "A Trump Account (officially a §530A Account) is a new tax-advantaged savings account for American children under 18, created by the One Big Beautiful Bill Act. It works like an IRA for kids — contributions grow tax-deferred in low-cost U.S. index funds.",
    order: 1,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq2",
    question: "How does the Parker Street program work?",
    answer: "Parker Street Ministries, through the Bell Barnett Fund at GiveWell Community Foundation, contributes $2,500 per year to Trump Accounts for hand-selected children in the Parker Street service area. This is in addition to any government seed money ($1,000 for children born 2025–2028) or other contributions the child may receive.",
    order: 2,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq3",
    question: "Who is eligible for the Parker Street program?",
    answer: "Children in the Parker Street Ministries service area in Lakeland, FL are eligible. Families are hand-selected and will receive a PIN to begin the enrollment process. Any child under 18 with a Social Security number can have a Trump Account opened for them.",
    order: 3,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq4",
    question: "How do I open a Trump Account for my child?",
    answer: "File Form 4547 ('Trump Account Election') with the IRS — you can include it with your tax return or use the online tool at trumpaccounts.gov. This registers your child for a Trump Account and assigns a trustee (usually a bank). If you've been selected for the Parker Street program, you'll receive a PIN and guidance to help with this process.",
    order: 4,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq5",
    question: "When can contributions begin?",
    answer: "The first day contributions can be made to Trump Accounts is July 4, 2026 — the 250th anniversary of the Declaration of Independence. We recommend filing Form 4547 early so your account is ready by that date.",
    order: 5,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq6",
    question: "When can my child access the funds?",
    answer: "The 'growth period' ends on January 1 of the year the child turns 18. After that, the Trump Account converts to a standard traditional IRA, and the account holder has full access to make withdrawals, change investments, or continue growing the account.",
    order: 6,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq7",
    question: "What is the $5,000 annual limit?",
    answer: "Parents, family, friends, employers, and nonprofits can contribute up to $5,000 per child per year. Parker Street Ministries contributes $2,500 of that limit, leaving room for the family or others to contribute an additional $2,500. The $1,000 government pilot seed and qualified general contributions do NOT count against this limit.",
    order: 7,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq8",
    question: "What is my PIN and how do I use it?",
    answer: "If you've been selected for the Parker Street program, you'll receive a unique PIN (one letter followed by six numbers). Use this PIN on our website to log in, check your application status, view contribution history, and upload any requested documents.",
    order: 8,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq9",
    question: "Does my child need earned income to have a Trump Account?",
    answer: "No. Unlike traditional IRAs, Trump Accounts do not require the child to have earned income, and there are no income limits for contributors. Any child under 18 with a Social Security number is eligible.",
    order: 9,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq10",
    question: "What happens if my child qualifies for the Dell Foundation $250 bonus?",
    answer: "Michael and Susan Dell announced $250 deposits for up to 25 million children born 2014–2024 who live in ZIP codes where the median family income is $150,000 or less. Many children in the Parker Street community may qualify. This bonus is separate from the Parker Street program contributions and the government seed.",
    order: 10,
    published: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];
