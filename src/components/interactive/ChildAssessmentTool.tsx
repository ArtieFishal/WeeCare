import React, { useState } from 'react';

const ChildAssessmentTool: React.FC = () => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [assessmentDate, setAssessmentDate] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('physical');
  const [observations, setObservations] = useState('');
  const [assessments, setAssessments] = useState<Array<{
    id: string;
    childName: string;
    childAge: string;
    date: string;
    domain: string;
    skills: Array<{
      skill: string;
      rating: 'emerging' | 'developing' | 'proficient';
      notes: string;
    }>;
    observations: string;
    goals: string[];
  }>>([]);
  
  const domains = [
    { value: 'physical', label: 'Physical Development', icon: '🏃‍♀️' },
    { value: 'cognitive', label: 'Cognitive Development', icon: '🧠' },
    { value: 'language', label: 'Language Development', icon: '💬' },
    { value: 'social', label: 'Social-Emotional Development', icon: '❤️' },
    { value: 'creative', label: 'Creative Arts', icon: '🎨' }
  ];
  
  const domainSkills = {
    physical: [
      'Demonstrates balance while moving',
      'Coordinates large muscle movements',
      'Uses fingers and hands with precision',
      'Demonstrates eye-hand coordination',
      'Shows appropriate stamina for age',
      'Demonstrates spatial awareness'
    ],
    cognitive: [
      'Sustains attention to tasks',
      'Shows curiosity and initiative',
      'Solves problems independently',
      'Recalls and uses information',
      'Classifies objects by attributes',
      'Understands cause and effect relationships'
    ],
    language: [
      'Listens and responds to communication',
      'Uses language to express needs and ideas',
      'Engages in conversations',
      'Shows interest in books and reading',
      'Recognizes letters and sounds',
      'Demonstrates early writing behaviors'
    ],
    social: [
      'Regulates own emotions and behaviors',
      'Establishes positive relationships',
      'Participates cooperatively in group situations',
      'Shows empathy for others',
      'Follows rules and routines',
      'Resolves conflicts appropriately'
    ],
    creative: [
      'Explores a variety of art materials',
      'Expresses self through art and music',
      'Engages in dramatic play',
      'Shows creativity in problem-solving',
      'Responds to artistic experiences',
      'Demonstrates originality in expressions'
    ]
  };
  
  const [skillRatings, setSkillRatings] = useState<Record<string, {
    rating: 'emerging' | 'developing' | 'proficient';
    notes: string;
  }>>({});
  
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  
  const handleRatingChange = (skill: string, rating: 'emerging' | 'developing' | 'proficient') => {
    setSkillRatings({
      ...skillRatings,
      [skill]: {
        ...skillRatings[skill],
        rating
      }
    });
  };
  
  const handleNotesChange = (skill: string, notes: string) => {
    setSkillRatings({
      ...skillRatings,
      [skill]: {
        ...skillRatings[skill],
        notes
      }
    });
  };
  
  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };
  
  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };
  
  const handleSaveAssessment = () => {
    if (!childName || !childAge || !assessmentDate) {
      alert('Please fill in child information and assessment date');
      return;
    }
    
    const skillsData = domainSkills[selectedDomain].map(skill => ({
      skill,
      rating: skillRatings[skill]?.rating || 'emerging',
      notes: skillRatings[skill]?.notes || ''
    }));
    
    const newAssessment = {
      id: Date.now().toString(),
      childName,
      childAge,
      date: assessmentDate,
      domain: selectedDomain,
      skills: skillsData,
      observations,
      goals: [...goals]
    };
    
    setAssessments([...assessments, newAssessment]);
    
    // Reset form for next assessment
    setSelectedDomain('physical');
    setObservations('');
    setSkillRatings({});
    setGoals([]);
  };
  
  const handleClearForm = () => {
    if (confirm('Clear all assessment data? This cannot be undone.')) {
      setSelectedDomain('physical');
      setObservations('');
      setSkillRatings({});
      setGoals([]);
    }
  };
  
  const getDomainIcon = (domainValue: string) => {
    return domains.find(d => d.value === domainValue)?.icon || '';
  };
  
  const getDomainLabel = (domainValue: string) => {
    return domains.find(d => d.value === domainValue)?.label || domainValue;
  };
  
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'emerging':
        return 'bg-amber-200 dark:bg-amber-900';
      case 'developing':
        return 'bg-blue-200 dark:bg-blue-900';
      case 'proficient':
        return 'bg-green-200 dark:bg-green-900';
      default:
        return 'bg-gray-200 dark:bg-gray-700';
    }
  };
  
  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case 'emerging':
        return 'Emerging';
      case 'developing':
        return 'Developing';
      case 'proficient':
        return 'Proficient';
      default:
        return rating;
    }
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">📋</span> Child Assessment Tool
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Child's Name</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full p-2 border border-input rounded-md bg-background"
            placeholder="Enter child's name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Child's Age</label>
          <input
            type="text"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full p-2 border border-input rounded-md bg-background"
            placeholder="e.g., 4 years 3 months"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Assessment Date</label>
          <input
            type="date"
            value={assessmentDate}
            onChange={(e) => setAssessmentDate(e.target.value)}
            className="w-full p-2 border border-input rounded-md bg-background"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Developmental Domain</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {domains.map(domain => (
            <button
              key={domain.value}
              onClick={() => setSelectedDomain(domain.value)}
              className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                selectedDomain === domain.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card hover:bg-muted'
              }`}
            >
              <span className="mr-2">{domain.icon}</span>
              {domain.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-bold mb-3 flex items-center">
          <span className="mr-2">{getDomainIcon(selectedDomain)}</span>
          {getDomainLabel(selectedDomain)} Skills Assessment
        </h4>
        
        <div className="bg-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-muted text-xs font-medium">
            <div className="col-span-4">Skill</div>
            <div className="col-span-4">Rating</div>
            <div className="col-span-4">Notes</div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {domainSkills[selectedDomain].map((skill, index) => (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-2 p-3 border-b items-center hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-4">
                  <div className="font-medium">{skill}</div>
                </div>
                <div className="col-span-4">
                  <div className="flex space-x-1">
                    {(['emerging', 'developing', 'proficient'] as const).map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(skill, rating)}
                        className={`px-2 py-1 rounded-md text-xs flex-1 ${
                          skillRatings[skill]?.rating === rating
                            ? `${getRatingColor(rating)} font-medium`
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {getRatingLabel(rating)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={skillRatings[skill]?.notes || ''}
                    onChange={(e) => handleNotesChange(skill, e.target.value)}
                    className="w-full p-1 text-sm border border-input rounded-md bg-background"
                    placeholder="Add notes"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Observations</label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full p-2 border border-input rounded-md bg-background"
          placeholder="Enter detailed observations of the child's behavior and skills"
          rows={4}
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Goals & Next Steps</label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="flex-1 p-2 border border-input rounded-l-md bg-background"
            placeholder="Add a goal or next step"
          />
          <button
            onClick={handleAddGoal}
            disabled={!newGoal.trim()}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
          >
            Add
          </button>
        </div>
        
        {goals.length > 0 ? (
          <div className="bg-card p-3 rounded-md">
            <ul className="space-y-2">
              {goals.map((goal, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-background rounded-md">
                  <span>{goal}</span>
                  <button
                    onClick={() => handleRemoveGoal(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No goals added yet</p>
        )}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handleClearForm}
          className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
        >
          Clear Form
        </button>
        <button
          onClick={handleSaveAssessment}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
          disabled={!childName || !childAge || !assessmentDate}
        >
          Save Assessment
        </button>
      </div>
      
      {assessments.length > 0 && (
        <div className="mt-8">
          <h4 className="font-bold mb-3">Saved Assessments</h4>
          <div className="space-y-2">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="bg-card p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h5 className="font-medium">{assessment.childName}</h5>
                    <div className="text-xs text-muted-foreground">
                      {assessment.childAge} • {new Date(assessment.date).toLocaleDateString()} • 
                      <span className="ml-1">{getDomainIcon(assessment.domain)} {getDomainLabel(assessment.domain)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Assessment report generated!')}
                    className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs hover:bg-accent/80"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildAssessmentTool;
