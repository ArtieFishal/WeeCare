import React, { useState } from 'react';

const StaffQualificationTracker: React.FC = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Lead Teacher',
      education: "Bachelor's in Early Childhood Education",
      certifications: [
        { name: 'CPR/First Aid', obtained: '2023-06-15', expires: '2025-06-15', status: 'valid' },
        { name: 'Child Development Associate (CDA)', obtained: '2022-03-10', expires: '2025-03-10', status: 'valid' },
        { name: 'Food Handler\'s Permit', obtained: '2023-01-20', expires: '2024-01-20', status: 'expiring-soon' }
      ],
      trainingHours: { completed: 24, required: 30, dueDate: '2025-12-31' }
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      position: 'Assistant Teacher',
      education: "Associate's in Child Development",
      certifications: [
        { name: 'CPR/First Aid', obtained: '2022-09-05', expires: '2024-09-05', status: 'expiring-soon' },
        { name: 'Child Development Associate (CDA)', obtained: '2021-11-15', expires: '2024-11-15', status: 'expiring-soon' }
      ],
      trainingHours: { completed: 18, required: 20, dueDate: '2025-12-31' }
    },
    {
      id: 3,
      name: 'Emily Chen',
      position: 'Center Director',
      education: "Master's in Education Administration",
      certifications: [
        { name: 'CPR/First Aid', obtained: '2023-04-20', expires: '2025-04-20', status: 'valid' },
        { name: 'Director\'s Credential', obtained: '2022-07-30', expires: '2027-07-30', status: 'valid' },
        { name: 'Food Handler\'s Permit', obtained: '2022-02-15', expires: '2023-02-15', status: 'expired' }
      ],
      trainingHours: { completed: 35, required: 40, dueDate: '2025-12-31' }
    }
  ]);
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    position: '',
    education: '',
    certifications: [],
    trainingHours: { completed: 0, required: 0, dueDate: '' }
  });
  
  const [newCertification, setNewCertification] = useState({
    name: '',
    obtained: '',
    expires: '',
    status: 'valid'
  });
  
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [showAddCertForm, setShowAddCertForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.position) return;
    
    setStaff([
      ...staff,
      {
        id: staff.length + 1,
        ...newStaff
      }
    ]);
    
    setNewStaff({
      name: '',
      position: '',
      education: '',
      certifications: [],
      trainingHours: { completed: 0, required: 0, dueDate: '' }
    });
    
    setShowAddStaffForm(false);
  };
  
  const handleAddCertification = () => {
    if (!newCertification.name || !newCertification.obtained || !newCertification.expires || !selectedStaffId) return;
    
    const updatedStaff = staff.map(person => {
      if (person.id === selectedStaffId) {
        return {
          ...person,
          certifications: [
            ...person.certifications,
            newCertification
          ]
        };
      }
      return person;
    });
    
    setStaff(updatedStaff);
    setNewCertification({
      name: '',
      obtained: '',
      expires: '',
      status: 'valid'
    });
    setShowAddCertForm(false);
  };
  
  const handleUpdateTrainingHours = (staffId, hours) => {
    const updatedStaff = staff.map(person => {
      if (person.id === staffId) {
        return {
          ...person,
          trainingHours: {
            ...person.trainingHours,
            completed: Math.max(0, Math.min(person.trainingHours.required, hours))
          }
        };
      }
      return person;
    });
    
    setStaff(updatedStaff);
  };
  
  const calculateCertStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsUntilExpiry = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (expiry < today) {
      return 'expired';
    } else if (monthsUntilExpiry <= 3) {
      return 'expiring-soon';
    } else {
      return 'valid';
    }
  };
  
  const getFilteredStaff = () => {
    if (filterStatus === 'all') return staff;
    
    return staff.filter(person => {
      if (filterStatus === 'expired') {
        return person.certifications.some(cert => cert.status === 'expired');
      } else if (filterStatus === 'expiring-soon') {
        return person.certifications.some(cert => cert.status === 'expiring-soon');
      } else if (filterStatus === 'incomplete-training') {
        return person.trainingHours.completed < person.trainingHours.required;
      }
      return true;
    });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const certificationOptions = [
    'CPR/First Aid',
    'Child Development Associate (CDA)',
    'Food Handler\'s Permit',
    'Director\'s Credential',
    'Infant/Toddler Specialization',
    'Special Needs Endorsement',
    'Medication Administration',
    'Health and Safety Training',
    'Positive Behavior Management',
    'State Early Childhood Credential'
  ];
  
  const positionOptions = [
    'Lead Teacher',
    'Assistant Teacher',
    'Center Director',
    'Assistant Director',
    'Infant Caregiver',
    'Toddler Teacher',
    'Preschool Teacher',
    'School-Age Coordinator',
    'Cook/Nutrition Specialist',
    'Administrative Assistant'
  ];
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">👩‍🏫</span> Staff Qualification Tracker
      </h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium">Filter:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Staff</option>
              <option value="expired">Expired Certifications</option>
              <option value="expiring-soon">Expiring Soon</option>
              <option value="incomplete-training">Incomplete Training</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowAddStaffForm(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
          >
            Add New Staff
          </button>
        </div>
        
        {showAddStaffForm && (
          <div className="bg-card p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-3">Add New Staff Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  placeholder="Full Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <select
                  value={newStaff.position}
                  onChange={(e) => setNewStaff({...newStaff, position: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select Position</option>
                  {positionOptions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <input
                  type="text"
                  value={newStaff.education}
                  onChange={(e) => setNewStaff({...newStaff, education: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  placeholder="Highest Education Level"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Required Training Hours</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={newStaff.trainingHours.required}
                    onChange={(e) => setNewStaff({
                      ...newStaff, 
                      trainingHours: {
                        ...newStaff.trainingHours,
                        required: parseInt(e.target.value) || 0
                      }
                    })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                    placeholder="Hours"
                    min="0"
                  />
                  <span className="mx-2">Due:</span>
                  <input
                    type="date"
                    value={newStaff.trainingHours.dueDate}
                    onChange={(e) => setNewStaff({
                      ...newStaff, 
                      trainingHours: {
                        ...newStaff.trainingHours,
                        dueDate: e.target.value
                      }
                    })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddStaffForm(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStaff}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
              >
                Add Staff
              </button>
            </div>
          </div>
        )}
        
        {showAddCertForm && (
          <div className="bg-card p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-3">Add New Certification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Certification</label>
                <select
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select Certification</option>
                  {certificationOptions.map(cert => (
                    <option key={cert} value={cert}>{cert}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date Obtained</label>
                <input
                  type="date"
                  value={newCertification.obtained}
                  onChange={(e) => setNewCertification({...newCertification, obtained: e.target.value})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Expiration Date</label>
                <input
                  type="date"
                  value={newCertification.expires}
                  onChange={(e) => {
                    const expires = e.target.value;
                    const status = calculateCertStatus(expires);
                    setNewCertification({...newCertification, expires, status});
                  }}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddCertForm(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCertification}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
              >
                Add Certification
              </button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {getFilteredStaff().map(person => (
            <div key={person.id} className="bg-card p-4 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg">{person.name}</h4>
                  <p className="text-sm text-muted-foreground">{person.position}</p>
                  <p className="text-sm">{person.education}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedStaffId(person.id);
                    setShowAddCertForm(true);
                  }}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors"
                >
                  Add Certification
                </button>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium mb-2">Certifications</h5>
                {person.certifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No certifications recorded</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {person.certifications.map((cert, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded-md border ${
                          cert.status === 'expired' ? 'border-destructive bg-destructive/10' :
                          cert.status === 'expiring-soon' ? 'border-warning bg-warning/10' :
                          'border-success bg-success/10'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{cert.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            cert.status === 'expired' ? 'bg-destructive text-destructive-foreground' :
                            cert.status === 'expiring-soon' ? 'bg-warning text-warning-foreground' :
                            'bg-success text-success-foreground'
                          }`}>
                            {cert.status === 'expired' ? 'Expired' :
                             cert.status === 'expiring-soon' ? 'Expiring Soon' :
                             'Valid'}
                          </span>
                        </div>
                        <div className="text-xs mt-1">
                          <span>Obtained: {formatDate(cert.obtained)}</span>
                          <span className="mx-1">•</span>
                          <span>Expires: {formatDate(cert.expires)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Annual Training Hours</h5>
                <div className="flex items-center">
                  <div className="w-full mr-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{person.trainingHours.completed} of {person.trainingHours.required} hours completed</span>
                      <span>Due: {formatDate(person.trainingHours.dueDate)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(person.trainingHours.completed / person.trainingHours.required) * 100}%`,
                          backgroundColor: person.trainingHours.completed >= person.trainingHours.required 
                            ? 'var(--success, var(--secondary))' 
                            : 'var(--primary)'
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpdateTrainingHours(person.id, person.trainingHours.completed - 1)}
                      className="p-1 bg-muted text-muted-foreground rounded-l-md hover:bg-muted/80 transition-colors"
                      disabled={person.trainingHours.completed <= 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleUpdateTrainingHours(person.id, person.trainingHours.completed + 1)}
                      className="p-1 bg-muted text-muted-foreground rounded-r-md hover:bg-muted/80 transition-colors"
                      disabled={person.trainingHours.completed >= person.trainingHours.required}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => alert('Staff qualifications report generated!')}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
        >
          Generate Report
        </button>
        <button
          onClick={() => alert('Reminder emails sent to staff with expiring certifications!')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
        >
          Send Reminders
        </button>
      </div>
    </div>
  );
};

export default StaffQualificationTracker;
