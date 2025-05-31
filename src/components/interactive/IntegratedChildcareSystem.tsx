import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmissions } from './AdmissionsContext';
import AddChildForm from './AddChildForm';
import AddParentForm from './AddParentForm';
import { ChildProfile, ParentContact } from '@/types/admissions';
import MealPlanningToolIntegration from './MealPlanningToolIntegration';
import ParentChildPortalIntegration from './ParentChildPortalIntegration';

const IntegratedChildcareSystem: React.FC = () => {
  const { childProfiles, parentContacts, addParentContact, addChildProfile } = useAdmissions();
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  
  const handleAddParentSuccess = (parentId: string) => {
    setShowSuccessMessage(`Parent added successfully with ID: ${parentId}`);
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };
  
  const handleAddChildSuccess = (childId: string) => {
    setShowSuccessMessage(`Child added successfully with ID: ${childId}`);
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };
  
  return (
    <div className="space-y-8">
      <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
          <CardTitle className="text-blue-700 dark:text-blue-300">Integrated Childcare Management System</CardTitle>
          <CardDescription>
            All your childcare management needs in one place - seamlessly connected
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {showSuccessMessage && (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-3 rounded-md mb-4">
              {showSuccessMessage}
            </div>
          )}
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="meal-planning">Meal Planning</TabsTrigger>
              <TabsTrigger value="parent-portal">Parent Portal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">Child Enrollment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-950/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Total Children</p>
                        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{childProfiles.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-950/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Active</p>
                        <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                          {childProfiles.filter(child => child.enrollmentStatus === 'active').length}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-4">Parents</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-purple-50 dark:bg-purple-950/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Total Parents</p>
                        <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{parentContacts.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50 dark:bg-amber-950/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Primary Contacts</p>
                        <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                          {parentContacts.filter(parent => parent.primaryContact).length}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">Add New Child</h3>
                  <AddChildForm 
                    onSuccess={handleAddChildSuccess}
                    onCancel={() => console.log('Child form canceled')}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-4">Add New Parent</h3>
                  <AddParentForm 
                    onSuccess={handleAddParentSuccess}
                    onCancel={() => console.log('Parent form canceled')}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="meal-planning">
              <MealPlanningToolIntegration 
                selectedDate={new Date().toISOString().split('T')[0]} 
                selectedMealType="lunch" 
              />
            </TabsContent>
            
            <TabsContent value="parent-portal">
              <ParentChildPortalIntegration 
                parentId={parentContacts.length > 0 ? parentContacts[0].parentId : undefined}
                childId={childProfiles.length > 0 ? childProfiles[0].id : undefined}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedChildcareSystem;
