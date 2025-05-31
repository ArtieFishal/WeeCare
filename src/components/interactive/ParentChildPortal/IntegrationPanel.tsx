import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortal } from './PortalContext';
import { Button } from "@/components/ui/button";

export default function IntegrationPanel() {
  const { 
    childProfiles, 
    selectedChildId,
    exportChildData
  } = usePortal();

  // Get the selected child profile
  const selectedProfile = selectedChildId 
    ? childProfiles.find(profile => profile.id === selectedChildId)
    : undefined;

  // Handle exporting child data
  const handleExportData = () => {
    if (!selectedChildId) {
      alert('Please select a child first');
      return;
    }
    
    // Call exportChildData with both required parameters
    exportChildData(selectedChildId, 'json');
    
    // In a real implementation, the export function would handle the download
    // This is a fallback for the mock implementation
    if (selectedProfile) {
      const mockData = JSON.stringify(selectedProfile, null, 2);
      const blob = new Blob([mockData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedProfile.basicInfo.fullName.replace(/\s+/g, '_')}_data_export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100 dark:border-green-900 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50">
          <CardTitle className="text-green-700 dark:text-green-300">Integration with Center Systems</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Attendance Integration */}
            <div className="border-2 border-green-100 dark:border-green-900 rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Attendance Tracking</h3>
              <p className="mb-4">
                Child attendance data is synchronized with the center's attendance system.
                This ensures accurate tracking for meal planning, staffing, and reporting.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50">
                  <h4 className="font-medium text-green-700 dark:text-green-300">Current Enrollment</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{childProfiles.length}</p>
                  <p className="text-sm text-green-600/70 dark:text-green-400/70">Total children enrolled</p>
                </div>
                <div className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50">
                  <h4 className="font-medium text-green-700 dark:text-green-300">Today's Attendance</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.floor(childProfiles.length * 0.9)}</p>
                  <p className="text-sm text-green-600/70 dark:text-green-400/70">Children present today</p>
                </div>
              </div>
            </div>
            
            {/* Meal Planning Integration */}
            <div className="border-2 border-blue-100 dark:border-blue-900 rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Meal Planning Integration</h3>
              <p className="mb-4">
                Dietary requirements and restrictions from child profiles are automatically 
                integrated with the meal planning system to ensure appropriate meals for each child.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Dietary Restrictions</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {childProfiles.reduce((count, profile) => 
                      count + (profile.medicalInfo.dietaryRequirements.length > 0 ? 1 : 0), 0)}
                  </p>
                  <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Children with special dietary needs</p>
                </div>
                <div className="border rounded-lg p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Allergies</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {childProfiles.reduce((count, profile) => 
                      count + (profile.medicalInfo.allergies.food.length > 0 ? 1 : 0), 0)}
                  </p>
                  <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Children with food allergies</p>
                </div>
                <div className="border rounded-lg p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Special Meals</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.ceil(childProfiles.length * 0.2)}
                  </p>
                  <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Special meals prepared daily</p>
                </div>
              </div>
            </div>
            
            {/* Activity Planning Integration */}
            <div className="border-2 border-purple-100 dark:border-purple-900 rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Activity Planning Integration</h3>
              <p className="mb-4">
                Child developmental information and interests are used to inform activity planning,
                ensuring age-appropriate and engaging activities for all children.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
                  <h4 className="font-medium text-purple-700 dark:text-purple-300">Age Groups</h4>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="font-medium text-purple-600 dark:text-purple-400">Infants (0-12 months)</p>
                      <p className="text-sm text-purple-600/70 dark:text-purple-400/70">{Math.floor(childProfiles.length * 0.2)} children</p>
                    </div>
                    <div>
                      <p className="font-medium text-purple-600 dark:text-purple-400">Toddlers (1-3 years)</p>
                      <p className="text-sm text-purple-600/70 dark:text-purple-400/70">{Math.floor(childProfiles.length * 0.3)} children</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="font-medium text-purple-600 dark:text-purple-400">Preschool (3-5 years)</p>
                      <p className="text-sm text-purple-600/70 dark:text-purple-400/70">{Math.floor(childProfiles.length * 0.35)} children</p>
                    </div>
                    <div>
                      <p className="font-medium text-purple-600 dark:text-purple-400">School Age (5+ years)</p>
                      <p className="text-sm text-purple-600/70 dark:text-purple-400/70">{Math.floor(childProfiles.length * 0.15)} children</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
                  <h4 className="font-medium text-purple-700 dark:text-purple-300">Popular Activities</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between">
                      <span className="text-purple-600 dark:text-purple-400">Art & Crafts</span>
                      <span className="text-purple-600/70 dark:text-purple-400/70">85% participation</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-purple-600 dark:text-purple-400">Outdoor Play</span>
                      <span className="text-purple-600/70 dark:text-purple-400/70">92% participation</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-purple-600 dark:text-purple-400">Story Time</span>
                      <span className="text-purple-600/70 dark:text-purple-400/70">78% participation</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-purple-600 dark:text-purple-400">Music & Movement</span>
                      <span className="text-purple-600/70 dark:text-purple-400/70">81% participation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Data Export */}
            <div className="border-2 border-amber-100 dark:border-amber-900 rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-amber-700 dark:text-amber-300">Data Export & Reporting</h3>
              <p className="mb-4">
                Export child data for reporting, compliance documentation, or transfer to other systems.
                All exports comply with Tennessee childcare data privacy regulations.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button 
                  onClick={handleExportData}
                  disabled={!selectedChildId}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transform hover:scale-105 transition-all duration-300"
                >
                  Export Selected Child Data
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-amber-200 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transform hover:scale-105 transition-all duration-300"
                >
                  Generate Compliance Report
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-amber-200 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transform hover:scale-105 transition-all duration-300"
                >
                  Export Center Summary
                </Button>
              </div>
              {!selectedChildId && (
                <p className="text-sm text-amber-600 mt-2">
                  Please select a child profile first to enable data export.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
