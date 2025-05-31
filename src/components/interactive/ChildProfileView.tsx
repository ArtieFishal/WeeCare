import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdmissions } from './AdmissionsContext';
import { ChildProfile, ParentContact } from '@/types/admissions';
import { 
  User, Calendar, AlertCircle, CheckCircle, Edit, 
  Trash2, UserPlus, Phone, Mail, Home, Briefcase, 
  CreditCard, Heart, Clock, UserRound
} from 'lucide-react';

export interface ChildProfileViewProps {
  childId: string;
  onEdit?: (childId: string) => void;
}

const ChildProfileView: React.FC<ChildProfileViewProps> = ({ 
  childId,
  onEdit
}) => {
  const { getChildById, getParentsByChildId, addParentContact, linkParentToChild } = useAdmissions();
  
  const child = getChildById(childId);
  const parents = getParentsByChildId(childId);
  
  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <AlertCircle className="h-16 w-16 text-red-500" />
        <h3 className="text-xl font-medium text-red-700">Child Not Found</h3>
        <p className="text-center text-gray-500">
          The child profile you're looking for could not be found.
        </p>
      </div>
    );
  }
  
  const calculateAge = (dateOfBirth: string): string => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    
    const remainingMonths = (months < 0) ? months + 12 : months;
    
    return `${years} years, ${remainingMonths} months`;
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const getScheduleDays = (): string => {
    if (!child.attendanceSchedule) return 'Not set';
    
    const days = [];
    if (child.attendanceSchedule.monday) days.push('Monday');
    if (child.attendanceSchedule.tuesday) days.push('Tuesday');
    if (child.attendanceSchedule.wednesday) days.push('Wednesday');
    if (child.attendanceSchedule.thursday) days.push('Thursday');
    if (child.attendanceSchedule.friday) days.push('Friday');
    
    return days.length > 0 ? days.join(', ') : 'None';
  };
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit(childId);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            {child.firstName} {child.lastName}
          </h2>
          <p className="text-gray-400">
            {calculateAge(child.dateOfBirth)} old • Enrolled on {formatDate(child.enrollmentDate)}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleEdit}
            className="border-blue-800 text-white hover:bg-blue-900/50 transition-all duration-200"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-blue-900/50 hover:border-blue-800 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <CardTitle className="text-lg font-medium bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Age Group</span>
              <Badge className="capitalize bg-blue-900/50 text-blue-300 border border-blue-800">
                {child.ageGroup}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Date of Birth</span>
              <span className="text-white">{formatDate(child.dateOfBirth)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Enrollment Status</span>
              <Badge className={`capitalize ${
                child.enrollmentStatus === 'active' 
                  ? 'bg-green-900/50 text-green-300 border border-green-800' 
                  : child.enrollmentStatus === 'waitlist'
                  ? 'bg-amber-900/50 text-amber-300 border border-amber-800'
                  : 'bg-gray-900/50 text-gray-300 border border-gray-800'
              }`}>
                {child.enrollmentStatus}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Enrollment Date</span>
              <span className="text-white">{formatDate(child.enrollmentDate)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-purple-900/50 hover:border-purple-800 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <CardTitle className="text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="text-gray-400 font-medium mb-2">Allergies</h3>
              {child.medicalInformation?.allergies && child.medicalInformation.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {child.medicalInformation.allergies.map((allergy, index) => (
                    <Badge key={index} className="bg-red-900/50 text-red-300 border border-red-800">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No known allergies</span>
              )}
            </div>
            
            <div>
              <h3 className="text-gray-400 font-medium mb-2">Dietary Restrictions</h3>
              {child.medicalInformation?.dietaryRestrictions && child.medicalInformation.dietaryRestrictions.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {child.medicalInformation.dietaryRestrictions.map((restriction, index) => (
                    <Badge key={index} className="bg-amber-900/50 text-amber-300 border border-amber-800">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No dietary restrictions</span>
              )}
            </div>
            
            <div>
              <h3 className="text-gray-400 font-medium mb-2">Medications</h3>
              {child.medicalInformation?.medications && child.medicalInformation.medications.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {child.medicalInformation.medications.map((medication, index) => (
                    <Badge key={index} className="bg-blue-900/50 text-blue-300 border border-blue-800">
                      {medication}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No medications</span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-green-900/50 hover:border-green-800 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <CardTitle className="text-lg font-medium bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Attendance Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Schedule Type</span>
              <Badge className={`${
                child.attendanceSchedule?.partTime
                  ? 'bg-amber-900/50 text-amber-300 border border-amber-800'
                  : 'bg-green-900/50 text-green-300 border border-green-800'
              }`}>
                {child.attendanceSchedule?.partTime ? 'Part-Time' : 'Full-Time'}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-gray-400 font-medium mb-2">Attendance Days</h3>
              <div className="flex space-x-1">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => {
                  const isAttending = child.attendanceSchedule?.[day as keyof typeof child.attendanceSchedule];
                  return (
                    <Badge 
                      key={day}
                      variant={isAttending ? "default" : "outline"}
                      className={isAttending 
                        ? "bg-green-900/50 text-green-300 border border-green-800 w-8 h-8 flex items-center justify-center p-0 rounded-full" 
                        : "text-gray-400 border-gray-700 w-8 h-8 flex items-center justify-center p-0 rounded-full"
                      }
                    >
                      {day.charAt(0).toUpperCase()}
                    </Badge>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Schedule Days</span>
              <span className="text-white">{getScheduleDays()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-amber-900/50 hover:border-amber-800 transition-all duration-300">
        <CardHeader className="border-b border-gray-800 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Parents & Guardians</CardTitle>
            <Button 
              variant="outline" 
              className="border-amber-800 text-white hover:bg-amber-900/50 transition-all duration-200"
              onClick={() => {
                // This would open the add parent form in a real implementation
                console.log('Add parent to child:', childId);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Parent
            </Button>
          </div>
          <CardDescription className="text-gray-400">
            Parents, guardians, and emergency contacts associated with this child
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {parents.length > 0 ? (
            <Table>
              <TableHeader className="bg-[#131b2e]">
                <TableRow className="border-b border-gray-800">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Relationship</TableHead>
                  <TableHead className="text-gray-400">Contact Information</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parents.map(parent => {
                  const relationship = child.guardians?.find(g => g.id === parent.parentId)?.relationship || 'Unknown';
                  
                  return (
                    <TableRow key={parent.id} className="hover:bg-[#1a2234] border-b border-gray-800">
                      <TableCell className="font-medium text-white">
                        {parent.fullName}
                      </TableCell>
                      <TableCell>
                        <Badge className="capitalize bg-blue-900/50 text-blue-300 border border-blue-800">
                          {relationship}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-2 text-amber-500" />
                            {parent.phone || (parent.phoneNumbers?.mobile || 'No phone number')}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-2 text-amber-500" />
                            {parent.email}
                          </div>
                          {(parent.address || parent.homeAddress) && (
                            <div className="flex items-center text-sm">
                              <Home className="h-3 w-3 mr-2 text-amber-500" />
                              {parent.address || parent.homeAddress}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {parent.primaryContact && (
                            <Badge className="bg-green-900/50 text-green-300 border border-green-800">
                              Primary Contact
                            </Badge>
                          )}
                          {parent.emergencyContact && (
                            <Badge className="bg-red-900/50 text-red-300 border border-red-800">
                              Emergency Contact
                            </Badge>
                          )}
                          {(parent.authorizedPickup || parent.authorizedForPickup) && (
                            <Badge className="bg-blue-900/50 text-blue-300 border border-blue-800">
                              Authorized Pickup
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <UserRound className="h-12 w-12 text-amber-500/50" />
              <h3 className="text-lg font-medium text-amber-400">No Parents Linked</h3>
              <p className="text-center text-gray-400 max-w-md">
                This child doesn't have any parents or guardians linked to their profile yet.
              </p>
              <Button 
                variant="outline" 
                className="border-amber-800 text-white hover:bg-amber-900/50 transition-all duration-200"
                onClick={() => {
                  // This would open the add parent form in a real implementation
                  console.log('Add parent to child:', childId);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Parent
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildProfileView;
