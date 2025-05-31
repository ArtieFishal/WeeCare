import React, { useState } from 'react';

const MarketingStrategiesPlanner: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState('enrollment');
  const [selectedBudget, setSelectedBudget] = useState('medium');
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarter');
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [customStrategy, setCustomStrategy] = useState('');
  const [marketingPlan, setMarketingPlan] = useState<{
    title: string;
    description: string;
    strategies: Array<{
      name: string;
      description: string;
      cost: string;
      timeframe: string;
      effectiveness: number;
      selected: boolean;
    }>;
  } | null>(null);
  
  const goals = [
    { id: 'enrollment', label: 'Increase Enrollment', icon: '👶' },
    { id: 'retention', label: 'Improve Retention', icon: '🔄' },
    { id: 'awareness', label: 'Build Brand Awareness', icon: '🏆' },
    { id: 'quality', label: 'Highlight Program Quality', icon: '⭐' },
    { id: 'community', label: 'Community Engagement', icon: '🤝' }
  ];
  
  const budgets = [
    { id: 'low', label: 'Limited Budget (Under $1,000)', icon: '💰' },
    { id: 'medium', label: 'Moderate Budget ($1,000-$5,000)', icon: '💰💰' },
    { id: 'high', label: 'Substantial Budget ($5,000+)', icon: '💰💰💰' }
  ];
  
  const timeframes = [
    { id: 'month', label: '1 Month (Short-term)', icon: '📅' },
    { id: 'quarter', label: '3 Months (Quarterly)', icon: '📆' },
    { id: 'year', label: '12 Months (Annual)', icon: '🗓️' }
  ];
  
  // Database of marketing strategies organized by goal
  const marketingStrategies = {
    enrollment: [
      {
        name: 'Referral Program',
        description: 'Create incentives for current families to refer new enrollments',
        cost: 'Low',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Open House Events',
        description: 'Host regular open house events for prospective families',
        cost: 'Medium',
        timeframe: 'Monthly/Quarterly',
        effectiveness: 5,
        budgets: ['medium', 'high']
      },
      {
        name: 'Digital Advertising',
        description: 'Targeted social media and search engine ads to reach local parents',
        cost: 'Medium-High',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['medium', 'high']
      },
      {
        name: 'SEO Optimization',
        description: 'Improve website visibility in search results for local childcare queries',
        cost: 'Medium',
        timeframe: '3-6 months',
        effectiveness: 3,
        budgets: ['medium', 'high']
      },
      {
        name: 'Community Partnerships',
        description: 'Partner with local businesses, hospitals, and employers',
        cost: 'Low',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Virtual Tours',
        description: 'Create professional virtual tours of your facility',
        cost: 'Medium',
        timeframe: 'One-time',
        effectiveness: 3,
        budgets: ['medium', 'high']
      }
    ],
    retention: [
      {
        name: 'Parent Satisfaction Surveys',
        description: 'Regular feedback collection to address concerns quickly',
        cost: 'Low',
        timeframe: 'Quarterly',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Family Events',
        description: 'Host regular events that build community among enrolled families',
        cost: 'Medium',
        timeframe: 'Monthly/Quarterly',
        effectiveness: 5,
        budgets: ['medium', 'high']
      },
      {
        name: 'Loyalty Discounts',
        description: 'Offer multi-year enrollment discounts or sibling discounts',
        cost: 'Medium-High',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['medium', 'high']
      },
      {
        name: 'Enhanced Communication',
        description: 'Implement parent communication app with daily updates',
        cost: 'Medium',
        timeframe: 'Ongoing',
        effectiveness: 5,
        budgets: ['medium', 'high']
      },
      {
        name: 'Parent Education Workshops',
        description: 'Offer valuable parenting workshops and resources',
        cost: 'Low-Medium',
        timeframe: 'Quarterly',
        effectiveness: 3,
        budgets: ['low', 'medium', 'high']
      }
    ],
    awareness: [
      {
        name: 'Social Media Campaign',
        description: 'Consistent, engaging content across social platforms',
        cost: 'Low-Medium',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Local Media Coverage',
        description: 'Press releases and story pitches to local news outlets',
        cost: 'Low',
        timeframe: 'Quarterly',
        effectiveness: 3,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Community Event Sponsorships',
        description: 'Sponsor family-friendly local events with branded materials',
        cost: 'Medium-High',
        timeframe: 'Seasonal',
        effectiveness: 4,
        budgets: ['medium', 'high']
      },
      {
        name: 'Billboard/Outdoor Advertising',
        description: 'Strategic placement in high-traffic areas',
        cost: 'High',
        timeframe: '3-12 months',
        effectiveness: 3,
        budgets: ['high']
      },
      {
        name: 'Branded Vehicle',
        description: 'Company vehicle with eye-catching branding',
        cost: 'High',
        timeframe: 'Long-term',
        effectiveness: 3,
        budgets: ['high']
      }
    ],
    quality: [
      {
        name: 'Accreditation Promotion',
        description: 'Highlight accreditations and quality ratings in all materials',
        cost: 'Low',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Staff Credentials Showcase',
        description: 'Feature teacher qualifications and ongoing professional development',
        cost: 'Low',
        timeframe: 'Ongoing',
        effectiveness: 3,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Curriculum Highlights',
        description: 'Create materials showcasing your unique curriculum approach',
        cost: 'Medium',
        timeframe: 'Seasonal',
        effectiveness: 4,
        budgets: ['medium', 'high']
      },
      {
        name: 'Video Testimonials',
        description: 'Professional videos featuring satisfied parents and children',
        cost: 'Medium-High',
        timeframe: 'One-time',
        effectiveness: 5,
        budgets: ['medium', 'high']
      },
      {
        name: 'Before/After Learning Documentation',
        description: 'Showcase children\'s growth and development over time',
        cost: 'Low',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      }
    ],
    community: [
      {
        name: 'Community Service Projects',
        description: 'Organize family volunteer opportunities in the community',
        cost: 'Low',
        timeframe: 'Quarterly',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Free Parenting Workshops',
        description: 'Host educational events open to the community',
        cost: 'Medium',
        timeframe: 'Quarterly',
        effectiveness: 3,
        budgets: ['medium', 'high']
      },
      {
        name: 'Local Business Partnerships',
        description: 'Cross-promotion with complementary family-oriented businesses',
        cost: 'Low',
        timeframe: 'Ongoing',
        effectiveness: 4,
        budgets: ['low', 'medium', 'high']
      },
      {
        name: 'Community Resource Center',
        description: 'Establish your center as a hub for family resources',
        cost: 'Medium-High',
        timeframe: 'Long-term',
        effectiveness: 3,
        budgets: ['medium', 'high']
      },
      {
        name: 'Neighborhood Events',
        description: 'Host seasonal events open to the neighborhood',
        cost: 'Medium',
        timeframe: 'Seasonal',
        effectiveness: 4,
        budgets: ['medium', 'high']
      }
    ]
  };
  
  const handleAddStrategy = () => {
    if (customStrategy.trim()) {
      setSelectedStrategies([...selectedStrategies, customStrategy.trim()]);
      setCustomStrategy('');
    }
  };
  
  const handleToggleStrategy = (strategy: string) => {
    if (selectedStrategies.includes(strategy)) {
      setSelectedStrategies(selectedStrategies.filter(s => s !== strategy));
    } else {
      setSelectedStrategies([...selectedStrategies, strategy]);
    }
  };
  
  const handleGeneratePlan = () => {
    // Filter strategies based on selected goal and budget
    const availableStrategies = marketingStrategies[selectedGoal]
      .filter(strategy => strategy.budgets.includes(selectedBudget))
      .map(strategy => ({
        ...strategy,
        selected: selectedStrategies.includes(strategy.name)
      }));
    
    // Create plan title based on selections
    const goalLabel = goals.find(g => g.id === selectedGoal)?.label;
    const budgetLabel = budgets.find(b => b.id === selectedBudget)?.label;
    const timeframeLabel = timeframes.find(t => t.id === selectedTimeframe)?.label;
    
    const planTitle = `${goalLabel} Plan: ${timeframeLabel} with ${budgetLabel}`;
    
    // Create plan description
    const planDescription = `This marketing plan focuses on ${goalLabel.toLowerCase()} with a ${budgetLabel.toLowerCase()} over a ${timeframeLabel.toLowerCase()} timeframe.`;
    
    setMarketingPlan({
      title: planTitle,
      description: planDescription,
      strategies: availableStrategies
    });
  };
  
  const getFilteredStrategies = () => {
    return marketingStrategies[selectedGoal]
      .filter(strategy => strategy.budgets.includes(selectedBudget));
  };
  
  const getEffectivenessStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">📣</span> Marketing Strategies Planner
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h4 className="font-bold mb-3">Marketing Goal</h4>
          <div className="space-y-2">
            {goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`w-full p-3 rounded-lg transition-colors flex items-center ${
                  selectedGoal === goal.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-muted'
                }`}
              >
                <span className="text-xl mr-3">{goal.icon}</span>
                <span>{goal.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-3">Budget Range</h4>
          <div className="space-y-2">
            {budgets.map(budget => (
              <button
                key={budget.id}
                onClick={() => setSelectedBudget(budget.id)}
                className={`w-full p-3 rounded-lg transition-colors flex items-center ${
                  selectedBudget === budget.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-muted'
                }`}
              >
                <span className="text-xl mr-3">{budget.icon}</span>
                <span>{budget.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-3">Timeframe</h4>
          <div className="space-y-2">
            {timeframes.map(timeframe => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`w-full p-3 rounded-lg transition-colors flex items-center ${
                  selectedTimeframe === timeframe.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-muted'
                }`}
              >
                <span className="text-xl mr-3">{timeframe.icon}</span>
                <span>{timeframe.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-bold mb-3">Recommended Strategies</h4>
        <div className="bg-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-muted text-xs font-medium">
            <div className="col-span-4">Strategy</div>
            <div className="col-span-4">Details</div>
            <div className="col-span-2">Cost</div>
            <div className="col-span-2">Effectiveness</div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {getFilteredStrategies().map((strategy, index) => (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-2 p-3 border-b items-center hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStrategies.includes(strategy.name)}
                      onChange={() => handleToggleStrategy(strategy.name)}
                      className="rounded"
                    />
                    <span className="font-medium">{strategy.name}</span>
                  </label>
                </div>
                <div className="col-span-4">
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                  <p className="text-xs mt-1">{strategy.timeframe}</p>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    strategy.cost === 'Low' 
                      ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100' 
                      : strategy.cost === 'Medium' || strategy.cost === 'Low-Medium'
                        ? 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
                        : 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-100'
                  }`}>
                    {strategy.cost}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-amber-500 dark:text-amber-300">
                    {getEffectivenessStars(strategy.effectiveness)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2 mt-3">
          <input
            type="text"
            value={customStrategy}
            onChange={(e) => setCustomStrategy(e.target.value)}
            placeholder="Add custom strategy"
            className="flex-1 p-2 border border-input rounded-l-md bg-background"
          />
          <button
            onClick={handleAddStrategy}
            disabled={!customStrategy.trim()}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={handleGeneratePlan}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors text-lg font-medium"
          disabled={selectedStrategies.length === 0}
        >
          Generate Marketing Plan
        </button>
      </div>
      
      {marketingPlan && (
        <div className="bg-card p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">{marketingPlan.title}</h4>
          <p className="text-muted-foreground mb-4">{marketingPlan.description}</p>
          
          <h5 className="font-medium mb-2">Selected Strategies</h5>
          <div className="space-y-3 mb-4">
            {marketingPlan.strategies
              .filter(strategy => selectedStrategies.includes(strategy.name))
              .map((strategy, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-start">
                    <h6 className="font-medium">{strategy.name}</h6>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      strategy.cost === 'Low' 
                        ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100' 
                        : strategy.cost === 'Medium' || strategy.cost === 'Low-Medium'
                          ? 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
                          : 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-100'
                    }`}>
                      {strategy.cost}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{strategy.description}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>Timeframe: {strategy.timeframe}</span>
                    <span className="text-amber-500 dark:text-amber-300">
                      {getEffectivenessStars(strategy.effectiveness)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          
          <h5 className="font-medium mb-2">Implementation Timeline</h5>
          <div className="bg-muted p-3 rounded-lg mb-4">
            <div className="space-y-2">
              <div>
                <h6 className="text-sm font-medium">Immediate (First Month)</h6>
                <ul className="list-disc pl-5 text-sm">
                  <li>Set specific, measurable goals for each strategy</li>
                  <li>Prepare marketing materials and messaging</li>
                  <li>Assign responsibilities to team members</li>
                </ul>
              </div>
              
              <div>
                <h6 className="text-sm font-medium">Short-term (1-3 Months)</h6>
                <ul className="list-disc pl-5 text-sm">
                  <li>Launch initial campaigns and strategies</li>
                  <li>Begin tracking metrics and results</li>
                  <li>Make adjustments based on early feedback</li>
                </ul>
              </div>
              
              <div>
                <h6 className="text-sm font-medium">Long-term (3+ Months)</h6>
                <ul className="list-disc pl-5 text-sm">
                  <li>Evaluate effectiveness of each strategy</li>
                  <li>Scale successful approaches</li>
                  <li>Adjust or replace underperforming strategies</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h5 className="font-medium mb-2">Success Metrics</h5>
          <div className="bg-muted p-3 rounded-lg mb-4">
            <div className="space-y-2 text-sm">
              {selectedGoal === 'enrollment' && (
                <>
                  <p>• Number of inquiries received</p>
                  <p>• Tour-to-enrollment conversion rate</p>
                  <p>• Enrollment growth percentage</p>
                  <p>• Cost per new enrollment</p>
                </>
              )}
              
              {selectedGoal === 'retention' && (
                <>
                  <p>• Annual retention rate</p>
                  <p>• Parent satisfaction scores</p>
                  <p>• Average length of enrollment</p>
                  <p>• Exit survey feedback</p>
                </>
              )}
              
              {selectedGoal === 'awareness' && (
                <>
                  <p>• Website traffic growth</p>
                  <p>• Social media engagement metrics</p>
                  <p>• Brand recognition surveys</p>
                  <p>• Media mentions and coverage</p>
                </>
              )}
              
              {selectedGoal === 'quality' && (
                <>
                  <p>• Parent perception surveys</p>
                  <p>• Quality rating improvements</p>
                  <p>• Staff retention and qualifications</p>
                  <p>• Positive reviews and testimonials</p>
                </>
              )}
              
              {selectedGoal === 'community' && (
                <>
                  <p>• Community event attendance</p>
                  <p>• Partnership growth metrics</p>
                  <p>• Community feedback surveys</p>
                  <p>• Volunteer participation rates</p>
                </>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => alert('Marketing plan saved and ready to print!')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
            >
              Save & Print Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingStrategiesPlanner;
