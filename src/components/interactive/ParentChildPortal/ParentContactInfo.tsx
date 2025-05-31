import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePortal } from './PortalContext';
import { ContactInfo } from './types';

export interface ParentContactInfoProps {
  parentId: string;
  childId?: string;
}

const ParentContactInfo: React.FC<ParentContactInfoProps> = ({ parentId, childId }) => {
  const { state, updateParentContactInfo } = usePortal();
  
  // Get contact info for this parent
  const parentContacts = state.parentContacts?.filter(contact => contact.parentId === parentId) || [];
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Default empty contact info
  const emptyContactInfo: any = {
    id: '',
    parentId: parentId,
    childId: childId || '',
    relationship: 'parent',
    fullName: '',
    email: '',
    phoneNumbers: {
      mobile: '',
      home: '',
      work: ''
    },
    homeAddress: '',
    employer: {
      name: '',
      address: '',
      phone: ''
    },
    emergencyContact: false,
    authorizedForPickup: true,
    primaryContact: parentContacts.length === 0,
    preferredContactMethod: 'email',
    communicationPreferences: {
      dailyReports: true,
      weeklyNewsletters: true,
      emergencyAlerts: true,
      billingNotifications: true,
      eventInvitations: true
    },
    notes: ''
  };
  
  const [formData, setFormData] = useState(emptyContactInfo);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handlePhoneChange = (type: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: {
        ...prev.phoneNumbers,
        [type]: value
      }
    }));
  };
  
  const handleEmployerChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      employer: {
        ...prev.employer,
        [field]: value
      }
    }));
  };
  
  const handlePreferenceChange = (pref: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      communicationPreferences: {
        ...prev.communicationPreferences,
        [pref]: checked
      }
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID if new
    const updatedInfo = {
      ...formData,
      id: formData.id || `contact-${Date.now()}`
    };
    
    // If this is set as primary, update other contacts
    if (updatedInfo.primaryContact) {
      parentContacts.forEach(contact => {
        if (contact.id !== updatedInfo.id && contact.primaryContact) {
          updateParentContactInfo({
            ...contact,
            primaryContact: false
          });
        }
      });
    }
    
    updateParentContactInfo(updatedInfo);
    setEditingId(null);
    setShowAddForm(false);
    setFormData(emptyContactInfo);
  };
  
  const handleEdit = (contact: any) => {
    setFormData(contact);
    setEditingId(contact.id);
    setShowAddForm(false);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      // Remove from state
      // This would need to be implemented in the context
    }
  };
  
  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData(emptyContactInfo);
  };
  
  const renderContactForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-blue-700 dark:text-blue-300">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-blue-700 dark:text-blue-300">Relationship</Label>
              <Select 
                value={formData.relationship} 
                onValueChange={(value) => handleSelectChange('relationship', value)}
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Legal Guardian</SelectItem>
                  <SelectItem value="grandparent">Grandparent</SelectItem>
                  <SelectItem value="relative">Other Relative</SelectItem>
                  <SelectItem value="emergency">Emergency Contact</SelectItem>
                  <SelectItem value="authorized">Authorized Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700 dark:text-blue-300">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferredContactMethod" className="text-blue-700 dark:text-blue-300">Preferred Contact Method</Label>
              <Select 
                value={formData.preferredContactMethod} 
                onValueChange={(value) => handleSelectChange('preferredContactMethod', value)}
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select preferred method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="mobile">Mobile Phone</SelectItem>
                  <SelectItem value="home">Home Phone</SelectItem>
                  <SelectItem value="work">Work Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900">
          <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Phone Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-purple-700 dark:text-purple-300">Mobile Phone</Label>
              <Input
                id="mobile"
                value={formData.phoneNumbers.mobile}
                onChange={(e) => handlePhoneChange('mobile', e.target.value)}
                placeholder="Mobile Phone"
                className="border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="home" className="text-purple-700 dark:text-purple-300">Home Phone</Label>
              <Input
                id="home"
                value={formData.phoneNumbers.home}
                onChange={(e) => handlePhoneChange('home', e.target.value)}
                placeholder="Home Phone"
                className="border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="work" className="text-purple-700 dark:text-purple-300">Work Phone</Label>
              <Input
                id="work"
                value={formData.phoneNumbers.work}
                onChange={(e) => handlePhoneChange('work', e.target.value)}
                placeholder="Work Phone"
                className="border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50 p-4 rounded-lg border border-green-100 dark:border-green-900">
          <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Address & Employment</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="homeAddress" className="text-green-700 dark:text-green-300">Home Address</Label>
              <Input
                id="homeAddress"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleInputChange}
                placeholder="Home Address"
                className="border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employer.name" className="text-green-700 dark:text-green-300">Employer Name</Label>
              <Input
                id="employer.name"
                value={formData.employer.name}
                onChange={(e) => handleEmployerChange('name', e.target.value)}
                placeholder="Employer Name"
                className="border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employer.address" className="text-green-700 dark:text-green-300">Employer Address</Label>
              <Input
                id="employer.address"
                value={formData.employer.address}
                onChange={(e) => handleEmployerChange('address', e.target.value)}
                placeholder="Employer Address"
                className="border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employer.phone" className="text-green-700 dark:text-green-300">Employer Phone</Label>
              <Input
                id="employer.phone"
                value={formData.employer.phone}
                onChange={(e) => handleEmployerChange('phone', e.target.value)}
                placeholder="Employer Phone"
                className="border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50 p-4 rounded-lg border border-amber-100 dark:border-amber-900">
          <h3 className="text-lg font-semibold mb-2 text-amber-700 dark:text-amber-300">Contact Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="primaryContact"
                checked={formData.primaryContact}
                onCheckedChange={(checked) => handleSwitchChange('primaryContact', checked)}
                className="data-[state=checked]:bg-amber-500"
              />
              <Label htmlFor="primaryContact" className="text-amber-700 dark:text-amber-300">Primary Contact</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="emergencyContact"
                checked={formData.emergencyContact}
                onCheckedChange={(checked) => handleSwitchChange('emergencyContact', checked)}
                className="data-[state=checked]:bg-amber-500"
              />
              <Label htmlFor="emergencyContact" className="text-amber-700 dark:text-amber-300">Emergency Contact</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="authorizedForPickup"
                checked={formData.authorizedForPickup}
                onCheckedChange={(checked) => handleSwitchChange('authorizedForPickup', checked)}
                className="data-[state=checked]:bg-amber-500"
              />
              <Label htmlFor="authorizedForPickup" className="text-amber-700 dark:text-amber-300">Authorized for Pickup</Label>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 p-4 rounded-lg border border-red-100 dark:border-red-900">
          <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">Communication Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="dailyReports"
                checked={formData.communicationPreferences.dailyReports}
                onCheckedChange={(checked) => handlePreferenceChange('dailyReports', checked)}
                className="data-[state=checked]:bg-red-500"
              />
              <Label htmlFor="dailyReports" className="text-red-700 dark:text-red-300">Daily Reports</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="weeklyNewsletters"
                checked={formData.communicationPreferences.weeklyNewsletters}
                onCheckedChange={(checked) => handlePreferenceChange('weeklyNewsletters', checked)}
                className="data-[state=checked]:bg-red-500"
              />
              <Label htmlFor="weeklyNewsletters" className="text-red-700 dark:text-red-300">Weekly Newsletters</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="emergencyAlerts"
                checked={formData.communicationPreferences.emergencyAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('emergencyAlerts', checked)}
                className="data-[state=checked]:bg-red-500"
              />
              <Label htmlFor="emergencyAlerts" className="text-red-700 dark:text-red-300">Emergency Alerts</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="billingNotifications"
                checked={formData.communicationPreferences.billingNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('billingNotifications', checked)}
                className="data-[state=checked]:bg-red-500"
              />
              <Label htmlFor="billingNotifications" className="text-red-700 dark:text-red-300">Billing Notifications</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="eventInvitations"
                checked={formData.communicationPreferences.eventInvitations}
                onCheckedChange={(checked) => handlePreferenceChange('eventInvitations', checked)}
                className="data-[state=checked]:bg-red-500"
              />
              <Label htmlFor="eventInvitations" className="text-red-700 dark:text-red-300">Event Invitations</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any additional information about this contact"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            {editingId ? 'Update Contact' : 'Add Contact'}
          </Button>
        </div>
      </form>
    );
  };
  
  const renderContactCard = (contact: any) => {
    return (
      <Card key={contact.id} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${contact.primaryContact ? 'border-primary' : ''}`}>
        <div className={`h-2 ${contact.primaryContact ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{contact.fullName}</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {contact.relationship}
                {contact.primaryContact && ' • Primary Contact'}
              </p>
              
              <div className="mt-2 space-y-1">
                {contact.email && (
                  <p className="text-sm flex items-center">
                    <span className="mr-2">📧</span> {contact.email}
                  </p>
                )}
                {contact.phoneNumbers.mobile && (
                  <p className="text-sm flex items-center">
                    <span className="mr-2">📱</span> {contact.phoneNumbers.mobile}
                  </p>
                )}
                {contact.phoneNumbers.home && (
                  <p className="text-sm flex items-center">
                    <span className="mr-2">☎️</span> {contact.phoneNumbers.home}
                  </p>
                )}
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {contact.emergencyContact && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                    Emergency
                  </div>
                )}
                {contact.authorizedForPickup && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Pickup
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit(contact)}
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(contact.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parent & Emergency Contacts</CardTitle>
        <CardDescription>
          Manage contact information for parents, guardians, and emergency contacts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!editingId && !showAddForm && (
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              Add New Contact
            </Button>
          </div>
        )}
        
        {(editingId || showAddForm) ? (
          renderContactForm()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parentContacts.length > 0 ? (
              parentContacts.map(contact => renderContactCard(contact))
            ) : (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                <p className="mb-4">No contacts added yet.</p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Add Your First Contact
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParentContactInfo;
