export const ERROR_CONSTANTS = {
  AUTH: {
    INSUFFICIENT_PERMISSIONS: 'insufficient permissions',
    UNAUTHORIZED: 'unauthorized access'
  },
  USER: {
    NOT_FOUND: 'user not found'
  },
  COMPANY: {
    NOT_FOUND: 'company not found'
  },
  PLAN: {
    NOT_FOUND: 'plan not found',
    MISSING_STRIPE_PRICE_ID: 'plan does not have a stripe price id'
  },
  UNIT: {
    NOT_FOUND: 'unit not found',
    UPDATE_FAILED: 'unit update failed'
  },
  ROLES: {
    ADMIN_NOT_FOUND: 'admin role not found'
  },
  STRIPE: {
    CREATE_CUSTOMER: 'error on creating stripe customer'
  },
  VALIDATION: {
    DEFAULT: 'validation errors'
  }
} as const
