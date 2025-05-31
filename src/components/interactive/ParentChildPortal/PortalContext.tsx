import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChildProfile, Assessment, Message, Announcement, CalendarEvent } from './types';
import * as dataService from './dataService';

// Define the context interface
interface PortalContextType {
  childProfiles: ChildProfile[];
  selectedChildId: string | null;
  setSelectedChildId: (id: string | null) => void;
  saveChildProfile: (profile: ChildProfile) => void;
  deleteChildProfile: (id: string) => void;
  refreshData: () => void;
  isLoading: boolean;
  parentContacts: any[];
  parentBankingInfo: any[];
  updateParentContactInfo: (contactInfo: any) => void;
  updateParentBankingInfo: (bankingInfo: any) => void;
  
  // Assessment related properties
  assessments: Assessment[];
  saveAssessment: (assessment: Assessment) => void;
  
  // Communication related properties
  messages: Message[];
  announcements: Announcement[];
  calendarEvents: CalendarEvent[];
  saveMessage: (message: Message) => void;
  saveAnnouncement: (announcement: Announcement) => void;
  saveCalendarEvent: (event: CalendarEvent) => void;
  
  // Integration related properties
  exportChildData: (childId: string, format: string) => void;
  
  state: {
    childProfiles: ChildProfile[];
    selectedChildId: string | null;
    parentContacts: any[];
    parentBankingInfo: any[];
    assessments: Assessment[];
    messages: Message[];
    announcements: Announcement[];
    calendarEvents: CalendarEvent[];
  };
}

// Create the context with default values
const PortalContext = createContext<PortalContextType>({
  childProfiles: [],
  selectedChildId: null,
  setSelectedChildId: () => {},
  saveChildProfile: () => {},
  deleteChildProfile: () => {},
  refreshData: () => {},
  isLoading: false,
  parentContacts: [],
  parentBankingInfo: [],
  updateParentContactInfo: () => {},
  updateParentBankingInfo: () => {},
  
  // Assessment related properties
  assessments: [],
  saveAssessment: () => {},
  
  // Communication related properties
  messages: [],
  announcements: [],
  calendarEvents: [],
  saveMessage: () => {},
  saveAnnouncement: () => {},
  saveCalendarEvent: () => {},
  
  // Integration related properties
  exportChildData: () => {},
  
  state: {
    childProfiles: [],
    selectedChildId: null,
    parentContacts: [],
    parentBankingInfo: [],
    assessments: [],
    messages: [],
    announcements: [],
    calendarEvents: []
  }
});

