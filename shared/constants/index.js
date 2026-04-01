const ROLES = {
  CLIENT: "client",
  MODERATOR: "moderator",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
};

const AD_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_SUBMITTED: "payment_submitted",
  PAYMENT_VERIFIED: "payment_verified",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  EXPIRED: "expired",
  ARCHIVED: "archived",
  REJECTED: "rejected",
};

module.exports = { ROLES, AD_STATUS };