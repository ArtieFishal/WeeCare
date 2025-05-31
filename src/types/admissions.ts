// Types for Admissions and Weekly Billing System

// Child Information
export interface ChildProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: 'male' | 'female' | 'other';
  enrollmentDate: string;
  enrollmentStatus: 'active' | 'waitlist' | 'withdrawn' | 'graduated';
  ageGroup: 'infant' | 'toddler' | 'preschool' | 'schoolage';
  attendanceSchedule?: AttendanceSchedule;
  medicalInformation?: MedicalInformation;
  emergencyContacts?: EmergencyContact[];
  guardians?: Guardian[];
  dietaryRestrictions?: string[];
  allergies?: Allergy[];
  authorizedPickups?: AuthorizedPickup[];
  developmentalNotes?: string;
  photoRelease?: boolean;
  transportationAuthorization?: boolean;
  customFields?: {[key: string]: string};
  
  // Added fields for parent linkage and compatibility with new components
  parentIds?: string[]; // IDs of linked parents/guardians
  basicInfo?: {
    fullName: string;
    preferredName?: string;
    dateOfBirth: string;
    gender: string;
    homeAddress?: string;
    primaryLanguage?: string;
    secondaryLanguages?: string[];
  };
  medicalInfo?: {
    primaryPhysician?: {
      name: string;
      phone: string;
      address: string;
    };
    allergies?: {
      food: string[];
      medication: string[];
      environmental: string[];
    };
    medicalConditions?: string[];
    immunizationStatus?: string;
    dietaryRequirements?: string[];
  };
  contacts?: any[]; // Contact information
  developmentalInfo?: {
    behavioralNotes?: string;
    learningPreferences?: string[];
    interests?: string[];
  };
  enrollment?: {
    enrollmentDate?: string;
    ageGroup?: string;
    status?: string;
    scheduleType?: string;
    weeklySchedule?: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
    };
    dropOffTime?: string;
    pickUpTime?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AttendanceSchedule {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  scheduledHours?: {
    dropOff: string; // Format: "HH:MM"
    pickUp: string;  // Format: "HH:MM"
  };
  extendedCare?: boolean;
  partTime?: boolean;
}

export interface MedicalInformation {
  primaryPhysician?: {
    name: string;
    phone: string;
    address: string;
  };
  insuranceProvider?: string;
  policyNumber?: string;
  immunizationStatus?: 'complete' | 'incomplete' | 'exempt';
  immunizationRecords?: {
    dateUpdated: string;
    fileUrl?: string;
  };
  medications?: string[];
  medicalConditions?: string[];
  specialNeeds?: string;
  allergies?: string[];
  dietaryRestrictions?: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions: string;
  requiresRefrigeration: boolean;
  authorizationOnFile: boolean;
}

export interface Allergy {
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string;
  treatment: string;
  emergencyMedication?: string;
}

export interface EmergencyContact {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  relationship: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  phone?: string;
  email?: string;
  address?: string;
  isAuthorizedPickup?: boolean;
  priority?: number; // Order to contact (1 = first)
}

export interface Guardian {
  id: string;
  relationship: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  email?: string;
  employer?: string;
  workPhone?: string;
  workAddress?: string;
  legalCustody?: boolean;
  financiallyResponsible?: boolean;
  receivesCorrespondence?: boolean;
  authorizedPickup?: boolean;
}

export interface AuthorizedPickup {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  identificationOnFile: boolean;
}

// Parent Contact Information
export interface ParentContact {
  id: string;
  parentId: string;
  childId?: string;
  relationship: string;
  fullName: string;
  email: string;
  phone?: string; // Added for compatibility
  phoneNumbers?: {
    mobile: string;
    home?: string;
    work?: string;
  };
  homeAddress?: string;
  address?: string; // Added for compatibility
  employer?: {
    name: string;
    address?: string;
    phone?: string;
  };
  employerName?: string; // Added for compatibility
  employerPhone?: string; // Added for compatibility
  emergencyContact: boolean;
  authorizedForPickup?: boolean;
  authorizedPickup?: boolean; // Added for compatibility
  primaryContact: boolean;
  preferredContactMethod?: string;
  communicationPreferences?: {
    dailyReports: boolean;
    weeklyNewsletters: boolean;
    emergencyAlerts: boolean;
    billingNotifications: boolean;
    eventInvitations: boolean;
  };
  notes?: string;
  createdAt?: string;
}

// Parent Banking Information
export interface ParentBankingInfo {
  id: string;
  parentId: string;
  accountType: 'checking' | 'savings' | 'credit';
  accountName?: string;
  nameOnAccount?: string; // Added for compatibility
  accountNumber?: string;
  routingNumber?: string;
  bankName?: string;
  cardType?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  billingAddress?: string;
  isDefault: boolean;
  autoPayEnabled: boolean;
  autoPayDay?: number;
  autoPayAmount?: string;
  notes?: string;
  createdAt?: string;
}

// Attendance Tracking
export interface AttendanceRecord {
  childId: string;
  date: string;
  checkIn: string | null; // Format: "HH:MM"
  checkOut: string | null; // Format: "HH:MM"
  status: 'present' | 'absent' | 'late' | 'excused' | 'holiday';
  mealAttendance: {
    breakfast: boolean;
    amSnack: boolean;
    lunch: boolean;
    pmSnack: boolean;
    dinner: boolean;
  };
  notes: string;
}

