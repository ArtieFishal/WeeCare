import React, { useState } from 'react';
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { ChildProfile, ContactInfo } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface ChildProfileFormProps {
  profile: ChildProfile;
  onSave: (profile: ChildProfile) => void;
}

export default function ChildProfileForm({ profile, onSave }: ChildProfileFormProps) {
  const [formData, setFormData] = useState<ChildProfile>(profile);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Handler for basic info changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      basicInfo: {
        ...formData.basicInfo,
        [name]: value
      }
    });
  };
  
  // Handler for medical info changes
  const handleMedicalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      // Fixed object spread issue by using type assertion and conditional logic
      if (parent === 'primaryPhysician') {
        setFormData({
          ...formData,
          medicalInfo: {
            ...formData.medicalInfo,
            primaryPhysician: {
              ...formData.medicalInfo.primaryPhysician,
              [child]: value
            }
          }
        });
      } else if (parent === 'insurance' && formData.medicalInfo.insurance) {
        setFormData({
          ...formData,
          medicalInfo: {
            ...formData.medicalInfo,
            insurance: {
              ...formData.medicalInfo.insurance,
              [child]: value
            }
          }
        });
      } else {
        // Handle other nested fields if needed
        setFormData({
          ...formData,
          medicalInfo: {
            ...formData.medicalInfo,
            [parent]: {
              ...(formData.medicalInfo[parent as keyof typeof formData.medicalInfo] as object || {}),
              [child]: value
            }
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        medicalInfo: {
          ...formData.medicalInfo,
          [name]: value
        }
      });
    }
  };
  
  // Handler for adding a contact
  const handleAddContact = () => {
    const newContact: ContactInfo = {
      relationship: 'parent',
      fullName: '',
      phoneNumbers: {},
      authorizedForPickup: false,
      emergencyContact: false,
      primaryContact: formData.contacts.length === 0 // First contact is primary by default
    };
    
    setFormData({
      ...formData,
      contacts: [...formData.contacts, newContact]
    });
  };
  
  // Handler for updating a contact
  const handleContactChange = (index: number, field: string, value: any) => {
    const updatedContacts = [...formData.contacts];
    
    // Handle nested fields
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      
      // Fixed object spread issue by handling specific fields
      if (parent === 'phoneNumbers') {
        updatedContacts[index] = {
          ...updatedContacts[index],
          phoneNumbers: {
            ...updatedContacts[index].phoneNumbers,
            [child]: value
          }
        };
      } else if (parent === 'employer' && updatedContacts[index].employer) {
        updatedContacts[index] = {
          ...updatedContacts[index],
          employer: {
            ...updatedContacts[index].employer,
            [child]: value
          }
        };
      } else if (parent === 'employer' && !updatedContacts[index].employer) {
        updatedContacts[index] = {
          ...updatedContacts[index],
          employer: {
            name: '',
            [child]: value
          }
        };
      }
    } else {
      updatedContacts[index] = {
        ...updatedContacts[index],
        [field]: value
      };
    }
    
    setFormData({
      ...formData,
      contacts: updatedContacts
    });
  };
  
  // Handler for removing a contact
  const handleRemoveContact = (index: number) => {
    const updatedContacts = formData.contacts.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      contacts: updatedContacts
    });
  };
  
  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="medical">Medical Information</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="developmental">Developmental Info</TabsTrigger>
        </TabsList>
        
        {/* Basic Information Tab */}
        <TabsContent value="basic">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.basicInfo.fullName}
                    onChange={handleBasicInfoChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredName">Preferred Name</Label>
                  <Input
                    id="preferredName"
                    name="preferredName"
                    value={formData.basicInfo.preferredName || ''}
                    onChange={handleBasicInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.basicInfo.dateOfBirth}
                    onChange={handleBasicInfoChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full p-2 border rounded-md"
                    value={formData.basicInfo.gender}
                    onChange={handleBasicInfoChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="homeAddress">Home Address *</Label>
                  <Textarea
                    id="homeAddress"
                    name="homeAddress"
                    value={formData.basicInfo.homeAddress}
                    onChange={handleBasicInfoChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primaryLanguage">Primary Language *</Label>
                  <Input
                    id="primaryLanguage"
                    name="primaryLanguage"
                    value={formData.basicInfo.primaryLanguage}
                    onChange={handleBasicInfoChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryLanguages">Secondary Languages</Label>
                  <Input
                    id="secondaryLanguages"
                    name="secondaryLanguages"
                    value={formData.basicInfo.secondaryLanguages?.join(', ') || ''}
                    onChange={(e) => {
                      const languages = e.target.value ? e.target.value.split(',').map(lang => lang.trim()) : [];
                      setFormData({
                        ...formData,
                        basicInfo: {
                          ...formData.basicInfo,
                          secondaryLanguages: languages
                        }
                      });
                    }}
                    placeholder="Separate multiple languages with commas"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={() => setActiveTab("medical")}>
                  Next: Medical Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Medical Information Tab */}
        <TabsContent value="medical">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="physician.name">Physician Name *</Label>
                  <Input
                    id="physician.name"
                    name="primaryPhysician.name"
                    value={formData.medicalInfo.primaryPhysician.name}
                    onChange={handleMedicalInfoChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="physician.phone">Physician Phone *</Label>
                  <Input
                    id="physician.phone"
                    name="primaryPhysician.phone"
                    value={formData.medicalInfo.primaryPhysician.phone}
                    onChange={handleMedicalInfoChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="physician.address">Physician Address</Label>
                  <Textarea
                    id="physician.address"
                    name="primaryPhysician.address"
                    value={formData.medicalInfo.primaryPhysician.address || ''}
                    onChange={handleMedicalInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Allergies</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="allergies.food">Food Allergies</Label>
                      <Textarea
                        id="allergies.food"
                        value={formData.medicalInfo.allergies.food.join('\n')}
                        onChange={(e) => {
                          const allergies = e.target.value ? e.target.value.split('\n').filter(a => a.trim()) : [];
                          setFormData({
                            ...formData,
                            medicalInfo: {
                              ...formData.medicalInfo,
                              allergies: {
                                ...formData.medicalInfo.allergies,
                                food: allergies
                              }
                            }
                          });
                        }}
                        placeholder="Enter each allergy on a new line"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="allergies.medication">Medication Allergies</Label>
                      <Textarea
                        id="allergies.medication"
                        value={formData.medicalInfo.allergies.medication.join('\n')}
                        onChange={(e) => {
                          const allergies = e.target.value ? e.target.value.split('\n').filter(a => a.trim()) : [];
                          setFormData({
                            ...formData,
                            medicalInfo: {
                              ...formData.medicalInfo,
                              allergies: {
                                ...formData.medicalInfo.allergies,
                                medication: allergies
                              }
                            }
                          });
                        }}
                        placeholder="Enter each allergy on a new line"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="allergies.environmental">Environmental Allergies</Label>
                      <Textarea
                        id="allergies.environmental"
                        value={formData.medicalInfo.allergies.environmental.join('\n')}
                        onChange={(e) => {
                          const allergies = e.target.value ? e.target.value.split('\n').filter(a => a.trim()) : [];
                          setFormData({
                            ...formData,
                            medicalInfo: {
                              ...formData.medicalInfo,
                              allergies: {
                                ...formData.medicalInfo.allergies,
                                environmental: allergies
                              }
                            }
                          });
                        }}
                        placeholder="Enter each allergy on a new line"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalInfo.medicalConditions.join('\n')}
                    onChange={(e) => {
                      const conditions = e.target.value ? e.target.value.split('\n').filter(c => c.trim()) : [];
                      setFormData({
                        ...formData,
                        medicalInfo: {
                          ...formData.medicalInfo,
                          medicalConditions: conditions
                        }
                      });
                    }}
                    placeholder="Enter each medical condition on a new line"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="immunizationStatus">Immunization Status *</Label>
                  <select
                    id="immunizationStatus"
                    name="immunizationStatus"
                    className="w-full p-2 border rounded-md"
                    value={formData.medicalInfo.immunizationStatus}
                    onChange={handleMedicalInfoChange}
                    required
                  >
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="exempt">Exempt</option>
                  </select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                  <Textarea
                    id="dietaryRequirements"
                    value={formData.medicalInfo.dietaryRequirements.join('\n')}
                    onChange={(e) => {
                      const requirements = e.target.value ? e.target.value.split('\n').filter(r => r.trim()) : [];
                      setFormData({
                        ...formData,
                        medicalInfo: {
                          ...formData.medicalInfo,
                          dietaryRequirements: requirements
                        }
                      });
                    }}
                    placeholder="Enter each dietary requirement on a new line"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                  Back: Basic Information
                </Button>
                <Button type="button" onClick={() => setActiveTab("contacts")}>
                  Next: Emergency Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Emergency Contacts Tab */}
        <TabsContent value="contacts">
          <Card>
            <CardContent className="pt-6">
              {formData.contacts.length === 0 ? (
                <div className="text-center p-4 bg-gray-50 rounded-md mb-4">
                  <p className="text-gray-500">No contacts added yet. Please add at least one emergency contact.</p>
                </div>
              ) : (
                formData.contacts.map((contact, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Contact #{index + 1}</h3>
                      <Button 
                        type="button" 
                        variant="destructive" 
                        onClick={() => handleRemoveContact(index)}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`contact-${index}-fullName`}>Full Name *</Label>
                        <Input
                          id={`contact-${index}-fullName`}
                          value={contact.fullName}
                          onChange={(e) => handleContactChange(index, 'fullName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`contact-${index}-relationship`}>Relationship *</Label>
                        <select
                          id={`contact-${index}-relationship`}
                          className="w-full p-2 border rounded-md"
                          value={contact.relationship}
                          onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                          required
                        >
                          <option value="parent">Parent</option>
                          <option value="guardian">Guardian</option>
                          <option value="emergency">Emergency Contact</option>
                          <option value="authorized">Authorized Pickup</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`contact-${index}-phone-mobile`}>Mobile Phone</Label>
                        <Input
                          id={`contact-${index}-phone-mobile`}
                          value={contact.phoneNumbers.mobile || ''}
                          onChange={(e) => handleContactChange(index, 'phoneNumbers.mobile', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`contact-${index}-phone-home`}>Home Phone</Label>
                        <Input
                          id={`contact-${index}-phone-home`}
                          value={contact.phoneNumbers.home || ''}
                          onChange={(e) => handleContactChange(index, 'phoneNumbers.home', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`contact-${index}-email`}>Email</Label>
                        <Input
                          id={`contact-${index}-email`}
                          type="email"
                          value={contact.email || ''}
                          onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`contact-${index}-address`}>Address</Label>
                        <Textarea
                          id={`contact-${index}-address`}
                          value={contact.homeAddress || ''}
                          onChange={(e) => handleContactChange(index, 'homeAddress', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 flex items-center">
                        <input
                          type="checkbox"
                          id={`contact-${index}-pickup`}
                          checked={contact.authorizedForPickup}
                          onChange={(e) => handleContactChange(index, 'authorizedForPickup', e.target.checked)}
                          className="mr-2"
                        />
                        <Label htmlFor={`contact-${index}-pickup`}>Authorized for Pickup</Label>
                      </div>
                      
                      <div className="space-y-2 flex items-center">
                        <input
                          type="checkbox"
                          id={`contact-${index}-emergency`}
                          checked={contact.emergencyContact}
                          onChange={(e) => handleContactChange(index, 'emergencyContact', e.target.checked)}
                          className="mr-2"
                        />
                        <Label htmlFor={`contact-${index}-emergency`}>Emergency Contact</Label>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddContact}
                className="mb-4"
              >
                Add Contact
              </Button>
              
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("medical")}>
                  Back: Medical Information
                </Button>
                <Button type="button" onClick={() => setActiveTab("developmental")}>
                  Next: Developmental Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Developmental Info Tab */}
        <TabsContent value="developmental">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="milestones">Developmental Milestones</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">
                      Developmental milestones will be tracked by staff based on Tennessee Early Learning Development Standards.
                    </p>
                    <p className="text-sm text-gray-500">
                      Assessment results will be shared with parents regularly and can be viewed in the Assessment tab.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="behavioralNotes">Behavioral Notes</Label>
                  <Textarea
                    id="behavioralNotes"
                    value={formData.developmentalInfo.behavioralNotes || ''}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        developmentalInfo: {
                          ...formData.developmentalInfo,
                          behavioralNotes: e.target.value
                        }
                      });
                    }}
                    placeholder="Any behavioral information that would help us better care for your child"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="learningPreferences">Learning Preferences</Label>
                  <Textarea
                    id="learningPreferences"
                    value={formData.developmentalInfo.learningPreferences?.join('\n') || ''}
                    onChange={(e) => {
                      const preferences = e.target.value ? e.target.value.split('\n').filter(p => p.trim()) : [];
                      setFormData({
                        ...formData,
                        developmentalInfo: {
                          ...formData.developmentalInfo,
                          learningPreferences: preferences
                        }
                      });
                    }}
                    placeholder="Enter each learning preference on a new line (e.g., Visual learner, Enjoys group activities)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Hobbies</Label>
                  <Textarea
                    id="interests"
                    value={formData.developmentalInfo.interests?.join('\n') || ''}
                    onChange={(e) => {
                      const interests = e.target.value ? e.target.value.split('\n').filter(i => i.trim()) : [];
                      setFormData({
                        ...formData,
                        developmentalInfo: {
                          ...formData.developmentalInfo,
                          interests: interests
                        }
                      });
                    }}
                    placeholder="Enter each interest on a new line (e.g., Music, Drawing, Outdoor play)"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("contacts")}>
                  Back: Emergency Contacts
                </Button>
                <Button type="submit">Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
