import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdmissionsState, ChildProfile, ParentContact, ParentBankingInfo, FeeStructure, Discount } from '@/types/admissions';
import { AdmissionsProvider, useAdmissions } from './AdmissionsContext';
import AdmissionsBillingAddChildForm from './AdmissionsBillingAddChildForm';
import AddParentForm from './AddParentForm';
import ChildProfileView from './ChildProfileView';
import { 
  Users, UserPlus, Search, Filter, Calendar, DollarSign, 
  CreditCard, FileText, Download, Printer, ChevronDown,
  Clock, AlertCircle, CheckCircle, XCircle, Edit, Trash2,
  Eye, Plus, BarChart2, PieChart, UserRound
} from 'lucide-react';

// Sample fee structures
const sampleFeeStructures: {[id: string]: FeeStructure} = {
  'fee-infant': {
    id: 'fee-infant',
    name: 'Infant Care',
    ageGroup: 'infant',
    fullTimeWeeklyRate: 295,
    partTimeWeeklyRate: 195,
    dailyRate: 65,
    enrollmentFee: 150,
    latePickupFeePerMinute: 1,
    effectiveDate: '2023-01-01',
    annualRegistrationFee: 100,
    latePaymentFee: 25,
    discounts: [
      {
        id: 'discount-sibling-infant',
        name: 'Sibling Discount',
        type: 'percentage',
        value: 10,
        applicableTo: 'tuition',
        multiChildThreshold: 2,
        requirements: 'Must have at least 2 children enrolled'
      },
      {
        id: 'discount-prepay-infant',
        name: 'Prepay Discount',
        type: 'percentage',
        value: 5,
        applicableTo: 'tuition',
        requirements: 'Must pay full month in advance'
      }
    ],
    mealFees: {
      breakfast: 3,
      lunch: 5,
      dinner: 6,
      snack: 2
    }
  },
  'fee-toddler': {
    id: 'fee-toddler',
    name: 'Toddler Care',
    ageGroup: 'toddler',
    fullTimeWeeklyRate: 275,
    partTimeWeeklyRate: 185,
    dailyRate: 60,
    enrollmentFee: 150,
    latePickupFeePerMinute: 1,
    effectiveDate: '2023-01-01',
    annualRegistrationFee: 100,
    latePaymentFee: 25,
    discounts: [
      {
        id: 'discount-sibling-toddler',
        name: 'Sibling Discount',
        type: 'percentage',
        value: 10,
        applicableTo: 'tuition',
        multiChildThreshold: 2,
        requirements: 'Must have at least 2 children enrolled'
      },
      {
        id: 'discount-prepay-toddler',
        name: 'Prepay Discount',
        type: 'percentage',
        value: 5,
        applicableTo: 'tuition',
        requirements: 'Must pay full month in advance'
      }
    ],
    mealFees: {
      breakfast: 3,
      lunch: 5,
      dinner: 6,
      snack: 2
    }
  },
  'fee-preschool': {
    id: 'fee-preschool',
    name: 'Preschool Care',
    ageGroup: 'preschool',
    fullTimeWeeklyRate: 250,
    partTimeWeeklyRate: 170,
    dailyRate: 55,
    enrollmentFee: 150,
    latePickupFeePerMinute: 1,
    effectiveDate: '2023-01-01',
    annualRegistrationFee: 100,
    latePaymentFee: 25,
    discounts: [
      {
        id: 'discount-sibling-preschool',
        name: 'Sibling Discount',
        type: 'percentage',
        value: 10,
        applicableTo: 'tuition',
        multiChildThreshold: 2,
        requirements: 'Must have at least 2 children enrolled'
      },
      {
        id: 'discount-prepay-preschool',
        name: 'Prepay Discount',
        type: 'percentage',
        value: 5,
        applicableTo: 'tuition',
        requirements: 'Must pay full month in advance'
      }
    ],
    mealFees: {
      breakfast: 3,
      lunch: 5,
      dinner: 6,
      snack: 2
    }
  },
  'fee-schoolage': {
    id: 'fee-schoolage',
    name: 'School Age Care',
    ageGroup: 'schoolage',
    fullTimeWeeklyRate: 225,
    partTimeWeeklyRate: 150,
    dailyRate: 50,
    enrollmentFee: 150,
    latePickupFeePerMinute: 1,
    effectiveDate: '2023-01-01',
    annualRegistrationFee: 100,
    latePaymentFee: 25,
    discounts: [
      {
        id: 'discount-sibling-schoolage',
        name: 'Sibling Discount',
        type: 'percentage',
        value: 10,
        applicableTo: 'tuition',
        multiChildThreshold: 2,
        requirements: 'Must have at least 2 children enrolled'
      },
      {
        id: 'discount-prepay-schoolage',
        name: 'Prepay Discount',
        type: 'percentage',
        value: 5,
        applicableTo: 'tuition',
        requirements: 'Must pay full month in advance'
      }
    ],
    mealFees: {
      breakfast: 3,
      lunch: 5,
      dinner: 6,
      snack: 2
    }
  }
};

