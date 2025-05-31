import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  Award, 
  Users, 
  Building, 
  FileText, 
  Star,
  Info,
  Download,
  Printer
} from "lucide-react";

// Types for Accreditation Comparison
interface Requirement {
  id: string;
  category: string;
  description: string;
  difficulty: number; // 1-10 scale
  tnSpecific: boolean; // Is this requirement specific to Tennessee?
}

interface Benefit {
  id: string;
  category: string;
  description: string;
  tnSpecific: boolean; // Is this benefit specific to Tennessee?
  financialImpact: number; // Estimated financial impact
  marketingValue: number; // 1-10 scale
}

interface CostStructure {
  applicationFee: number;
  annualFees: number;
  staffTrainingCosts: number;
  materialsCosts: number;
  consultingCosts: number;
  totalEstimatedCost: number;
}

interface TimelineStructure {
  preparationMonths: number;
  applicationProcessMonths: number;
  siteVisitTimeframe: string;
  totalEstimatedMonths: number;
  renewalFrequency: number; // in years
}

interface Accreditation {
  id: string;
  name: string;
  organization: string;
  description: string;
  requirements: Requirement[];
  benefits: Benefit[];
  cost: CostStructure;
  timeToComplete: TimelineStructure;
  difficulty: number; // 1-10 scale
  isFaithBased: boolean;
  tnStarRating?: number; // Optional automatic Star rating
  score?: number; // Calculated score based on user priorities
  logoUrl?: string; // URL to the organization's logo
}

interface UserPriorities {
  cost: number; // 1-10 importance
  timeline: number;
  staffRequirements: number;
  curriculumStandards: number;
  facilityRequirements: number;
  familyEngagement: number;
  healthAndSafety: number;
  tnSpecificBenefits: number;
  marketingValue: number;
  maintenanceRequirements: number;
}

interface CenterInfo {
  classrooms: number;
  staff: number;
  squareFootage: number;
  currentStarRating: number;
  childrenEnrolled: number;
}