// Create the provider component
export const PortalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parentContacts, setParentContacts] = useState<any[]>([]);
  const [parentBankingInfo, setParentBankingInfo] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Refresh data from service
  const refreshData = () => {
    setIsLoading(true);
    
    // Load child profiles
    dataService.getChildProfiles()
      .then(profiles => {
        setChildProfiles(profiles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading child profiles:', error);
        setIsLoading(false);
      });
    
    // Load parent contacts
    dataService.getParentContacts()
      .then(contacts => {
        setParentContacts(contacts);
      })
      .catch(error => {
        console.error('Error loading parent contacts:', error);
      });
    
    // Load banking info
    dataService.getParentBankingInfo()
      .then(info => {
        setParentBankingInfo(info);
      })
      .catch(error => {
        console.error('Error loading banking info:', error);
      });
      
    // Load assessments (mock implementation)
    setAssessments([]);
    
    // Load messages (mock implementation)
    setMessages([]);
    
    // Load announcements (mock implementation)
    setAnnouncements([]);
    
    // Load calendar events (mock implementation)
    setCalendarEvents([]);
  };

  // Save a child profile
  const saveChildProfile = (profile: ChildProfile) => {
    setIsLoading(true);
    
    // If no ID, this is a new profile
    if (!profile.id) {
      const newProfile = {
        ...profile,
        id: `child-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      dataService.addChildProfile(newProfile)
        .then(() => {
          setChildProfiles(prev => [...prev, newProfile]);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error adding child profile:', error);
          setIsLoading(false);
        });
    } else {
      // Update existing profile
      const updatedProfile = {
        ...profile,
        updatedAt: new Date().toISOString()
      };
      
      dataService.updateChildProfile(updatedProfile)
        .then(() => {
          setChildProfiles(prev => 
            prev.map(p => p.id === updatedProfile.id ? updatedProfile : p)
          );
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error updating child profile:', error);
          setIsLoading(false);
        });
    }
  };

  // Delete a child profile
  const deleteChildProfile = (id: string) => {
    setIsLoading(true);
    
    dataService.deleteChildProfile(id)
      .then(() => {
        setChildProfiles(prev => prev.filter(p => p.id !== id));
        
        // If the deleted profile was selected, clear selection
        if (selectedChildId === id) {
          setSelectedChildId(null);
        }
        
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error deleting child profile:', error);
        setIsLoading(false);
      });
  };

  // Update parent contact info
  const updateParentContactInfo = (contactInfo: any) => {
    // If no ID, this is a new contact
    if (!contactInfo.id) {
      const newContact = {
        ...contactInfo,
        id: `contact-${Date.now()}`
      };
      
      dataService.addParentContact(newContact)
        .then(() => {
          setParentContacts(prev => [...prev, newContact]);
        })
        .catch(error => {
          console.error('Error adding parent contact:', error);
        });
    } else {
      // Update existing contact
      dataService.updateParentContact(contactInfo)
        .then(() => {
          setParentContacts(prev => 
            prev.map(c => c.id === contactInfo.id ? contactInfo : c)
          );
        })
        .catch(error => {
          console.error('Error updating parent contact:', error);
        });
    }
  };

  // Update parent banking info
  const updateParentBankingInfo = (bankingInfo: any) => {
    // If no ID, this is new banking info
    if (!bankingInfo.id) {
      const newBankingInfo = {
        ...bankingInfo,
        id: `banking-${Date.now()}`
      };
      
      dataService.addParentBankingInfo(newBankingInfo)
        .then(() => {
          setParentBankingInfo(prev => [...prev, newBankingInfo]);
        })
        .catch(error => {
          console.error('Error adding banking info:', error);
        });
    } else {
      // Update existing banking info
      dataService.updateParentBankingInfo(bankingInfo)
        .then(() => {
          setParentBankingInfo(prev => 
            prev.map(b => b.id === bankingInfo.id ? bankingInfo : b)
          );
        })
        .catch(error => {
          console.error('Error updating banking info:', error);
        });
    }
  };
  
  // Save assessment (mock implementation)
  const saveAssessment = (assessment: Assessment) => {
    if (!assessment.id) {
      const newAssessment = {
        ...assessment,
        id: `assessment-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setAssessments(prev => [...prev, newAssessment]);
    } else {
      const updatedAssessment = {
        ...assessment,
        updatedAt: new Date().toISOString()
      };
      setAssessments(prev => 
        prev.map(a => a.id === updatedAssessment.id ? updatedAssessment : a)
      );
    }
  };
  
  // Save message (mock implementation)
  const saveMessage = (message: Message) => {
    if (!message.id) {
      const newMessage = {
        ...message,
        id: `message-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
    } else {
      setMessages(prev => 
        prev.map(m => m.id === message.id ? message : m)
      );
    }
  };
  
  // Save announcement (mock implementation)
  const saveAnnouncement = (announcement: Announcement) => {
    if (!announcement.id) {
      const newAnnouncement = {
        ...announcement,
        id: `announcement-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      setAnnouncements(prev => [...prev, newAnnouncement]);
    } else {
      setAnnouncements(prev => 
        prev.map(a => a.id === announcement.id ? announcement : a)
      );
    }
  };
  
  // Save calendar event (mock implementation)
  const saveCalendarEvent = (event: CalendarEvent) => {
    if (!event.id) {
      const newEvent = {
        ...event,
        id: `event-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCalendarEvents(prev => [...prev, newEvent]);
    } else {
      const updatedEvent = {
        ...event,
        updatedAt: new Date().toISOString()
      };
      setCalendarEvents(prev => 
        prev.map(e => e.id === updatedEvent.id ? updatedEvent : e)
      );
    }
  };
  
  // Export child data (mock implementation)
  const exportChildData = (childId: string, format: string) => {
    console.log(`Exporting data for child ${childId} in ${format} format`);
    // In a real app, this would generate and download a file
  };

  // Create the state object
  const state = {
    childProfiles,
    selectedChildId,
    parentContacts,
    parentBankingInfo,
    assessments,
    messages,
    announcements,
    calendarEvents
  };

  return (
    <PortalContext.Provider value={{
      childProfiles,
      selectedChildId,
      setSelectedChildId,
      saveChildProfile,
      deleteChildProfile,
      refreshData,
      isLoading,
      parentContacts,
      parentBankingInfo,
      updateParentContactInfo,
      updateParentBankingInfo,
      assessments,
      saveAssessment,
      messages,
      announcements,
      calendarEvents,
      saveMessage,
      saveAnnouncement,
      saveCalendarEvent,
      exportChildData,
      state
    }}>
      {children}
    </PortalContext.Provider>
  );
};

// Custom hook to use the portal context
export const usePortal = () => useContext(PortalContext);
