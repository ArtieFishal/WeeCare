import React, { useState, useEffect } from 'react';
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
import { PlusCircledIcon, Cross1Icon, Pencil1Icon, TrashIcon, CheckIcon } from '@radix-ui/react-icons';
import { MealTemplate } from "../../data/hot_meal_options";

interface MealTemplateManagerProps {
  onSelectTemplate: (template: MealTemplate) => void;
  onSaveTemplate: (template: MealTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  savedTemplates: MealTemplate[];
}

const MealTemplateManager: React.FC<MealTemplateManagerProps> = ({
  onSelectTemplate,
  onSaveTemplate,
  onDeleteTemplate,
  savedTemplates
}) => {
  // State for template management
  const [templates, setTemplates] = useState<MealTemplate[]>(savedTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<MealTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filterMealType, setFilterMealType] = useState('all');
  const [filterAgeGroup, setFilterAgeGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for template form
  const [templateForm, setTemplateForm] = useState<Partial<MealTemplate>>({
    name: '',
    description: '',
    mealType: 'breakfast',
    ageGroups: [],
    dietaryTags: [],
    ingredients: [],
    instructions: '',
    tnCacfpCompliant: true,
    tnCacfpNotes: '',
    isCustom: true
  });
  
  // New ingredient input
  const [newIngredient, setNewIngredient] = useState('');
  
  // Constants
  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'am_snack', label: 'AM Snack' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'pm_snack', label: 'PM Snack' },
    { id: 'dinner', label: 'Dinner' }
  ];
  
  const ageGroups = [
    { id: 'infant', label: 'Infants (0-12 months)' },
    { id: 'toddler', label: 'Toddlers (1-3 years)' },
    { id: 'preschool', label: 'Preschool (3-5 years)' },
    { id: 'schoolage', label: 'School Age (5+ years)' }
  ];
  
  const dietaryRestrictions = [
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'egg-free', label: 'Egg-Free' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' }
  ];
  
  // Update templates when savedTemplates changes
  useEffect(() => {
    setTemplates(savedTemplates);
  }, [savedTemplates]);
  
  // Filter templates based on search and filters
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMealType = filterMealType === 'all' || template.mealType === filterMealType;
    const matchesAgeGroup = filterAgeGroup === 'all' || template.ageGroups.includes(filterAgeGroup);
    
