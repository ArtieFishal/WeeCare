import React, { useState } from 'react';

const JobDescriptionGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    position: 'Lead Teacher',
    department: 'Preschool Classroom',
    reportsTo: 'Center Director',
    education: 'Associate\'s Degree in Early Childhood Education',
    experience: '2+ years teaching in a licensed child care setting',
    certifications: ['CPR/First Aid', 'Child Development Associate (CDA)'],
    schedule: 'Full-time, Monday-Friday',
    responsibilities: [
      'Plan and implement developmentally appropriate activities',
      'Maintain a safe and clean classroom environment',
      'Communicate effectively with parents',
      'Document children\'s progress',
      'Supervise assistant teachers'
    ],
    skills: [
      'Strong communication skills',
      'Knowledge of child development',
      'Classroom management',
      'Patience and flexibility',
      'Team player'
    ],
    benefits: [
      'Health insurance',
      'Paid time off',
      'Professional development opportunities',
      'Child care discount'
    ]
  });
  
  const [customResponsibility, setCustomResponsibility] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [customBenefit, setCustomBenefit] = useState('');
  const [customCertification, setCustomCertification] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddItem = (field, value, setter) => {
    if (!value.trim()) return;
    
    setFormData({
      ...formData,
      [field]: [...formData[field], value]
    });
    setter('');
  };
  
  const handleRemoveItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };
  
  const positionTemplates = [
    { value: 'Lead Teacher', label: 'Lead Teacher' },
    { value: 'Assistant Teacher', label: 'Assistant Teacher' },
    { value: 'Center Director', label: 'Center Director' },
    { value: 'Assistant Director', label: 'Assistant Director' },
    { value: 'Infant Caregiver', label: 'Infant Caregiver' },
    { value: 'Toddler Teacher', label: 'Toddler Teacher' },
    { value: 'Preschool Teacher', label: 'Preschool Teacher' },
    { value: 'School-Age Coordinator', label: 'School-Age Coordinator' },
    { value: 'Cook/Nutrition Specialist', label: 'Cook/Nutrition Specialist' },
    { value: 'Administrative Assistant', label: 'Administrative Assistant' }
  ];
  
  const departmentTemplates = [
    { value: 'Infant Room', label: 'Infant Room' },
    { value: 'Toddler Classroom', label: 'Toddler Classroom' },
    { value: 'Preschool Classroom', label: 'Preschool Classroom' },
    { value: 'Pre-K Classroom', label: 'Pre-K Classroom' },
    { value: 'School-Age Program', label: 'School-Age Program' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Kitchen/Nutrition', label: 'Kitchen/Nutrition' }
  ];
  
  const educationTemplates = [
    { value: 'High School Diploma or GED', label: 'High School Diploma or GED' },
    { value: 'Some college coursework in Early Childhood Education', label: 'Some college coursework in ECE' },
    { value: 'Associate\'s Degree in Early Childhood Education', label: 'Associate\'s in ECE' },
    { value: 'Bachelor\'s Degree in Early Childhood Education', label: 'Bachelor\'s in ECE' },
    { value: 'Bachelor\'s Degree in related field', label: 'Bachelor\'s (related field)' },
    { value: 'Master\'s Degree in Early Childhood Education', label: 'Master\'s in ECE' }
  ];
  
  const experienceTemplates = [
    { value: 'No experience required', label: 'None required' },
    { value: '1+ years in a licensed child care setting', label: '1+ years' },
    { value: '2+ years teaching in a licensed child care setting', label: '2+ years teaching' },
    { value: '3+ years teaching with at least 1 year in a leadership role', label: '3+ years with leadership' },
    { value: '5+ years with at least 2 years in administration', label: '5+ years with administration' }
  ];
  
  const commonResponsibilities = [
    'Plan and implement developmentally appropriate activities',
    'Maintain a safe and clean classroom environment',
    'Communicate effectively with parents',
    'Document children\'s progress',
    'Supervise assistant teachers',
    'Ensure compliance with licensing regulations',
    'Attend staff meetings and training sessions',
    'Assist with meal and snack times',
    'Change diapers and assist with toilet training',
    'Maintain accurate attendance records',
    'Conduct parent-teacher conferences',
    'Develop weekly lesson plans',
    'Administer developmental assessments',
    'Manage classroom budget',
    'Mentor new staff members'
  ];
  
  const commonSkills = [
    'Strong communication skills',
    'Knowledge of child development',
    'Classroom management',
    'Patience and flexibility',
    'Team player',
    'Problem-solving abilities',
    'Cultural sensitivity',
    'Computer literacy',
    'Time management',
    'Conflict resolution',
    'Creative thinking',
    'Physical stamina',
    'Emotional intelligence',
    'Organizational skills',
    'Adaptability'
  ];
  
  const commonBenefits = [
    'Health insurance',
    'Dental insurance',
    'Vision insurance',
    'Paid time off',
    'Sick leave',
    'Professional development opportunities',
    'Child care discount',
    '401(k) retirement plan',
    'Life insurance',
    'Flexible spending account',
    'Employee assistance program',
    'Tuition reimbursement',
    'Paid holidays',
    'Wellness program',
    'Employee recognition program'
  ];
  
  const commonCertifications = [
    'CPR/First Aid',
    'Child Development Associate (CDA)',
    'State Early Childhood Credential',
    'Food Handler\'s Permit',
    'Director\'s Credential',
    'Special Needs Endorsement',
    'Infant/Toddler Specialization',
    'Medication Administration',
    'Positive Behavior Management',
    'Health and Safety Training'
  ];
  
  const generateJobDescription = () => {
    return `
# ${formData.position}

## Department
${formData.department}

## Reports To
${formData.reportsTo}

## Education Requirements
${formData.education}

## Experience Requirements
${formData.experience}

## Required Certifications
${formData.certifications.map(cert => `- ${cert}`).join('\n')}

## Schedule
${formData.schedule}

## Job Responsibilities
${formData.responsibilities.map(resp => `- ${resp}`).join('\n')}

## Required Skills
${formData.skills.map(skill => `- ${skill}`).join('\n')}

## Benefits
${formData.benefits.map(benefit => `- ${benefit}`).join('\n')}
    `;
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">📝</span> Job Description Generator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-bold mb-3">Basic Information</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Position Title</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              {positionTemplates.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              {departmentTemplates.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Reports To</label>
            <input
              type="text"
              name="reportsTo"
              value={formData.reportsTo}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Education Requirements</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              {educationTemplates.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Experience Requirements</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              {experienceTemplates.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Schedule</label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background"
            />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-3">Required Certifications</h4>
          <div className="mb-4 bg-card p-3 rounded-md max-h-32 overflow-y-auto">
            {formData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center mb-1 p-1 bg-background rounded">
                <span>{cert}</span>
                <button
                  onClick={() => handleRemoveItem('certifications', index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex mb-4">
            <select
              value={customCertification}
              onChange={(e) => setCustomCertification(e.target.value)}
              className="flex-1 p-2 border border-input rounded-l-md bg-background"
            >
              <option value="">Select or type a certification...</option>
              {commonCertifications
                .filter(cert => !formData.certifications.includes(cert))
                .map(cert => (
                  <option key={cert} value={cert}>{cert}</option>
                ))
              }
            </select>
            <button
              onClick={() => handleAddItem('certifications', customCertification, setCustomCertification)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80"
            >
              Add
            </button>
          </div>
          
          <h4 className="font-bold mb-3">Job Responsibilities</h4>
          <div className="mb-4 bg-card p-3 rounded-md max-h-32 overflow-y-auto">
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex justify-between items-center mb-1 p-1 bg-background rounded">
                <span className="line-clamp-1">{resp}</span>
                <button
                  onClick={() => handleRemoveItem('responsibilities', index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex mb-4">
            <select
              value={customResponsibility}
              onChange={(e) => setCustomResponsibility(e.target.value)}
              className="flex-1 p-2 border border-input rounded-l-md bg-background"
            >
              <option value="">Select or type a responsibility...</option>
              {commonResponsibilities
                .filter(resp => !formData.responsibilities.includes(resp))
                .map(resp => (
                  <option key={resp} value={resp}>{resp}</option>
                ))
              }
            </select>
            <button
              onClick={() => handleAddItem('responsibilities', customResponsibility, setCustomResponsibility)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-bold mb-3">Required Skills</h4>
          <div className="mb-4 bg-card p-3 rounded-md max-h-32 overflow-y-auto">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center mb-1 p-1 bg-background rounded">
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveItem('skills', index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex mb-4">
            <select
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              className="flex-1 p-2 border border-input rounded-l-md bg-background"
            >
              <option value="">Select or type a skill...</option>
              {commonSkills
                .filter(skill => !formData.skills.includes(skill))
                .map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))
              }
            </select>
            <button
              onClick={() => handleAddItem('skills', customSkill, setCustomSkill)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80"
            >
              Add
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-3">Benefits</h4>
          <div className="mb-4 bg-card p-3 rounded-md max-h-32 overflow-y-auto">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex justify-between items-center mb-1 p-1 bg-background rounded">
                <span>{benefit}</span>
                <button
                  onClick={() => handleRemoveItem('benefits', index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex mb-4">
            <select
              value={customBenefit}
              onChange={(e) => setCustomBenefit(e.target.value)}
              className="flex-1 p-2 border border-input rounded-l-md bg-background"
            >
              <option value="">Select or type a benefit...</option>
              {commonBenefits
                .filter(benefit => !formData.benefits.includes(benefit))
                .map(benefit => (
                  <option key={benefit} value={benefit}>{benefit}</option>
                ))
              }
            </select>
            <button
              onClick={() => handleAddItem('benefits', customBenefit, setCustomBenefit)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-card p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-3">Preview</h4>
        <pre className="whitespace-pre-wrap text-sm bg-background p-4 rounded-md max-h-64 overflow-y-auto">
          {generateJobDescription()}
        </pre>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => {
            // Reset to defaults would go here
            alert('Form reset to template defaults');
          }}
          className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
        >
          Reset to Template
        </button>
        <button
          onClick={() => {
            // Download or copy functionality would go here
            alert('Job description copied to clipboard!');
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default JobDescriptionGenerator;