// Sample data for accreditations
const accreditationData: Accreditation[] = [
  {
    id: "tn-star-1",
    name: "Tennessee Star-Quality (1-Star)",
    organization: "Tennessee Department of Human Services",
    description: "The Tennessee Star-Quality Child Care Program is a voluntary program that recognizes child care agencies who exceed minimum licensing standards.",
    requirements: [
      {
        id: "tn-star-1-req1",
        category: "Licensing",
        description: "Meet all minimum licensing requirements",
        difficulty: 3,
        tnSpecific: true
      },
      {
        id: "tn-star-1-req2",
        category: "Staff Qualifications",
        description: "Director and teaching staff meet minimum education requirements",
        difficulty: 4,
        tnSpecific: true
      },
      {
        id: "tn-star-1-req3",
        category: "Ratios",
        description: "Maintain minimum required adult-to-child ratios",
        difficulty: 5,
        tnSpecific: true
      }
    ],
    benefits: [
      {
        id: "tn-star-1-ben1",
        category: "Financial",
        description: "Basic reimbursement rate for subsidized care",
        tnSpecific: true,
        financialImpact: 3,
        marketingValue: 2
      },
      {
        id: "tn-star-1-ben2",
        category: "Recognition",
        description: "Official recognition in Tennessee's Star-Quality Program",
        tnSpecific: true,
        financialImpact: 1,
        marketingValue: 3
      }
    ],
    cost: {
      applicationFee: 0,
      annualFees: 0,
      staffTrainingCosts: 500,
      materialsCosts: 300,
      consultingCosts: 0,
      totalEstimatedCost: 800
    },
    timeToComplete: {
      preparationMonths: 1,
      applicationProcessMonths: 1,
      siteVisitTimeframe: "1-2 months",
      totalEstimatedMonths: 3,
      renewalFrequency: 1
    },
    difficulty: 3,
    isFaithBased: false,
    tnStarRating: 1
  },
  {
    id: "tn-star-3",
    name: "Tennessee Star-Quality (3-Star)",
    organization: "Tennessee Department of Human Services",
    description: "The highest level in Tennessee's Star-Quality Child Care Program, recognizing providers who substantially exceed minimum licensing standards.",
    requirements: [
      {
        id: "tn-star-3-req1",
        category: "Licensing",
        description: "Exceed all minimum licensing requirements",
        difficulty: 6,
        tnSpecific: true
      },
      {
        id: "tn-star-3-req2",
        category: "Staff Qualifications",
        description: "Director has bachelor's degree in ECE or related field; lead teachers have CDA or higher",
        difficulty: 7,
        tnSpecific: true
      },
      {
        id: "tn-star-3-req3",
        category: "Ratios",
        description: "Maintain better than required adult-to-child ratios",
        difficulty: 8,
        tnSpecific: true
      },
      {
        id: "tn-star-3-req4",
        category: "Environment",
        description: "Score of 5.0 or higher on Environment Rating Scales",
        difficulty: 8,
        tnSpecific: true
      },
      {
        id: "tn-star-3-req5",
        category: "Professional Development",
        description: "30+ hours of annual training for all staff",
        difficulty: 7,
        tnSpecific: true
      }
    ],
    benefits: [
      {
        id: "tn-star-3-ben1",
        category: "Financial",
        description: "Highest reimbursement rate for subsidized care (up to 20% higher)",
        tnSpecific: true,
        financialImpact: 8,
        marketingValue: 7
      },
      {
        id: "tn-star-3-ben2",
        category: "Recognition",
        description: "Highest level of recognition in Tennessee's Star-Quality Program",
        tnSpecific: true,
        financialImpact: 5,
        marketingValue: 9
      },
      {
        id: "tn-star-3-ben3",
        category: "Marketing",
        description: "Distinction as a top-quality provider in Tennessee",
        tnSpecific: true,
        financialImpact: 6,
        marketingValue: 9
      }
    ],
    cost: {
      applicationFee: 0,
      annualFees: 0,
      staffTrainingCosts: 2000,
      materialsCosts: 1500,
      consultingCosts: 1000,
      totalEstimatedCost: 4500
    },
    timeToComplete: {
      preparationMonths: 6,
      applicationProcessMonths: 2,
      siteVisitTimeframe: "2-3 months",
      totalEstimatedMonths: 12,
      renewalFrequency: 1
    },
    difficulty: 8,
    isFaithBased: false,
    tnStarRating: 3
  },
  {
    id: "naeyc",
    name: "NAEYC Accreditation",
    organization: "National Association for the Education of Young Children",
    description: "NAEYC Accreditation is the gold standard for early childhood programs across the country. Families of young children who attend NAEYC-accredited programs can be confident that they deliver the highest quality early care and education.",
    requirements: [
      {
        id: "naeyc-req1",
        category: "Relationships",
        description: "Promote positive relationships among all children and adults",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "naeyc-req2",
        category: "Curriculum",
        description: "Implement a curriculum that fosters all areas of child development",
        difficulty: 8,
        tnSpecific: false
      },
      {
        id: "naeyc-req3",
        category: "Teaching",
        description: "Use developmentally, culturally, and linguistically appropriate teaching approaches",
        difficulty: 8,
        tnSpecific: false
      },
      {
        id: "naeyc-req4",
        category: "Assessment",
        description: "Use ongoing, systematic formal and informal assessment approaches",
        difficulty: 9,
        tnSpecific: false
      },
      {
        id: "naeyc-req5",
        category: "Health",
        description: "Promote the nutrition and health of children and protect from illness and injury",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "naeyc-req6",
        category: "Staff",
        description: "Employ and support a teaching staff with the educational qualifications, knowledge, and commitment",
        difficulty: 9,
        tnSpecific: false
      },
      {
        id: "naeyc-req7",
        category: "Families",
        description: "Establish and maintain collaborative relationships with each child's family",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "naeyc-req8",
        category: "Community",
        description: "Establish relationships with and use the resources of the community",
        difficulty: 6,
        tnSpecific: false
      },
      {
        id: "naeyc-req9",
        category: "Environment",
        description: "Provide a safe and healthful environment with appropriate and well-maintained indoor and outdoor equipment",
        difficulty: 8,
        tnSpecific: false
      },
      {
        id: "naeyc-req10",
        category: "Leadership",
        description: "Implement strong personnel, fiscal, and program management policies",
        difficulty: 8,
        tnSpecific: false
      }
    ],
    benefits: [
      {
        id: "naeyc-ben1",
        category: "Recognition",
        description: "National recognition as a high-quality early childhood program",
        tnSpecific: false,
        financialImpact: 7,
        marketingValue: 10
      },
      {
        id: "naeyc-ben2",
        category: "Financial",
        description: "May qualify for automatic 3-Star rating in Tennessee's system",
        tnSpecific: true,
        financialImpact: 8,
        marketingValue: 8
      },
      {
        id: "naeyc-ben3",
        category: "Professional Development",
        description: "Access to NAEYC resources, conferences, and professional community",
        tnSpecific: false,
        financialImpact: 5,
        marketingValue: 7
      },
      {
        id: "naeyc-ben4",
        category: "Quality Improvement",
        description: "Structured framework for continuous quality improvement",
        tnSpecific: false,
        financialImpact: 6,
        marketingValue: 7
      }
    ],
    cost: {
      applicationFee: 1600,
      annualFees: 550,
      staffTrainingCosts: 3000,
      materialsCosts: 2000,
      consultingCosts: 3000,
      totalEstimatedCost: 10150
    },
    timeToComplete: {
      preparationMonths: 12,
      applicationProcessMonths: 6,
      siteVisitTimeframe: "3-6 months",
      totalEstimatedMonths: 24,
      renewalFrequency: 5
    },
    difficulty: 9,
    isFaithBased: false,
    tnStarRating: 3,
    logoUrl: "https://www.naeyc.org/sites/default/files/globally-shared/images/accreditation/naeyc-accreditation-logo.png"
  },
  {
    id: "necpa",
    name: "NECPA Accreditation",
    organization: "National Early Childhood Program Accreditation",
    description: "NECPA Accreditation is designed for programs that provide care and education to children ages 0 through 5 years, including center-based child care, preschools, Head Start programs, and military child care centers.",
    requirements: [
      {
        id: "necpa-req1",
        category: "Administration",
        description: "Comprehensive administrative policies and procedures",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "necpa-req2",
        category: "Staff Qualifications",
        description: "Director and teaching staff meet education and experience requirements",
        difficulty: 8,
        tnSpecific: false
      },
      {
        id: "necpa-req3",
        category: "Physical Environment",
        description: "Safe, healthy, and developmentally appropriate environment",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "necpa-req4",
        category: "Health and Safety",
        description: "Comprehensive health and safety policies and practices",
        difficulty: 6,
        tnSpecific: false
      },
      {
        id: "necpa-req5",
        category: "Curriculum",
        description: "Developmentally appropriate curriculum implementation",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "necpa-req6",
        category: "Family Partnerships",
        description: "Strong family communication and involvement",
        difficulty: 6,
        tnSpecific: false
      }
    ],
    benefits: [
      {
        id: "necpa-ben1",
        category: "Recognition",
        description: "National recognition as an accredited early childhood program",
        tnSpecific: false,
        financialImpact: 6,
        marketingValue: 8
      },
      {
        id: "necpa-ben2",
        category: "Financial",
        description: "May qualify for higher reimbursement rates in Tennessee",
        tnSpecific: true,
        financialImpact: 7,
        marketingValue: 7
      },
      {
        id: "necpa-ben3",
        category: "Support",
        description: "Access to NECPA resources and support network",
        tnSpecific: false,
        financialImpact: 4,
        marketingValue: 6
      }
    ],
    cost: {
      applicationFee: 795,
      annualFees: 300,
      staffTrainingCosts: 2000,
      materialsCosts: 1500,
      consultingCosts: 2000,
      totalEstimatedCost: 6595
    },
    timeToComplete: {
      preparationMonths: 8,
      applicationProcessMonths: 4,
      siteVisitTimeframe: "2-4 months",
      totalEstimatedMonths: 16,
      renewalFrequency: 3
    },
    difficulty: 8,
    isFaithBased: false,
    tnStarRating: 3
  },
  {
    id: "coa",
    name: "COA Accreditation",
    organization: "Council on Accreditation",
    description: "COA accreditation focuses on after-school programs and services for children and youth, ensuring high-quality standards in administration, programming, and service delivery.",
    requirements: [
      {
        id: "coa-req1",
        category: "Administration",
        description: "Sound administrative practices and fiscal management",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "coa-req2",
        category: "Program Quality",
        description: "High-quality programming and service delivery",
        difficulty: 7,
        tnSpecific: false
      },
      {
        id: "coa-req3",
        category: "Staff Development",
        description: "Comprehensive staff development and supervision",
        difficulty: 8,
        tnSpecific: false
      },
      {
        id: "coa-req4",
        category: "Child Development",
        description: "Focus on positive child and youth development",
        difficulty: 6,
        tnSpecific: false
      }
    ],
    benefits: [
      {
        id: "coa-ben1",
        category: "Recognition",
        description: "Recognition as a high-quality after-school program",
        tnSpecific: false,
        financialImpact: 5,
        marketingValue: 7
      },
      {
        id: "coa-ben2",
        category: "Quality Improvement",
        description: "Framework for continuous quality improvement",
        tnSpecific: false,
        financialImpact: 4,
        marketingValue: 6
      }
    ],
    cost: {
      applicationFee: 1000,
      annualFees: 500,
      staffTrainingCosts: 1500,
      materialsCosts: 1000,
      consultingCosts: 2000,
      totalEstimatedCost: 6000
    },
    timeToComplete: {
      preparationMonths: 6,
      applicationProcessMonths: 4,
      siteVisitTimeframe: "2-3 months",
      totalEstimatedMonths: 14,
      renewalFrequency: 4
    },
    difficulty: 7,
    isFaithBased: false
  }
];

