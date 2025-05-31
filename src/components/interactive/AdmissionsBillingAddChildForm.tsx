import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmissions } from './AdmissionsContext';
import { ChildProfile, ParentContact } from '@/types/admissions';
import { UserRound, Calendar, CheckCircle } from 'lucide-react';

export interface AdmissionsBillingAddChildFormProps {
  onSuccess?: (childId: string) => void;
  onCancel?: () => void;
}

const AdmissionsBillingAddChildForm = ({ onSuccess, onCancel }: AdmissionsBillingAddChildFormProps) => {
  const { addChildProfile, parentContacts, linkParentToChild } = useAdmissions();
  
  const [formData, setFormData] = useState<Partial<ChildProfile>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    enrollmentDate: new Date().toISOString().split('T')[0],
    enrollmentStatus: 'active',
    ageGroup: 'preschool',
    attendanceSchedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      partTime: false
    },
    medicalInformation: {
      allergies: [],
      dietaryRestrictions: [],
      medications: [],
      medicalConditions: [],
      specialNeeds: ''
    },
    parentIds: []
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedParentIds, setSelectedParentIds] = useState<string[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, unknown> || {}),
          [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };
  
  const handleSelectChange = (value: string, name: string) => {
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, unknown> || {}),
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, unknown> || {}),
          [field]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };
  
  const handleParentSelection = (parentId: string) => {
    setSelectedParentIds(prev => {
      if (prev.includes(parentId)) {
        return prev.filter(id => id !== parentId);
      } else {
        return [...prev, parentId];
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add child profile
      const childId = addChildProfile(formData as ChildProfile);
      
      // Link selected parents to child
      selectedParentIds.forEach(parentId => {
        const parent = parentContacts.find(p => p.id === parentId);
        if (parent) {
          linkParentToChild(childId, parentId, parent.relationship);
        }
      });
      
      if (onSuccess) {
        onSuccess(childId);
      }
    } catch (error) {
      console.error('Error adding child:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  return (
    <div className="space-y-4 text-white">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600' : 'bg-gray-700'}`}>
            <UserRound className="h-4 w-4" />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}>
            <Calendar className="h-4 w-4" />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600' : 'bg-gray-700'}`}>
            <CheckCircle className="h-4 w-4" />
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Step {step} of 3
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <Card className="border-0 bg-[#1a2234] text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-400">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange(value, 'gender')}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2234] border-gray-700 text-white">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Age Group</Label>
                  <Select
                    value={formData.ageGroup}
                    onValueChange={(value) => handleSelectChange(value, 'ageGroup')}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2234] border-gray-700 text-white">
                      <SelectItem value="infant">Infant (0-12 months)</SelectItem>
                      <SelectItem value="toddler">Toddler (1-2 years)</SelectItem>
                      <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                      <SelectItem value="schoolage">School Age (6+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentStatus">Enrollment Status</Label>
                  <Select
                    value={formData.enrollmentStatus}
                    onValueChange={(value) => handleSelectChange(value, 'enrollmentStatus')}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2234] border-gray-700 text-white">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="waitlist">Waitlist</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input
                  id="enrollmentDate"
                  name="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  required
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 2 && (
          <Card className="border-0 bg-[#1a2234] text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-400">Schedule & Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Attendance Schedule</Label>
                <div className="grid grid-cols-5 gap-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                    <div key={day} className="flex flex-col items-center">
                      <Label htmlFor={`attendanceSchedule.${day}`} className="capitalize mb-1">{day}</Label>
                      <input
                        type="checkbox"
                        id={`attendanceSchedule.${day}`}
                        name={`attendanceSchedule.${day}`}
                        checked={formData.attendanceSchedule?.[day as keyof typeof formData.attendanceSchedule] as boolean}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 rounded border-gray-700 bg-[#0f172a]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="attendanceSchedule.partTime"
                    name="attendanceSchedule.partTime"
                    checked={formData.attendanceSchedule?.partTime}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="attendanceSchedule.partTime">Part-Time Enrollment</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medicalInformation.allergies">Allergies (comma separated)</Label>
                <Input
                  id="medicalInformation.allergies"
                  name="medicalInformation.allergies"
                  value={formData.medicalInformation?.allergies?.join(', ') || ''}
                  onChange={(e) => {
                    const allergies = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                    setFormData(prev => ({
                      ...prev,
                      medicalInformation: {
                        ...(prev.medicalInformation || {}),
                        allergies
                      }
                    }));
                  }}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medicalInformation.dietaryRestrictions">Dietary Restrictions (comma separated)</Label>
                <Input
                  id="medicalInformation.dietaryRestrictions"
                  name="medicalInformation.dietaryRestrictions"
                  value={formData.medicalInformation?.dietaryRestrictions?.join(', ') || ''}
                  onChange={(e) => {
                    const restrictions = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                    setFormData(prev => ({
                      ...prev,
                      medicalInformation: {
                        ...(prev.medicalInformation || {}),
                        dietaryRestrictions: restrictions
                      }
                    }));
                  }}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medicalInformation.specialNeeds">Special Needs or Considerations</Label>
                <Input
                  id="medicalInformation.specialNeeds"
                  name="medicalInformation.specialNeeds"
                  value={formData.medicalInformation?.specialNeeds || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      medicalInformation: {
                        ...(prev.medicalInformation || {}),
                        specialNeeds: e.target.value
                      }
                    }));
                  }}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 3 && (
          <Card className="border-0 bg-[#1a2234] text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-400">Link Parents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parentContacts.length > 0 ? (
                <div className="space-y-2">
                  <Label>Select Parents/Guardians</Label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {parentContacts.map(parent => (
                      <div 
                        key={parent.id} 
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          selectedParentIds.includes(parent.id) 
                            ? 'bg-blue-900 border border-blue-700' 
                            : 'bg-[#0f172a] border border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => handleParentSelection(parent.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{parent.fullName}</div>
                            <div className="text-sm text-gray-400">{parent.relationship} • {parent.phone}</div>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedParentIds.includes(parent.id) ? 'bg-blue-500' : 'bg-gray-700'
                          }`}>
                            {selectedParentIds.includes(parent.id) && (
                              <CheckCircle className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">No parents found. Add parents first.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Previous
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Child'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdmissionsBillingAddChildForm;
