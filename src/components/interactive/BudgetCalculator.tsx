import React, { useState } from 'react';

const BudgetCalculator: React.FC = () => {
  const [centerSize, setCenterSize] = useState('medium');
  const [childrenCount, setChildrenCount] = useState({
    infants: 8,
    toddlers: 12,
    preschool: 20,
    schoolAge: 15
  });
  
  const [staffCount, setStaffCount] = useState({
    director: 1,
    leadTeachers: 4,
    assistantTeachers: 6,
    aides: 3,
    cook: 1,
    administrative: 1,
    maintenance: 1
  });
  
  const [expenses, setExpenses] = useState({
    rent: 8500,
    utilities: 1200,
    insurance: 1500,
    food: 3500,
    supplies: 1800,
    equipment: 1000,
    maintenance: 800,
    marketing: 600,
    professional: 400,
    miscellaneous: 1000
  });
  
  const [tuitionRates, setTuitionRates] = useState({
    infants: 350,
    toddlers: 300,
    preschool: 275,
    schoolAge: 200
  });
  
  const [salaries, setSalaries] = useState({
    director: 65000,
    leadTeachers: 42000,
    assistantTeachers: 32000,
    aides: 28000,
    cook: 35000,
    administrative: 38000,
    maintenance: 32000
  });
  
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  
  const centerSizes = [
    { id: 'small', label: 'Small (up to 30 children)', icon: '🏠' },
    { id: 'medium', label: 'Medium (31-75 children)', icon: '🏫' },
    { id: 'large', label: 'Large (76+ children)', icon: '🏢' }
  ];
  
  const handleCenterSizeChange = (size: string) => {
    setCenterSize(size);
    
    // Adjust default values based on center size
    if (size === 'small') {
      setChildrenCount({
        infants: 4,
        toddlers: 8,
        preschool: 12,
        schoolAge: 6
      });
      
      setStaffCount({
        director: 1,
        leadTeachers: 2,
        assistantTeachers: 3,
        aides: 1,
        cook: 1,
        administrative: 0,
        maintenance: 0
      });
      
      setExpenses({
        rent: 5000,
        utilities: 800,
        insurance: 1000,
        food: 1800,
        supplies: 1000,
        equipment: 600,
        maintenance: 500,
        marketing: 400,
        professional: 300,
        miscellaneous: 600
      });
    } else if (size === 'medium') {
      setChildrenCount({
        infants: 8,
        toddlers: 12,
        preschool: 20,
        schoolAge: 15
      });
      
      setStaffCount({
        director: 1,
        leadTeachers: 4,
        assistantTeachers: 6,
        aides: 3,
        cook: 1,
        administrative: 1,
        maintenance: 1
      });
      
      setExpenses({
        rent: 8500,
        utilities: 1200,
        insurance: 1500,
        food: 3500,
        supplies: 1800,
        equipment: 1000,
        maintenance: 800,
        marketing: 600,
        professional: 400,
        miscellaneous: 1000
      });
    } else if (size === 'large') {
      setChildrenCount({
        infants: 16,
        toddlers: 24,
        preschool: 40,
        schoolAge: 30
      });
      
      setStaffCount({
        director: 1,
        leadTeachers: 8,
        assistantTeachers: 12,
        aides: 6,
        cook: 2,
        administrative: 2,
        maintenance: 2
      });
      
      setExpenses({
        rent: 15000,
        utilities: 2500,
        insurance: 3000,
        food: 7000,
        supplies: 3500,
        equipment: 2000,
        maintenance: 1500,
        marketing: 1200,
        professional: 800,
        miscellaneous: 2000
      });
    }
  };
  
  const handleChildrenCountChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setChildrenCount({
      ...childrenCount,
      [category]: numValue
    });
  };
  
  const handleStaffCountChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setStaffCount({
      ...staffCount,
      [category]: numValue
    });
  };
  
  const handleExpenseChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setExpenses({
      ...expenses,
      [category]: numValue
    });
  };
  
  const handleTuitionRateChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setTuitionRates({
      ...tuitionRates,
      [category]: numValue
    });
  };
  
  const handleSalaryChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setSalaries({
      ...salaries,
      [category]: numValue
    });
  };
  
  // Calculate total children
  const totalChildren = Object.values(childrenCount).reduce((sum, count) => sum + count, 0);
  
  // Calculate total staff
  const totalStaff = Object.values(staffCount).reduce((sum, count) => sum + count, 0);
  
  // Calculate monthly revenue
  const monthlyRevenue = 
    (childrenCount.infants * tuitionRates.infants * 4) +
    (childrenCount.toddlers * tuitionRates.toddlers * 4) +
    (childrenCount.preschool * tuitionRates.preschool * 4) +
    (childrenCount.schoolAge * tuitionRates.schoolAge * 4);
  
  // Calculate monthly salary expenses
  const monthlySalaryExpenses = 
    ((salaries.director * staffCount.director) / 12) +
    ((salaries.leadTeachers * staffCount.leadTeachers) / 12) +
    ((salaries.assistantTeachers * staffCount.assistantTeachers) / 12) +
    ((salaries.aides * staffCount.aides) / 12) +
    ((salaries.cook * staffCount.cook) / 12) +
    ((salaries.administrative * staffCount.administrative) / 12) +
    ((salaries.maintenance * staffCount.maintenance) / 12);
  
  // Calculate total monthly expenses
  const totalMonthlyExpenses = 
    monthlySalaryExpenses +
    expenses.rent +
    expenses.utilities +
    expenses.insurance +
    expenses.food +
    expenses.supplies +
    expenses.equipment +
    expenses.maintenance +
    expenses.marketing +
    expenses.professional +
    expenses.miscellaneous;
  
  // Calculate monthly profit/loss
  const monthlyProfitLoss = monthlyRevenue - totalMonthlyExpenses;
  
  // Calculate annual profit/loss
  const annualProfitLoss = monthlyProfitLoss * 12;
  
  // Calculate profit margin
  const profitMargin = monthlyRevenue > 0 ? (monthlyProfitLoss / monthlyRevenue) * 100 : 0;
  
  // Calculate cost per child
  const costPerChild = totalChildren > 0 ? totalMonthlyExpenses / totalChildren : 0;
  
  // Calculate revenue per child
  const revenuePerChild = totalChildren > 0 ? monthlyRevenue / totalChildren : 0;
  
  // Calculate child-to-staff ratio
  const childToStaffRatio = totalStaff > 0 ? totalChildren / totalStaff : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">💰</span> Child Care Budget Calculator
      </h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Center Size</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {centerSizes.map(size => (
            <button
              key={size.id}
              onClick={() => handleCenterSizeChange(size.id)}
              className={`p-3 rounded-lg transition-colors flex items-center justify-center ${
                centerSize === size.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card hover:bg-muted'
              }`}
            >
              <span className="text-xl mr-2">{size.icon}</span>
              <span>{size.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-bold mb-3">Enrollment</h4>
          <div className="bg-card p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Infants (0-12 months)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={childrenCount.infants}
                    onChange={(e) => handleChildrenCountChange('infants', e.target.value)}
                    className="w-full p-2 border border-input rounded-l-md bg-background"
                    min="0"
                  />
                  <span className="bg-muted px-3 py-2 rounded-r-md text-muted-foreground">children</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Toddlers (1-3 years)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={childrenCount.toddlers}
                    onChange={(e) => handleChildrenCountChange('toddlers', e.target.value)}
                    className="w-full p-2 border border-input rounded-l-md bg-background"
                    min="0"
                  />
                  <span className="bg-muted px-3 py-2 rounded-r-md text-muted-foreground">children</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Preschool (3-5 years)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={childrenCount.preschool}
                    onChange={(e) => handleChildrenCountChange('preschool', e.target.value)}
                    className="w-full p-2 border border-input rounded-l-md bg-background"
                    min="0"
                  />
                  <span className="bg-muted px-3 py-2 rounded-r-md text-muted-foreground">children</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">School Age (5+ years)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={childrenCount.schoolAge}
                    onChange={(e) => handleChildrenCountChange('schoolAge', e.target.value)}
                    className="w-full p-2 border border-input rounded-l-md bg-background"
                    min="0"
                  />
                  <span className="bg-muted px-3 py-2 rounded-r-md text-muted-foreground">children</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Enrollment:</span>
                <span className="text-lg font-bold">{totalChildren} children</span>
              </div>
            </div>
          </div>
          
          <h4 className="font-bold mt-6 mb-3">Tuition Rates (Weekly)</h4>
          <div className="bg-card p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Infants (0-12 months)</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={tuitionRates.infants}
                    onChange={(e) => handleTuitionRateChange('infants', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Toddlers (1-3 years)</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={tuitionRates.toddlers}
                    onChange={(e) => handleTuitionRateChange('toddlers', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Preschool (3-5 years)</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={tuitionRates.preschool}
                    onChange={(e) => handleTuitionRateChange('preschool', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">School Age (5+ years)</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={tuitionRates.schoolAge}
                    onChange={(e) => handleTuitionRateChange('schoolAge', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Monthly Revenue:</span>
                <span className="text-lg font-bold">{formatCurrency(monthlyRevenue)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-3">Staffing</h4>
          <div className="bg-card p-4 rounded-lg">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Director</label>
                  <input
                    type="number"
                    value={staffCount.director}
                    onChange={(e) => handleStaffCountChange('director', e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Salary</label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={salaries.director}
                      onChange={(e) => handleSalaryChange('director', e.target.value)}
                      className="w-full p-2 border border-input rounded-r-md bg-background"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Lead Teachers</label>
                  <input
                    type="number"
                    value={staffCount.leadTeachers}
                    onChange={(e) => handleStaffCountChange('leadTeachers', e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Salary</label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={salaries.leadTeachers}
                      onChange={(e) => handleSalaryChange('leadTeachers', e.target.value)}
                      className="w-full p-2 border border-input rounded-r-md bg-background"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Assistant Teachers</label>
                  <input
                    type="number"
                    value={staffCount.assistantTeachers}
                    onChange={(e) => handleStaffCountChange('assistantTeachers', e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Salary</label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={salaries.assistantTeachers}
                      onChange={(e) => handleSalaryChange('assistantTeachers', e.target.value)}
                      className="w-full p-2 border border-input rounded-r-md bg-background"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Aides</label>
                  <input
                    type="number"
                    value={staffCount.aides}
                    onChange={(e) => handleStaffCountChange('aides', e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Salary</label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={salaries.aides}
                      onChange={(e) => handleSalaryChange('aides', e.target.value)}
                      className="w-full p-2 border border-input rounded-r-md bg-background"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Other Staff</label>
                  <div className="grid grid-cols-3 gap-1">
                    <div>
                      <label className="block text-xs mb-1">Cook</label>
                      <input
                        type="number"
                        value={staffCount.cook}
                        onChange={(e) => handleStaffCountChange('cook', e.target.value)}
                        className="w-full p-2 border border-input rounded-md bg-background"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Admin</label>
                      <input
                        type="number"
                        value={staffCount.administrative}
                        onChange={(e) => handleStaffCountChange('administrative', e.target.value)}
                        className="w-full p-2 border border-input rounded-md bg-background"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Maint.</label>
                      <input
                        type="number"
                        value={staffCount.maintenance}
                        onChange={(e) => handleStaffCountChange('maintenance', e.target.value)}
                        className="w-full p-2 border border-input rounded-md bg-background"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Salaries</label>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="flex items-center">
                      <span className="bg-muted px-1 py-2 rounded-l-md text-muted-foreground text-xs">$</span>
                      <input
                        type="number"
                        value={salaries.cook}
                        onChange={(e) => handleSalaryChange('cook', e.target.value)}
                        className="w-full p-2 border border-input rounded-r-md bg-background"
                        min="0"
                        step="1000"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="bg-muted px-1 py-2 rounded-l-md text-muted-foreground text-xs">$</span>
                      <input
                        type="number"
                        value={salaries.administrative}
                        onChange={(e) => handleSalaryChange('administrative', e.target.value)}
                        className="w-full p-2 border border-input rounded-r-md bg-background"
                        min="0"
                        step="1000"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="bg-muted px-1 py-2 rounded-l-md text-muted-foreground text-xs">$</span>
                      <input
                        type="number"
                        value={salaries.maintenance}
                        onChange={(e) => handleSalaryChange('maintenance', e.target.value)}
                        className="w-full p-2 border border-input rounded-r-md bg-background"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Staff:</span>
                <span>{totalStaff} employees</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="font-medium">Monthly Salary Expenses:</span>
                <span className="text-lg font-bold">{formatCurrency(monthlySalaryExpenses)}</span>
              </div>
            </div>
          </div>
          
          <h4 className="font-bold mt-6 mb-3">Monthly Operating Expenses</h4>
          <div className="bg-card p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Rent/Mortgage</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.rent}
                    onChange={(e) => handleExpenseChange('rent', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Utilities</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.utilities}
                    onChange={(e) => handleExpenseChange('utilities', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Insurance</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.insurance}
                    onChange={(e) => handleExpenseChange('insurance', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Food</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.food}
                    onChange={(e) => handleExpenseChange('food', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Supplies</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.supplies}
                    onChange={(e) => handleExpenseChange('supplies', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Equipment</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.equipment}
                    onChange={(e) => handleExpenseChange('equipment', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Maintenance</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.maintenance}
                    onChange={(e) => handleExpenseChange('maintenance', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Marketing</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.marketing}
                    onChange={(e) => handleExpenseChange('marketing', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Professional Services</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.professional}
                    onChange={(e) => handleExpenseChange('professional', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Miscellaneous</label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={expenses.miscellaneous}
                    onChange={(e) => handleExpenseChange('miscellaneous', e.target.value)}
                    className="w-full p-2 border border-input rounded-r-md bg-background"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-4">Financial Summary</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Monthly Revenue:</span>
                <span className="font-medium">{formatCurrency(monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Salary Expenses:</span>
                <span className="font-medium">{formatCurrency(monthlySalaryExpenses)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Operating Expenses:</span>
                <span className="font-medium">{formatCurrency(totalMonthlyExpenses - monthlySalaryExpenses)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Monthly Expenses:</span>
                <span className="font-medium">{formatCurrency(totalMonthlyExpenses)}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Monthly Profit/Loss:</span>
                  <span className={`font-bold text-lg ${monthlyProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(monthlyProfitLoss)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Annual Profit/Loss:</span>
                  <span className={`font-bold ${annualProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(annualProfitLoss)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Profit Margin:</span>
                <span className="font-medium">
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Cost per Child (Monthly):</span>
                <span className="font-medium">{formatCurrency(costPerChild)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Revenue per Child (Monthly):</span>
                <span className="font-medium">{formatCurrency(revenuePerChild)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Child-to-Staff Ratio:</span>
                <span className="font-medium">{childToStaffRatio.toFixed(1)}:1</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Break-even Analysis:</span>
                  <span className="font-medium">
                    {monthlyProfitLoss >= 0 
                      ? 'Operating above break-even point' 
                      : `Need ${Math.ceil(Math.abs(monthlyProfitLoss) / revenuePerChild)} more children to break even`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => setShowDetailedReport(!showDetailedReport)}
            className="flex items-center text-sm font-medium"
          >
            <span className="mr-2">{showDetailedReport ? '▼' : '►'}</span>
            {showDetailedReport ? 'Hide Detailed Report' : 'Show Detailed Report'}
          </button>
          
          {showDetailedReport && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h5 className="font-medium mb-2">Revenue Breakdown</h5>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Infants ({childrenCount.infants} × ${tuitionRates.infants} × 4 weeks):</span>
                  <span>{formatCurrency(childrenCount.infants * tuitionRates.infants * 4)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Toddlers ({childrenCount.toddlers} × ${tuitionRates.toddlers} × 4 weeks):</span>
                  <span>{formatCurrency(childrenCount.toddlers * tuitionRates.toddlers * 4)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Preschool ({childrenCount.preschool} × ${tuitionRates.preschool} × 4 weeks):</span>
                  <span>{formatCurrency(childrenCount.preschool * tuitionRates.preschool * 4)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>School Age ({childrenCount.schoolAge} × ${tuitionRates.schoolAge} × 4 weeks):</span>
                  <span>{formatCurrency(childrenCount.schoolAge * tuitionRates.schoolAge * 4)}</span>
                </div>
              </div>
              
              <h5 className="font-medium mb-2">Salary Expenses Breakdown</h5>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Director ({staffCount.director} × ${salaries.director}/year):</span>
                  <span>{formatCurrency((salaries.director * staffCount.director) / 12)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lead Teachers ({staffCount.leadTeachers} × ${salaries.leadTeachers}/year):</span>
                  <span>{formatCurrency((salaries.leadTeachers * staffCount.leadTeachers) / 12)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Assistant Teachers ({staffCount.assistantTeachers} × ${salaries.assistantTeachers}/year):</span>
                  <span>{formatCurrency((salaries.assistantTeachers * staffCount.assistantTeachers) / 12)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Aides ({staffCount.aides} × ${salaries.aides}/year):</span>
                  <span>{formatCurrency((salaries.aides * staffCount.aides) / 12)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cook ({staffCount.cook} × ${salaries.cook}/year):</span>
                  <span>{formatCurrency((salaries.cook * staffCount.cook) / 12)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Administrative ({staffCount.administrative} × ${salaries.administrative}/year):</span>
                  <span>{formatCurrency((salaries.administrative * staffCount.administrative) / 12)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maintenance ({staffCount.maintenance} × ${salaries.maintenance}/year):</span>
                  <span>{formatCurrency((salaries.maintenance * staffCount.maintenance) / 12)}/month</span>
                </div>
              </div>
              
              <h5 className="font-medium mb-2">Expense Allocation</h5>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Staff Salaries:</span>
                  <span>{((monthlySalaryExpenses / totalMonthlyExpenses) * 100).toFixed(1)}% of total expenses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Facility Costs (Rent, Utilities, Maintenance):</span>
                  <span>{(((expenses.rent + expenses.utilities + expenses.maintenance) / totalMonthlyExpenses) * 100).toFixed(1)}% of total expenses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Program Costs (Food, Supplies, Equipment):</span>
                  <span>{(((expenses.food + expenses.supplies + expenses.equipment) / totalMonthlyExpenses) * 100).toFixed(1)}% of total expenses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Administrative Costs (Insurance, Marketing, Professional):</span>
                  <span>{(((expenses.insurance + expenses.marketing + expenses.professional + expenses.miscellaneous) / totalMonthlyExpenses) * 100).toFixed(1)}% of total expenses</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => {
            if (confirm('Reset all values to defaults for the current center size?')) {
              handleCenterSizeChange(centerSize);
            }
          }}
          className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={() => alert('Budget report generated and ready to print!')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
        >
          Generate Budget Report
        </button>
      </div>
    </div>
  );
};

export default BudgetCalculator;
