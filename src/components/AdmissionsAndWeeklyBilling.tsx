import React from 'react';
import { AdmissionsProvider } from './interactive/AdmissionsContext';
import IntegratedChildcareSystem from './interactive/IntegratedChildcareSystem';

// Export the integrated system as the main component
export default function AdmissionsAndWeeklyBilling() {
  return (
    <div className="container mx-auto py-6">
      <IntegratedChildcareSystem />
    </div>
  );
}
