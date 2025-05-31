import React, { useState } from 'react';

const HealthSafetyChecklist: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('daily');
  const [customItem, setCustomItem] = useState('');
  const [checklistItems, setChecklistItems] = useState({
    daily: [
      { id: 'd1', text: 'Check all areas for hazards and cleanliness', completed: false },
      { id: 'd2', text: 'Sanitize all toys and high-touch surfaces', completed: false },
      { id: 'd3', text: 'Verify all cleaning supplies are stored securely', completed: false },
      { id: 'd4', text: 'Check outdoor play area for hazards', completed: false },
      { id: 'd5', text: 'Ensure proper hand washing procedures are followed', completed: false },
      { id: 'd6', text: 'Verify food preparation areas are sanitized', completed: false },
      { id: 'd7', text: 'Check diaper changing stations are stocked and sanitized', completed: false },
      { id: 'd8', text: 'Ensure all medications are properly stored', completed: false }
    ],
    weekly: [
      { id: 'w1', text: 'Deep clean all toys and equipment', completed: false },
      { id: 'w2', text: 'Check first aid kits and restock if needed', completed: false },
      { id: 'w3', text: 'Inspect playground equipment for damage', completed: false },
      { id: 'w4', text: 'Review emergency contact information', completed: false },
      { id: 'w5', text: 'Check smoke detectors and carbon monoxide alarms', completed: false },
      { id: 'w6', text: 'Sanitize sleeping mats and bedding', completed: false },
      { id: 'w7', text: 'Clean refrigerator and check food expiration dates', completed: false }
    ],
    monthly: [
      { id: 'm1', text: 'Conduct fire drill and review evacuation procedures', completed: false },
      { id: 'm2', text: 'Check emergency supplies and disaster kit', completed: false },
      { id: 'm3', text: 'Inspect facility for maintenance issues', completed: false },
      { id: 'm4', text: 'Review health and safety policies with staff', completed: false },
      { id: 'm5', text: 'Check for recalled toys or equipment', completed: false },
      { id: 'm6', text: 'Update children\'s medical information', completed: false },
      { id: 'm7', text: 'Inspect and clean air vents and filters', completed: false }
    ],
    quarterly: [
      { id: 'q1', text: 'Conduct comprehensive safety audit of facility', completed: false },
      { id: 'q2', text: 'Review and update emergency response plan', completed: false },
      { id: 'q3', text: 'Provide staff refresher training on CPR and first aid', completed: false },
      { id: 'q4', text: 'Test emergency lighting systems', completed: false },
      { id: 'q5', text: 'Inspect fire extinguishers', completed: false },
      { id: 'q6', text: 'Review incident reports for patterns', completed: false },
      { id: 'q7', text: 'Conduct shelter-in-place drill', completed: false }
    ]
  });
  
  const [completionStatus, setCompletionStatus] = useState({
    daily: { completed: 0, total: 8 },
    weekly: { completed: 0, total: 7 },
    monthly: { completed: 0, total: 7 },
    quarterly: { completed: 0, total: 7 }
  });
  
  const [showCompletedItems, setShowCompletedItems] = useState(true);
  const [lastCompletedDate, setLastCompletedDate] = useState({
    daily: '',
    weekly: '',
    monthly: '',
    quarterly: ''
  });
  
  const categories = [
    { id: 'daily', label: 'Daily Checks', icon: '📅' },
    { id: 'weekly', label: 'Weekly Checks', icon: '📆' },
    { id: 'monthly', label: 'Monthly Checks', icon: '📋' },
    { id: 'quarterly', label: 'Quarterly Checks', icon: '🗓️' }
  ];
  
  const handleToggleItem = (id: string) => {
    const updatedItems = checklistItems[selectedCategory].map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    
    setChecklistItems({
      ...checklistItems,
      [selectedCategory]: updatedItems
    });
    
    // Update completion status
    const completedCount = updatedItems.filter(item => item.completed).length;
    setCompletionStatus({
      ...completionStatus,
      [selectedCategory]: {
        ...completionStatus[selectedCategory],
        completed: completedCount
      }
    });
    
    // If all items are completed, set the completion date
    if (completedCount === completionStatus[selectedCategory].total) {
      setLastCompletedDate({
        ...lastCompletedDate,
        [selectedCategory]: new Date().toISOString().split('T')[0]
      });
    } else if (lastCompletedDate[selectedCategory] && completedCount < completionStatus[selectedCategory].total) {
      // If items were all completed but now one is unchecked, clear the date
      setLastCompletedDate({
        ...lastCompletedDate,
        [selectedCategory]: ''
      });
    }
  };
  
  const handleAddItem = () => {
    if (customItem.trim()) {
      const newItem = {
        id: `${selectedCategory[0]}${Date.now()}`,
        text: customItem.trim(),
        completed: false
      };
      
      const updatedItems = [...checklistItems[selectedCategory], newItem];
      setChecklistItems({
        ...checklistItems,
        [selectedCategory]: updatedItems
      });
      
      setCompletionStatus({
        ...completionStatus,
        [selectedCategory]: {
          ...completionStatus[selectedCategory],
          total: completionStatus[selectedCategory].total + 1
        }
      });
      
      setCustomItem('');
    }
  };
  
  const handleDeleteItem = (id: string) => {
    const item = checklistItems[selectedCategory].find(item => item.id === id);
    const wasCompleted = item?.completed || false;
    
    const updatedItems = checklistItems[selectedCategory].filter(item => item.id !== id);
    setChecklistItems({
      ...checklistItems,
      [selectedCategory]: updatedItems
    });
    
    setCompletionStatus({
      ...completionStatus,
      [selectedCategory]: {
        completed: wasCompleted 
          ? completionStatus[selectedCategory].completed - 1 
          : completionStatus[selectedCategory].completed,
        total: completionStatus[selectedCategory].total - 1
      }
    });
  };
  
  const handleResetChecklist = () => {
    if (confirm(`Reset all ${selectedCategory} checklist items? This cannot be undone.`)) {
      const resetItems = checklistItems[selectedCategory].map(item => ({
        ...item,
        completed: false
      }));
      
      setChecklistItems({
        ...checklistItems,
        [selectedCategory]: resetItems
      });
      
      setCompletionStatus({
        ...completionStatus,
        [selectedCategory]: {
          ...completionStatus[selectedCategory],
          completed: 0
        }
      });
      
      setLastCompletedDate({
        ...lastCompletedDate,
        [selectedCategory]: ''
      });
    }
  };
  
  const getFilteredItems = () => {
    if (showCompletedItems) {
      return checklistItems[selectedCategory];
    } else {
      return checklistItems[selectedCategory].filter(item => !item.completed);
    }
  };
  
  const getCompletionPercentage = (category: string) => {
    const { completed, total } = completionStatus[category];
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not completed';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🧹</span> Health & Safety Checklist
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-3 rounded-lg transition-colors ${
              selectedCategory === category.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card hover:bg-muted'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="mr-2 text-xl">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                getCompletionPercentage(category.id) === 100
                  ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
              }`}>
                {completionStatus[category.id].completed}/{completionStatus[category.id].total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${getCompletionPercentage(category.id)}%`,
                  backgroundColor: getCompletionPercentage(category.id) === 100 
                    ? 'var(--success, var(--secondary))' 
                    : 'var(--primary)'
                }}
              ></div>
            </div>
            {lastCompletedDate[category.id] && (
              <div className="text-xs text-muted-foreground mt-1">
                Last completed: {formatDate(lastCompletedDate[category.id])}
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <h4 className="font-bold flex items-center">
          <span className="mr-2">
            {categories.find(c => c.id === selectedCategory)?.icon}
          </span>
          {categories.find(c => c.id === selectedCategory)?.label}
        </h4>
        <div className="flex items-center space-x-2">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={showCompletedItems}
              onChange={() => setShowCompletedItems(!showCompletedItems)}
              className="mr-2 rounded"
            />
            Show completed items
          </label>
          <button
            onClick={handleResetChecklist}
            className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm hover:bg-muted/80 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg overflow-hidden mb-4">
        <div className="max-h-96 overflow-y-auto">
          {getFilteredItems().length > 0 ? (
            getFilteredItems().map(item => (
              <div 
                key={item.id} 
                className={`flex items-center p-3 border-b hover:bg-muted/50 transition-colors ${
                  item.completed ? 'bg-muted/30' : ''
                }`}
              >
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleItem(item.id)}
                    className="mr-3 rounded"
                  />
                  <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                    {item.text}
                  </span>
                </label>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-destructive hover:text-destructive/80 ml-2"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              {showCompletedItems 
                ? 'No checklist items available' 
                : 'All items completed! 🎉'}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          placeholder="Add new checklist item"
          className="flex-1 p-2 border border-input rounded-l-md bg-background"
        />
        <button
          onClick={handleAddItem}
          disabled={!customItem.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/80 disabled:opacity-50 transition-colors"
        >
          Add Item
        </button>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => alert('Checklist exported as PDF!')}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
        >
          Export Checklist
        </button>
        <button
          onClick={() => {
            if (getCompletionPercentage(selectedCategory) === 100) {
              alert(`${categories.find(c => c.id === selectedCategory)?.label} completed and logged!`);
            } else {
              alert('Please complete all checklist items before logging.');
            }
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
          disabled={getCompletionPercentage(selectedCategory) !== 100}
        >
          Log Completion
        </button>
      </div>
    </div>
  );
};

export default HealthSafetyChecklist;
