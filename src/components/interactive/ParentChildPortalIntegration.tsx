import React, { useState, useEffect } from 'react';
import { useAdmissions } from './AdmissionsContext';
import { AttendanceRecord } from '@/types/admissions';

interface ParentChildPortalIntegrationProps {
  parentId?: string;
  childId?: string;
}

const ParentChildPortalIntegration: React.FC<ParentChildPortalIntegrationProps> = ({
  parentId,
  childId
}) => {
  const admissions = useAdmissions();
  const [attendanceData, setAttendanceData] = useState<{[date: string]: boolean}>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!childId) return;
    
    // In a real implementation, we would fetch attendance data from the API
    // For now, we'll generate some sample data
    const today = new Date();
    const attendanceMap: {[date: string]: boolean} = {};
    
    // Generate attendance for the last 14 days
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const dateStr = date.toISOString().split('T')[0];
      
      // Simulate 85% attendance rate
      attendanceMap[dateStr] = Math.random() < 0.85;
    }
    
    setAttendanceData(attendanceMap);
    setLoading(false);
  }, [childId]);
  
  if (loading) {
    return <div className="p-4 text-center">Loading attendance data...</div>;
  }
  
  return (
    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
      <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-2">
        Recent Attendance
      </h3>
      
      <div className="grid grid-cols-7 gap-2">
        {Object.entries(attendanceData).slice(0, 7).map(([date, present]) => (
          <div 
            key={date} 
            className={`p-2 rounded-lg text-center ${
              present 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}
          >
            <div className="text-xs">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className="text-xs">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div className="font-medium mt-1">{present ? 'Present' : 'Absent'}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>
          * Attendance data is automatically synced with the Admissions system.
        </p>
      </div>
    </div>
  );
};

export default ParentChildPortalIntegration;
