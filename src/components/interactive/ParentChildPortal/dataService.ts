import * as React from 'react';
import { ChildProfile } from './types';

// Mock data service for the Parent/Child Portal
// In a real application, this would connect to a backend API

// Sample data
let childProfiles: ChildProfile[] = [];
let parentContacts: any[] = [];
let parentBankingInfo: any[] = [];

// Initialize with sample data
export const initializeSampleData = () => {
  // Sample child profiles
  childProfiles = [
    {
      id: 'child-1',
      basicInfo: {
        fullName: 'Emma Johnson',
        preferredName: 'Emmy',
        dateOfBirth: '2020-05-15',
        gender: 'female',
        homeAddress: '123 Main St, Nashville, TN 37203',
        primaryLanguage: 'English',
        secondaryLanguages: []
      },
      medicalInfo: {
        primaryPhysician: {
          name: 'Dr. Sarah Williams',
          phone: '(615) 555-1234',
          address: '456 Health Ave, Nashville, TN 37203'
        },
        allergies: {
          food: ['Peanuts', 'Dairy'],
          medication: [],
          environmental: ['Pollen']
        },
        medicalConditions: ['Mild asthma'],
        immunizationStatus: 'complete',
        dietaryRequirements: ['Dairy-free', 'Nut-free']
      },
      contacts: [
        {
          relationship: 'parent',
          fullName: 'Michael Johnson',
          phoneNumbers: {
            mobile: '(615) 555-5678',
            home: '',
            work: '(615) 555-8765'
          },
          email: 'michael.johnson@example.com',
          authorizedForPickup: true,
          emergencyContact: true,
          primaryContact: true
        },
        {
          relationship: 'parent',
          fullName: 'Jennifer Johnson',
          phoneNumbers: {
            mobile: '(615) 555-4321',
            home: '',
            work: '(615) 555-7890'
          },
          email: 'jennifer.johnson@example.com',
          authorizedForPickup: true,
          emergencyContact: true,
          primaryContact: false
        }
      ],
      developmentalInfo: {
        behavioralNotes: 'Emma is very social and adapts well to new environments.',
        learningPreferences: ['Visual learning', 'Hands-on activities'],
        interests: ['Drawing', 'Music', 'Outdoor play']
      },
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: '2023-04-20T14:45:00Z'
    },
    {
      id: 'child-2',
      basicInfo: {
        fullName: 'Noah Williams',
        preferredName: '',
        dateOfBirth: '2019-08-22',
        gender: 'male',
        homeAddress: '789 Oak St, Nashville, TN 37205',
        primaryLanguage: 'English',
        secondaryLanguages: ['Spanish']
      },
      medicalInfo: {
        primaryPhysician: {
          name: 'Dr. James Miller',
          phone: '(615) 555-2468',
          address: '101 Medical Plaza, Nashville, TN 37205'
        },
        allergies: {
          food: [],
          medication: ['Penicillin'],
          environmental: []
        },
        medicalConditions: [],
        immunizationStatus: 'complete',
        dietaryRequirements: []
      },
      contacts: [
        {
          relationship: 'parent',
          fullName: 'Robert Williams',
          phoneNumbers: {
            mobile: '(615) 555-1357',
            home: '(615) 555-2468',
            work: ''
          },
          email: 'robert.williams@example.com',
          authorizedForPickup: true,
          emergencyContact: true,
          primaryContact: true
        },
        {
          relationship: 'guardian',
          fullName: 'Maria Garcia',
          phoneNumbers: {
            mobile: '(615) 555-9753',
            home: '',
            work: ''
          },
          email: 'maria.garcia@example.com',
          authorizedForPickup: true,
          emergencyContact: true,
          primaryContact: false
        }
      ],
      developmentalInfo: {
        behavioralNotes: 'Noah is quiet but attentive. He enjoys structured activities.',
        learningPreferences: ['Structured learning', 'Reading'],
        interests: ['Building blocks', 'Cars', 'Books']
      },
      createdAt: '2023-02-10T09:15:00Z',
      updatedAt: '2023-05-05T11:20:00Z'
    }
  ];
  
  // Sample parent contacts
  parentContacts = [
    {
      id: 'contact-1',
      parentId: 'parent-1',
      childId: 'child-1',
      relationship: 'parent',
      fullName: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phoneNumbers: {
        mobile: '(615) 555-5678',
        home: '',
        work: '(615) 555-8765'
      },
      homeAddress: '123 Main St, Nashville, TN 37203',
      employer: {
        name: 'Nashville Tech Solutions',
        address: '500 Tech Parkway, Nashville, TN 37203',
        phone: '(615) 555-9000'
      },
      emergencyContact: true,
      authorizedForPickup: true,
      primaryContact: true,
      preferredContactMethod: 'email',
      communicationPreferences: {
        dailyReports: true,
        weeklyNewsletters: true,
        emergencyAlerts: true,
        billingNotifications: true,
        eventInvitations: true
      },
      notes: 'Prefers to be contacted after 5pm on weekdays.'
    },
    {
      id: 'contact-2',
      parentId: 'parent-1',
      childId: 'child-1',
      relationship: 'parent',
      fullName: 'Jennifer Johnson',
      email: 'jennifer.johnson@example.com',
      phoneNumbers: {
        mobile: '(615) 555-4321',
        home: '',
        work: '(615) 555-7890'
      },
      homeAddress: '123 Main St, Nashville, TN 37203',
      employer: {
        name: 'Nashville General Hospital',
        address: '1818 Albion St, Nashville, TN 37208',
        phone: '(615) 555-6000'
      },
      emergencyContact: true,
      authorizedForPickup: true,
      primaryContact: false,
      preferredContactMethod: 'mobile',
      communicationPreferences: {
        dailyReports: true,
        weeklyNewsletters: false,
        emergencyAlerts: true,
        billingNotifications: false,
        eventInvitations: true
      },
      notes: 'Works night shifts Tuesday-Thursday.'
    }
  ];
  
  // Sample banking info
  parentBankingInfo = [
    {
      id: 'banking-1',
      parentId: 'parent-1',
      accountType: 'checking',
      accountName: 'Michael Johnson',
      accountNumber: '123456789',
      routingNumber: '987654321',
      bankName: 'First Tennessee Bank',
      billingAddress: '123 Main St, Nashville, TN 37203',
      isDefault: true,
      autoPayEnabled: true,
      autoPayDay: 1,
      autoPayAmount: 'full',
      notes: 'Primary account for tuition payments'
    },
    {
      id: 'banking-2',
      parentId: 'parent-1',
      accountType: 'credit',
      accountName: 'Jennifer Johnson',
      cardType: 'visa',
      cardNumber: '4111111111111111',
      expirationDate: '05/27',
      cvv: '123',
      billingAddress: '123 Main St, Nashville, TN 37203',
      isDefault: false,
      autoPayEnabled: false,
      notes: 'Backup payment method'
    }
  ];
};