// Initial state with all required fields
const initialState: AdmissionsState = {
  children: {},
  attendance: {},
  parentContacts: {},
  parentBankingInfo: {},
  billing: {
    accounts: {},
    feeStructures: sampleFeeStructures,
    invoices: {},
    payments: {}
  }
};

// Main component
const AdmissionsAndBilling = () => {
  return (
    <AdmissionsProvider>
      <AdmissionsAndBillingContent />
    </AdmissionsProvider>
  );
};

// Content component
const AdmissionsAndBillingContent = () => {
  const { childProfiles, parentContacts, parentBankingInfo } = useAdmissions();
  const [activeTab, setActiveTab] = useState('admissions');
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [showAddParentForm, setShowAddParentForm] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showChildProfile, setShowChildProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWeek, setCurrentWeek] = useState('Current Week');
  
  const handleAddChildSuccess = (childId: string) => {
    setShowAddChildForm(false);
  };
  
  const handleAddParentSuccess = (parentId: string) => {
    setShowAddParentForm(false);
  };
  
  const handleViewChild = (childId: string) => {
    setSelectedChildId(childId);
    setShowChildProfile(true);
  };
  
  const handleEditChild = (childId: string) => {
    setSelectedChildId(childId);
  };

  // Filter children based on search term
  const filteredChildren = childProfiles.filter(child => {
    const fullName = `${child.firstName} ${child.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  
  // Filter parents based on search term
  const filteredParents = parentContacts.filter(parent => {
    return parent.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className="space-y-6 bg-[#0f172a] text-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Tennessee Childcare Management System</h1>
        <p className="text-gray-400">A fully integrated system for managing admissions, attendance, meals, and billing</p>
        
        <div className="flex mt-4 space-x-8 border-b border-gray-700 pb-2">
          <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium pb-2 border-b-2 border-blue-400">Admissions & Billing</button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200 pb-2 hover:border-b-2 hover:border-gray-400">Meal Planning</button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200 pb-2 hover:border-b-2 hover:border-gray-400">Parent/Child Portal</button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-blue-400 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          Admissions & Weekly Billing
        </h2>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowAddParentForm(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
          >
            <UserRound className="h-4 w-4 mr-2" />
            Add New Parent
          </Button>
          
          <Button 
            onClick={() => setShowAddChildForm(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Child
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-gray-800 transition-all duration-200 ${activeTab === 'admissions' ? 'bg-gray-800 border-b-2 border-blue-400' : ''}`}
          onClick={() => setActiveTab('admissions')}
        >
          <Users className="h-4 w-4 mr-2" />
          Admissions
        </Button>
        <Button 
          variant="ghost" 
          className={`text-white hover:bg-gray-800 transition-all duration-200 ${activeTab === 'billing' ? 'bg-gray-800 border-b-2 border-blue-400' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Weekly Billing
        </Button>
        <Button 
          variant="ghost" 
          className="text-white hover:bg-green-700 ml-auto bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-green-600/20"
        >
          <BarChart2 className="h-4 w-4 mr-2" />
          Reports
        </Button>
      </div>
      
      {/* Financial Reports Section */}
      <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <CardHeader className="border-b border-gray-800 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Financial Reports</CardTitle>
            <Select value={currentWeek} onValueChange={setCurrentWeek}>
              <SelectTrigger className="w-[180px] bg-[#0f172a] border-gray-700 text-white hover:border-gray-600 transition-colors duration-200">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a2234] border-gray-700 text-white">
                <SelectItem value="Current Week">Current Week</SelectItem>
                <SelectItem value="Last Week">Last Week</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Custom Range">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardDescription className="text-gray-400">
            View financial reports, revenue, and payment analytics
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Total Revenue Card */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0d1423] p-4 rounded-lg border border-green-900 shadow-lg hover:shadow-green-900/20 transition-all duration-300 group">
              <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-200">$500.00</div>
              <div className="text-xs text-green-500 mt-1">+5.2% from previous week</div>
            </div>
            
            {/* Outstanding Balance Card */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0d1423] p-4 rounded-lg border border-blue-900 shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group">
              <div className="text-sm text-gray-400 mb-1">Outstanding Balance</div>
              <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-200">$50.00</div>
              <div className="text-xs text-red-500 mt-1">-2.1% from previous week</div>
            </div>
            
            {/* Average Weekly Rate Card */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0d1423] p-4 rounded-lg border border-purple-900 shadow-lg hover:shadow-purple-900/20 transition-all duration-300 group">
              <div className="text-sm text-gray-400 mb-1">Average Weekly Rate</div>
              <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-200">$250.00</div>
              <div className="text-xs text-gray-400 mt-1">Same as previous week</div>
            </div>
          </div>
          
          {/* Revenue Chart */}
          <div className="bg-gradient-to-br from-[#0f172a] to-[#0d1423] p-6 rounded-lg border border-gray-800 mb-6 shadow-lg hover:shadow-green-900/10 transition-all duration-300">
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-green-500 opacity-20 blur-sm rounded-full"></div>
                <BarChart2 className="h-8 w-8 text-green-500 relative z-10" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">Revenue Chart</h3>
            <p className="text-sm text-gray-400 text-center">
              Weekly revenue visualization would appear here in the full implementation.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
          <div className="text-sm text-gray-400">
            Last updated: 5/31/2025
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 transition-all duration-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 transition-all duration-200">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Analytics Sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* Enrollment Analytics */}
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-gray-800 hover:border-blue-900/50 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Enrollment Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0d1423] p-6 rounded-lg border border-gray-800 flex justify-center items-center shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-r-transparent animate-spin [animation-duration:3s]"></div>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Enrollment distribution by age group would appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Analytics */}
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-gray-800 hover:border-purple-900/50 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Payment Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0d1423] p-6 rounded-lg border border-gray-800 flex justify-center items-center shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500 opacity-20 blur-sm rounded-full"></div>
                  <BarChart2 className="h-12 w-12 text-purple-500 mb-4 relative z-10" />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Payment method distribution and trends would appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Child and Parent Management Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Child Management */}
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-gray-800 hover:border-blue-900/50 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Child Profiles</CardTitle>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search children..." 
                  className="pl-9 bg-[#0f172a] border-gray-700 text-white w-[200px] focus:border-blue-500 transition-colors duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-[#131b2e]">
                <TableRow className="hover:bg-[#1a2234] border-b border-gray-800">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Age Group</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChildren.length > 0 ? (
                  filteredChildren.map(child => (
                    <TableRow key={child.id} className="hover:bg-[#1a2234] border-b border-gray-800">
                      <TableCell className="font-medium text-white">
                        {child.firstName} {child.lastName}
                      </TableCell>
                      <TableCell className="text-gray-300 capitalize">{child.ageGroup}</TableCell>
                      <TableCell>
                        {child.enrollmentStatus === 'active' ? (
                          <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-600 hover:bg-gray-700">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => handleViewChild(child.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => handleEditChild(child.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-400">
                      No children found. Add a new child to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Parent Management */}
        <Card className="border-0 bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white shadow-lg overflow-hidden border border-gray-800 hover:border-purple-900/50 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Parent Contacts</CardTitle>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search parents..." 
                  className="pl-9 bg-[#0f172a] border-gray-700 text-white w-[200px] focus:border-purple-500 transition-colors duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-[#131b2e]">
                <TableRow className="hover:bg-[#1a2234] border-b border-gray-800">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Relationship</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParents.length > 0 ? (
                  filteredParents.map(parent => (
                    <TableRow key={parent.id} className="hover:bg-[#1a2234] border-b border-gray-800">
                      <TableCell className="font-medium text-white">
                        {parent.fullName}
                      </TableCell>
                      <TableCell className="text-gray-300 capitalize">{parent.relationship}</TableCell>
                      <TableCell className="text-gray-300">{parent.phone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-400">
                      No parents found. Add a new parent to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Parent Management Section (Hidden by default, shown when needed) */}
      <Dialog open={showAddChildForm} onOpenChange={setShowAddChildForm}>
        <DialogContent className="bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Add New Child</DialogTitle>
          </DialogHeader>
          <AdmissionsBillingAddChildForm 
            onSuccess={handleAddChildSuccess} 
            onCancel={() => setShowAddChildForm(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showAddParentForm} onOpenChange={setShowAddParentForm}>
        <DialogContent className="bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Add New Parent</DialogTitle>
          </DialogHeader>
          <AddParentForm 
            onSuccess={handleAddParentSuccess} 
            onCancel={() => setShowAddParentForm(false)}
            childId={selectedChildId}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showChildProfile} onOpenChange={setShowChildProfile}>
        <DialogContent className="bg-gradient-to-b from-[#1a2234] to-[#131b2e] text-white border-gray-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Child Profile</DialogTitle>
          </DialogHeader>
          {selectedChildId && (
            <ChildProfileView 
              childId={selectedChildId} 
              onEdit={handleEditChild}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdmissionsAndBilling;
