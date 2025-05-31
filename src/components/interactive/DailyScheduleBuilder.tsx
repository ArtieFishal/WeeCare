import React, { useState } from 'react';

const DailyScheduleBuilder: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState('preschool');
  const [programHours, setProgramHours] = useState({ start: '07:30', end: '18:00' });
  const [activities, setActivities] = useState<Array<{
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    category: string;
    description: string;
  }>>([
    { id: '1', name: 'Arrival & Free Play', startTime: '07:30', endTime: '08:30', category: 'transition', description: 'Greeting children, health check, free choice activities' },
    { id: '2', name: 'Breakfast', startTime: '08:30', endTime: '09:00', category: 'meal', description: 'Family-style meal service, conversation, nutrition education' },
    { id: '3', name: 'Circle Time', startTime: '09:00', endTime: '09:30', category: 'group', description: 'Calendar, weather, songs, story, introduction to daily activities' },
    { id: '4', name: 'Learning Centers', startTime: '09:30', endTime: '10:45', category: 'learning', description: 'Child-directed play in various centers (art, blocks, dramatic play, etc.)' },
    { id: '5', name: 'Outdoor Play', startTime: '10:45', endTime: '11:45', category: 'physical', description: 'Gross motor activities, nature exploration, games' },
    { id: '6', name: 'Lunch', startTime: '11:45', endTime: '12:30', category: 'meal', description: 'Family-style meal service, conversation, self-help skills' },
    { id: '7', name: 'Rest Time', startTime: '12:30', endTime: '14:30', category: 'rest', description: 'Quiet activities for non-sleepers after 30 minutes' },
    { id: '8', name: 'Snack', startTime: '14:30', endTime: '15:00', category: 'meal', description: 'Healthy snack and conversation' },
    { id: '9', name: 'Afternoon Activity', startTime: '15:00', endTime: '16:00', category: 'learning', description: 'Art, science, cooking, or special projects' },
    { id: '10', name: 'Outdoor Play', startTime: '16:00', endTime: '17:00', category: 'physical', description: 'Gross motor activities, free play' },
    { id: '11', name: 'Quiet Activities & Departure', startTime: '17:00', endTime: '18:00', category: 'transition', description: 'Reading, puzzles, table toys, parent communication' }
  ]);
  
  const [editingActivity, setEditingActivity] = useState<null | {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    category: string;
    description: string;
  }>(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: '',
    startTime: '',
    endTime: '',
    category: 'learning',
    description: ''
  });
  
  const categoryOptions = [
    { value: 'transition', label: 'Transition', color: 'bg-blue-200 dark:bg-blue-900' },
    { value: 'meal', label: 'Meals & Snacks', color: 'bg-green-200 dark:bg-green-900' },
    { value: 'group', label: 'Group Time', color: 'bg-purple-200 dark:bg-purple-900' },
    { value: 'learning', label: 'Learning Activities', color: 'bg-amber-200 dark:bg-amber-900' },
    { value: 'physical', label: 'Physical Activity', color: 'bg-red-200 dark:bg-red-900' },
    { value: 'rest', label: 'Rest & Quiet Time', color: 'bg-indigo-200 dark:bg-indigo-900' }
  ];
  
  const ageGroupTemplates = {
    infants: {
      name: 'Infants (0-12 months)',
      description: 'Flexible schedule based on individual needs',
      activities: [
        { name: 'Arrival & Health Check', startTime: '07:30', endTime: '08:30', category: 'transition', description: 'Greeting, diaper check, parent communication' },
        { name: 'Bottle/Feeding', startTime: '08:30', endTime: '09:00', category: 'meal', description: 'Individual feeding schedule' },
        { name: 'Tummy Time/Play', startTime: '09:00', endTime: '09:30', category: 'physical', description: 'Supervised floor play, sensory activities' },
        { name: 'Morning Nap', startTime: '09:30', endTime: '10:30', category: 'rest', description: 'Individual sleep schedules' },
        { name: 'Sensory Activities', startTime: '10:30', endTime: '11:00', category: 'learning', description: 'Texture exploration, music, mirrors' },
        { name: 'Outdoor Time', startTime: '11:00', endTime: '11:30', category: 'physical', description: 'Fresh air, nature observation (weather permitting)' },
        { name: 'Lunch/Bottle', startTime: '11:30', endTime: '12:15', category: 'meal', description: 'Individual feeding schedule' },
        { name: 'Story Time', startTime: '12:15', endTime: '12:30', category: 'group', description: 'Soft books, rhymes, gentle songs' },
        { name: 'Afternoon Nap', startTime: '12:30', endTime: '14:30', category: 'rest', description: 'Individual sleep schedules' },
        { name: 'Bottle/Snack', startTime: '14:30', endTime: '15:00', category: 'meal', description: 'Individual feeding schedule' },
        { name: 'One-on-One Time', startTime: '15:00', endTime: '16:00', category: 'learning', description: 'Individual attention, developmental activities' },
        { name: 'Quiet Play', startTime: '16:00', endTime: '17:00', category: 'learning', description: 'Soft toys, gentle music' },
        { name: 'Departure', startTime: '17:00', endTime: '18:00', category: 'transition', description: 'Diaper change, parent communication' }
      ]
    },
    toddlers: {
      name: 'Toddlers (1-3 years)',
      description: 'Consistent schedule with flexibility for individual needs',
      activities: [
        { name: 'Arrival & Free Play', startTime: '07:30', endTime: '08:30', category: 'transition', description: 'Greeting, health check, toys and books' },
        { name: 'Breakfast', startTime: '08:30', endTime: '09:00', category: 'meal', description: 'Self-feeding practice, sippy cups' },
        { name: 'Diaper Check/Potty', startTime: '09:00', endTime: '09:15', category: 'transition', description: 'Diaper changes or potty training support' },
        { name: 'Circle Time', startTime: '09:15', endTime: '09:30', category: 'group', description: 'Short songs, finger plays, simple stories' },
        { name: 'Art/Sensory Play', startTime: '09:30', endTime: '10:15', category: 'learning', description: 'Finger painting, playdough, water play' },
        { name: 'Outdoor Play', startTime: '10:15', endTime: '11:15', category: 'physical', description: 'Climbing, riding toys, balls' },
        { name: 'Lunch', startTime: '11:30', endTime: '12:15', category: 'meal', description: 'Self-feeding practice, introducing utensils' },
        { name: 'Diaper Check/Potty', startTime: '12:15', endTime: '12:30', category: 'transition', description: 'Diaper changes or potty training support' },
        { name: 'Nap Time', startTime: '12:30', endTime: '14:30', category: 'rest', description: 'Sleep or quiet activities on cot' },
        { name: 'Snack', startTime: '14:45', endTime: '15:15', category: 'meal', description: 'Healthy snacks, self-feeding practice' },
        { name: 'Music & Movement', startTime: '15:15', endTime: '15:45', category: 'physical', description: 'Dancing, instruments, action songs' },
        { name: 'Outdoor/Gym Play', startTime: '15:45', endTime: '16:45', category: 'physical', description: 'Gross motor activities' },
        { name: 'Story Time & Departure', startTime: '16:45', endTime: '18:00', category: 'transition', description: 'Books, quiet toys, parent communication' }
      ]
    },
    preschool: {
      name: 'Preschool (3-5 years)',
      description: 'Structured schedule with balance of activities',
      activities: [
        { name: 'Arrival & Free Play', startTime: '07:30', endTime: '08:30', category: 'transition', description: 'Greeting children, health check, free choice activities' },
        { name: 'Breakfast', startTime: '08:30', endTime: '09:00', category: 'meal', description: 'Family-style meal service, conversation, nutrition education' },
        { name: 'Circle Time', startTime: '09:00', endTime: '09:30', category: 'group', description: 'Calendar, weather, songs, story, introduction to daily activities' },
        { name: 'Learning Centers', startTime: '09:30', endTime: '10:45', category: 'learning', description: 'Child-directed play in various centers (art, blocks, dramatic play, etc.)' },
        { name: 'Outdoor Play', startTime: '10:45', endTime: '11:45', category: 'physical', description: 'Gross motor activities, nature exploration, games' },
        { name: 'Lunch', startTime: '11:45', endTime: '12:30', category: 'meal', description: 'Family-style meal service, conversation, self-help skills' },
        { name: 'Rest Time', startTime: '12:30', endTime: '14:30', category: 'rest', description: 'Quiet activities for non-sleepers after 30 minutes' },
        { name: 'Snack', startTime: '14:30', endTime: '15:00', category: 'meal', description: 'Healthy snack and conversation' },
        { name: 'Afternoon Activity', startTime: '15:00', endTime: '16:00', category: 'learning', description: 'Art, science, cooking, or special projects' },
        { name: 'Outdoor Play', startTime: '16:00', endTime: '17:00', category: 'physical', description: 'Gross motor activities, free play' },
        { name: 'Quiet Activities & Departure', startTime: '17:00', endTime: '18:00', category: 'transition', description: 'Reading, puzzles, table toys, parent communication' }
      ]
    },
    schoolAge: {
      name: 'School Age (5+ years)',
      description: 'Before/after school care with enrichment activities',
      activities: [
        { name: 'Arrival & Breakfast', startTime: '07:00', endTime: '07:45', category: 'meal', description: 'Breakfast options, quiet activities' },
        { name: 'Homework Help', startTime: '07:45', endTime: '08:15', category: 'learning', description: 'Last-minute homework assistance' },
        { name: 'School Departure', startTime: '08:15', endTime: '08:45', category: 'transition', description: 'Prepare for school, bus or walk to school' },
        { name: 'School Return & Snack', startTime: '15:00', endTime: '15:30', category: 'meal', description: 'Check-in, healthy snack, unwind time' },
        { name: 'Homework Time', startTime: '15:30', endTime: '16:15', category: 'learning', description: 'Quiet space for homework completion, reading' },
        { name: 'Outdoor Play/Sports', startTime: '16:15', endTime: '17:15', category: 'physical', description: 'Team games, playground time, free play' },
        { name: 'Enrichment Activities', startTime: '17:15', endTime: '18:00', category: 'learning', description: 'Art, STEM projects, cooking, clubs' },
        { name: 'Clean-up & Departure', startTime: '18:00', endTime: '18:30', category: 'transition', description: 'Responsibility for space, parent communication' }
      ]
    }
  };
  
  const handleAgeGroupChange = (newAgeGroup) => {
    if (confirm('Changing age group will reset your current schedule. Continue?')) {
      setAgeGroup(newAgeGroup);
      setActivities(ageGroupTemplates[newAgeGroup].activities);
    }
  };
  
  const handleProgramHoursChange = (field, value) => {
    setProgramHours({
      ...programHours,
      [field]: value
    });
  };
  
  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.startTime || !newActivity.endTime) return;
    
    const newId = Date.now().toString();
    setActivities([
      ...activities,
      {
        id: newId,
        ...newActivity
      }
    ]);
    
    setNewActivity({
      name: '',
      startTime: '',
      endTime: '',
      category: 'learning',
      description: ''
    });
    
    setShowAddForm(false);
  };
  
  const handleUpdateActivity = () => {
    if (!editingActivity) return;
    
    setActivities(activities.map(activity => 
      activity.id === editingActivity.id ? editingActivity : activity
    ));
    
    setEditingActivity(null);
  };
  
  const handleDeleteActivity = (id) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };
  
  const handleMoveActivity = (id, direction) => {
    const currentIndex = activities.findIndex(activity => activity.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === activities.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newActivities = [...activities];
    const [movedItem] = newActivities.splice(currentIndex, 1);
    newActivities.splice(newIndex, 0, movedItem);
    
    setActivities(newActivities);
  };
  
  const sortActivities = () => {
    const sorted = [...activities].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
    setActivities(sorted);
  };
  
  const getCategoryColor = (categoryValue) => {
    const category = categoryOptions.find(cat => cat.value === categoryValue);
    return category ? category.color : 'bg-gray-200 dark:bg-gray-700';
  };
  
  const getCategoryLabel = (categoryValue) => {
    const category = categoryOptions.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };
  
  const formatTimeRange = (start, end) => {
    return `${formatTime(start)} - ${formatTime(end)}`;
  };
  
  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (e) {
      return timeString;
    }
  };
  
  const calculateDuration = (startTime, endTime) => {
    try {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      
      let durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
      if (durationMinutes < 0) durationMinutes += 24 * 60; // Handle overnight
      
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      
      return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;
    } catch (e) {
      return '';
    }
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">⏰</span> Daily Schedule Builder
      </h3>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age Group</label>
            <select
              value={ageGroup}
              onChange={(e) => handleAgeGroupChange(e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              {Object.keys(ageGroupTemplates).map(key => (
                <option key={key} value={key}>{ageGroupTemplates[key].name}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">{ageGroupTemplates[ageGroup].description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Program Start Time</label>
            <input
              type="time"
              value={programHours.start}
              onChange={(e) => handleProgramHoursChange('start', e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Program End Time</label>
            <input
              type="time"
              value={programHours.end}
              onChange={(e) => handleProgramHoursChange('end', e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold">Daily Activities</h4>
          <div className="flex space-x-2">
            <button
              onClick={sortActivities}
              className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm hover:bg-accent/80 transition-colors"
            >
              Sort by Time
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/80 transition-colors"
            >
              Add Activity
            </button>
          </div>
        </div>
        
        {showAddForm && (
          <div className="bg-card p-4 rounded-lg mb-4">
            <h5 className="font-medium mb-3">Add New Activity</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Activity Name</label>
                <input
                  type="text"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  placeholder="e.g., Circle Time"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={newActivity.startTime}
                  onChange={(e) => setNewActivity({...newActivity, startTime: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={newActivity.endTime}
                  onChange={(e) => setNewActivity({...newActivity, endTime: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  placeholder="Brief description of the activity"
                  rows={2}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddActivity}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                disabled={!newActivity.name || !newActivity.startTime || !newActivity.endTime}
              >
                Add Activity
              </button>
            </div>
          </div>
        )}
        
        {editingActivity && (
          <div className="bg-card p-4 rounded-lg mb-4">
            <h5 className="font-medium mb-3">Edit Activity</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Activity Name</label>
                <input
                  type="text"
                  value={editingActivity.name}
                  onChange={(e) => setEditingActivity({...editingActivity, name: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={editingActivity.category}
                  onChange={(e) => setEditingActivity({...editingActivity, category: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={editingActivity.startTime}
                  onChange={(e) => setEditingActivity({...editingActivity, startTime: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={editingActivity.endTime}
                  onChange={(e) => setEditingActivity({...editingActivity, endTime: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={editingActivity.description}
                  onChange={(e) => setEditingActivity({...editingActivity, description: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  rows={2}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingActivity(null)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateActivity}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                disabled={!editingActivity.name || !editingActivity.startTime || !editingActivity.endTime}
              >
                Update Activity
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-muted text-xs font-medium">
            <div className="col-span-2">Time</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-3">Activity</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Actions</div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="grid grid-cols-12 gap-2 p-3 border-b items-center hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-2 text-sm">
                  {formatTimeRange(activity.startTime, activity.endTime)}
                </div>
                <div className="col-span-2 text-xs text-muted-foreground">
                  {calculateDuration(activity.startTime, activity.endTime)}
                </div>
                <div className="col-span-3">
                  <div className="font-medium">{activity.name}</div>
                  {activity.description && (
                    <div className="text-xs text-muted-foreground line-clamp-1">{activity.description}</div>
                  )}
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(activity.category)}`}>
                    {getCategoryLabel(activity.category)}
                  </span>
                </div>
                <div className="col-span-3 flex space-x-1">
                  <button
                    onClick={() => handleMoveActivity(activity.id, 'up')}
                    disabled={index === 0}
                    className="p-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 disabled:opacity-30"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveActivity(activity.id, 'down')}
                    disabled={index === activities.length - 1}
                    className="p-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 disabled:opacity-30"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => setEditingActivity(activity)}
                    className="p-1 bg-accent text-accent-foreground rounded hover:bg-accent/80"
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => {
            if (confirm('Reset to template schedule?')) {
              setActivities(ageGroupTemplates[ageGroup].activities);
            }
          }}
          className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
        >
          Reset to Template
        </button>
        <button
          onClick={() => alert('Schedule saved and ready to print!')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
        >
          Save & Print Schedule
        </button>
      </div>
    </div>
  );
};

export default DailyScheduleBuilder;