// Child profile CRUD operations
export const getChildProfiles = (): Promise<ChildProfile[]> => {
  return Promise.resolve([...childProfiles]);
};

export const getChildProfileById = (id: string): Promise<ChildProfile | undefined> => {
  const profile = childProfiles.find(p => p.id === id);
  return Promise.resolve(profile ? { ...profile } : undefined);
};

export const addChildProfile = (profile: ChildProfile): Promise<void> => {
  childProfiles.push({ ...profile });
  return Promise.resolve();
};

export const updateChildProfile = (profile: ChildProfile): Promise<void> => {
  const index = childProfiles.findIndex(p => p.id === profile.id);
  if (index !== -1) {
    childProfiles[index] = { ...profile };
  }
  return Promise.resolve();
};

export const deleteChildProfile = (id: string): Promise<void> => {
  childProfiles = childProfiles.filter(p => p.id !== id);
  return Promise.resolve();
};

// Parent contact CRUD operations
export const getParentContacts = (): Promise<any[]> => {
  return Promise.resolve([...parentContacts]);
};

export const getParentContactById = (id: string): Promise<any | undefined> => {
  const contact = parentContacts.find(c => c.id === id);
  return Promise.resolve(contact ? { ...contact } : undefined);
};

export const addParentContact = (contact: any): Promise<void> => {
  parentContacts.push({ ...contact });
  return Promise.resolve();
};

export const updateParentContact = (contact: any): Promise<void> => {
  const index = parentContacts.findIndex(c => c.id === contact.id);
  if (index !== -1) {
    parentContacts[index] = { ...contact };
  }
  return Promise.resolve();
};

export const deleteParentContact = (id: string): Promise<void> => {
  parentContacts = parentContacts.filter(c => c.id !== id);
  return Promise.resolve();
};

// Banking info CRUD operations
export const getParentBankingInfo = (): Promise<any[]> => {
  return Promise.resolve([...parentBankingInfo]);
};

export const getParentBankingInfoById = (id: string): Promise<any | undefined> => {
  const info = parentBankingInfo.find(b => b.id === id);
  return Promise.resolve(info ? { ...info } : undefined);
};

export const addParentBankingInfo = (info: any): Promise<void> => {
  parentBankingInfo.push({ ...info });
  return Promise.resolve();
};

export const updateParentBankingInfo = (info: any): Promise<void> => {
  const index = parentBankingInfo.findIndex(b => b.id === info.id);
  if (index !== -1) {
    parentBankingInfo[index] = { ...info };
  }
  return Promise.resolve();
};

export const deleteParentBankingInfo = (id: string): Promise<void> => {
  parentBankingInfo = parentBankingInfo.filter(b => b.id !== id);
  return Promise.resolve();
};
