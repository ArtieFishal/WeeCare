import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  AdmissionsState, 
  AdmissionsContextType, 
  ChildProfile, 
  AttendanceRecord,
  ParentContact,
  ParentBankingInfo,
  Invoice,
  Payment,
  InvoiceLineItem
} from '@/types/admissions';

// Create the context
const AdmissionsContext = createContext<AdmissionsContextType | undefined>(undefined);

// Initial state with sample data
const initialState: AdmissionsState = {
  children: {
    'child-1': {
      id: 'child-1',
      firstName: 'Emma',
      lastName: 'Johnson',
      dateOfBirth: '2020-05-15',
      gender: 'female',
      enrollmentDate: '2023-01-10',
      enrollmentStatus: 'active',
      ageGroup: 'toddler',
      attendanceSchedule: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        partTime: false
      },
      medicalInformation: {
        primaryPhysician: {
          name: 'Dr. Sarah Williams',
          phone: '(555) 987-6543',
          address: '123 Medical Center Dr, Nashville, TN'
        },
        insuranceProvider: 'TennCare',
        policyNumber: 'TC-12345678',
        immunizationStatus: 'complete',
        immunizationRecords: {
          dateUpdated: '2023-06-15'
        },
        medications: ['None'],
        medicalConditions: [],
        specialNeeds: '',
        allergies: ['Peanuts'],
        dietaryRestrictions: ['No peanuts']
      },
      emergencyContacts: [
        { 
          id: 'ec-1',
          name: 'Michael Johnson', 
          phone: '(555) 123-4567', 
          relationship: 'Father',
          priority: 1
        },
        { 
          id: 'ec-2',
          name: 'Jennifer Johnson', 
          phone: '(555) 765-4321', 
          relationship: 'Mother',
          priority: 2
        }
      ],
      guardians: [
        {
          id: 'parent-1',
          relationship: 'Father',
          authorizedPickup: true,
          legalCustody: true,
          financiallyResponsible: true,
          receivesCorrespondence: true
        },
        {
          id: 'parent-2',
          relationship: 'Mother',
          authorizedPickup: true,
          legalCustody: true,
          financiallyResponsible: true,
          receivesCorrespondence: true
        }
      ],
      parentIds: ['parent-1', 'parent-2'],
      photoRelease: true,
      transportationAuthorization: true
    },
    'child-2': {
      id: 'child-2',
      firstName: 'Noah',
      lastName: 'Smith',
      dateOfBirth: '2019-03-22',
      gender: 'male',
      enrollmentDate: '2022-09-01',
      enrollmentStatus: 'active',
      ageGroup: 'preschool',
      attendanceSchedule: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: false,
        partTime: true
      },
      medicalInformation: {
        primaryPhysician: {
          name: 'Dr. James Brown',
          phone: '(555) 456-7890',
          address: '456 Pediatric Lane, Nashville, TN'
        },
        insuranceProvider: 'BlueCross TN',
        policyNumber: 'BC-87654321',
        immunizationStatus: 'complete',
        immunizationRecords: {
          dateUpdated: '2023-04-10'
        },
        medications: ['Allergy medication (seasonal)'],
        medicalConditions: ['Seasonal allergies'],
        specialNeeds: '',
        allergies: ['Dust', 'Pollen'],
        dietaryRestrictions: []
      },
      emergencyContacts: [
        { 
          id: 'ec-3',
          name: 'Robert Smith', 
          phone: '(555) 234-5678', 
          relationship: 'Father',
          priority: 1
        },
        { 
          id: 'ec-4',
          name: 'Emily Smith', 
          phone: '(555) 876-5432', 
          relationship: 'Mother',
          priority: 2
        }
      ],
      guardians: [
        {
          id: 'parent-3',
          relationship: 'Father',
          authorizedPickup: true,
          legalCustody: true,
          financiallyResponsible: true,
          receivesCorrespondence: true
        },
        {
          id: 'parent-4',
          relationship: 'Mother',
          authorizedPickup: true,
          legalCustody: true,
          financiallyResponsible: true,
          receivesCorrespondence: true
        }
      ],
      parentIds: ['parent-3', 'parent-4'],
      photoRelease: true,
      transportationAuthorization: true
    }
  },
  attendance: {},
  parentContacts: {
    'parent-1': {
      id: 'parent-1',
      parentId: 'parent-1',
      childId: 'child-1',
      relationship: 'Father',
      fullName: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phone: '(555) 123-4567',
      phoneNumbers: {
        mobile: '(555) 123-4567',
        work: '(555) 987-6543'
      },
      homeAddress: '789 Family Lane, Nashville, TN 37203',
      address: '789 Family Lane, Nashville, TN 37203',
      employer: {
        name: 'Nashville Tech Solutions',
        address: '100 Tech Parkway, Nashville, TN',
        phone: '(555) 444-3333'
      },
      emergencyContact: true,
      authorizedForPickup: true,
      authorizedPickup: true,
      primaryContact: true,
      preferredContactMethod: 'email',
      communicationPreferences: {
        dailyReports: true,
        weeklyNewsletters: true,
        emergencyAlerts: true,
        billingNotifications: true,
        eventInvitations: true
      }
    },
    'parent-2': {
      id: 'parent-2',
      parentId: 'parent-2',
      childId: 'child-1',
      relationship: 'Mother',
      fullName: 'Jennifer Johnson',
      email: 'jennifer.johnson@example.com',
      phone: '(555) 765-4321',
      phoneNumbers: {
        mobile: '(555) 765-4321',
        work: '(555) 222-1111'
      },
      homeAddress: '789 Family Lane, Nashville, TN 37203',
      address: '789 Family Lane, Nashville, TN 37203',
      employer: {
        name: 'Nashville General Hospital',
        address: '200 Medical Plaza, Nashville, TN',
        phone: '(555) 666-7777'
      },
      emergencyContact: true,
      authorizedForPickup: true,
      authorizedPickup: true,
      primaryContact: false,
      preferredContactMethod: 'phone',
      communicationPreferences: {
        dailyReports: true,
        weeklyNewsletters: true,
        emergencyAlerts: true,
        billingNotifications: false,
        eventInvitations: true
      }
    },
    'parent-3': {
      id: 'parent-3',
      parentId: 'parent-3',
      childId: 'child-2',
      relationship: 'Father',
      fullName: 'Robert Smith',
      email: 'robert.smith@example.com',
      phone: '(555) 234-5678',
      phoneNumbers: {
        mobile: '(555) 234-5678',
        work: '(555) 333-2222'
      },
      homeAddress: '456 Residence Ave, Nashville, TN 37205',
      address: '456 Residence Ave, Nashville, TN 37205',
      employer: {
        name: 'Smith & Associates',
        address: '300 Business Blvd, Nashville, TN',
        phone: '(555) 888-9999'
      },
      emergencyContact: true,
      authorizedForPickup: true,
      authorizedPickup: true,
      primaryContact: true,
      preferredContactMethod: 'email',
      communicationPreferences: {
        dailyReports: true,
        weeklyNewsletters: false,
        emergencyAlerts: true,
        billingNotifications: true,
        eventInvitations: false
      }
    },
    'parent-4': {
      id: 'parent-4',
      parentId: 'parent-4',
      childId: 'child-2',
      relationship: 'Mother',
      fullName: 'Emily Smith',
      email: 'emily.smith@example.com',
      phone: '(555) 876-5432',
      phoneNumbers: {
        mobile: '(555) 876-5432'
      },
      homeAddress: '456 Residence Ave, Nashville, TN 37205',
      address: '456 Residence Ave, Nashville, TN 37205',
      employer: {
        name: 'Nashville School District',
        address: '400 Education Way, Nashville, TN',
        phone: '(555) 555-5555'
      },
      emergencyContact: true,
      authorizedForPickup: true,
      authorizedPickup: true,
      primaryContact: false,
      preferredContactMethod: 'email',
      communicationPreferences: {
        dailyReports: true,
        weeklyNewsletters: true,
        emergencyAlerts: true,
        billingNotifications: false,
        eventInvitations: true
      }
    }
  },
  parentBankingInfo: {
    'banking-1': {
      id: 'banking-1',
      parentId: 'parent-1',
      accountType: 'checking',
      accountName: 'Michael Johnson',
      nameOnAccount: 'Michael Johnson',
      accountNumber: '****6789',
      routingNumber: '****4321',
      bankName: 'First Tennessee Bank',
      billingAddress: '789 Family Lane, Nashville, TN 37203',
      isDefault: true,
      autoPayEnabled: true,
      autoPayDay: 1,
      autoPayAmount: 'full'
    },
    'banking-2': {
      id: 'banking-2',
      parentId: 'parent-3',
      accountType: 'credit',
      accountName: 'Robert Smith',
      nameOnAccount: 'Robert Smith',
      cardType: 'Visa',
      cardNumber: '****5678',
      expirationDate: '05/26',
      billingAddress: '456 Residence Ave, Nashville, TN 37205',
      isDefault: true,
      autoPayEnabled: false
    }
  },
  billing: {
    accounts: {},
    feeStructures: {},
    invoices: {},
    payments: {}
  }
};

