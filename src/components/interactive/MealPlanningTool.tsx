import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlusCircledIcon, Cross1Icon, Pencil1Icon, TrashIcon, CheckIcon, BackpackIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { presetGroceryItems, PresetGroceryItem } from "../../data/preset_grocery_items";
import { hotMealOptions, MealTemplate, customMealTemplates } from "../../data/hot_meal_options";
import MealTemplateManager from "./MealTemplateManager";

interface MealPlanningToolProps {}

const MealPlanningTool: React.FC<MealPlanningToolProps> = () => {
  // State for meal planning
  const [activeTab, setActiveTab] = useState("meal-planning");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("all");
  const [selectedMealType, setSelectedMealType] = useState<string>("breakfast");
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0]);
  const [centerMode, setCenterMode] = useState<boolean>(false);
  const [showTemplateManager, setShowTemplateManager] = useState<boolean>(false);
  const [showViewAllTemplates, setShowViewAllTemplates] = useState<boolean>(false);
  
  // State for meal templates
  const [mealTemplates, setMealTemplates] = useState<MealTemplate[]>([...hotMealOptions, ...customMealTemplates]);
  const [selectedTemplate, setSelectedTemplate] = useState<MealTemplate | null>(null);
  
  // State for shopping list
  const [shoppingList, setShoppingList] = useState<{[key: string]: {item: PresetGroceryItem, count: number}}>({});
  const [filteredItems, setFilteredItems] = useState<PresetGroceryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showCompliant, setShowCompliant] = useState<boolean>(true);
  
  // State for center information
  const [centerInfo, setCenterInfo] = useState({
    infantCount: 8,
    toddlerCount: 12,
    preschoolCount: 15,
    schoolageCount: 10
  });
  
  // State for meal plan
  const [mealPlan, setMealPlan] = useState<{
    [date: string]: {
      [mealType: string]: {
        [ageGroup: string]: MealTemplate | null
      }
    }
  }>({});
  
  // Initialize meal plan for current day if not exists
  useEffect(() => {
    if (!mealPlan[selectedDay]) {
      setMealPlan(prev => ({
        ...prev,
        [selectedDay]: {
          breakfast: { infant: null, toddler: null, preschool: null, schoolage: null, all: null },
          am_snack: { infant: null, toddler: null, preschool: null, schoolage: null, all: null },
          lunch: { infant: null, toddler: null, preschool: null, schoolage: null, all: null },
          pm_snack: { infant: null, toddler: null, preschool: null, schoolage: null, all: null },
          dinner: { infant: null, toddler: null, preschool: null, schoolage: null, all: null }
        }
      }));
    }
  }, [selectedDay, mealPlan]);
  
  // Filter grocery items based on search, category, and age group
  useEffect(() => {
    let filtered = [...presetGroceryItems];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Filter by age group
    if (selectedAgeGroup !== "all") {
      filtered = filtered.filter(item => item.age_groups.includes(selectedAgeGroup));
    }
    
    // Filter by CACFP compliance if enabled
    if (showCompliant) {
      filtered = filtered.filter(item => item.tn_cacfp_notes);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, categoryFilter, selectedAgeGroup, showCompliant]);
  
  // Get unique categories from preset items
  const categories = Array.from(new Set(presetGroceryItems.map(item => item.category)));
  
  // Add item to shopping list
  const addToShoppingList = (item: PresetGroceryItem) => {
    setShoppingList(prev => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          count: existing ? existing.count + 1 : 1
        }
      };
    });
  };
  
  // Remove item from shopping list
  const removeFromShoppingList = (itemId: string) => {
    setShoppingList(prev => {
      const newList = { ...prev };
      delete newList[itemId];
      return newList;
    });
  };
  
  // Update item quantity in shopping list
  const updateItemQuantity = (itemId: string, count: number) => {
    if (count <= 0) {
      removeFromShoppingList(itemId);
      return;
    }
    
    setShoppingList(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        count
      }
    }));
  };
  
  // Calculate total cost of shopping list
  const calculateTotalCost = () => {
    return Object.values(shoppingList).reduce((total, { item, count }) => {
      return total + (item.estimated_cost * count);
    }, 0);
  };
  
  // Generate master shopping list for all age groups
  const generateMasterShoppingList = () => {
    const masterList: {[key: string]: {item: PresetGroceryItem, count: number}} = {};
    
    // Calculate quantities based on number of children in each age group
    Object.entries(centerInfo).forEach(([ageGroup, count]) => {
      const ageGroupKey = ageGroup.replace('Count', '');
      
      presetGroceryItems
        .filter(item => item.age_groups.includes(ageGroupKey))
        .forEach(item => {
          if (masterList[item.id]) {
            masterList[item.id].count += count * (item.quantity_per_child || 1);
          } else {
            masterList[item.id] = {
              item,
              count: count * (item.quantity_per_child || 1)
            };
          }
        });
    });
    
    setShoppingList(masterList);
  };
  
  // Calculate shopping list for specific age group
  const calculateAgeGroupShoppingList = () => {
    if (selectedAgeGroup === 'all') {
      generateMasterShoppingList();
      return;
    }
    
    const ageGroupList: {[key: string]: {item: PresetGroceryItem, count: number}} = {};
    const childCount = centerInfo[`${selectedAgeGroup}Count` as keyof typeof centerInfo];
    
    presetGroceryItems
      .filter(item => item.age_groups.includes(selectedAgeGroup))
      .forEach(item => {
        ageGroupList[item.id] = {
          item,
          count: childCount * (item.quantity_per_child || 1)
        };
      });
    
    setShoppingList(ageGroupList);
  };
  
  // Handle meal template selection
  const handleSelectTemplate = (template: MealTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateManager(false);
    setShowViewAllTemplates(false);
    
    // Update meal plan with selected template
    if (selectedDay && selectedMealType) {
      setMealPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedMealType]: {
            ...prev[selectedDay][selectedMealType],
            [selectedAgeGroup]: template
          }
        }
      }));
    }
  };
  
  // Handle saving a template
  const handleSaveTemplate = (template: MealTemplate) => {
    // Check if template already exists
    const existingIndex = mealTemplates.findIndex(t => t.id === template.id);
    
    if (existingIndex >= 0) {
      // Update existing template
      setMealTemplates(prev => [
        ...prev.slice(0, existingIndex),
        template,
        ...prev.slice(existingIndex + 1)
      ]);
    } else {
      // Add new template
      setMealTemplates(prev => [...prev, template]);
    }
  };
  
  // Handle deleting a template
  const handleDeleteTemplate = (templateId: string) => {
    setMealTemplates(prev => prev.filter(t => t.id !== templateId));
  };
  
  // Get current meal for selected day, type, and age group
  const getCurrentMeal = () => {
    if (!mealPlan[selectedDay] || !mealPlan[selectedDay][selectedMealType]) {
      return null;
    }
    
    return mealPlan[selectedDay][selectedMealType][selectedAgeGroup];
  };
  
  // Clear current meal selection
  const clearMealSelection = () => {
    if (selectedDay && selectedMealType) {
      setMealPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedMealType]: {
            ...prev[selectedDay][selectedMealType],
            [selectedAgeGroup]: null
          }
        }
      }));
    }
    
    setSelectedTemplate(null);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Get meal type label
  const getMealTypeLabel = (type: string) => {
    switch (type) {
      case 'breakfast': return 'Breakfast';
      case 'am_snack': return 'AM Snack';
      case 'lunch': return 'Lunch';
      case 'pm_snack': return 'PM Snack';
      case 'dinner': return 'Dinner';
      default: return type;
    }
  };
  
  // Get age group label
  const getAgeGroupLabel = (group: string) => {
    switch (group) {
      case 'infant': return 'Infants (0-12 months)';
      case 'toddler': return 'Toddlers (1-3 years)';
      case 'preschool': return 'Preschool (3-5 years)';
      case 'schoolage': return 'School Age (5+ years)';
      case 'all': return 'All Age Groups';
      default: return group;
    }
  };
  
  // Calculate total children
  const calculateTotalChildren = () => {
    return centerInfo.infantCount + centerInfo.toddlerCount + centerInfo.preschoolCount + centerInfo.schoolageCount;
  };
  
  // Handle center info update
  const handleCenterInfoUpdate = (ageGroup: keyof typeof centerInfo, value: string) => {
    const numValue = parseInt(value) || 0;
    setCenterInfo(prev => ({
      ...prev,
      [ageGroup]: numValue
    }));
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="meal-planning" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meal-planning">Meal Planning</TabsTrigger>
          <TabsTrigger value="shopping-list">Shopping List</TabsTrigger>
          <TabsTrigger value="ordering">Ordering</TabsTrigger>
          <TabsTrigger value="center-info">Center Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meal-planning" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Tennessee CACFP Meal Planning</h2>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowViewAllTemplates(true)}>
                View All Templates
              </Button>
              <Button variant="outline" onClick={() => setShowTemplateManager(true)}>
                Manage Templates
              </Button>
            </div>
          </div>
          <p>Plan meals for your childcare center following Tennessee CACFP guidelines</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="meal-type">Meal Type</Label>
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="am_snack">AM Snack</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="pm_snack">PM Snack</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age-group">Age Group</Label>
              <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Age Groups</SelectItem>
                  <SelectItem value="infant">Infants (0-12 months)</SelectItem>
                  <SelectItem value="toddler">Toddlers (1-3 years)</SelectItem>
                  <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                  <SelectItem value="schoolage">School Age (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Current Meal Plan</h3>
            <div className="flex items-center gap-2">
              <Label htmlFor="center-mode" className="cursor-pointer">Center-wide Planning</Label>
              <Checkbox
                id="center-mode"
                checked={centerMode}
                onCheckedChange={(checked) => setCenterMode(!!checked)}
              />
            </div>
          </div>
          
          <div className="border rounded-md p-6">
            {getCurrentMeal() ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{getCurrentMeal()?.name}</h4>
                    <p className="text-muted-foreground">{getCurrentMeal()?.description}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={clearMealSelection}>
                    <Cross1Icon className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold">Ingredients</h5>
                    <ul className="list-disc pl-5">
                      {getCurrentMeal()?.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold">Preparation</h5>
                    <p className="whitespace-pre-line">{getCurrentMeal()?.instructions}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold">Dietary Considerations</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {getCurrentMeal()?.dietaryTags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                
                {getCurrentMeal()?.tnCacfpCompliant && (
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md p-3">
                    <h5 className="font-semibold text-green-700 dark:text-green-300">TN CACFP Compliant</h5>
                    <p className="text-green-600 dark:text-green-400 text-sm">{getCurrentMeal()?.tnCacfpNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No meal selected for this time slot.</p>
                <Button className="mt-4" onClick={() => setShowViewAllTemplates(true)}>
                  Select a Meal
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Suggested Meals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealTemplates
                .filter(template => template.mealType === selectedMealType)
                .filter(template => selectedAgeGroup === 'all' || template.ageGroups.includes(selectedAgeGroup))
                .slice(0, 6)
                .map(template => (
                  <Card key={template.id} className="cursor-pointer hover:border-primary" onClick={() => handleSelectTemplate(template)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {template.ageGroups.map(group => (
                          <Badge key={group} variant="outline" className="text-xs">
                            {group === 'infant' ? 'Infants' : 
                             group === 'toddler' ? 'Toddlers' : 
                             group === 'preschool' ? 'Preschool' : 'School Age'}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setShowViewAllTemplates(true)}>
                View All Templates
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shopping-list" className="space-y-6">
          {/* Shopping list content */}
        </TabsContent>
        
        <TabsContent value="ordering" className="space-y-6">
          {/* Ordering content */}
        </TabsContent>
        
        <TabsContent value="center-info" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Center Information</h2>
            <p className="text-muted-foreground">Update your center's information for meal planning and shopping list calculations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Child Count by Age Group */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Child Count by Age Group</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="infant-count">Infants (0-12 months)</Label>
                  <Input
                    id="infant-count"
                    type="number"
                    min="0"
                    value={centerInfo.infantCount}
                    onChange={(e) => handleCenterInfoUpdate('infantCount', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="toddler-count">Toddlers (1-3 years)</Label>
                  <Input
                    id="toddler-count"
                    type="number"
                    min="0"
                    value={centerInfo.toddlerCount}
                    onChange={(e) => handleCenterInfoUpdate('toddlerCount', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="preschool-count">Preschool (3-5 years)</Label>
                  <Input
                    id="preschool-count"
                    type="number"
                    min="0"
                    value={centerInfo.preschoolCount}
                    onChange={(e) => handleCenterInfoUpdate('preschoolCount', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="schoolage-count">School Age (5+ years)</Label>
                  <Input
                    id="schoolage-count"
                    type="number"
                    min="0"
                    value={centerInfo.schoolageCount}
                    onChange={(e) => handleCenterInfoUpdate('schoolageCount', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Center Summary */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Center Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Children:</span>
                      <span>{calculateTotalChildren()}</span>
                    </div>
                    <div className="font-medium mt-4">Age Distribution:</div>
                    <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      {calculateTotalChildren() > 0 && (
                        <>
                          <div 
                            className="h-full bg-blue-400 float-left" 
                            style={{ width: `${(centerInfo.infantCount / calculateTotalChildren()) * 100}%` }}
                            title={`Infants: ${centerInfo.infantCount} (${Math.round((centerInfo.infantCount / calculateTotalChildren()) * 100)}%)`}
                          />
                          <div 
                            className="h-full bg-green-400 float-left" 
                            style={{ width: `${(centerInfo.toddlerCount / calculateTotalChildren()) * 100}%` }}
                            title={`Toddlers: ${centerInfo.toddlerCount} (${Math.round((centerInfo.toddlerCount / calculateTotalChildren()) * 100)}%)`}
                          />
                          <div 
                            className="h-full bg-yellow-400 float-left" 
                            style={{ width: `${(centerInfo.preschoolCount / calculateTotalChildren()) * 100}%` }}
                            title={`Preschool: ${centerInfo.preschoolCount} (${Math.round((centerInfo.preschoolCount / calculateTotalChildren()) * 100)}%)`}
                          />
                          <div 
                            className="h-full bg-red-400 float-left" 
                            style={{ width: `${(centerInfo.schoolageCount / calculateTotalChildren()) * 100}%` }}
                            title={`School Age: ${centerInfo.schoolageCount} (${Math.round((centerInfo.schoolageCount / calculateTotalChildren()) * 100)}%)`}
                          />
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-1"></div>
                        <span>Infants: {centerInfo.infantCount}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
                        <span>Toddlers: {centerInfo.toddlerCount}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
                        <span>Preschool: {centerInfo.preschoolCount}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
                        <span>School Age: {centerInfo.schoolageCount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tennessee CACFP Requirements */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tennessee CACFP Requirements</h3>
              
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700 dark:text-blue-300">Meal Pattern Requirements</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-600 dark:text-blue-400">
                  <p>All meals must follow the CACFP meal pattern requirements for each age group.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-700 dark:text-green-300">Required Documentation</CardTitle>
                </CardHeader>
                <CardContent className="text-green-600 dark:text-green-400">
                  <p>Centers must maintain records of menus, meal counts, and food purchases.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Compliance Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ExternalLinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <a 
                        href="https://www.tn.gov/humanservices/for-families/child-care-services.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Tennessee Department of Human Services
                      </a>
                    </li>
                    <li className="flex items-center">
                      <ExternalLinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <a 
                        href="https://www.fns.usda.gov/cacfp" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        USDA Food and Nutrition Service
                      </a>
                    </li>
                    <li className="flex items-center">
                      <ExternalLinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <a 
                        href="https://www.fns.usda.gov/cacfp/meals-and-snacks" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        CACFP Meal Pattern Requirements
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-2">Important Notes</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Child count information is used to calculate shopping list quantities</li>
                  <li>Meal planning must account for different nutritional needs by age group</li>
                  <li>CACFP compliance is required for reimbursement eligibility</li>
                  <li>Keep all meal planning documentation for at least 3 years</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Template Manager Dialog */}
      <Dialog open={showTemplateManager} onOpenChange={setShowTemplateManager}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Meal Template Manager</DialogTitle>
            <DialogDescription>
              Create, edit, and manage your custom meal templates
            </DialogDescription>
          </DialogHeader>
          
          <MealTemplateManager
            savedTemplates={mealTemplates}
            onSelectTemplate={handleSelectTemplate}
            onSaveTemplate={handleSaveTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        </DialogContent>
      </Dialog>
      
      {/* View All Templates Dialog */}
      <Dialog open={showViewAllTemplates} onOpenChange={setShowViewAllTemplates}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Meal Templates</DialogTitle>
            <DialogDescription>
              Browse and select meal templates for your meal plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filters */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-search">Search Templates</Label>
                  <Input
                    id="template-search"
                    placeholder="Search by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="template-meal-type">Meal Type</Label>
                  <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="am_snack">AM Snack</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="pm_snack">PM Snack</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="template-age-group">Age Group</Label>
                  <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Age Groups</SelectItem>
                      <SelectItem value="infant">Infants (0-12 months)</SelectItem>
                      <SelectItem value="toddler">Toddlers (1-3 years)</SelectItem>
                      <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                      <SelectItem value="schoolage">School Age (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Template List */}
              <div className="md:col-span-2">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Meal Type</TableHead>
                        <TableHead>Age Groups</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mealTemplates
                        .filter(template => selectedMealType === 'all' || template.mealType === selectedMealType)
                        .filter(template => selectedAgeGroup === 'all' || template.ageGroups.includes(selectedAgeGroup))
                        .filter(template => 
                          searchQuery === '' || 
                          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(template => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium">{template.name}</TableCell>
                            <TableCell>
                              {getMealTypeLabel(template.mealType)}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {template.ageGroups.map(group => (
                                  <Badge key={group} variant="outline" className="text-xs">
                                    {group === 'infant' ? 'Infants' : 
                                     group === 'toddler' ? 'Toddlers' : 
                                     group === 'preschool' ? 'Preschool' : 'School Age'}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectTemplate(template)}
                                title="Use Template"
                              >
                                <CheckIcon className="h-4 w-4" />
                                Select
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewAllTemplates(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealPlanningTool;
