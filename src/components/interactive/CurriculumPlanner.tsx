import React, { useState } from 'react';

const CurriculumPlanner: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('preschool');
  const [duration, setDuration] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [customActivity, setCustomActivity] = useState('');
  const [learningGoals, setLearningGoals] = useState<string[]>([]);
  const [customGoal, setCustomGoal] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [customMaterial, setCustomMaterial] = useState('');
  
  const themeOptions = [
    'Animals', 'Space', 'Ocean', 'Seasons', 'Community Helpers',
    'Transportation', 'Plants & Growing', 'Dinosaurs', 'Colors',
    'Shapes', 'Weather', 'Insects', 'Healthy Habits', 'Emotions',
    'Fairy Tales', 'Music', 'Art', 'Countries & Cultures'
  ];
  
  const activityOptions = {
    infants: [
      'Tummy Time', 'Sensory Bottles', 'Mirror Play', 'Texture Exploration',
      'Soft Book Reading', 'Singing & Rhymes', 'Rattle Play', 'Peek-a-Boo',
      'Bubble Watching', 'Mobile Observation'
    ],
    toddlers: [
      'Finger Painting', 'Block Building', 'Simple Puzzles', 'Sensory Bins',
      'Action Songs', 'Picture Books', 'Ball Play', 'Water Table',
      'Playdough', 'Nature Walk'
    ],
    preschool: [
      'Circle Time', 'Art Projects', 'Science Experiments', 'Dramatic Play',
      'Block Center', 'Outdoor Exploration', 'Music & Movement', 'Story Time',
      'Math Games', 'Writing Center'
    ],
    schoolAge: [
      'STEM Challenges', 'Group Games', 'Art & Crafts', 'Cooking Projects',
      'Book Club', 'Gardening', 'Sports & Fitness', 'Drama & Theater',
      'Board Games', 'Community Service'
    ]
  };
  
  const learningGoalOptions = {
    infants: [
      'Develop fine motor skills', 'Recognize familiar faces', 'Respond to sounds',
      'Reach for objects', 'Track moving objects', 'Babble and vocalize',
      'Show emotions', 'Build sensory awareness', 'Develop head control',
      'Begin to sit independently'
    ],
    toddlers: [
      'Use simple words', 'Follow 1-step directions', 'Sort by color or shape',
      'Build small towers', 'Show independence', 'Express emotions appropriately',
      'Engage in pretend play', 'Recognize body parts', 'Develop self-help skills',
      'Show interest in peers'
    ],
    preschool: [
      'Recognize letters and sounds', 'Count to 20', 'Identify basic shapes',
      'Follow multi-step directions', 'Express feelings verbally', 'Take turns',
      'Use scissors and writing tools', 'Ask questions', 'Retell stories',
      'Develop scientific thinking'
    ],
    schoolAge: [
      'Read independently', 'Solve math problems', 'Work cooperatively',
      'Follow complex instructions', 'Develop critical thinking', 'Set goals',
      'Show responsibility', 'Demonstrate creativity', 'Use technology appropriately',
      'Build research skills'
    ]
  };
  
  const materialOptions = [
    'Construction Paper', 'Markers', 'Crayons', 'Scissors', 'Glue',
    'Paint', 'Playdough', 'Blocks', 'Books', 'Puzzles',
    'Sensory Materials', 'Natural Items', 'Recycled Materials', 'Fabric',
    'Musical Instruments', 'Puppets', 'Dramatic Play Props', 'Science Tools'
  ];
  
  const handleThemeChange = (e) => {
    const value = e.target.value;
    setCurrentTheme(value);
    if (value === 'custom') {
      setCustomTheme('');
    }
  };
  
  const handleAddActivity = () => {
    if (customActivity && !selectedActivities.includes(customActivity)) {
      setSelectedActivities([...selectedActivities, customActivity]);
      setCustomActivity('');
    }
  };
  
  const handleAddGoal = () => {
    if (customGoal && !learningGoals.includes(customGoal)) {
      setLearningGoals([...learningGoals, customGoal]);
      setCustomGoal('');
    }
  };
  
  const handleAddMaterial = () => {
    if (customMaterial && !materials.includes(customMaterial)) {
      setMaterials([...materials, customMaterial]);
      setCustomMaterial('');
    }
  };
  
  const handleToggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };
  
  const handleToggleGoal = (goal) => {
    if (learningGoals.includes(goal)) {
      setLearningGoals(learningGoals.filter(g => g !== goal));
    } else {
      setLearningGoals([...learningGoals, goal]);
    }
  };
  
  const handleToggleMaterial = (material) => {
    if (materials.includes(material)) {
      setMaterials(materials.filter(m => m !== material));
    } else {
      setMaterials([...materials, material]);
    }
  };
  
  const generateCurriculumPlan = () => {
    const theme = currentTheme === 'custom' ? customTheme : currentTheme;
    
    return {
      theme,
      ageGroup: selectedAgeGroup,
      duration: `${duration} week${duration > 1 ? 's' : ''}`,
      activities: selectedActivities,
      learningGoals,
      materials
    };
  };
  
  const getAgeGroupLabel = (ageGroup) => {
    switch (ageGroup) {
      case 'infants': return 'Infants (0-12 months)';
      case 'toddlers': return 'Toddlers (1-3 years)';
      case 'preschool': return 'Preschool (3-5 years)';
      case 'schoolAge': return 'School Age (5+ years)';
      default: return ageGroup;
    }
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">📚</span> Curriculum Planner
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Theme</label>
            <div className="flex space-x-2">
              <select
                value={currentTheme}
                onChange={handleThemeChange}
                className="flex-1 p-2 border border-input rounded-md bg-background"
              >
                <option value="">Select a theme...</option>
                {themeOptions.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
                <option value="custom">Custom Theme</option>
              </select>
            </div>
            
            {currentTheme === 'custom' && (
              <input
                type="text"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                placeholder="Enter custom theme"
                className="w-full p-2 border border-input rounded-md bg-background mt-2"
              />
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Age Group</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(activityOptions).map(ageGroup => (
                <button
                  key={ageGroup}
                  onClick={() => setSelectedAgeGroup(ageGroup)}
                  className={`p-2 rounded-md transition-colors ${
                    selectedAgeGroup === ageGroup 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  {getAgeGroupLabel(ageGroup)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration (weeks)</label>
            <input
              type="range"
              min="1"
              max="4"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>1 week</span>
              <span>2 weeks</span>
              <span>3 weeks</span>
              <span>4 weeks</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Learning Goals</label>
            <div className="bg-card p-3 rounded-md max-h-40 overflow-y-auto mb-2">
              <div className="grid grid-cols-1 gap-1">
                {learningGoalOptions[selectedAgeGroup].map(goal => (
                  <label key={goal} className="flex items-center space-x-2 p-1 hover:bg-muted rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={learningGoals.includes(goal)}
                      onChange={() => handleToggleGoal(goal)}
                      className="rounded"
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Add custom learning goal"
                className="flex-1 p-2 border border-input rounded-l-md bg-background"
              />
              <button
                onClick={handleAddGoal}
                disabled={!customGoal}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Activities</label>
            <div className="bg-card p-3 rounded-md max-h-40 overflow-y-auto mb-2">
              <div className="grid grid-cols-1 gap-1">
                {activityOptions[selectedAgeGroup].map(activity => (
                  <label key={activity} className="flex items-center space-x-2 p-1 hover:bg-muted rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity)}
                      onChange={() => handleToggleActivity(activity)}
                      className="rounded"
                    />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="Add custom activity"
                className="flex-1 p-2 border border-input rounded-l-md bg-background"
              />
              <button
                onClick={handleAddActivity}
                disabled={!customActivity}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Materials Needed</label>
            <div className="bg-card p-3 rounded-md max-h-40 overflow-y-auto mb-2">
              <div className="grid grid-cols-2 gap-1">
                {materialOptions.map(material => (
                  <label key={material} className="flex items-center space-x-2 p-1 hover:bg-muted rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={materials.includes(material)}
                      onChange={() => handleToggleMaterial(material)}
                      className="rounded"
                    />
                    <span className="text-sm">{material}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={customMaterial}
                onChange={(e) => setCustomMaterial(e.target.value)}
                placeholder="Add custom material"
                className="flex-1 p-2 border border-input rounded-l-md bg-background"
              />
              <button
                onClick={handleAddMaterial}
                disabled={!customMaterial}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-3">Curriculum Plan Preview</h4>
        
        {!currentTheme ? (
          <div className="text-center p-4 text-muted-foreground">
            Select a theme to start building your curriculum plan
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">Theme</h5>
                <p>{currentTheme === 'custom' ? customTheme : currentTheme}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">Age Group</h5>
                <p>{getAgeGroupLabel(selectedAgeGroup)}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">Duration</h5>
                <p>{duration} week{duration > 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-sm text-muted-foreground mb-1">Learning Goals</h5>
              {learningGoals.length === 0 ? (
                <p className="text-sm text-muted-foreground">No learning goals selected</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {learningGoals.map((goal, index) => (
                    <li key={index} className="text-sm">{goal}</li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <h5 className="font-medium text-sm text-muted-foreground mb-1">Activities</h5>
              {selectedActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activities selected</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {selectedActivities.map((activity, index) => (
                    <li key={index} className="text-sm">{activity}</li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <h5 className="font-medium text-sm text-muted-foreground mb-1">Materials Needed</h5>
              {materials.length === 0 ? (
                <p className="text-sm text-muted-foreground">No materials selected</p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {materials.map((material, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentTheme('');
            setCustomTheme('');
            setSelectedAgeGroup('preschool');
            setDuration(1);
            setSelectedActivities([]);
            setLearningGoals([]);
            setMaterials([]);
          }}
          className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
        >
          Clear Plan
        </button>
        <button
          onClick={() => alert('Curriculum plan saved and ready to print!')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
          disabled={!currentTheme || selectedActivities.length === 0}
        >
          Save & Print Plan
        </button>
      </div>
    </div>
  );
};

export default CurriculumPlanner;
