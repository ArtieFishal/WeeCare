import React, { useState } from 'react';

const ActivityGenerator: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState('preschool');
  const [developmentalArea, setDevelopmentalArea] = useState('physical');
  const [duration, setDuration] = useState('15-30');
  const [groupSize, setGroupSize] = useState('small');
  const [materials, setMaterials] = useState<string[]>([]);
  const [customMaterial, setCustomMaterial] = useState('');
  const [generatedActivities, setGeneratedActivities] = useState<Array<{
    title: string;
    description: string;
    objectives: string[];
    materials: string[];
    steps: string[];
    extensions: string[];
    favorite: boolean;
  }>>([]);
  
  const ageGroups = [
    { value: 'infants', label: 'Infants (0-12 months)' },
    { value: 'toddlers', label: 'Toddlers (1-3 years)' },
    { value: 'preschool', label: 'Preschool (3-5 years)' },
    { value: 'schoolAge', label: 'School Age (5+ years)' }
  ];
  
  const developmentalAreas = [
    { value: 'physical', label: 'Physical Development', icon: '🏃‍♀️' },
    { value: 'cognitive', label: 'Cognitive Development', icon: '🧠' },
    { value: 'language', label: 'Language Development', icon: '💬' },
    { value: 'social', label: 'Social-Emotional Development', icon: '❤️' },
    { value: 'creative', label: 'Creative Arts', icon: '🎨' }
  ];
  
  const durations = [
    { value: '5-15', label: '5-15 minutes' },
    { value: '15-30', label: '15-30 minutes' },
    { value: '30-60', label: '30-60 minutes' },
    { value: '60+', label: '60+ minutes' }
  ];
  
  const groupSizes = [
    { value: 'individual', label: 'Individual' },
    { value: 'small', label: 'Small Group (2-5 children)' },
    { value: 'medium', label: 'Medium Group (6-10 children)' },
    { value: 'large', label: 'Large Group (11+ children)' }
  ];
  
  const commonMaterials = {
    physical: ['Balls', 'Hula hoops', 'Balance beam', 'Parachute', 'Cones', 'Jump ropes', 'Tunnels', 'Bean bags'],
    cognitive: ['Puzzles', 'Sorting trays', 'Counting bears', 'Pattern blocks', 'Memory games', 'Magnifying glasses', 'Measuring tools'],
    language: ['Books', 'Puppets', 'Letter cards', 'Picture cards', 'Felt board', 'Recording devices', 'Writing materials'],
    social: ['Dolls', 'Dress-up clothes', 'Play food', 'Emotion cards', 'Mirrors', 'Turn-taking games', 'Cooperative games'],
    creative: ['Paint', 'Markers', 'Clay', 'Collage materials', 'Musical instruments', 'Scarves', 'Recyclables']
  };
  
  // Activity database organized by age group and developmental area
  const activityDatabase = {
    infants: {
      physical: [
        {
          title: 'Tummy Time Exploration',
          description: 'Strengthen neck and upper body muscles through supervised floor play.',
          objectives: ['Develop neck strength', 'Build upper body muscles', 'Practice head control'],
          materials: ['Soft blanket', 'Mirrors', 'High-contrast toys'],
          steps: [
            'Place a soft blanket on the floor',
            'Position baby on their tummy',
            'Place toys within reach to encourage movement',
            'Supervise and interact for 3-5 minutes at a time',
            'Increase duration as baby builds strength'
          ],
          extensions: [
            'Add textured materials for sensory exploration',
            'Use a small pillow for additional support if needed',
            'Incorporate singing and talking during the activity'
          ]
        },
        {
          title: 'Reach and Grasp Play',
          description: 'Encourage reaching and grasping movements to develop fine motor skills.',
          objectives: ['Develop hand-eye coordination', 'Practice grasping skills', 'Strengthen arm muscles'],
          materials: ['Rattles', 'Soft toys', 'Hanging mobile'],
          steps: [
            'Position baby on back or in supported sitting',
            'Hold toys slightly out of reach',
            'Encourage baby to reach for the toys',
            'Celebrate successful grasps',
            'Vary the position of toys to promote different movements'
          ],
          extensions: [
            'Use toys with different textures and sounds',
            'Try the activity during tummy time',
            'Incorporate gentle songs during play'
          ]
        }
      ],
      cognitive: [
        {
          title: 'Peek-a-Boo Variations',
          description: 'Build object permanence understanding through playful hiding games.',
          objectives: ['Develop object permanence', 'Encourage visual tracking', 'Build anticipation'],
          materials: ['Small blanket or cloth', 'Favorite toys', 'Mirror'],
          steps: [
            'Sit facing the baby',
            'Hide your face behind your hands or a cloth',
            'Say "Peek-a-boo!" as you reveal your face',
            'Observe baby\'s reaction and repeat',
            'Vary the timing and your expressions'
          ],
          extensions: [
            'Hide a toy under a cloth and encourage baby to find it',
            'Use a mirror for self-recognition peek-a-boo',
            'Try peek-a-boo with different family members'
          ]
        }
      ],
      // Additional infant activities for other developmental areas would be here
    },
    toddlers: {
      physical: [
        {
          title: 'Obstacle Course Adventure',
          description: 'Create a simple obstacle course to practice gross motor skills.',
          objectives: ['Develop balance and coordination', 'Practice climbing and crawling', 'Build spatial awareness'],
          materials: ['Pillows', 'Tunnels', 'Low balance beam', 'Hula hoops'],
          steps: [
            'Arrange obstacles in a circuit',
            'Demonstrate how to navigate each obstacle',
            'Assist toddlers as they move through the course',
            'Encourage different movements (crawling, stepping, jumping)',
            'Celebrate completion of the course'
          ],
          extensions: [
            'Add a timer for older toddlers who enjoy repetition',
            'Incorporate animal movements between obstacles',
            'Create a themed course (jungle adventure, space exploration)'
          ]
        },
        {
          title: 'Ball Skills Station',
          description: 'Practice various ball skills to develop coordination and control.',
          objectives: ['Develop hand-eye coordination', 'Practice throwing and rolling', 'Build arm strength'],
          materials: ['Various sized balls', 'Baskets or buckets', 'Targets'],
          steps: [
            'Set up stations with different sized containers',
            'Demonstrate throwing, rolling, and dropping balls into containers',
            'Allow toddlers to explore different ways to move the balls',
            'Provide verbal encouragement and guidance',
            'Gradually increase the challenge by moving targets farther away'
          ],
          extensions: [
            'Add counting as balls go into containers',
            'Use colored balls and matching colored containers for sorting',
            'Try kicking balls toward targets for older toddlers'
          ]
        }
      ],
      creative: [
        {
          title: 'Sensory Finger Painting',
          description: 'Explore colors and textures through non-toxic finger painting.',
          objectives: ['Develop sensory awareness', 'Encourage creative expression', 'Practice fine motor skills'],
          materials: ['Edible finger paint', 'Large paper', 'Smocks', 'Wet wipes'],
          steps: [
            'Prepare the area with paper and smocks',
            'Offer small amounts of different colored paints',
            'Demonstrate finger painting techniques',
            'Allow free exploration of the materials',
            'Talk about colors, textures, and movements'
          ],
          extensions: [
            'Add textured materials like sand or salt to the paint',
            'Try painting on different surfaces (foil, cardboard)',
            'Use fingers to practice drawing simple shapes or lines'
          ]
        }
      ],
      // Additional toddler activities for other developmental areas would be here
    },
    preschool: {
      physical: [
        {
          title: 'Animal Movement Game',
          description: 'Practice different locomotor skills by moving like various animals.',
          objectives: ['Develop gross motor skills', 'Increase body awareness', 'Practice following directions'],
          materials: ['Animal picture cards', 'Open space', 'Optional: animal masks'],
          steps: [
            'Gather children in an open space',
            'Show an animal picture and discuss how that animal moves',
            'Demonstrate the movement',
            'Have children move like that animal around the space',
            'Switch to a new animal after 1-2 minutes'
          ],
          extensions: [
            'Add animal sounds to the movements',
            'Create a story that incorporates multiple animals',
            'Have children take turns selecting animals and leading movements'
          ]
        },
        {
          title: 'Ribbon Dance',
          description: 'Use ribbons to practice coordination and creative movement.',
          objectives: ['Develop coordination', 'Encourage creative expression', 'Build arm strength'],
          materials: ['Ribbon sticks or scarves', 'Music', 'Open space'],
          steps: [
            'Give each child a ribbon or scarf',
            'Demonstrate different ways to move the ribbon (circles, waves, zigzags)',
            'Play music and encourage free movement',
            'Call out different patterns for children to try',
            'Vary the tempo of the music for different movement qualities'
          ],
          extensions: [
            'Add specific challenges like "make your ribbon go high/low"',
            'Create a simple choreographed sequence',
            'Use ribbons to trace letters or shapes in the air'
          ]
        }
      ],
      cognitive: [
        {
          title: 'Pattern Block Challenges',
          description: 'Use pattern blocks to create designs and learn about shapes and patterns.',
          objectives: ['Recognize and name shapes', 'Create and extend patterns', 'Develop spatial reasoning'],
          materials: ['Pattern blocks', 'Pattern cards', 'Paper', 'Pencils'],
          steps: [
            'Introduce the different pattern blocks and their names',
            'Demonstrate how blocks can fit together',
            'Provide pattern cards for children to replicate',
            'Encourage creation of original designs',
            'Have children describe their creations using shape names'
          ],
          extensions: [
            'Trace around completed designs to create a record',
            'Challenge children to create symmetrical designs',
            'Use blocks to create specific objects (houses, animals)'
          ]
        },
        {
          title: 'Sink or Float Investigation',
          description: 'Predict and test whether objects will sink or float in water.',
          objectives: ['Develop prediction skills', 'Understand basic physics concepts', 'Practice observation and recording'],
          materials: ['Clear container of water', 'Various objects', 'Recording sheet', 'Pencils'],
          steps: [
            'Gather children around the water container',
            'Show each object and ask children to predict if it will sink or float',
            'Test each object and observe what happens',
            'Record results on a simple chart',
            'Discuss patterns in what sinks and floats'
          ],
          extensions: [
            'Sort objects by sink/float properties',
            'Try changing objects (e.g., ball of clay vs. flattened clay)',
            'Introduce vocabulary like density, buoyancy'
          ]
        }
      ],
      // Additional preschool activities for other developmental areas would be here
    },
    schoolAge: {
      physical: [
        {
          title: 'Team Challenge Relay',
          description: 'Combine physical skills and teamwork in a multi-station relay.',
          objectives: ['Develop various motor skills', 'Practice teamwork', 'Build strategic thinking'],
          materials: ['Cones', 'Balls', 'Jump ropes', 'Beanbags', 'Buckets'],
          steps: [
            'Divide children into teams',
            'Set up 4-5 stations with different physical challenges',
            'Explain and demonstrate each station',
            'Have teams complete the relay',
            'Discuss strategies and teamwork afterward'
          ],
          extensions: [
            'Have teams create their own relay stations',
            'Add academic elements (spell a word, solve a math problem)',
            'Create themed relays based on current learning topics'
          ]
        }
      ],
      creative: [
        {
          title: 'Collaborative Mural Project',
          description: 'Work together to plan and create a large-scale art installation.',
          objectives: ['Develop planning skills', 'Practice artistic techniques', 'Build collaboration'],
          materials: ['Large paper or canvas', 'Various art supplies', 'Planning paper', 'Pencils'],
          steps: [
            'Discuss and decide on a theme for the mural',
            'Have children sketch ideas individually',
            'Combine ideas into a master plan',
            'Assign sections to individuals or small groups',
            'Complete the mural and display the finished work'
          ],
          extensions: [
            'Research mural artists for inspiration',
            'Add mixed media elements',
            'Create an artist statement to accompany the mural'
          ]
        }
      ],
      // Additional school-age activities for other developmental areas would be here
    }
  };
  
  const handleAddMaterial = () => {
    if (customMaterial && !materials.includes(customMaterial)) {
      setMaterials([...materials, customMaterial]);
      setCustomMaterial('');
    }
  };
  
  const handleRemoveMaterial = (material) => {
    setMaterials(materials.filter(m => m !== material));
  };
  
  const handleToggleMaterial = (material) => {
    if (materials.includes(material)) {
      setMaterials(materials.filter(m => m !== material));
    } else {
      setMaterials([...materials, material]);
    }
  };
  
  const handleGenerateActivities = () => {
    // In a real application, this would use more sophisticated filtering
    // For this demo, we'll just pull activities from our database based on age group and developmental area
    const activitiesForAgeAndArea = activityDatabase[ageGroup]?.[developmentalArea] || [];
    
    if (activitiesForAgeAndArea.length > 0) {
      // Add favorite property to each activity
      const activitiesWithFavorite = activitiesForAgeAndArea.map(activity => ({
        ...activity,
        favorite: false
      }));
      
      setGeneratedActivities(activitiesWithFavorite);
    } else {
      // If no activities found, generate a placeholder
      setGeneratedActivities([{
        title: 'Custom Activity',
        description: `A ${duration} minute ${developmentalArea} activity for ${ageGroups.find(a => a.value === ageGroup)?.label}.`,
        objectives: ['Develop age-appropriate skills', 'Engage children in meaningful learning'],
        materials: materials.length > 0 ? materials : ['Basic classroom materials'],
        steps: [
          'Prepare materials in advance',
          'Introduce the activity to children',
          'Demonstrate key concepts',
          'Support children as they engage with materials',
          'Extend learning through questions and discussion'
        ],
        extensions: [
          'Adapt for different ability levels',
          'Connect to current classroom themes',
          'Add complexity for additional challenge'
        ],
        favorite: false
      }]);
    }
  };
  
  const handleToggleFavorite = (index) => {
    const updatedActivities = [...generatedActivities];
    updatedActivities[index].favorite = !updatedActivities[index].favorite;
    setGeneratedActivities(updatedActivities);
  };
  
  const getDevelopmentalAreaIcon = (area) => {
    return developmentalAreas.find(a => a.value === area)?.icon || '';
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🎯</span> Activity Generator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Age Group</label>
            <div className="grid grid-cols-2 gap-2">
              {ageGroups.map(group => (
                <button
                  key={group.value}
                  onClick={() => setAgeGroup(group.value)}
                  className={`p-2 rounded-md transition-colors ${
                    ageGroup === group.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Developmental Area</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {developmentalAreas.map(area => (
                <button
                  key={area.value}
                  onClick={() => setDevelopmentalArea(area.value)}
                  className={`p-2 rounded-md transition-colors flex items-center ${
                    developmentalArea === area.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  <span className="mr-2">{area.icon}</span>
                  {area.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration</label>
            <div className="grid grid-cols-2 gap-2">
              {durations.map(option => (
                <button
                  key={option.value}
                  onClick={() => setDuration(option.value)}
                  className={`p-2 rounded-md transition-colors ${
                    duration === option.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Group Size</label>
            <div className="grid grid-cols-2 gap-2">
              {groupSizes.map(option => (
                <button
                  key={option.value}
                  onClick={() => setGroupSize(option.value)}
                  className={`p-2 rounded-md transition-colors ${
                    groupSize === option.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Materials</label>
            <div className="bg-card p-3 rounded-md max-h-40 overflow-y-auto mb-2">
              <div className="grid grid-cols-2 gap-1">
                {commonMaterials[developmentalArea]?.map(material => (
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
            
            {materials.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {materials.map(material => (
                  <span 
                    key={material} 
                    className="bg-muted px-2 py-1 rounded-full text-xs flex items-center"
                  >
                    {material}
                    <button 
                      onClick={() => handleRemoveMaterial(material)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={handleGenerateActivities}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors text-lg font-medium"
            >
              Generate Activities
            </button>
          </div>
        </div>
      </div>
      
      {generatedActivities.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Generated Activities</h4>
          
          {generatedActivities.map((activity, index) => (
            <div key={index} className="bg-card p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-bold text-lg flex items-center">
                  <span className="mr-2">{getDevelopmentalAreaIcon(developmentalArea)}</span>
                  {activity.title}
                </h5>
                <button
                  onClick={() => handleToggleFavorite(index)}
                  className={`text-xl ${activity.favorite ? 'text-amber-500' : 'text-muted-foreground'}`}
                >
                  {activity.favorite ? '★' : '☆'}
                </button>
              </div>
              
              <p className="text-muted-foreground mb-4">{activity.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium mb-1">Learning Objectives</h6>
                  <ul className="list-disc pl-5 space-y-1">
                    {activity.objectives.map((objective, i) => (
                      <li key={i} className="text-sm">{objective}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h6 className="font-medium mb-1">Materials Needed</h6>
                  <ul className="list-disc pl-5 space-y-1">
                    {activity.materials.map((material, i) => (
                      <li key={i} className="text-sm">{material}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="font-medium mb-1">Activity Steps</h6>
                <ol className="list-decimal pl-5 space-y-1">
                  {activity.steps.map((step, i) => (
                    <li key={i} className="text-sm">{step}</li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h6 className="font-medium mb-1">Extensions & Adaptations</h6>
                <ul className="list-disc pl-5 space-y-1">
                  {activity.extensions.map((extension, i) => (
                    <li key={i} className="text-sm">{extension}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => alert('Activity plan saved!')}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  Save Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityGenerator;
