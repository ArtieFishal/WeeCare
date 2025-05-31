import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";

interface RegulationItem {
  id: string;
  category: string;
  description: string;
  reference: string;
  url?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ChecklistState {
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  centerInfo: {
    name: string;
    address: string;
    license: string;
    director: string;
    phone: string;
    email: string;
  };
  lastSaved: string;
}

const RegulationChecklist: React.FC = () => {
  const initialState: ChecklistState = {
    checked: {},
    notes: {},
    centerInfo: {
      name: '',
      address: '',
      license: '',
      director: '',
      phone: '',
      email: ''
    },
    lastSaved: ''
  };

  const [state, setState] = useState<ChecklistState>(initialState);
  const [activeTab, setActiveTab] = useState('checklist');
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  
  const regulations: RegulationItem[] = [
    { 
      id: 'staff_qual', 
      category: 'Staff Qualifications', 
      description: 'All staff members are at least 18 years old with high school diploma or equivalent', 
      reference: 'TN Rule 1240-04-01-.07(3)(a)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'background', 
      category: 'Staff Qualifications', 
      description: 'All staff have completed comprehensive background checks through TN DHS', 
      reference: 'TN Rule 1240-04-01-.07(1)(a)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'immunization', 
      category: 'Staff Qualifications', 
      description: 'All staff have provided proof of immunization per TN Department of Health requirements', 
      reference: 'TN Rule 1240-04-01-.07(6)(b)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'cpr_first_aid', 
      category: 'Staff Qualifications', 
      description: 'At least one staff member with current CPR and First Aid certification is present at all times', 
      reference: 'TN Rule 1240-04-01-.12(10)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'director_quals', 
      category: 'Staff Qualifications', 
      description: 'Director meets all qualification requirements including education and experience', 
      reference: 'TN Rule 1240-04-01-.07(4)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'ratio_infant', 
      category: 'Staff-to-Child Ratios', 
      description: 'One staff member for every four infants (6 weeks-15 months)', 
      reference: 'TN Rule 1240-04-01-.11(Table A)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'ratio_toddler', 
      category: 'Staff-to-Child Ratios', 
      description: 'One staff member for every six toddlers (12-30 months)', 
      reference: 'TN Rule 1240-04-01-.11(Table A)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'ratio_preschool', 
      category: 'Staff-to-Child Ratios', 
      description: 'One staff member for every seven preschoolers (2.5-3 years)', 
      reference: 'TN Rule 1240-04-01-.11(Table A)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'ratio_prek', 
      category: 'Staff-to-Child Ratios', 
      description: 'One staff member for every thirteen pre-K children (4-5 years)', 
      reference: 'TN Rule 1240-04-01-.11(Table A)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'group_size', 
      category: 'Staff-to-Child Ratios', 
      description: 'Maximum group sizes are maintained according to age groups', 
      reference: 'TN Rule 1240-04-01-.11(Table A)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'lighting', 
      category: 'Facility Requirements', 
      description: 'Adequate lighting of at least fifty (50) foot-candles of light', 
      reference: 'TN Rule 1240-04-01-.14(2)(a)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'medium'
    },
    { 
      id: 'ventilation', 
      category: 'Facility Requirements', 
      description: 'Proper ventilation and temperature maintained between 68-78 degrees F', 
      reference: 'TN Rule 1240-04-01-.14(2)(b)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'medium'
    },
    { 
      id: 'square_footage', 
      category: 'Facility Requirements', 
      description: 'Indoor space of at least thirty (30) square feet per child', 
      reference: 'TN Rule 1240-04-01-.14(3)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'outdoor_space', 
      category: 'Facility Requirements', 
      description: 'Outdoor play area of at least fifty (50) square feet per child', 
      reference: 'TN Rule 1240-04-01-.14(4)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'sanitation', 
      category: 'Facility Requirements', 
      description: 'Appropriate sanitation facilities and procedures following TN Department of Health guidelines', 
      reference: 'TN Rule 1240-04-01-.14(10)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'secure_entrance', 
      category: 'Facility Requirements', 
      description: 'Secure entrance and exit with controlled access system', 
      reference: 'TN Rule 1240-04-01-.14(7)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'monitoring', 
      category: 'Facility Requirements', 
      description: 'System for monitoring children\'s whereabouts at all times', 
      reference: 'TN Rule 1240-04-01-.11(7)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'curriculum', 
      category: 'Curriculum Requirements', 
      description: 'Developmentally appropriate curriculum aligned with TN Early Learning Development Standards', 
      reference: 'TN Rule 1240-04-01-.15',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'activities', 
      category: 'Curriculum Requirements', 
      description: 'Range of activities including arts, music, and minimum 60 minutes of outdoor play daily (weather permitting)', 
      reference: 'TN Rule 1240-04-01-.15(3)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'medium'
    },
    { 
      id: 'screen_time', 
      category: 'Curriculum Requirements', 
      description: 'Screen time limited to 30 minutes per day for children over 2 years', 
      reference: 'TN Rule 1240-04-01-.15(7)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'medium'
    },
    { 
      id: 'emergency_plan', 
      category: 'Health and Safety', 
      description: 'Written emergency preparedness plan meeting TN requirements', 
      reference: 'TN Rule 1240-04-01-.18',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'incident_reporting', 
      category: 'Health and Safety', 
      description: 'System for reporting incidents to TN DHS within 24 hours', 
      reference: 'TN Rule 1240-04-01-.09',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'medication', 
      category: 'Health and Safety', 
      description: 'Proper medication administration and storage procedures', 
      reference: 'TN Rule 1240-04-01-.12(10)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'transportation', 
      category: 'Transportation', 
      description: 'Transportation requirements including proper vehicle inspection and driver qualifications', 
      reference: 'TN Rule 1240-04-01-.17',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'critical'
    },
    { 
      id: 'food_service', 
      category: 'Health and Safety', 
      description: 'Food service meeting USDA and TN nutritional guidelines', 
      reference: 'TN Rule 1240-04-01-.13',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'child_records', 
      category: 'Record Keeping', 
      description: 'Complete and up-to-date records for each child including immunizations', 
      reference: 'TN Rule 1240-04-01-.08',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'staff_records', 
      category: 'Record Keeping', 
      description: 'Complete personnel records for all staff including qualifications and training', 
      reference: 'TN Rule 1240-04-01-.08',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'high'
    },
    { 
      id: 'posted_items', 
      category: 'Record Keeping', 
      description: 'Required items posted including license, emergency numbers, and menus', 
      reference: 'TN Rule 1240-04-01-.08(7)',
      url: 'https://publications.tnsosfiles.com/rules/1240/1240-04/1240-04-01.20220629.pdf',
      priority: 'medium'
    }
  ];
  
  const categories = [...new Set(regulations.map(item => item.category))];
  
  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('tnRegulationChecklist');
    if (savedState) {
      try {
        setState(JSON.parse(savedState));
      } catch (e) {
        console.error("Error loading saved state:", e);
      }
    }
  }, []);

  const handleCheck = (id: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        checked: {
          ...prev.checked,
          [id]: !prev.checked[id]
        }
      };
      
      // Save to localStorage
      try {
        localStorage.setItem('tnRegulationChecklist', JSON.stringify(newState));
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
  
  const handleCenterInfoChange = (field: keyof ChecklistState['centerInfo'], value: string) => {
    setState(prev => ({
      ...prev,
      centerInfo: {
        ...prev.centerInfo,
        [field]: value
      }
    }));
  };
  
  const saveData = () => {
    const newState = {
      ...state,
      lastSaved: new Date().toLocaleString()
    };
    
    try {
      localStorage.setItem('tnRegulationChecklist', JSON.stringify(newState));
      setState(newState);
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
    const totalItems = regulations.length;
    const checkedCount = Object.values(state.checked).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };
  
  const calculateCategoryProgress = (category: string) => {
    const categoryItems = regulations.filter(reg => reg.category === category);
    const checkedCategoryItems = categoryItems.filter(reg => state.checked[reg.id]);
    return Math.round((checkedCategoryItems.length / categoryItems.length) * 100);
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-warning';
      case 'medium': return 'text-secondary';
      case 'low': return 'text-muted-foreground';
      default: return '';
    }
  };
  
  const getFilteredRegulations = () => {
    return regulations.filter(reg => {
      const categoryMatch = filterCategory === 'all' || reg.category === filterCategory;
      const statusMatch = filterStatus === 'all' || 
                         (filterStatus === 'completed' && state.checked[reg.id]) || 
                         (filterStatus === 'pending' && !state.checked[reg.id]);
      const priorityMatch = filterPriority === 'all' || reg.priority === filterPriority;
      
      return categoryMatch && statusMatch && priorityMatch;
    });
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">✅</span> Tennessee Regulation Compliance Checklist
      </h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="tabs-list mb-4">
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="centerInfo">Center Info</TabsTrigger>
          <TabsTrigger value="actionPlan">Action Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checklist" className="space-y-4">
          {showSavedAlert && (
            <Alert className="mb-4 bg-primary/20">
              <AlertDescription>
                Progress saved successfully! Last saved: {state.lastSaved}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div>
              <label className="text-sm font-medium block mb-1">Category</label>
              <select 
                className="p-2 border rounded-md text-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Status</label>
              <select 
                className="p-2 border rounded-md text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Priority</label>
              <select 
                className="p-2 border rounded-md text-sm"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Compliance Progress</span>
              <span className="text-sm font-medium">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          
          {getFilteredRegulations().length === 0 ? (
            <div className="text-center p-4 border border-dashed rounded-md">
              No regulations match your current filters.
            </div>
          ) : (
            <>
              {filterCategory === 'all' ? (
                categories.map(category => (
                  <div key={category} className="mb-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold mb-2 text-secondary">{category}</h4>
                      <span className="text-xs">{calculateCategoryProgress(category)}% complete</span>
                    </div>
                    <div className="space-y-2">
                      {regulations
                        .filter(reg => reg.category === category)
                        .filter(reg => {
                          const statusMatch = filterStatus === 'all' || 
                                           (filterStatus === 'completed' && state.checked[reg.id]) || 
                                           (filterStatus === 'pending' && !state.checked[reg.id]);
                          const priorityMatch = filterPriority === 'all' || reg.priority === filterPriority;
                          
                          return statusMatch && priorityMatch;
                        })
                        .map(regulation => (
                          <Card key={regulation.id} className={`transition-colors ${
                            state.checked[regulation.id] ? 'bg-primary/10' : ''
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                  <input
                                    type="checkbox"
                                    id={regulation.id}
                                    checked={!!state.checked[regulation.id]}
                                    onChange={() => handleCheck(regulation.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                </div>
                                <div className="ml-3 flex-1">
                                  <label htmlFor={regulation.id} className="text-sm font-medium cursor-pointer">
                                    {regulation.description}
                                  </label>
                                  <div className="mt-1 flex flex-wrap gap-2 items-center text-xs">
                                    <Badge variant="outline">{regulation.reference}</Badge>
                                    <span className={`font-medium ${getPriorityColor(regulation.priority)}`}>
                                      {regulation.priority.charAt(0).toUpperCase() + regulation.priority.slice(1)} Priority
                                    </span>
                                  </div>
                                  
                                  {state.notes[regulation.id] && (
                                    <div className="mt-2 p-2 bg-muted/50 rounded text-xs italic">
                                      <strong>Notes:</strong> {state.notes[regulation.id]}
                                    </div>
                                  )}
                                  
                                  <div className="mt-2">
                                    <Textarea
                                      placeholder="Add notes here..."
                                      value={state.notes[regulation.id] || ''}
                                      onChange={(e) => handleNoteChange(regulation.id, e.target.value)}
                                      className="text-xs min-h-[60px]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  {getFilteredRegulations().map(regulation => (
                    <Card key={regulation.id} className={`transition-colors ${
                      state.checked[regulation.id] ? 'bg-primary/10' : ''
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-0.5">
                            <input
                              type="checkbox"
                              id={regulation.id}
                              checked={!!state.checked[regulation.id]}
                              onChange={() => handleCheck(regulation.id)}
                              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <label htmlFor={regulation.id} className="text-sm font-medium cursor-pointer">
                              {regulation.description}
                            </label>
                            <div className="mt-1 flex flex-wrap gap-2 items-center text-xs">
                              <Badge variant="outline">{regulation.reference}</Badge>
                              <span className={`font-medium ${getPriorityColor(regulation.priority)}`}>
                                {regulation.priority.charAt(0).toUpperCase() + regulation.priority.slice(1)} Priority
                              </span>
                            </div>
                            
                            {state.notes[regulation.id] && (
                              <div className="mt-2 p-2 bg-muted/50 rounded text-xs italic">
                                <strong>Notes:</strong> {state.notes[regulation.id]}
                              </div>
                            )}
                            
                            <div className="mt-2">
                              <Textarea
                                placeholder="Add notes here..."
                                value={state.notes[regulation.id] || ''}
                                onChange={(e) => handleNoteChange(regulation.id, e.target.value)}
                                className="text-xs min-h-[60px]"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
          
          <div className="flex justify-between mt-6">
            <Button onClick={saveData} className="bg-primary">
              Save Progress
            </Button>
            <Button onClick={handlePrint} variant="outline">
              Print Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="dashboard">
          <div className="space-y-6">
            <div className="mb-6">
              <h4 className="font-bold mb-4">Overall Compliance: {calculateProgress()}%</h4>
              <div className="w-full bg-muted rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${
                    calculateProgress() >= 90 ? 'bg-green-500' : 
                    calculateProgress() >= 70 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(category => (
                <Card key={category}>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">{category}</h5>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{calculateCategoryProgress(category)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          calculateCategoryProgress(category) >= 90 ? 'bg-green-500' : 
                          calculateCategoryProgress(category) >= 70 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${calculateCategoryProgress(category)}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-2 text-xs">
                      <span className="font-medium">Items completed: </span>
                      {regulations.filter(reg => reg.category === category && state.checked[reg.id]).length} / {regulations.filter(reg => reg.category === category).length}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Priority Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['critical', 'high', 'medium', 'low'].map(priority => {
                  const priorityItems = regulations.filter(reg => reg.priority === priority);
                  const completedItems = priorityItems.filter(reg => state.checked[reg.id]);
                  const percentage = priorityItems.length > 0 
                    ? Math.round((completedItems.length / priorityItems.length) * 100) 
                    : 0;
                  
                  return (
                    <Card key={priority}>
                      <CardContent className="p-4">
                        <h5 className={`font-medium mb-2 ${getPriorityColor(priority)}`}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </h5>
                        <div className="text-2xl font-bold mb-1">{percentage}%</div>
                        <div className="text-xs">
                          {completedItems.length} / {priorityItems.length} items
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="centerInfo">
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
              <label className="block text-sm font-medium mb-1">License Number</label>
              <Input 
                value={state.centerInfo.license} 
                onChange={(e) => handleCenterInfoChange('license', e.target.value)}
                placeholder="Enter license number"
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
            
            <Button onClick={saveData} className="mt-4 bg-primary">
              Save Center Information
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="actionPlan">
          <div className="space-y-4">
            <div className="mb-4">
              <h4 className="font-bold mb-2">Priority Action Items</h4>
              <p className="text-sm text-muted-foreground mb-4">
                These are the highest priority items that still need to be addressed based on your checklist.
              </p>
              
              {regulations
                .filter(reg => !state.checked[reg.id])
                .sort((a, b) => {
                  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .slice(0, 10)
                .map(regulation => (
                  <Card key={regulation.id} className="mb-2">
                    <CardContent className="p-3">
                      <div className="flex items-start">
                        <div className={`w-2 h-full mr-2 rounded-full ${
                          regulation.priority === 'critical' ? 'bg-red-500' :
                          regulation.priority === 'high' ? 'bg-orange-500' :
                          regulation.priority === 'medium' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`}></div>
                        <div>
                          <div className="font-medium text-sm">{regulation.description}</div>
                          <div className="text-xs mt-1 flex items-center gap-2">
                            <Badge variant="outline">{regulation.reference}</Badge>
                            <span className={`font-medium ${getPriorityColor(regulation.priority)}`}>
                              {regulation.priority.charAt(0).toUpperCase() + regulation.priority.slice(1)} Priority
                            </span>
                          </div>
                          {state.notes[regulation.id] && (
                            <div className="mt-2 p-2 bg-muted/50 rounded text-xs italic">
                              <strong>Notes:</strong> {state.notes[regulation.id]}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {regulations.filter(reg => !state.checked[reg.id]).length === 0 && (
                <div className="text-center p-4 border border-dashed rounded-md">
                  Congratulations! You have completed all regulation requirements.
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button onClick={handlePrint} variant="outline">
                Print Action Plan
              </Button>
              <Button onClick={saveData} className="bg-primary">
                Save Progress
              </Button>
            </div>
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

export default RegulationChecklist;
