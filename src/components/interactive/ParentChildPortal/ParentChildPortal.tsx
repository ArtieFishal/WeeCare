import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePortal } from './PortalContext';
import ChildProfileForm from './ChildProfileForm';
import ParentCommunication from './ParentCommunication';
import ChildAssessment from './ChildAssessment';
import IntegrationPanel from './IntegrationPanel';
import ParentContactInfo from './ParentContactInfo';
import ParentBankingInfo from './ParentBankingInfo';
import { ChildProfile } from './types';
import * as dataService from './dataService';
import { useState, useEffect } from 'react';

// Custom styled tab trigger component
const StyledTabsTrigger = ({ value, children }: { value: string, children: React.ReactNode }) => (
  <TabsTrigger 
    value={value}
    className="
      relative overflow-hidden transition-all duration-300
      data-[state=active]:bg-gradient-to-r 
      data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 
      data-[state=active]:text-white data-[state=active]:shadow-md
      data-[state=active]:border-none
      hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100
      dark:hover:from-blue-900/30 dark:hover:to-purple-900/30
      hover:text-primary
      after:content-[''] after:absolute after:bottom-0 after:left-0 
      after:w-full after:h-0.5 after:bg-gradient-to-r 
      after:from-blue-500 after:to-purple-500 after:scale-x-0
      after:transition-transform after:duration-300
      hover:after:scale-x-100
      data-[state=active]:after:scale-x-0
    "
  >
    {children}
  </TabsTrigger>
);

// Custom styled button component
const StyledButton = ({ onClick, children, variant = "default" }: { 
  onClick: () => void, 
  children: React.ReactNode,
  variant?: "default" | "outline" | "destructive" 
}) => (
  <Button
    onClick={onClick}
    variant={variant}
    className={`
      transition-all duration-300 transform
      ${variant === "default" ? 
        "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 hover:shadow-lg" : 
        variant === "destructive" ?
        "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white hover:scale-105 hover:shadow-lg" :
        "border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
      }
    `}
  >
    {children}
  </Button>
);