    return matchesSearch && matchesMealType && matchesAgeGroup;
  });
  
  // Handle template selection
  const handleSelectTemplate = (template: MealTemplate) => {
    setSelectedTemplate(template);
    onSelectTemplate(template);
  };
  
  // Handle template edit
  const handleEditTemplate = (template: MealTemplate) => {
    setSelectedTemplate(template);
    setTemplateForm({
      ...template
    });
    setIsEditing(true);
    setIsCreating(false);
  };
  
  // Handle template creation
  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setTemplateForm({
      name: '',
      description: '',
      mealType: 'breakfast',
      ageGroups: [],
      dietaryTags: [],
      ingredients: [],
      instructions: '',
      tnCacfpCompliant: true,
      tnCacfpNotes: '',
      isCustom: true
    });
    setIsEditing(false);
    setIsCreating(true);
  };
  
  // Handle template deletion
  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      onDeleteTemplate(templateId);
      if (selectedTemplate && selectedTemplate.id === templateId) {
        setSelectedTemplate(null);
      }
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox changes for age groups
  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    setTemplateForm(prev => {
      const currentAgeGroups = prev.ageGroups || [];
      if (checked) {
        return {
          ...prev,
          ageGroups: [...currentAgeGroups, ageGroup]
        };
      } else {
        return {
          ...prev,
          ageGroups: currentAgeGroups.filter(group => group !== ageGroup)
        };
      }
    });
  };
  
  // Handle checkbox changes for dietary restrictions
  const handleDietaryTagChange = (tag: string, checked: boolean) => {
    setTemplateForm(prev => {
      const currentTags = prev.dietaryTags || [];
      if (checked) {
        return {
          ...prev,
          dietaryTags: [...currentTags, tag]
        };
      } else {
        return {
          ...prev,
          dietaryTags: currentTags.filter(t => t !== tag)
        };
      }
    });
  };
  
  // Handle adding a new ingredient
  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setTemplateForm(prev => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };
  
  // Handle removing an ingredient
  const handleRemoveIngredient = (index: number) => {
    setTemplateForm(prev => ({
      ...prev,
      ingredients: (prev.ingredients || []).filter((_, i) => i !== index)
    }));
  };
  
  // Handle form submission
  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.mealType || !(templateForm.ageGroups || []).length) {
      alert('Please fill in all required fields: Name, Meal Type, and at least one Age Group.');
      return;
    }
    
    const now = new Date().toISOString();
    const template: MealTemplate = {
      id: isEditing && selectedTemplate ? selectedTemplate.id : `template-${Date.now()}`,
      name: templateForm.name || '',
      description: templateForm.description || '',
      mealType: templateForm.mealType as 'breakfast' | 'lunch' | 'dinner' | 'am_snack' | 'pm_snack',
      ageGroups: templateForm.ageGroups || [],
      dietaryTags: templateForm.dietaryTags || [],
      ingredients: templateForm.ingredients || [],
      instructions: templateForm.instructions || '',
      createdAt: isEditing && selectedTemplate ? selectedTemplate.createdAt : now,
      updatedAt: now,
      isCustom: true,
      tnCacfpCompliant: templateForm.tnCacfpCompliant || false,
      tnCacfpNotes: templateForm.tnCacfpNotes || ''
    };
    
    onSaveTemplate(template);
    setIsEditing(false);
    setIsCreating(false);
  };
  
  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meal Templates</h2>
        <Button onClick={handleCreateTemplate} className="flex items-center gap-2">
          <PlusCircledIcon className="h-4 w-4" />
          Create New Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filters */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search Templates</Label>
            <Input
              id="search"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="mealType">Meal Type</Label>
            <Select value={filterMealType} onValueChange={setFilterMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meal Types</SelectItem>
                {mealTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="ageGroup">Age Group</Label>
            <Select value={filterAgeGroup} onValueChange={setFilterAgeGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Age Groups</SelectItem>
                {ageGroups.map(group => (
                  <SelectItem key={group.id} value={group.id}>{group.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Template List */}
        <div className="md:col-span-2">
          {filteredTemplates.length > 0 ? (
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
                  {filteredTemplates.map(template => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        {mealTypes.find(type => type.id === template.mealType)?.label}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {template.ageGroups.map(group => (
                            <Badge key={group} variant="outline" className="text-xs">
                              {ageGroups.find(ag => ag.id === group)?.label.split(' ')[0]}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectTemplate(template)}
                            title="Use Template"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTemplate(template)}
                            title="Edit Template"
                          >
                            <Pencil1Icon className="h-4 w-4" />
                          </Button>
                          {template.isCustom && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTemplate(template.id)}
                              title="Delete Template"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="border rounded-md p-6 text-center">
              <p className="text-muted-foreground">No templates found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Template Edit/Create Dialog */}
      <Dialog open={isEditing || isCreating} onOpenChange={(open) => {
        if (!open) handleCancel();
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Template' : 'Create New Template'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details of this meal template.' 
                : 'Create a new custom meal template for your meal planning.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-right">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={templateForm.name || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Whole Grain Oatmeal with Fruit"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={templateForm.description || ''}
                  onChange={handleInputChange}
                  placeholder="Brief description of the meal..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="mealType" className="text-right">
                  Meal Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={templateForm.mealType} 
                  onValueChange={(value) => setTemplateForm(prev => ({ ...prev, mealType: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-right">
                  Age Groups <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {ageGroups.map(group => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`age-${group.id}`}
                        checked={(templateForm.ageGroups || []).includes(group.id)}
                        onCheckedChange={(checked) => handleAgeGroupChange(group.id, checked === true)}
                      />
                      <Label htmlFor={`age-${group.id}`} className="text-sm font-normal">
                        {group.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-right">
                  Dietary Considerations
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {dietaryRestrictions.map(restriction => (
                    <div key={restriction.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`diet-${restriction.id}`}
                        checked={(templateForm.dietaryTags || []).includes(restriction.id)}
                        onCheckedChange={(checked) => handleDietaryTagChange(restriction.id, checked === true)}
                      />
                      <Label htmlFor={`diet-${restriction.id}`} className="text-sm font-normal">
                        {restriction.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="ingredients" className="text-right">
                  Ingredients
                </Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    id="newIngredient"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add ingredient..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddIngredient();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddIngredient} size="sm">
                    Add
                  </Button>
                </div>
                <div className="border rounded-md p-2 min-h-[100px] max-h-[200px] overflow-y-auto">
                  {(templateForm.ingredients || []).length > 0 ? (
                    <ul className="space-y-1">
                      {(templateForm.ingredients || []).map((ingredient, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                          <span>{ingredient}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveIngredient(index)}
                            className="h-6 w-6 p-0"
                          >
                            <Cross1Icon className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-2">
                      No ingredients added yet.
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="instructions" className="text-right">
                  Preparation Instructions
                </Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={templateForm.instructions || ''}
                  onChange={handleInputChange}
                  placeholder="Step-by-step instructions for preparation..."
                  rows={4}
                />
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id="tnCacfpCompliant"
                    checked={templateForm.tnCacfpCompliant || false}
                    onCheckedChange={(checked) => setTemplateForm(prev => ({ ...prev, tnCacfpCompliant: checked === true }))}
                  />
                  <Label htmlFor="tnCacfpCompliant" className="font-medium">
                    TN CACFP Compliant
                  </Label>
                </div>
                <Textarea
                  id="tnCacfpNotes"
                  name="tnCacfpNotes"
                  value={templateForm.tnCacfpNotes || ''}
                  onChange={handleInputChange}
                  placeholder="Notes on CACFP compliance..."
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              {isEditing ? 'Update Template' : 'Save Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealTemplateManager;
