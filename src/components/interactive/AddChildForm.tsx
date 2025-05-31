import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAdmissions } from './AdmissionsContext';
import { ChildProfile, ParentContact } from '@/types/admissions';
import { v4 as uuidv4 } from 'uuid';

const AddChildForm: React.FC<{
  onSuccess?: (childId: string) => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({ onSuccess, onCancel, open, onOpenChange }) => {
  const { childProfiles, addChildProfile, parentContacts } = useAdmissions();
  
  const [formData, setFormData] = useState<Partial<ChildProfile>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    enrollmentDate: new Date().toISOString().split('T')[0],
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
      allergies: [],
      dietaryRestrictions: [],
      medications: []
    },
    parentIds: []
  });
  
  const [selectedParentIds, setSelectedParentIds] = useState<string[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAttendanceChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      attendanceSchedule: {
        ...prev.attendanceSchedule,
        [day]: checked
      }
    }));
  };
  
  const handlePartTimeChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      attendanceSchedule: {
        ...prev.attendanceSchedule,
        partTime: checked
      }
    }));
  };
  
  const handleParentSelection = (parentId: string, checked: boolean) => {
    if (checked) {
      setSelectedParentIds(prev => [...prev, parentId]);
    } else {
      setSelectedParentIds(prev => prev.filter(id => id !== parentId));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newChild: ChildProfile = {
      ...formData as ChildProfile,
      id: uuidv4(),
      parentIds: selectedParentIds
    };
    
    const childId = addChildProfile(newChild);
    
    if (onSuccess) {
      onSuccess(childId);
    }
    
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardTitle className="text-blue-700 dark:text-blue-300">Add New Child</CardTitle>
        <CardDescription>
          Enter the child's information to add them to the system
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input
                  id="enrollmentDate"
                  name="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="enrollmentStatus">Enrollment Status</Label>
                <Select
                  value={formData.enrollmentStatus}
                  onValueChange={(value) => handleSelectChange('enrollmentStatus', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="waitlist">Waitlist</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="ageGroup">Age Group</Label>
                <Select
                  value={formData.ageGroup}
                  onValueChange={(value) => handleSelectChange('ageGroup', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infant">Infant</SelectItem>
                    <SelectItem value="toddler">Toddler</SelectItem>
                    <SelectItem value="preschool">Preschool</SelectItem>
                    <SelectItem value="schoolage">School Age</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Attendance Schedule</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="partTime"
                checked={formData.attendanceSchedule?.partTime}
                onCheckedChange={handlePartTimeChange}
              />
              <Label htmlFor="partTime">Part-Time Enrollment</Label>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={formData.attendanceSchedule?.[day as keyof typeof formData.attendanceSchedule] as boolean}
                    onCheckedChange={(checked) => handleAttendanceChange(day, checked as boolean)}
                  />
                  <Label htmlFor={day} className="capitalize">{day}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Link Parents/Guardians</h3>
            
            {parentContacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parentContacts.map(parent => (
                  <div key={parent.id} className="flex items-center space-x-2 p-3 border rounded-md">
                    <Checkbox
                      id={`parent-${parent.id}`}
                      checked={selectedParentIds.includes(parent.parentId)}
                      onCheckedChange={(checked) => handleParentSelection(parent.parentId, checked as boolean)}
                    />
                    <div>
                      <Label htmlFor={`parent-${parent.id}`} className="font-medium">{parent.fullName}</Label>
                      <p className="text-sm text-gray-500">{parent.relationship} • {parent.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No parents/guardians available. Add parents first.</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={() => {
                onCancel();
                if (onOpenChange) onOpenChange(false);
              }}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Child
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddChildForm;
