import React from 'react';
import { ParentChildPortal, PortalProvider } from './ParentChildPortal/index';

export default function ParentCommunicationAndAssessment() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Parent Communication & Child Assessment</h1>
      <p className="text-lg">
        This portal provides comprehensive tools for parent communication and child assessment, 
        allowing you to manage child profiles, communicate with parents, track assessments, 
        and integrate with other center systems.
      </p>
      
      <PortalProvider>
        <ParentChildPortal />
      </PortalProvider>
    </div>
  );
}