export default function ParentChildPortal() {
  const [activeTab, setActiveTab] = useState("profiles");
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const { 
    childProfiles, 
    selectedChildId, 
    setSelectedChildId, 
    saveChildProfile,
    deleteChildProfile,
    refreshData,
    isLoading,
    parentContacts
  } = usePortal();

  // Initialize sample data if needed
  useEffect(() => {
    if (childProfiles.length === 0 && !isLoading) {
      dataService.initializeSampleData();
      refreshData();
    }
    
    // Set a default parent ID for demo purposes
    if (parentContacts.length > 0 && !selectedParentId) {
      setSelectedParentId(parentContacts[0].parentId || 'parent-1');
    } else if (parentContacts.length === 0 && !selectedParentId) {
      setSelectedParentId('parent-1');
    }
  }, [childProfiles.length, isLoading, refreshData, parentContacts, selectedParentId]);

  // Create empty profile template
  const createEmptyProfile = (): ChildProfile => ({
    id: '',
    basicInfo: {
      fullName: '',
      preferredName: '',
      dateOfBirth: '',
      gender: '',
      homeAddress: '',
      primaryLanguage: 'English',
      secondaryLanguages: []
    },
    medicalInfo: {
      primaryPhysician: {
        name: '',
        phone: '',
        address: ''
      },
      allergies: {
        food: [],
        medication: [],
        environmental: []
      },
      medicalConditions: [],
      immunizationStatus: 'incomplete',
      dietaryRequirements: []
    },
    contacts: [],
    developmentalInfo: {
      behavioralNotes: '',
      learningPreferences: [],
      interests: []
    },
    createdAt: '',
    updatedAt: ''
  });

  // Handle saving a child profile
  const handleSaveProfile = (profile: ChildProfile) => {
    saveChildProfile(profile);
    setShowNewProfileForm(false);
    
    // Select the newly created/updated profile
    if (profile.id) {
      setSelectedChildId(profile.id);
    }
  };

  // Handle deleting a child profile
  const handleDeleteProfile = (profileId: string) => {
    if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      deleteChildProfile(profileId);
    }
  };

  // Get the selected child profile
  const selectedProfile = selectedChildId 
    ? childProfiles.find(profile => profile.id === selectedChildId)
    : undefined;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Tennessee Childcare Management System</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            A comprehensive system for managing child profiles, parent communication, and assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-0 h-auto flex">
              <StyledTabsTrigger value="profiles">
                <span className="flex items-center py-3 px-4">
                  <span className="mr-2 text-lg">👶</span>
                  Child Profiles
                </span>
              </StyledTabsTrigger>
              <StyledTabsTrigger value="contacts">
                <span className="flex items-center py-3 px-4">
                  <span className="mr-2 text-lg">👪</span>
                  Parent Contacts
                </span>
              </StyledTabsTrigger>
              <StyledTabsTrigger value="banking">
                <span className="flex items-center py-3 px-4">
                  <span className="mr-2 text-lg">💳</span>
                  Banking & Payments
                </span>
              </StyledTabsTrigger>
              <StyledTabsTrigger value="communication">
                <span className="flex items-center py-3 px-4">
                  <span className="mr-2 text-lg">💬</span>
                  Communication
                </span>
              </StyledTabsTrigger>
              <StyledTabsTrigger value="assessment">
                <span className="flex items-center py-3 px-4">
                  <span className="mr-2 text-lg">📊</span>
                  Assessment
                </span>
              </StyledTabsTrigger>
              <StyledTabsTrigger value="integration">
                <span className="flex items-center py-3 px-4">
                  <span className="mr-2 text-lg">🔄</span>
                  Integration
                </span>
              </StyledTabsTrigger>
            </TabsList>
            
            {/* Child Profiles Tab */}
            <TabsContent value="profiles" className="p-6 animate-in fade-in-50 slide-in-from-bottom-5">
              <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-blue-700 dark:text-blue-300">Child Profiles</CardTitle>
                    <StyledButton onClick={() => {
                      setShowNewProfileForm(true);
                      setSelectedChildId(null);
                    }}>
                      Add New Child
                    </StyledButton>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="text-center p-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                      <p>Loading profiles...</p>
                    </div>
                  ) : showNewProfileForm ? (
                    <ChildProfileForm 
                      profile={createEmptyProfile()} 
                      onSave={handleSaveProfile} 
                    />
                  ) : selectedProfile ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">{selectedProfile.basicInfo.fullName}</h3>
                        <div className="space-x-2">
                          <StyledButton 
                            variant="outline" 
                            onClick={() => setSelectedChildId(null)}
                          >
                            Back to List
                          </StyledButton>
                          <StyledButton 
                            variant="destructive" 
                            onClick={() => handleDeleteProfile(selectedProfile.id)}
                          >
                            Delete Profile
                          </StyledButton>
                        </div>
                      </div>
                      <ChildProfileForm 
                        profile={selectedProfile} 
                        onSave={handleSaveProfile} 
                      />
                    </div>
                  ) : childProfiles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {childProfiles.map(profile => (
                        <Card 
                          key={profile.id} 
                          className="cursor-pointer overflow-hidden border-2 border-blue-100 dark:border-blue-900 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                          onClick={() => setSelectedChildId(profile.id)}
                        >
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">{profile.basicInfo.fullName}</h3>
                            <p className="text-sm text-gray-500">
                              {profile.basicInfo.preferredName && `"${profile.basicInfo.preferredName}" • `}
                              {new Date().getFullYear() - new Date(profile.basicInfo.dateOfBirth).getFullYear()} years old
                            </p>
                            <div className="mt-2 text-sm">
                              <p><strong>Primary Contact:</strong> {
                                profile.contacts.find(c => c.primaryContact)?.fullName || 'None'
                              }</p>
                              <p><strong>Medical:</strong> {
                                profile.medicalInfo.allergies.food.length > 0 
                                  ? `Allergies: ${profile.medicalInfo.allergies.food.join(', ')}` 
                                  : 'No food allergies'
                              }</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg">
                      <p className="mb-4 text-blue-700 dark:text-blue-300">No child profiles found. Add a new profile to get started.</p>
                      <StyledButton onClick={() => setShowNewProfileForm(true)}>
                        Add First Child
                      </StyledButton>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Parent Contacts Tab */}
            <TabsContent value="contacts" className="p-6 animate-in fade-in-50 slide-in-from-bottom-5">
              {selectedParentId && <ParentContactInfo parentId={selectedParentId} />}
            </TabsContent>
            
            {/* Banking & Payments Tab */}
            <TabsContent value="banking" className="p-6 animate-in fade-in-50 slide-in-from-bottom-5">
              {selectedParentId && <ParentBankingInfo parentId={selectedParentId} />}
            </TabsContent>
            
            {/* Parent Communication Tab */}
            <TabsContent value="communication" className="p-6 animate-in fade-in-50 slide-in-from-bottom-5">
              <ParentCommunication />
            </TabsContent>
            
            {/* Child Assessment Tab */}
            <TabsContent value="assessment" className="p-6 animate-in fade-in-50 slide-in-from-bottom-5">
              <ChildAssessment />
            </TabsContent>
            
            {/* Integration Tab */}
            <TabsContent value="integration" className="p-6 animate-in fade-in-50 slide-in-from-bottom-5">
              <IntegrationPanel />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
