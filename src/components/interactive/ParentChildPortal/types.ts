// Types for Parent/Child Portal

// Child Information Types
export interface ChildBasicInfo {
  fullName: string;
  preferredName?: string;
  dateOfBirth: string;
  gender: string;
  homeAddress: string;
  primaryLanguage: string;
  secondaryLanguages?: string[];
  photoUrl?: string;
}

export interface MedicalInfo {
  primaryPhysician: {
    name: string;
    phone: string;
    address?: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  allergies: {
    food: string[];
    medication: string[];
    environmental: string[];
    other?: string[];
  };
  medicalConditions: string[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    instructions: string;
    asNeeded: boolean;
  }[];
  immunizationStatus: 'complete' | 'incomplete' | 'exempt';
  immunizationRecords?: string; // URL to uploaded document
  dietaryRequirements: string[];
  physicalLimitations?: string;
  specialNeeds?: string;
}

export interface ContactInfo {
  relationship: 'parent' | 'guardian' | 'emergency' | 'authorized';
  fullName: string;
  relationship_details?: string;
  homeAddress?: string;
  phoneNumbers: {
    mobile?: string;
    home?: string;
    work?: string;
  };
  email?: string;
  employer?: {
    name: string;
    address?: string;
    phone?: string;
  };
  authorizedForPickup: boolean;
  emergencyContact: boolean;
  primaryContact: boolean;
}

export interface DevelopmentalInfo {
  milestones?: {
    category: string;
    milestone: string;
    achievedDate?: string;
    notes?: string;
  }[];
  behavioralNotes?: string;
  learningPreferences?: string[];
  interests?: string[];
  strengths?: string[];
  supportAreas?: string[];
  previousExperiences?: {
    type: string;
    provider: string;
    dates: string;
    notes?: string;
  }[];
}

// Communication Types
export interface Message {
  id: string;
  childId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  timestamp: string;
  priority: 'normal' | 'important' | 'urgent';
  targetGroups: string[]; // 'all', 'infant', 'toddler', etc.
  publishDate: string;
  expiryDate?: string;
  readBy: string[]; // User IDs
}

export interface DailyReport {
  id: string;
  childId: string;
  date: string;
  meals: {
    mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner';
    consumed: 'all' | 'most' | 'some' | 'none';
    notes?: string;
  }[];
  naps: {
    startTime: string;
    endTime: string;
    quality?: 'restless' | 'sound' | 'interrupted';
  }[];
  activities: {
    name: string;
    description?: string;
    duration?: number;
    engagement?: 'high' | 'medium' | 'low';
  }[];
  learningExperiences?: string;
  behaviorNotes?: string;
  bathroomLogs?: {
    time: string;
    type: 'diaper' | 'potty';
    notes?: string;
  }[];
  mood: 'happy' | 'content' | 'tired' | 'upset' | 'sick' | 'other';
  moodNotes?: string;
  photos?: string[]; // URLs
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  targetGroups: string[]; // 'all', 'infant', 'toddler', etc.
  requiresRsvp: boolean;
  rsvpResponses?: {
    userId: string;
    response: 'yes' | 'no' | 'maybe';
    notes?: string;
  }[];
  reminders?: {
    type: 'email' | 'notification';
    time: number; // minutes before event
  }[];
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    exceptions?: string[]; // dates to exclude
  };
  createdAt: string;
  updatedAt: string;
}

// Assessment Types
export interface Assessment {
  id: string;
  childId: string;
  type: 'developmental' | 'behavioral' | 'learning' | 'custom';
  name: string;
  date: string;
  conductedBy: string;
  categories: {
    name: string;
    items: {
      skill: string;
      rating: 'not-observed' | 'emerging' | 'developing' | 'proficient' | 'advanced';
      notes?: string;
    }[];
  }[];
  summary?: string;
  recommendations?: string;
  nextAssessmentDate?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  childId: string;
  title: string;
  description?: string;
  type: 'artwork' | 'project' | 'photo' | 'video' | 'document' | 'other';
  url: string;
  tags?: string[];
  date: string;
  addedBy: string;
  relatedSkills?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Integration Types
export interface Attendance {
  childId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'early-departure';
  arrivalTime?: string;
  departureTime?: string;
  notes?: string;
}

export interface MealPlanIntegration {
  childId: string;
  dietaryRestrictions: string[];
  specialRequirements?: string;
  portionAdjustments?: {
    mealType: string;
    adjustment: 'standard' | 'reduced' | 'increased';
    notes?: string;
  }[];
}

export interface ActivityIntegration {
  childId: string;
  preferences: string[];
  restrictions?: string[];
  developmentalFocus?: string[];
}

// User Types
export interface User {
  id: string;
  email: string;
  role: 'parent' | 'staff' | 'admin';
  firstName: string;
  lastName: string;
  phone?: string;
  profilePhoto?: string;
  children?: string[]; // Child IDs for parents
  classAssignments?: string[]; // Class IDs for staff
  lastLogin?: string;
  notificationPreferences: {
    email: boolean;
    inApp: boolean;
    dailyReports: boolean;
    announcements: boolean;
    assessments: boolean;
    events: boolean;
  };
}

// Complete Child Profile
export interface ChildProfile {
  id: string;
  basicInfo: ChildBasicInfo;
  medicalInfo: MedicalInfo;
  contacts: ContactInfo[];
  developmentalInfo: DevelopmentalInfo;
  assessments?: Assessment[];
  portfolioItems?: PortfolioItem[];
  attendance?: Attendance[];
  mealPlanIntegration?: MealPlanIntegration;
  activityIntegration?: ActivityIntegration;
  createdAt: string;
  updatedAt: string;
}
