import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePortal } from './PortalContext';
import { Assessment, ChildProfile } from './types';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

export default function ChildAssessment() {
  const { 
    childProfiles, 
    assessments,
    selectedChildId,
    saveAssessment
  } = usePortal();

  const [activeTab, setActiveTab] = useState("assessments");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [newAssessment, setNewAssessment] = useState<Partial<Assessment>>({
    childId: selectedChildId || '',
    type: 'developmental',
    name: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    conductedBy: 'staff-1',
    categories: [
      {
        name: 'Social-Emotional',
        items: [
          { skill: 'Expresses emotions appropriately', rating: 'not-observed', notes: '' },
          { skill: 'Interacts positively with peers', rating: 'not-observed', notes: '' }
        ]
      },
      {
        name: 'Language & Literacy',
        items: [
          { skill: 'Recognizes letters', rating: 'not-observed', notes: '' },
          { skill: 'Listens attentively to stories', rating: 'not-observed', notes: '' }
        ]
      },
      {
        name: 'Physical Development',
        items: [
          { skill: 'Fine motor skills', rating: 'not-observed', notes: '' },
          { skill: 'Gross motor skills', rating: 'not-observed', notes: '' }
        ]
      }
    ],
    summary: '',
    recommendations: ''
  });

  // Filter assessments for the selected child
  const filteredAssessments = selectedChildId 
    ? assessments.filter(assessment => assessment.childId === selectedChildId)
    : assessments;

  // Get the selected assessment
  const selectedAssessment = selectedAssessmentId 
    ? assessments.find(assessment => assessment.id === selectedAssessmentId)
    : null;

  // Handle creating a new assessment
  const handleCreateAssessment = () => {
    if (!newAssessment.childId || !newAssessment.name || !newAssessment.date) {
      alert('Please fill in all required fields');
      return;
    }

    const assessment: Assessment = {
      id: '',
      childId: newAssessment.childId,
      type: newAssessment.type as 'developmental' | 'behavioral' | 'learning' | 'custom',
      name: newAssessment.name,
      date: newAssessment.date,
      conductedBy: newAssessment.conductedBy || 'staff-1',
      categories: newAssessment.categories || [],
      summary: newAssessment.summary,
      recommendations: newAssessment.recommendations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveAssessment(assessment);
    
    // Reset form
    setNewAssessment({
      childId: selectedChildId || '',
      type: 'developmental',
      name: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      conductedBy: 'staff-1',
      categories: [
        {
          name: 'Social-Emotional',
          items: [
            { skill: 'Expresses emotions appropriately', rating: 'not-observed', notes: '' },
            { skill: 'Interacts positively with peers', rating: 'not-observed', notes: '' }
          ]
        },
        {
          name: 'Language & Literacy',
          items: [
            { skill: 'Recognizes letters', rating: 'not-observed', notes: '' },
            { skill: 'Listens attentively to stories', rating: 'not-observed', notes: '' }
          ]
        },
        {
          name: 'Physical Development',
          items: [
            { skill: 'Fine motor skills', rating: 'not-observed', notes: '' },
            { skill: 'Gross motor skills', rating: 'not-observed', notes: '' }
          ]
        }
      ],
      summary: '',
      recommendations: ''
    });
  };

  // Handle updating a skill rating
  const handleRatingChange = (categoryIndex: number, itemIndex: number, rating: string) => {
    const updatedCategories = [...(newAssessment.categories || [])];
    updatedCategories[categoryIndex].items[itemIndex].rating = rating as 'not-observed' | 'emerging' | 'developing' | 'proficient' | 'advanced';
    setNewAssessment({...newAssessment, categories: updatedCategories});
  };

  // Handle updating a skill note
  const handleNoteChange = (categoryIndex: number, itemIndex: number, note: string) => {
    const updatedCategories = [...(newAssessment.categories || [])];
    updatedCategories[categoryIndex].items[itemIndex].notes = note;
    setNewAssessment({...newAssessment, categories: updatedCategories});
  };

  // Get child name by ID
  const getChildName = (childId: string): string => {
    const child = childProfiles.find(profile => profile.id === childId);
    return child ? child.basicInfo.fullName : 'Unknown Child';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Child Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assessments">View Assessments</TabsTrigger>
            <TabsTrigger value="new">New Assessment</TabsTrigger>
          </TabsList>
          
          {/* View Assessments Tab */}
          <TabsContent value="assessments">
            <div className="space-y-4">
              {selectedAssessment ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{selectedAssessment.name}</h3>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedAssessmentId(null)}
                    >
                      Back to List
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p><strong>Child:</strong> {getChildName(selectedAssessment.childId)}</p>
                      <p><strong>Date:</strong> {new Date(selectedAssessment.date).toLocaleDateString()}</p>
                      <p><strong>Type:</strong> {selectedAssessment.type}</p>
                    </div>
                    <div>
                      <p><strong>Conducted By:</strong> {selectedAssessment.conductedBy}</p>
                      <p><strong>Created:</strong> {new Date(selectedAssessment.createdAt).toLocaleDateString()}</p>
                      <p><strong>Updated:</strong> {new Date(selectedAssessment.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {selectedAssessment.categories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Skill</th>
                              <th className="text-left py-2">Rating</th>
                              <th className="text-left py-2">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.items.map((item, itemIndex) => (
                              <tr key={itemIndex} className="border-b">
                                <td className="py-2">{item.skill}</td>
                                <td className="py-2">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    item.rating === 'advanced' ? 'bg-green-100 text-green-800' :
                                    item.rating === 'proficient' ? 'bg-blue-100 text-blue-800' :
                                    item.rating === 'developing' ? 'bg-yellow-100 text-yellow-800' :
                                    item.rating === 'emerging' ? 'bg-orange-100 text-orange-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item.rating}
                                  </span>
                                </td>
                                <td className="py-2">{item.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                  
                  {selectedAssessment.summary && (
                    <div className="mt-4">
                      <h4 className="font-semibold">Summary</h4>
                      <p className="mt-1">{selectedAssessment.summary}</p>
                    </div>
                  )}
                  
                  {selectedAssessment.recommendations && (
                    <div className="mt-4">
                      <h4 className="font-semibold">Recommendations</h4>
                      <p className="mt-1">{selectedAssessment.recommendations}</p>
                    </div>
                  )}
                </div>
              ) : filteredAssessments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAssessments.map(assessment => (
                    <Card 
                      key={assessment.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedAssessmentId(assessment.id)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{assessment.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(assessment.date).toLocaleDateString()} • {assessment.type}
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Child:</strong> {getChildName(assessment.childId)}
                        </p>
                        <p className="text-sm">
                          <strong>Categories:</strong> {assessment.categories.length}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="mb-4">No assessments found. Create a new assessment to get started.</p>
                  <Button onClick={() => setActiveTab("new")}>
                    Create First Assessment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* New Assessment Tab */}
          <TabsContent value="new">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Child</label>
                  <Select 
                    value={newAssessment.childId} 
                    onValueChange={(value) => setNewAssessment({...newAssessment, childId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a child" />
                    </SelectTrigger>
                    <SelectContent>
                      {childProfiles.map(child => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.basicInfo.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Type</label>
                  <Select 
                    value={newAssessment.type as string} 
                    onValueChange={(value) => setNewAssessment({
                      ...newAssessment, 
                      type: value as 'developmental' | 'behavioral' | 'learning' | 'custom'
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developmental">Developmental</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="learning">Learning</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Name</label>
                  <Input 
                    value={newAssessment.name} 
                    onChange={(e) => setNewAssessment({...newAssessment, name: e.target.value})}
                    placeholder="e.g., Quarterly Development Assessment"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Date</label>
                  <Input 
                    type="date"
                    value={newAssessment.date} 
                    onChange={(e) => setNewAssessment({...newAssessment, date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                {newAssessment.categories?.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Skill</th>
                          <th className="text-left py-2">Rating</th>
                          <th className="text-left py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="border-b">
                            <td className="py-2">{item.skill}</td>
                            <td className="py-2">
                              <Select 
                                value={item.rating} 
                                onValueChange={(value) => handleRatingChange(categoryIndex, itemIndex, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not-observed">Not Observed</SelectItem>
                                  <SelectItem value="emerging">Emerging</SelectItem>
                                  <SelectItem value="developing">Developing</SelectItem>
                                  <SelectItem value="proficient">Proficient</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="py-2">
                              <Input 
                                value={item.notes || ''} 
                                onChange={(e) => handleNoteChange(categoryIndex, itemIndex, e.target.value)}
                                placeholder="Add notes..."
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <Textarea 
                  value={newAssessment.summary || ''} 
                  onChange={(e) => setNewAssessment({...newAssessment, summary: e.target.value})}
                  placeholder="Overall assessment summary..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Recommendations</label>
                <Textarea 
                  value={newAssessment.recommendations || ''} 
                  onChange={(e) => setNewAssessment({...newAssessment, recommendations: e.target.value})}
                  placeholder="Recommendations for development..."
                  rows={3}
                />
              </div>
              
              <Button onClick={handleCreateAssessment}>Save Assessment</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