// Billing Information
export interface BillingAccount {
  id: string;
  primaryGuardianId: string;
  secondaryGuardianId?: string;
  children: string[]; // Array of child IDs
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
  paymentMethod: PaymentMethod[];
  defaultPaymentMethodId?: string;
  billingFrequency: 'weekly' | 'biweekly' | 'monthly';
  subsidyInformation?: SubsidyInformation;
  taxId?: string; // For tax reporting purposes
  invoiceDeliveryMethod: 'email' | 'paper' | 'both';
  autoPayEnabled: boolean;
  lateFeeExempt: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'ach' | 'check' | 'cash' | 'other';
  nameOnAccount?: string;
  lastFour?: string; // Last 4 digits of account/card
  expirationDate?: string; // Format: "MM/YY"
  billingZip?: string;
  isDefault: boolean;
}

export interface SubsidyInformation {
  programName: string;
  caseNumber: string;
  caseworker: {
    name: string;
    phone: string;
    email: string;
  };
  coveragePercentage: number;
  maxDailyAmount?: number;
  approvedDays: number; // Days per week
  approvedHours: number; // Hours per week
  startDate: string;
  endDate: string;
  documentationOnFile: boolean;
}

export interface FeeStructure {
  id: string;
  name: string;
  ageGroup: 'infant' | 'toddler' | 'preschool' | 'schoolage';
  fullTimeWeeklyRate: number;
  partTimeWeeklyRate: number;
  dailyRate: number;
  enrollmentFee: number;
  annualRegistrationFee: number;
  latePickupFeePerMinute: number;
  latePaymentFee: number;
  discounts: Discount[];
  mealFees: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
  effectiveDate: string;
  expirationDate?: string;
}

export interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number; // Percentage or dollar amount
  applicableTo: 'tuition' | 'registration' | 'all';
  multiChildThreshold?: number; // For sibling discounts
  requirements: string;
}

export interface Invoice {
  id: string;
  accountId: string;
  invoiceNumber: string;
  dateIssued: string;
  dateDue: string;
  status: 'draft' | 'issued' | 'paid' | 'partial' | 'overdue' | 'void';
  subtotal: number;
  discounts: number;
  taxes: number;
  total: number;
  balance: number;
  lineItems: InvoiceLineItem[];
  payments: Payment[];
  notes: string;
}

export interface InvoiceLineItem {
  id: string;
  childId: string;
  description: string;
  dateRange?: {
    start: string;
    end: string;
  };
  quantity: number;
  rate: number;
  amount: number;
  category: 'tuition' | 'registration' | 'late' | 'meal' | 'activity' | 'other';
}

export interface Payment {
  id: string;
  invoiceId: string;
  accountId: string;
  date: string;
  amount: number;
  method: 'credit' | 'ach' | 'check' | 'cash' | 'other';
  referenceNumber?: string;
  notes: string;
  processedBy: string;
  status: 'pending' | 'processed' | 'failed' | 'refunded';
}

// Communication Types
export interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
  expiryDate?: string;
  targetGroups?: string[];
  attachments?: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  category: string;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

// Assessment Types
export interface Assessment {
  id: string;
  childId: string;
  date: string;
  type: string;
  categories: AssessmentCategory[];
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentCategory {
  name: string;
  rating: number;
  notes: string;
}

// Integration Types
export interface AdmissionsState {
  children: {[id: string]: ChildProfile};
  attendance: {[date: string]: {[childId: string]: AttendanceRecord}};
  parentContacts: {[id: string]: ParentContact};
  parentBankingInfo: {[id: string]: ParentBankingInfo};
  billing: {
    accounts: {[id: string]: BillingAccount};
    feeStructures: {[id: string]: FeeStructure};
    invoices: {[id: string]: Invoice};
    payments: {[id: string]: Payment};
  };
}

// Context Interface for Global State
export interface AdmissionsContextType {
  state: AdmissionsState;
  childProfiles: ChildProfile[];
  parentContacts: ParentContact[];
  parentBankingInfo: ParentBankingInfo[];
  
  // Child operations
  addChildProfile: (child: ChildProfile) => string;
  updateChildProfile: (childId: string, updates: Partial<ChildProfile>) => void;
  removeChildProfile: (childId: string) => void;
  getChildById: (childId: string) => ChildProfile | undefined;
  
  // Parent operations
  addParentContact: (parent: ParentContact) => string;
  updateParentContact: (parentId: string, updates: Partial<ParentContact>) => void;
  removeParentContact: (parentId: string) => void;
  getParentById: (parentId: string) => ParentContact | undefined;
  getParentsByChildId: (childId: string) => ParentContact[];
  
  // Banking operations
  addParentBankingInfo: (info: ParentBankingInfo) => string;
  updateParentBankingInfo: (infoId: string, updates: Partial<ParentBankingInfo>) => void;
  removeParentBankingInfo: (infoId: string) => void;
  getBankingInfoByParentId: (parentId: string) => ParentBankingInfo[];
  
  // Linkage operations
  linkParentToChild: (childId: string, parentId: string, relationship: string) => void;
  unlinkParentFromChild: (childId: string, parentId: string) => void;
  
  // Billing operations
  createInvoice: (invoice: Invoice) => Invoice;
  recordPayment: (payment: Payment) => void;
  
  // Attendance operations
  recordAttendance?: (record: AttendanceRecord) => void;
  updateAttendance?: (childId: string, date: string, updates: Partial<AttendanceRecord>) => void;
  getChildrenByAgeGroup?: (ageGroup: string) => ChildProfile[];
  getTotalChildrenCount?: () => {[ageGroup: string]: number};
  getAttendanceForDate?: (date: string) => {[childId: string]: AttendanceRecord};
  getMealAttendanceForDate?: (date: string, mealType: string) => {[ageGroup: string]: number};
  getAccountBalance?: (accountId: string) => number;
}
