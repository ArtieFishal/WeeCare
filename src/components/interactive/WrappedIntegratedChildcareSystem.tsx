import React from 'react';
import { AdmissionsProvider } from './AdmissionsContext';
import IntegratedChildcareSystem from './IntegratedChildcareSystem';

const WrappedIntegratedChildcareSystem: React.FC = () => {
  return (
    <AdmissionsProvider>
      <IntegratedChildcareSystem />
    </AdmissionsProvider>
  );
};

export default WrappedIntegratedChildcareSystem;