// Default user priorities
const defaultPriorities: UserPriorities = {
  cost: 5,
  timeline: 5,
  staffRequirements: 5,
  curriculumStandards: 5,
  facilityRequirements: 5,
  familyEngagement: 5,
  healthAndSafety: 5,
  tnSpecificBenefits: 5,
  marketingValue: 5,
  maintenanceRequirements: 5
};

// Default center info
const defaultCenterInfo: CenterInfo = {
  classrooms: 4,
  staff: 8,
  squareFootage: 3000,
  currentStarRating: 1,
  childrenEnrolled: 40
};

// Helper function to calculate difficulty level label
const getDifficultyLabel = (level: number): string => {
  if (level <= 3) return "Easy";
  if (level <= 6) return "Moderate";
  return "Challenging";
};

// Helper function to calculate difficulty color
const getDifficultyColor = (level: number): string => {
  if (level <= 3) return "bg-green-500";
  if (level <= 6) return "bg-yellow-500";
  return "bg-red-500";
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Main component
const AccreditationComparison: React.FC = () => {
  // State for selected accreditations
  const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>(
    accreditationData.map(accred => accred.id)
  );
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // State for user priorities
  const [userPriorities, setUserPriorities] = useState<UserPriorities>(defaultPriorities);
  
  // State for center info
  const [centerInfo, setCenterInfo] = useState<CenterInfo>(defaultCenterInfo);
  
  // Calculate scores based on user priorities
  const accreditationsWithScores = useMemo(() => {
    return accreditationData.map(accred => {
      // Calculate score based on priorities
      let score = 0;
      
      // Cost score (inverse - lower cost is better)
      const costScore = 10 - Math.min(accred.cost.totalEstimatedCost / 2000, 10);
      score += costScore * (userPriorities.cost / 10);
      
      // Timeline score (inverse - shorter time is better)
      const timelineScore = 10 - Math.min(accred.timeToComplete.totalEstimatedMonths / 3, 10);
      score += timelineScore * (userPriorities.timeline / 10);
      
      // Difficulty score (inverse - lower difficulty is better)
      const difficultyScore = 10 - accred.difficulty;
      score += difficultyScore * 
        ((userPriorities.staffRequirements + userPriorities.curriculumStandards + 
          userPriorities.facilityRequirements) / 30);
      
      // Tennessee-specific benefits
      const tnBenefits = accred.benefits.filter(b => b.tnSpecific);
      const tnBenefitScore = tnBenefits.length > 0 
        ? tnBenefits.reduce((sum, b) => sum + b.financialImpact, 0) / tnBenefits.length
        : 0;
      score += tnBenefitScore * (userPriorities.tnSpecificBenefits / 10);
      
      // Marketing value
      const marketingScore = accred.benefits.reduce((sum, b) => sum + b.marketingValue, 0) / 
        Math.max(1, accred.benefits.length);
      score += marketingScore * (userPriorities.marketingValue / 10);
      
      // Normalize score to 0-100
      const normalizedScore = Math.round((score / 5) * 10);
      
      return {
        ...accred,
        score: normalizedScore
      };
    }).sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [userPriorities]);
  
  // Filtered accreditations based on selection
  const filteredAccreditations = useMemo(() => {
    return accreditationsWithScores.filter(accred => 
      selectedAccreditations.includes(accred.id)
    );
  }, [accreditationsWithScores, selectedAccreditations]);
  
  // Calculate estimated costs based on center info
  const calculateEstimatedCosts = (accred: Accreditation): CostStructure => {
    const staffFactor = Math.max(1, centerInfo.staff / 8);
    const classroomFactor = Math.max(1, centerInfo.classrooms / 4);
    
    return {
      applicationFee: accred.cost.applicationFee,
      annualFees: accred.cost.annualFees,
      staffTrainingCosts: Math.round(accred.cost.staffTrainingCosts * staffFactor),
      materialsCosts: Math.round(accred.cost.materialsCosts * classroomFactor),
      consultingCosts: accred.cost.consultingCosts,
      totalEstimatedCost: Math.round(
        accred.cost.applicationFee + 
        accred.cost.annualFees + 
        (accred.cost.staffTrainingCosts * staffFactor) + 
        (accred.cost.materialsCosts * classroomFactor) + 
        accred.cost.consultingCosts
      )
    };
  };
  
  // Toggle accreditation selection
  const toggleAccreditation = (id: string) => {
    if (selectedAccreditations.includes(id)) {
      setSelectedAccreditations(selectedAccreditations.filter(accredId => accredId !== id));
    } else {
      setSelectedAccreditations([...selectedAccreditations, id]);
    }
  };
  
  // Update user priority
  const updatePriority = (key: keyof UserPriorities, value: number) => {
    setUserPriorities({
      ...userPriorities,
      [key]: value
    });
  };
  
  // Update center info
  const updateCenterInfo = (key: keyof CenterInfo, value: number) => {
    setCenterInfo({
      ...centerInfo,
      [key]: value
    });
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tennessee Childcare Accreditation Comparison</h2>
      <p className="text-muted-foreground mb-6">
        Compare different accreditation options for your Tennessee childcare center to make an informed decision.
      </p>
      
      {/* Accreditation Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Accreditations to Compare</h3>
        <div className="flex flex-wrap gap-2">
          {accreditationData.map(accred => (
            <div key={accred.id} className="flex items-center">
              <Checkbox 
                id={`select-${accred.id}`}
                checked={selectedAccreditations.includes(accred.id)}
                onCheckedChange={() => toggleAccreditation(accred.id)}
              />
              <label 
                htmlFor={`select-${accred.id}`} 
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                {accred.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="costs">Costs & Timeline</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Accreditation</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>TN Star Rating</TableHead>
                  <TableHead>Est. Cost</TableHead>
                  <TableHead>Timeline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccreditations.map(accred => {
                  const estimatedCosts = calculateEstimatedCosts(accred);
                  return (
                    <TableRow key={accred.id}>
                      <TableCell className="font-medium">{accred.name}</TableCell>
                      <TableCell>{accred.organization}</TableCell>
                      <TableCell className="max-w-[300px]">{accred.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getDifficultyColor(accred.difficulty)}`}></div>
                          {getDifficultyLabel(accred.difficulty)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {accred.tnStarRating ? (
                          <div className="flex">
                            {[...Array(accred.tnStarRating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        ) : "N/A"}
                      </TableCell>
                      <TableCell>{formatCurrency(estimatedCosts.totalEstimatedCost)}</TableCell>
                      <TableCell>{accred.timeToComplete.totalEstimatedMonths} months</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          {filteredAccreditations.map(accred => (
            <Card key={accred.id} className="mb-4">
              <CardHeader>
                <CardTitle>{accred.name}</CardTitle>
                <CardDescription>Key requirements for {accred.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accred.requirements.map(req => (
                    <div key={req.id} className="flex items-start p-2 border rounded-md">
                      <div className={`w-1 self-stretch mr-2 ${getDifficultyColor(req.difficulty)}`}></div>
                      <div>
                        <div className="font-medium">{req.category}</div>
                        <div className="text-sm text-muted-foreground">{req.description}</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            Difficulty: {getDifficultyLabel(req.difficulty)}
                          </span>
                          {req.tnSpecific && (
                            <Badge variant="outline" className="ml-2">TN Specific</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Costs & Timeline Tab */}
        <TabsContent value="costs" className="space-y-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Your Center Information</CardTitle>
              <CardDescription>
                Adjust these values to get personalized cost estimates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classrooms">Number of Classrooms</Label>
                  <div className="flex items-center">
                    <Input 
                      id="classrooms" 
                      type="number" 
                      value={centerInfo.classrooms}
                      onChange={(e) => updateCenterInfo('classrooms', parseInt(e.target.value) || 0)}
                      className="w-20 mr-2"
                      min={1}
                    />
                    <span className="text-sm text-muted-foreground">classrooms</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff">Number of Staff</Label>
                  <div className="flex items-center">
                    <Input 
                      id="staff" 
                      type="number" 
                      value={centerInfo.staff}
                      onChange={(e) => updateCenterInfo('staff', parseInt(e.target.value) || 0)}
                      className="w-20 mr-2"
                      min={1}
                    />
                    <span className="text-sm text-muted-foreground">staff members</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children">Children Enrolled</Label>
                  <div className="flex items-center">
                    <Input 
                      id="children" 
                      type="number" 
                      value={centerInfo.childrenEnrolled}
                      onChange={(e) => updateCenterInfo('childrenEnrolled', parseInt(e.target.value) || 0)}
                      className="w-20 mr-2"
                      min={1}
                    />
                    <span className="text-sm text-muted-foreground">children</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="squareFootage">Facility Size</Label>
                  <div className="flex items-center">
                    <Input 
                      id="squareFootage" 
                      type="number" 
                      value={centerInfo.squareFootage}
                      onChange={(e) => updateCenterInfo('squareFootage', parseInt(e.target.value) || 0)}
                      className="w-24 mr-2"
                      min={0}
                    />
                    <span className="text-sm text-muted-foreground">square feet</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentStarRating">Current Star Rating</Label>
                  <div className="flex items-center">
                    <Input 
                      id="currentStarRating" 
                      type="number" 
                      value={centerInfo.currentStarRating}
                      onChange={(e) => updateCenterInfo('currentStarRating', parseInt(e.target.value) || 0)}
                      className="w-20 mr-2"
                      min={0}
                      max={3}
                    />
                    <span className="text-sm text-muted-foreground">stars</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Comparison</CardTitle>
                <CardDescription>Estimated costs based on your center information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Accreditation</TableHead>
                      <TableHead>Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccreditations.map(accred => {
                      const costs = calculateEstimatedCosts(accred);
                      return (
                        <TableRow key={accred.id}>
                          <TableCell>{accred.name}</TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(costs.totalEstimatedCost)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Detailed Cost Breakdown</h4>
                  {filteredAccreditations.length === 1 && (
                    <div className="space-y-2">
                      {Object.entries(calculateEstimatedCosts(filteredAccreditations[0])).map(([key, value]) => {
                        if (key === 'totalEstimatedCost') return null;
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                            <span className="font-medium">{formatCurrency(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {filteredAccreditations.length !== 1 && (
                    <p className="text-sm text-muted-foreground">Select a single accreditation to see detailed breakdown</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Timeline Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline Comparison</CardTitle>
                <CardDescription>Estimated time to complete accreditation</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Accreditation</TableHead>
                      <TableHead>Total Time</TableHead>
                      <TableHead>Renewal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccreditations.map(accred => (
                      <TableRow key={accred.id}>
                        <TableCell>{accred.name}</TableCell>
                        <TableCell>{accred.timeToComplete.totalEstimatedMonths} months</TableCell>
                        <TableCell>Every {accred.timeToComplete.renewalFrequency} {accred.timeToComplete.renewalFrequency === 1 ? 'year' : 'years'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Timeline Breakdown</h4>
                  {filteredAccreditations.length === 1 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Preparation</span>
                        <span className="font-medium">{filteredAccreditations[0].timeToComplete.preparationMonths} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Application Process</span>
                        <span className="font-medium">{filteredAccreditations[0].timeToComplete.applicationProcessMonths} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Site Visit Timeframe</span>
                        <span className="font-medium">{filteredAccreditations[0].timeToComplete.siteVisitTimeframe}</span>
                      </div>
                    </div>
                  )}
                  {filteredAccreditations.length !== 1 && (
                    <p className="text-sm text-muted-foreground">Select a single accreditation to see detailed breakdown</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4">
          {filteredAccreditations.map(accred => (
            <Card key={accred.id} className="mb-4">
              <CardHeader>
                <CardTitle>{accred.name}</CardTitle>
                <CardDescription>Key benefits of {accred.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accred.benefits.map(benefit => (
                    <div key={benefit.id} className="p-2 border rounded-md">
                      <div className="font-medium">{benefit.category}</div>
                      <div className="text-sm text-muted-foreground">{benefit.description}</div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center mr-4">
                          <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-xs">Financial Impact: {benefit.financialImpact}/10</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-blue-500" />
                          <span className="text-xs">Marketing Value: {benefit.marketingValue}/10</span>
                        </div>
                        {benefit.tnSpecific && (
                          <Badge variant="outline" className="ml-2">TN Specific</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {accred.tnStarRating && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-medium">Tennessee Star Rating Impact</span>
                    </div>
                    <p className="text-sm mt-1">
                      This accreditation may qualify your center for an automatic {accred.tnStarRating}-Star 
                      rating in Tennessee's Star-Quality Child Care Program.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Recommendation Tab */}
        <TabsContent value="recommendation" className="space-y-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Your Priorities</CardTitle>
              <CardDescription>
                Adjust these sliders to indicate what matters most to your center
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cost-priority">Cost Importance</Label>
                    <span className="text-sm">{userPriorities.cost}/10</span>
                  </div>
                  <Slider 
                    id="cost-priority"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[userPriorities.cost]}
                    onValueChange={(value) => updatePriority('cost', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="timeline-priority">Timeline Importance</Label>
                    <span className="text-sm">{userPriorities.timeline}/10</span>
                  </div>
                  <Slider 
                    id="timeline-priority"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[userPriorities.timeline]}
                    onValueChange={(value) => updatePriority('timeline', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="staff-priority">Staff Requirements Importance</Label>
                    <span className="text-sm">{userPriorities.staffRequirements}/10</span>
                  </div>
                  <Slider 
                    id="staff-priority"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[userPriorities.staffRequirements]}
                    onValueChange={(value) => updatePriority('staffRequirements', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="tn-priority">Tennessee-Specific Benefits Importance</Label>
                    <span className="text-sm">{userPriorities.tnSpecificBenefits}/10</span>
                  </div>
                  <Slider 
                    id="tn-priority"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[userPriorities.tnSpecificBenefits]}
                    onValueChange={(value) => updatePriority('tnSpecificBenefits', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="marketing-priority">Marketing Value Importance</Label>
                    <span className="text-sm">{userPriorities.marketingValue}/10</span>
                  </div>
                  <Slider 
                    id="marketing-priority"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[userPriorities.marketingValue]}
                    onValueChange={(value) => updatePriority('marketingValue', value[0])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Accreditations</CardTitle>
              <CardDescription>Based on your priorities and center information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accreditationsWithScores.slice(0, 3).map((accred, index) => (
                  <div key={accred.id} className="flex items-center space-x-4 p-3 border rounded-md">
                    <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{accred.name}</h4>
                      <p className="text-sm text-muted-foreground">{accred.organization}</p>
                      <div className="mt-1">
                        <Progress value={accred.score} className="h-2" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{accred.score}%</div>
                      <div className="text-sm text-muted-foreground">match score</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" className="flex items-center">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Comparison
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          This tool provides a comparison of accreditation options based on Tennessee regulations and standards.
          Always verify current requirements with the accrediting organization and Tennessee Department of Human Services.
        </p>
      </div>
    </div>
  );
};

export default AccreditationComparison;