// Provider component
export const AdmissionsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, setState] = useState<AdmissionsState>(initialState);
  
  // Derived state
  const childProfiles = Object.values(state.children);
  const parentContacts = Object.values(state.parentContacts);
  const parentBankingInfo = Object.values(state.parentBankingInfo);
  
  // Child operations
  const addChildProfile = (child: ChildProfile): string => {
    const newChild = {
      ...child,
      id: child.id || uuidv4()
    };
    
    setState(prevState => ({
      ...prevState,
      children: {
        ...prevState.children,
        [newChild.id]: newChild
      }
    }));
    
    return newChild.id;
  };
  
  const updateChildProfile = (childId: string, updates: Partial<ChildProfile>) => {
    setState(prevState => {
      if (!prevState.children[childId]) return prevState;
      
      return {
        ...prevState,
        children: {
          ...prevState.children,
          [childId]: {
            ...prevState.children[childId],
            ...updates
          }
        }
      };
    });
  };
  
  const removeChildProfile = (childId: string) => {
    setState(prevState => {
      const newChildren = { ...prevState.children };
      delete newChildren[childId];
      
      return {
        ...prevState,
        children: newChildren
      };
    });
  };
  
  const getChildById = (childId: string) => {
    return state.children[childId];
  };
  
  // Parent operations
  const addParentContact = (parent: ParentContact): string => {
    const newParent = {
      ...parent,
      id: parent.id || uuidv4(),
      parentId: parent.parentId || uuidv4()
    };
    
    setState(prevState => ({
      ...prevState,
      parentContacts: {
        ...prevState.parentContacts,
        [newParent.id]: newParent
      }
    }));
    
    return newParent.id;
  };
  
  const updateParentContact = (parentId: string, updates: Partial<ParentContact>) => {
    setState(prevState => {
      if (!prevState.parentContacts[parentId]) return prevState;
      
      return {
        ...prevState,
        parentContacts: {
          ...prevState.parentContacts,
          [parentId]: {
            ...prevState.parentContacts[parentId],
            ...updates
          }
        }
      };
    });
  };
  
  const removeParentContact = (parentId: string) => {
    setState(prevState => {
      const newParentContacts = { ...prevState.parentContacts };
      delete newParentContacts[parentId];
      
      return {
        ...prevState,
        parentContacts: newParentContacts
      };
    });
  };
  
  const getParentById = (parentId: string) => {
    return Object.values(state.parentContacts).find(p => p.parentId === parentId);
  };
  
  const getParentsByChildId = (childId: string) => {
    const child = state.children[childId];
    if (!child || !child.parentIds) return [];
    
    return Object.values(state.parentContacts).filter(p => 
      child.parentIds?.includes(p.parentId)
    );
  };
  
  // Banking operations
  const addParentBankingInfo = (info: ParentBankingInfo): string => {
    const newInfo = {
      ...info,
      id: info.id || uuidv4()
    };
    
    setState(prevState => ({
      ...prevState,
      parentBankingInfo: {
        ...prevState.parentBankingInfo,
        [newInfo.id]: newInfo
      }
    }));
    
    return newInfo.id;
  };
  
  const updateParentBankingInfo = (infoId: string, updates: Partial<ParentBankingInfo>) => {
    setState(prevState => {
      if (!prevState.parentBankingInfo[infoId]) return prevState;
      
      return {
        ...prevState,
        parentBankingInfo: {
          ...prevState.parentBankingInfo,
          [infoId]: {
            ...prevState.parentBankingInfo[infoId],
            ...updates
          }
        }
      };
    });
  };
  
  const removeParentBankingInfo = (infoId: string) => {
    setState(prevState => {
      const newParentBankingInfo = { ...prevState.parentBankingInfo };
      delete newParentBankingInfo[infoId];
      
      return {
        ...prevState,
        parentBankingInfo: newParentBankingInfo
      };
    });
  };
  
  const getBankingInfoByParentId = (parentId: string) => {
    return Object.values(state.parentBankingInfo).filter(info => 
      info.parentId === parentId
    );
  };
  
  // Linkage operations
  const linkParentToChild = (childId: string, parentId: string, relationship: string) => {
    setState(prevState => {
      const child = prevState.children[childId];
      if (!child) return prevState;
      
      // Add parent to child's parentIds
      const parentIds = child.parentIds || [];
      if (!parentIds.includes(parentId)) {
        parentIds.push(parentId);
      }
      
      // Add or update guardian relationship
      const guardians = child.guardians || [];
      const existingGuardianIndex = guardians.findIndex(g => g.id === parentId);
      
      if (existingGuardianIndex >= 0) {
        guardians[existingGuardianIndex] = {
          ...guardians[existingGuardianIndex],
          relationship
        };
      } else {
        guardians.push({
          id: parentId,
          relationship,
          authorizedPickup: true,
          legalCustody: true,
          financiallyResponsible: true,
          receivesCorrespondence: true
        });
      }
      
      return {
        ...prevState,
        children: {
          ...prevState.children,
          [childId]: {
            ...child,
            parentIds,
            guardians
          }
        }
      };
    });
  };
  
  const unlinkParentFromChild = (childId: string, parentId: string) => {
    setState(prevState => {
      const child = prevState.children[childId];
      if (!child) return prevState;
      
      // Remove parent from child's parentIds
      const parentIds = (child.parentIds || []).filter(id => id !== parentId);
      
      // Remove guardian relationship
      const guardians = (child.guardians || []).filter(g => g.id !== parentId);
      
      return {
        ...prevState,
        children: {
          ...prevState.children,
          [childId]: {
            ...child,
            parentIds,
            guardians
          }
        }
      };
    });
  };
  
  // Billing operations
  const createInvoice = (invoice: Invoice): Invoice => {
    const newInvoice = {
      ...invoice,
      id: invoice.id || uuidv4(),
      invoiceNumber: invoice.invoiceNumber || `INV-${Date.now()}`
    };
    
    setState(prevState => ({
      ...prevState,
      billing: {
        ...prevState.billing,
        invoices: {
          ...prevState.billing.invoices,
          [newInvoice.id]: newInvoice
        }
      }
    }));
    
    return newInvoice;
  };
  
  const recordPayment = (payment: Payment): Payment => {
    const newPayment = {
      ...payment,
      id: payment.id || uuidv4()
    };
    
    setState(prevState => {
      // Update invoice with payment
      const invoice = prevState.billing.invoices[payment.invoiceId];
      if (invoice) {
        const updatedInvoice = {
          ...invoice,
          payments: [...(invoice.payments || []), newPayment],
          balance: invoice.balance - payment.amount,
          status: (invoice.balance - payment.amount <= 0 ? 'paid' : 'partial') as 'paid' | 'partial'
        };
        
        return {
          ...prevState,
          billing: {
            ...prevState.billing,
            invoices: {
              ...prevState.billing.invoices,
              [invoice.id]: updatedInvoice
            },
            payments: {
              ...prevState.billing.payments,
              [newPayment.id]: newPayment
            }
          }
        };
      }
      
      return {
        ...prevState,
        billing: {
          ...prevState.billing,
          payments: {
            ...prevState.billing.payments,
            [newPayment.id]: newPayment
          }
        }
      };
    });
    
    return newPayment;
  };
  
  // Attendance operations
  const getChildrenByAgeGroup = (ageGroup: string) => {
    return childProfiles.filter(child => 
      child.ageGroup === ageGroup && child.enrollmentStatus === 'active'
    );
  };
  
  const getTotalChildrenCount = () => {
    const counts = {
      infant: 0,
      toddler: 0,
      preschool: 0,
      schoolage: 0
    };
    
    childProfiles.forEach(child => {
      if (child.enrollmentStatus === 'active' && child.ageGroup) {
        counts[child.ageGroup as keyof typeof counts]++;
      }
    });
    
    return counts;
  };
  
  const getAttendanceForDate = (date: string) => {
    return state.attendance[date] || {};
  };
  
  const getMealAttendanceForDate = (date: string, mealType: string) => {
    const attendance = state.attendance[date] || {};
    const counts = {
      infant: 0,
      toddler: 0,
      preschool: 0,
      schoolage: 0
    };
    
    Object.values(attendance).forEach(record => {
      const child = state.children[record.childId];
      if (child && record.mealAttendance[mealType as keyof typeof record.mealAttendance]) {
        counts[child.ageGroup as keyof typeof counts]++;
      }
    });
    
    return counts;
  };
  
  const recordAttendance = (record: AttendanceRecord) => {
    setState(prevState => {
      const dateAttendance = prevState.attendance[record.date] || {};
      
      return {
        ...prevState,
        attendance: {
          ...prevState.attendance,
          [record.date]: {
            ...dateAttendance,
            [record.childId]: record
          }
        }
      };
    });
  };
  
  const updateAttendance = (childId: string, date: string, updates: Partial<AttendanceRecord>) => {
    setState(prevState => {
      const dateAttendance = prevState.attendance[date] || {};
      const record = dateAttendance[childId];
      
      if (!record) return prevState;
      
      return {
        ...prevState,
        attendance: {
          ...prevState.attendance,
          [date]: {
            ...dateAttendance,
            [childId]: {
              ...record,
              ...updates
            }
          }
        }
      };
    });
  };
  
  const getAccountBalance = (accountId: string) => {
    let balance = 0;
    
    Object.values(state.billing.invoices).forEach(invoice => {
      if (invoice.accountId === accountId && 
          (invoice.status === 'issued' || invoice.status === 'partial' || invoice.status === 'overdue')) {
        balance += invoice.balance;
      }
    });
    
    return balance;
  };
  
  const value: AdmissionsContextType = {
    state,
    childProfiles,
    parentContacts,
    parentBankingInfo,
    
    // Child operations
    addChildProfile,
    updateChildProfile,
    removeChildProfile,
    getChildById,
    
    // Parent operations
    addParentContact,
    updateParentContact,
    removeParentContact,
    getParentById,
    getParentsByChildId,
    
    // Banking operations
    addParentBankingInfo,
    updateParentBankingInfo,
    removeParentBankingInfo,
    getBankingInfoByParentId,
    
    // Linkage operations
    linkParentToChild,
    unlinkParentFromChild,
    
    // Billing operations
    createInvoice,
    recordPayment,
    
    // Attendance operations
    getChildrenByAgeGroup,
    getTotalChildrenCount,
    getAttendanceForDate,
    getMealAttendanceForDate,
    recordAttendance,
    updateAttendance,
    getAccountBalance
  };
  
  return (
    <AdmissionsContext.Provider value={value}>
      {children}
    </AdmissionsContext.Provider>
  );
};

// Custom hook for using the context
export const useAdmissions = () => {
  const context = useContext(AdmissionsContext);
  if (context === undefined) {
    throw new Error('useAdmissions must be used within an AdmissionsProvider');
  }
  return context;
};
