export const kpiCards = [
  { label: "Workflow states", value: "8", helper: "Draft to archived lifecycle" },
  { label: "Core tables", value: "12", helper: "Schema aligned with assignment brief" },
  { label: "User roles", value: "4", helper: "Client, moderator, admin, super admin" },
  { label: "Automation hooks", value: "3", helper: "Publish, expire, health heartbeat" },
];

export const packages = [
  {
    name: "Basic",
    duration: "7 days live",
    visibility: "Entry plan",
    refreshRule: "No auto refresh",
    price: "PKR 1,999",
    description:
      "Short campaign for quick listings with standard ranking and dashboard visibility.",
  },
  {
    name: "Standard",
    duration: "15 days live",
    visibility: "Category priority",
    refreshRule: "Manual refresh",
    price: "PKR 3,999",
    description:
      "Balanced option for local businesses that need extra category exposure and longer duration.",
  },
  {
    name: "Premium",
    duration: "30 days live",
    visibility: "Homepage featured",
    refreshRule: "Auto refresh every 3 days",
    price: "PKR 7,499",
    description:
      "Best package for high-priority ads with strongest ranking weight and homepage placement.",
  },
];

export const workflowStages = [
  {
    name: "Draft",
    actor: "Client",
    description: "Client starts a listing and can keep editing until submission is complete.",
  },
  {
    name: "Submitted / Under Review",
    actor: "Moderator",
    description: "Moderator checks content quality, category fit, duplicates, and media validity.",
  },
  {
    name: "Payment Pending / Submitted",
    actor: "Client",
    description: "Client selects a package and enters transaction reference with proof URL.",
  },
  {
    name: "Verified / Scheduled / Published",
    actor: "Admin + System",
    description: "Admin verifies payment, optionally schedules publish_at, and the system expires ads automatically.",
  },
];

export const featuredAds = [
  {
    title: "Premium Ramadan Food Bazaar Booth",
    slug: "premium-ramadan-food-bazaar-booth",
    summary:
      "Featured seasonal placement with strong package weight, trusted seller badge, and category priority.",
    category: "Events",
    city: "Karachi",
    rankScore: 93,
    expiresIn: "12 Apr",
    packageName: "Premium",
  },
  {
    title: "Smart Office Space in Gulberg",
    slug: "smart-office-space-in-gulberg",
    summary:
      "Property listing with verified transaction reference, active seller profile, and scheduled promotion.",
    category: "Real Estate",
    city: "Lahore",
    rankScore: 81,
    expiresIn: "15 Apr",
    packageName: "Standard",
  },
  {
    title: "Used MacBook Pro for Designers",
    slug: "used-macbook-pro-for-designers",
    summary:
      "Consumer tech listing with media normalization preview and dashboard reporting for moderation notes.",
    category: "Electronics",
    city: "Islamabad",
    rankScore: 77,
    expiresIn: "18 Apr",
    packageName: "Basic",
  },
];

export const exploreAds = [
  ...featuredAds,
  {
    title: "Boutique Launch Promotion Banner Slot",
    slug: "boutique-launch-promotion-banner-slot",
    summary: "Small business campaign prepared for category landing page placement.",
    category: "Fashion",
    city: "Faisalabad",
    rankScore: 73,
    expiresIn: "19 Apr",
    packageName: "Standard",
  },
  {
    title: "Family Hatchback in Excellent Condition",
    slug: "family-hatchback-excellent-condition",
    summary: "Auto category example using external image URL validation and city filters.",
    category: "Vehicles",
    city: "Rawalpindi",
    rankScore: 68,
    expiresIn: "20 Apr",
    packageName: "Basic",
  },
  {
    title: "Wedding Hall Weekend Sponsorship",
    slug: "wedding-hall-weekend-sponsorship",
    summary: "Premium ad with future publish schedule and expiry-driven visibility control.",
    category: "Services",
    city: "Multan",
    rankScore: 88,
    expiresIn: "22 Apr",
    packageName: "Premium",
  },
];

export const learningQuestions = [
  {
    topic: "Database",
    question: "Why did we choose Supabase Postgres instead of local storage?",
    answer:
      "Because the project needs relational tables, role-based data, workflow traceability, and hosted deployment compatibility.",
  },
  {
    topic: "Workflow",
    question: "Why is the ad lifecycle stronger than simple approved/rejected logic?",
    answer:
      "It protects business rules by separating moderation, payment verification, scheduling, publishing, and expiry.",
  },
];

export const dashboardMetrics = {
  client: [
    { label: "Draft ads", value: "03" },
    { label: "Pending review", value: "02" },
    { label: "Active campaigns", value: "04" },
    { label: "Notifications", value: "06" },
  ],
  moderator: [
    { label: "Review queue", value: "11" },
    { label: "Flagged media", value: "04" },
    { label: "Approved today", value: "07" },
    { label: "Rejected today", value: "02" },
  ],
  admin: [
    { label: "Payment queue", value: "08" },
    { label: "Published ads", value: "24" },
    { label: "Expiring soon", value: "05" },
    { label: "Revenue this month", value: "PKR 84k" },
  ],
};
