import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmissions } from './AdmissionsContext';
import { ParentContact } from '@/types/admissions';
import { UserRound, Mail, Phone, Briefcase, Home, CreditCard, Check } from 'lucide-react';

export interface AddParentFormProps {
  onSuccess: (parentId: string) => void;
  onCancel: () => void;
  childId?: string | null;
}

const AddParentForm = ({ onSuccess, onCancel, childId }: AddParentFormProps) => {
  const { addParentContact, linkParentToChild } = useAdmissions();
  
  const [formData, setFormData] = useState<Partial<ParentContact>>({
    fullName: '',
    relationship: 'parent',
    email: '',
    phone: '',
    phoneNumbers: {
      mobile: '',
      home: '',
      work: ''
    },
    address: '',
    employer: {
      name: '',
      address: '',
      phone: ''
    },
    primaryContact: true,
    emergencyContact: true,
    authorizedPickup: true,
    preferredContactMethod: 'email',
    communicationPreferences: {
      dailyReports: true,
      weeklyNewsletters: true,
      emergencyAlerts: true,
      billingNotifications: true,
      eventInvitations: true
    }
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add parent contact
      const parentId = addParentContact(formData as ParentContact);
      
      // If childId is provided, link parent to child
      if (childId) {
        linkParentToChild(childId, parentId, formData.relationship || 'parent');
      }
      
      onSuccess(parentId);
    } catch (error) {
      console.error('Error adding parent:', error);
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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-600' : 'bg-gray-700'}`}>
            <UserRound className="h-4 w-4" />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-600' : 'bg-gray-700'}`}>
            <Home className="h-4 w-4" />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-600' : 'bg-gray-700'}`}>
            <Briefcase className="h-4 w-4" />
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
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship to Child</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => handleSelectChange(value, 'relationship')}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2234] border-gray-700 text-white">
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="guardian">Legal Guardian</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="relative">Other Relative</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumbers.mobile">Mobile Phone</Label>
                <Input
                  id="phoneNumbers.mobile"
                  name="phoneNumbers.mobile"
                  value={formData.phoneNumbers?.mobile}
                  onChange={handleChange}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="primaryContact"
                    name="primaryContact"
                    checked={formData.primaryContact}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="primaryContact">Primary Contact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emergencyContact"
                    name="emergencyContact"
                    checked={formData.emergencyContact}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="authorizedPickup"
                    name="authorizedPickup"
                    checked={formData.authorizedPickup}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="authorizedPickup">Authorized for Pickup</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 2 && (
          <Card className="border-0 bg-[#1a2234] text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-400">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Communication Preferences</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="communicationPreferences.dailyReports"
                    name="communicationPreferences.dailyReports"
                    checked={formData.communicationPreferences?.dailyReports}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="communicationPreferences.dailyReports">Daily Reports</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="communicationPreferences.weeklyNewsletters"
                    name="communicationPreferences.weeklyNewsletters"
                    checked={formData.communicationPreferences?.weeklyNewsletters}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="communicationPreferences.weeklyNewsletters">Weekly Newsletters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="communicationPreferences.emergencyAlerts"
                    name="communicationPreferences.emergencyAlerts"
                    checked={formData.communicationPreferences?.emergencyAlerts}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="communicationPreferences.emergencyAlerts">Emergency Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="communicationPreferences.billingNotifications"
                    name="communicationPreferences.billingNotifications"
                    checked={formData.communicationPreferences?.billingNotifications}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="communicationPreferences.billingNotifications">Billing Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="communicationPreferences.eventInvitations"
                    name="communicationPreferences.eventInvitations"
                    checked={formData.communicationPreferences?.eventInvitations}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-700 bg-[#0f172a]"
                  />
                  <Label htmlFor="communicationPreferences.eventInvitations">Event Invitations</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 3 && (
          <Card className="border-0 bg-[#1a2234] text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-400">Employment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employer.name">Employer Name</Label>
                <Input
                  id="employer.name"
                  name="employer.name"
                  value={formData.employer?.name}
                  onChange={handleChange}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employer.phone">Employer Phone</Label>
                <Input
                  id="employer.phone"
                  name="employer.phone"
                  value={formData.employer?.phone}
                  onChange={handleChange}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employer.address">Employer Address</Label>
                <Input
                  id="employer.address"
                  name="employer.address"
                  value={formData.employer?.address}
                  onChange={handleChange}
                  className="bg-[#0f172a] border-gray-700 text-white"
                />
              </div>
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
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Parent'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddParentForm;
