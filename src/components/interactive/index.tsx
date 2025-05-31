import React from 'react';
import RegulationChecklist from './RegulationChecklist';
import LicenseTimeline from './LicenseTimeline';
import AccreditationComparison from './AccreditationComparison';
import LocationCalculator from './LocationCalculator';
import WrappedIntegratedChildcareSystem from './WrappedIntegratedChildcareSystem';
import EquipmentBudgetPlanner from './EquipmentBudgetPlanner';
import JobDescriptionGenerator from './JobDescriptionGenerator';
import StaffQualificationTracker from './StaffQualificationTracker';
import CurriculumPlanner from './CurriculumPlanner';
import DailyScheduleBuilder from './DailyScheduleBuilder';
import ActivityGenerator from './ActivityGenerator';
import ChildAssessmentTool from './ChildAssessmentTool';
import HealthSafetyChecklist from './HealthSafetyChecklist';
import MealPlanningTool from './MealPlanningTool';
import ParentCommunicationPortal from './ParentCommunicationPortal';
import BudgetCalculator from './BudgetCalculator';
import MarketingStrategiesPlanner from './MarketingStrategiesPlanner';

// Map chapter IDs to their respective interactive components
const interactiveComponents = {
  1: RegulationChecklist,
  2: LicenseTimeline,
  3: AccreditationComparison,
  4: LocationCalculator,
  5: WrappedIntegratedChildcareSystem,
  6: EquipmentBudgetPlanner,
  7: JobDescriptionGenerator,
  8: StaffQualificationTracker,
  9: CurriculumPlanner,
  10: DailyScheduleBuilder,
  11: ActivityGenerator,
  12: ChildAssessmentTool,
  13: HealthSafetyChecklist,
  14: MealPlanningTool,
  15: ParentCommunicationPortal,
  16: BudgetCalculator,
  17: MarketingStrategiesPlanner
};

export { interactiveComponents };

import ParentCommunicationAndAssessment from './ParentCommunicationAndAssessment';

export { ParentCommunicationAndAssessment };
