import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  tips: string;
  requirements: string[];
  documents: string[];
  tnRuleReference: string;
}

interface CenterInfo {
  name: string;
  address: string;
  county: string;
  director: string;
  phone: string;
  email: string;
  capacity: string;
  ageGroups: string;
}

interface LicenseTimelineState {
  currentStep: number;
  completedSteps: Record<string, boolean>;
  notes: Record<string, string>;
  centerInfo: CenterInfo;
  customTimeline: boolean;
  startDate: string;
}

const LicenseTimeline: React.FC = () => {
  const initialState: LicenseTimelineState = {
    currentStep: 0,
    completedSteps: {},
    notes: {},
    centerInfo: {
      name: '',
      address: '',
      county: '',
      director: '',
      phone: '',
      email: '',
      capacity: '',
      ageGroups: ''
    },
    customTimeline: false,
    startDate: new Date().toISOString().split('T')[0]
  };

  const [state, setState] = useState<LicenseTimelineState>(initialState);
  const [activeTab, setActiveTab] = useState('timeline');
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  
  const timelineSteps: TimelineStep[] = [
    {
      id: 'orientation',
      title: 'Pre-Licensing Orientation',
      description: 'Attend mandatory orientation with Tennessee Department of Human Services (DHS) to understand licensing requirements.',
      duration: '1-2 weeks',
      tips: 'Bring questions about Tennessee-specific requirements and take detailed notes on the application process. Visit tn.gov/humanservices for pre-orientation research.',
      requirements: [
        'Register for orientation through the Tennessee DHS website',
        'Complete pre-orientation questionnaire',
        'Review Tennessee childcare licensing rules before attending'
      ],
      documents: [
        'Orientation registration confirmation',
        'Pre-orientation questionnaire',
        'Orientation attendance certificate'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.03'
    },
    {
      id: 'application',
      title: 'Application Submission',
      description: 'Submit your application to the Tennessee Department of Human Services (DHS), along with the required fees and documentation.',
      duration: '1 week',
      tips: 'Double-check all forms for completeness and accuracy. Include copies of business organization filings with the Tennessee Secretary of State as required by Tennessee regulations.',
      requirements: [
        'Complete Tennessee Child Care Application form',
        'Pay application fee ($100 for centers with 8-12 children, $125 for 13+ children)',
        'Submit proof of business organization (LLC, corporation, etc.)',
        'Provide proposed floor plan and outdoor play area diagram'
      ],
      documents: [
        'Tennessee Child Care Application (signed and notarized)',
        'Application fee payment receipt',
        'Business organization documents',
        'Floor plan and outdoor play area diagram',
        'Proof of liability insurance'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.04'
    },
    {
      id: 'background',
      title: 'Background Checks',
      description: 'All staff must complete comprehensive background checks through the Tennessee DHS, including fingerprinting, state criminal history, sex offender registry, and child/adult abuse registry checks.',
      duration: '2-4 weeks',
      tips: 'Schedule fingerprinting appointments early as this can be a bottleneck. Ensure all staff understand the background check requirements before hiring.',
      requirements: [
        'Complete background check application for all staff',
        'Schedule fingerprinting appointments',
        'Submit child and adult abuse registry forms',
        'Pay background check fees ($35 per person)'
      ],
      documents: [
        'Background check applications for all staff',
        'Fingerprinting receipts',
        'Registry check forms',
        'Background check results'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.07'
    },
    {
      id: 'inspection',
      title: 'Initial Inspection',
      description: 'Tennessee DHS licensing staff will conduct an initial inspection of your facility to ensure compliance with all physical facility requirements.',
      duration: '1-2 weeks',
      tips: 'Use the Tennessee DHS facility checklist to prepare for inspection. Pay special attention to square footage requirements, bathroom facilities, and outdoor play areas.',
      requirements: [
        'Ensure facility meets 30 sq ft per child for indoor space',
        'Verify 50 sq ft per child for outdoor play space',
        'Install safety features (outlet covers, cabinet locks, etc.)',
        'Set up proper handwashing stations and diaper changing areas'
      ],
      documents: [
        'Fire marshal inspection approval',
        'Environmental health inspection approval',
        'Building code compliance certificate',
        'Lead and asbestos testing results (for buildings built before 1978)'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.14'
    },
    {
      id: 'provisional',
      title: 'Provisional License Period',
      description: 'Tennessee DHS issues a provisional license for 120 days to allow your center to demonstrate compliance with all licensing laws and regulations.',
      duration: '4 months',
      tips: 'Use this period to ensure all staff meet qualification requirements and your facility meets all Tennessee physical facility standards.',
      requirements: [
        'Operate in full compliance with all Tennessee regulations',
        'Maintain required adult-to-child ratios at all times',
        'Implement required record-keeping systems',
        'Complete all staff training requirements'
      ],
      documents: [
        'Provisional license certificate',
        'Staff qualification documentation',
        'Child enrollment records',
        'Daily attendance records',
        'Meal planning documentation'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.03(2)(d)'
    },
    {
      id: 'monitoring',
      title: 'Monitoring Visits',
      description: 'Tennessee DHS conducts at least 4 monitoring visits per year (3 announced, 1 unannounced) to verify compliance with all regulations.',
      duration: '2-4 weeks',
      tips: 'Maintain organized records of staff background checks, child health records, and facility maintenance as required by Tennessee law.',
      requirements: [
        'Maintain compliance with all Tennessee regulations',
        'Address any violations promptly',
        'Document all compliance activities',
        'Prepare staff for potential unannounced visits'
      ],
      documents: [
        'Monitoring visit reports',
        'Compliance verification documentation',
        'Corrective action plans (if needed)',
        'Staff-to-child ratio documentation'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.03(1)(c)'
    },
    {
      id: 'annual',
      title: 'Annual License Renewal',
      description: 'Tennessee childcare licenses must be renewed annually with documentation of continued compliance with all regulations.',
      duration: '2-3 weeks',
      tips: 'Begin the renewal process at least 30 days before your license expires. Ensure all staff training hours are documented and up to date.',
      requirements: [
        'Submit renewal application',
        'Pay annual licensing fee',
        'Update all staff records and training documentation',
        'Address any compliance issues from previous year'
      ],
      documents: [
        'License renewal application',
        'Annual fee payment receipt',
        'Updated staff training records',
        'Compliance history documentation'
      ],
      tnRuleReference: 'TN Rule 1240-04-01-.03(5)'
    }
  ];
  
  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('tnLicenseTimeline');
    if (savedState) {
      try {
        setState(JSON.parse(savedState));
      } catch (e) {
        console.error("Error loading saved state:", e);
      }
    }
  }, []);

  const handleStepChange = (index: number) => {
    setState(prev => ({
      ...prev,
      currentStep: index
    }));
  };

  const handleStepCompletion = (id: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        completedSteps: {
          ...prev.completedSteps,
          [id]: !prev.completedSteps[id]
        }
      };
      
      // Save to localStorage
      try {
        localStorage.setItem('tnLicenseTimeline', JSON.stringify(newState));
      } catch (e) {
        console.error("Error saving state:", e);
      }
      
      return newState;
    });
  };
  
  const handleNoteChange = (id: string, note: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        notes: {
          ...prev.notes,
          [id]: note
        }
      };
      
      return newState;
    });
  };
  
  const handleCenterInfoChange = (field: keyof CenterInfo, value: string) => {
    setState(prev => ({
      ...prev,
      centerInfo: {
        ...prev.centerInfo,
        [field]: value
      }
    }));
  };
  
  const saveData = () => {
    try {
      localStorage.setItem('tnLicenseTimeline', JSON.stringify(state));
      setShowSavedAlert(true);
      
      setTimeout(() => {
        setShowSavedAlert(false);
      }, 3000);
    } catch (e) {
      console.error("Error saving data:", e);
      alert("There was an error saving your data. Please try again.");
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const calculateProgress = () => {
    const totalSteps = timelineSteps.length;
    const completedCount = Object.values(state.completedSteps).filter(Boolean).length;
    return Math.round((completedCount / totalSteps) * 100);
  };
  
  const calculateEstimatedCompletion = () => {
    if (!state.startDate || !state.customTimeline) return "Not calculated";
    
    const startDate = new Date(state.startDate);
    let totalDays = 0;
    
    timelineSteps.forEach(step => {
      const [min, max] = step.duration.split('-').map(part => {
        const num = parseInt(part);
        return part.includes('month') ? num * 30 : num * 7; // Convert to days
      });
      
      totalDays += max || min; // Use max if available, otherwise min
    });
    
    const estimatedDate = new Date(startDate);
    estimatedDate.setDate(startDate.getDate() + totalDays);
    
    return estimatedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const generateActionPlan = () => {
    const incompleteSteps = timelineSteps.filter(step => !state.completedSteps[step.id]);
    return incompleteSteps.slice(0, 3); // Return top 3 incomplete steps
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🗓️</span> Tennessee License Application Timeline
      </h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="tabs-list mb-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="centerInfo">Center Info</TabsTrigger>
          <TabsTrigger value="actionPlan">Action Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-4">
          {showSavedAlert && (
            <Alert className="mb-4 bg-primary/20">
              <AlertDescription>
                Progress saved successfully!
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="customTimeline"
                checked={state.customTimeline}
                onChange={() => setState(prev => ({...prev, customTimeline: !prev.customTimeline}))}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="customTimeline" className="text-sm">Custom timeline</label>
            </div>
            
            {state.customTimeline && (
              <div className="flex items-center">
                <span className="text-sm mr-2">Start date:</span>
                <Input
                  type="date"
                  value={state.startDate}
                  onChange={(e) => setState(prev => ({...prev, startDate: e.target.value}))}
                  className="w-40 text-sm"
                />
              </div>
            )}
          </div>
          
          {state.customTimeline && (
            <div className="mb-6 p-3 bg-card rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Estimated Completion:</span>
                <span className="text-sm font-bold text-primary">{calculateEstimatedCompletion()}</span>
              </div>
            </div>
          )}
          
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`mb-8 flex ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer ${
                      state.completedSteps[step.id] ? 'bg-green-500 text-white' :
                      index <= state.currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                    onClick={() => handleStepChange(index)}
                  >
                    {state.completedSteps[step.id] ? '✓' : index + 1}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div 
                      className={`w-1 h-full ${
                        index < state.currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    ></div>
                  )}
                </div>
                
                <div 
                  className={`mx-4 p-4 rounded-lg transition-all duration-300 w-full ${
                    index === state.currentStep ? 'bg-card shadow-md scale-105' : 'bg-background'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <input
                      type="checkbox"
                      checked={!!state.completedSteps[step.id]}
                      onChange={() => handleStepCompletion(step.id)}
                      className="h-5 w-5 mt-1"
                    />
                  </div>
                  <p className="text-sm mb-2">{step.description}</p>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Duration: <span className="font-bold text-accent">{step.duration}</span></span>
                    <Badge variant="outline">{step.tnRuleReference}</Badge>
                  </div>
                  
                  {state.notes[step.id] && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-xs italic">
                      <strong>Notes:</strong> {state.notes[step.id]}
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <Textarea
                      placeholder="Add notes here..."
                      value={state.notes[step.id] || ''}
                      onChange={(e) => handleNoteChange(step.id, e.target.value)}
                      className="text-xs min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button
              onClick={() => handleStepChange(Math.max(0, state.currentStep - 1))}
              disabled={state.currentStep === 0}
              variant="outline"
            >
              Previous Step
            </Button>
            <Button onClick={saveData} className="bg-primary">
              Save Progress
            </Button>
            <Button
              onClick={() => handleStepChange(Math.min(timelineSteps.length - 1, state.currentStep + 1))}
              disabled={state.currentStep === timelineSteps.length - 1}
              className="bg-primary"
            >
              Next Step
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements" className="space-y-4">
          <div className="mb-4">
            <h4 className="font-bold mb-2">Step-by-Step Requirements</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed requirements for each step of the Tennessee childcare licensing process.
            </p>
          </div>
          
          {timelineSteps.map((step, index) => (
            <Card key={step.id} className={`mb-4 ${state.completedSteps[step.id] ? 'bg-primary/10' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    state.completedSteps[step.id] ? 'bg-green-500 text-white' : 'bg-muted text-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{step.title}</h4>
                      <Badge variant="outline">{step.tnRuleReference}</Badge>
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="font-medium text-sm mb-1">Requirements:</h5>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {step.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="font-medium text-sm mb-1">Required Documents:</h5>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {step.documents.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                      <strong>💡 Tip:</strong> {step.tips}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-between mt-4">
            <Button onClick={saveData} className="bg-primary">
              Save Progress
            </Button>
            <Button onClick={handlePrint} variant="outline">
              Print Requirements
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="centerInfo" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Center Name</label>
              <Input 
                value={state.centerInfo.name} 
                onChange={(e) => handleCenterInfoChange('name', e.target.value)}
                placeholder="Enter center name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input 
                value={state.centerInfo.address} 
                onChange={(e) => handleCenterInfoChange('address', e.target.value)}
                placeholder="Enter center address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">County</label>
              <Input 
                value={state.centerInfo.county} 
                onChange={(e) => handleCenterInfoChange('county', e.target.value)}
                placeholder="Enter county"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Director Name</label>
              <Input 
                value={state.centerInfo.director} 
                onChange={(e) => handleCenterInfoChange('director', e.target.value)}
                placeholder="Enter director name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input 
                value={state.centerInfo.phone} 
                onChange={(e) => handleCenterInfoChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input 
                value={state.centerInfo.email} 
                onChange={(e) => handleCenterInfoChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Planned Capacity</label>
              <Input 
                value={state.centerInfo.capacity} 
                onChange={(e) => handleCenterInfoChange('capacity', e.target.value)}
                placeholder="Enter planned capacity"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Age Groups Served</label>
              <Input 
                value={state.centerInfo.ageGroups} 
                onChange={(e) => handleCenterInfoChange('ageGroups', e.target.value)}
                placeholder="Enter age groups (e.g., Infant, Toddler, Pre-K)"
              />
            </div>
            
            <Button onClick={saveData} className="mt-4 bg-primary">
              Save Center Information
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="actionPlan" className="space-y-4">
          <div className="mb-4">
            <h4 className="font-bold mb-2">Licensing Action Plan</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Your personalized action plan for completing the Tennessee childcare licensing process.
            </p>
            
            <div className="p-3 bg-card rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Progress:</span>
                <span className="text-sm font-bold text-primary">{calculateProgress()}% Complete</span>
              </div>
              
              {state.customTimeline && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">Estimated Completion:</span>
                  <span className="text-sm font-bold text-primary">{calculateEstimatedCompletion()}</span>
                </div>
              )}
            </div>
            
            <h5 className="font-medium mb-2">Next Steps:</h5>
            
            {generateActionPlan().length > 0 ? (
              generateActionPlan().map((step, index) => (
                <Card key={step.id} className="mb-3">
                  <CardContent className="p-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      
                      <div>
                        <h6 className="font-medium">{step.title}</h6>
                        <p className="text-sm">{step.description}</p>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Duration: {step.duration}</span>
                          <Badge variant="outline">{step.tnRuleReference}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-4 border border-dashed rounded-md">
                Congratulations! You have completed all licensing steps.
              </div>
            )}
            
            <div className="mt-6 p-3 bg-muted/30 rounded">
              <h5 className="font-medium mb-2">Tennessee DHS Contact Information:</h5>
              <p className="text-sm">For questions about childcare licensing in Tennessee:</p>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>Phone: (615) 313-4778</li>
                <li>Email: ChildCareServices.DHS@tn.gov</li>
                <li>Website: <a href="https://www.tn.gov/humanservices/for-families/child-care-services.html" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Tennessee DHS Child Care Services</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button onClick={handlePrint} variant="outline">
              Print Action Plan
            </Button>
            <Button onClick={saveData} className="bg-primary">
              Save Progress
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Print-specific styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .interactive-element, .interactive-element * {
            visibility: visible;
          }
          .interactive-element {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button, select, .tabs-list {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default LicenseTimeline;
