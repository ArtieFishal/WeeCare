import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const EquipmentBudgetPrintable: React.FC = () => {
  const [printType, setPrintType] = React.useState<'official' | 'internal'>('official');
  
  // Get data from localStorage
  const centerInfo = JSON.parse(localStorage.getItem('equipmentBudgetCenterInfo') || '{}');
  const ageGroups = JSON.parse(localStorage.getItem('equipmentBudgetAgeGroups') || '{}');
  const cart = JSON.parse(localStorage.getItem('equipmentBudgetCart') || '[]');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  const getTotalCost = () => {
    return cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  };
  
  const getEssentialCost = () => {
    const essentialItems = cart.filter((item: any) => item.essential);
    return essentialItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  };
  
  const getOptionalCost = () => {
    const optionalItems = cart.filter((item: any) => !item.essential);
    return optionalItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  };
  
  const getTnRequiredCost = () => {
    const tnRequiredItems = cart.filter((item: any) => item.tnRequirement);
    return tnRequiredItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  };
  
  const getRemainingBudget = () => {
    return centerInfo.budget - getTotalCost();
  };
  
  const getCompliancePercentage = () => {
    const requiredItems = cart.filter((item: any) => item.tnRequirement);
    const totalRequired = cart.filter((item: any) => item.tnRequirement).length;
    
    if (totalRequired === 0) return 100;
    return Math.round((requiredItems.length / totalRequired) * 100);
  };
  
  const getItemsByCategory = () => {
    const categories: Record<string, any[]> = {};
    
    cart.forEach((item: any) => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    
    return categories;
  };
  
  const getItemsByAgeGroup = () => {
    const groups: Record<string, any[]> = {
      'infants': [],
      'toddlers': [],
      'preschool': [],
      'schoolAge': [],
      'general': []
    };
    
    cart.forEach((item: any) => {
      groups[item.ageGroup].push(item);
    });
    
    return groups;
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const togglePrintType = () => {
    setPrintType(printType === 'official' ? 'internal' : 'official');
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="container mx-auto p-4 print:p-0">
      <div className="print:hidden mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Equipment Budget Plan</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={togglePrintType}>
            Switch to {printType === 'official' ? 'Internal' : 'Official'} Format
          </Button>
          <Button onClick={handlePrint}>Print Document</Button>
        </div>
      </div>
      
      {printType === 'official' ? (
        // Official licensing document format
        <div className="official-document">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">TENNESSEE DEPARTMENT OF HUMAN SERVICES</h1>
            <h2 className="text-xl font-semibold mb-1">CHILD CARE LICENSING PROGRAM</h2>
            <h3 className="text-lg">EQUIPMENT COMPLIANCE DOCUMENTATION</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p><strong>Facility Name:</strong> {centerInfo.centerName || '[FACILITY NAME]'}</p>
              <p><strong>License Number:</strong> {centerInfo.licenseNumber || '[LICENSE NUMBER]'}</p>
              <p><strong>Director:</strong> {centerInfo.director || '[DIRECTOR NAME]'}</p>
            </div>
            <div>
              <p><strong>Address:</strong> {centerInfo.address || '[ADDRESS]'}</p>
              <p><strong>Phone:</strong> {centerInfo.phone || '[PHONE]'}</p>
              <p><strong>Date Prepared:</strong> {formatDate(new Date())}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">I. AGE GROUPS SERVED</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>☐ Infants (0-12 months):</strong> {ageGroups.infants ? '✓' : ''}
                </p>
                <p>
                  <strong>☐ Toddlers (12-30 months):</strong> {ageGroups.toddlers ? '✓' : ''}
                </p>
              </div>
              <div>
                <p>
                  <strong>☐ Preschool (3-5 years):</strong> {ageGroups.preschool ? '✓' : ''}
                </p>
                <p>
                  <strong>☐ School Age (5+ years):</strong> {ageGroups.schoolAge ? '✓' : ''}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">II. REGULATORY COMPLIANCE SUMMARY</h3>
            <p className="mb-2">
              <strong>Compliance Status:</strong> {getCompliancePercentage()}% of required items included
            </p>
            <p className="mb-4">
              This equipment plan addresses the requirements set forth in Rule 1240-04-01-.14 EQUIPMENT FOR CHILDREN
              of the Rules of the Tennessee Department of Human Services.
            </p>
            
            <h4 className="font-semibold mb-1">Tennessee Required Equipment Categories:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>General Safety Equipment (Rule 1240-04-01-.14(1))</li>
              <li>Indoor Equipment (Rule 1240-04-01-.14(2))</li>
              <li>Outdoor Play Equipment (Rule 1240-04-01-.14(3))</li>
              <li>Naptime and Sleeping Equipment (Rule 1240-04-01-.14(4))</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">III. TENNESSEE REQUIRED EQUIPMENT INVENTORY</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Age Group</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>TN Rule Citation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.filter((item: any) => item.tnRequirement).map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.ageGroup === 'general' ? 'All Ages' : item.ageGroup}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.tnCitation || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">IV. ADDITIONAL EQUIPMENT INVENTORY</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Age Group</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.filter((item: any) => !item.tnRequirement).map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.ageGroup === 'general' ? 'All Ages' : item.ageGroup}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">V. CERTIFICATION</h3>
            <p className="mb-4">
              I certify that this equipment plan meets the requirements of the Rules of the Tennessee Department of Human Services
              for Child Care Agencies (Chapter 1240-04-01) and that all equipment will be maintained in good repair and kept clean
              as required by Rule 1240-04-01-.14(1)(i).
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <p className="border-t border-black pt-1">Director Signature</p>
              </div>
              <div>
                <p className="border-t border-black pt-1">Date</p>
              </div>
            </div>
          </div>
          
          <div className="text-xs mt-8 text-center">
            <p>Tennessee Department of Human Services • Child Care Services • James K. Polk Building, 505 Deaderick Street • Nashville, TN 37243</p>
            <p>Tel: 615-313-4778 • Fax: 615-532-9956 • tn.gov/humanservices</p>
          </div>
        </div>
      ) : (
        // Internal planning worksheet format
        <div className="internal-document">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{centerInfo.centerName || 'Childcare Center'} - Equipment Budget Plan</h1>
            <p className="text-sm text-muted-foreground">
              Internal Planning Worksheet • Prepared: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Center Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Center Name:</strong> {centerInfo.centerName || 'N/A'}</p>
                  <p><strong>License Number:</strong> {centerInfo.licenseNumber || 'N/A'}</p>
                  <p><strong>Director:</strong> {centerInfo.director || 'N/A'}</p>
                  <p><strong>Address:</strong> {centerInfo.address || 'N/A'}</p>
                  <p><strong>Phone:</strong> {centerInfo.phone || 'N/A'}</p>
                  <p><strong>Email:</strong> {centerInfo.email || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Total Budget:</strong> {formatCurrency(centerInfo.budget || 0)}</p>
                  <p><strong>Essential Items:</strong> {formatCurrency(getEssentialCost())}</p>
                  <p><strong>Optional Items:</strong> {formatCurrency(getOptionalCost())}</p>
                  <p><strong>TN Required Items:</strong> {formatCurrency(getTnRequiredCost())}</p>
                  <Separator className="my-2" />
                  <p><strong>Total Spent:</strong> {formatCurrency(getTotalCost())}</p>
                  <p className={`font-bold ${getRemainingBudget() < 0 ? 'text-destructive' : 'text-primary'}`}>
                    <strong>Remaining Budget:</strong> {formatCurrency(getRemainingBudget())}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Age Groups & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-2">Age Groups Served:</h4>
                  <ul className="list-disc pl-6">
                    {ageGroups.infants && <li>Infants (0-12 months)</li>}
                    {ageGroups.toddlers && <li>Toddlers (12-30 months)</li>}
                    {ageGroups.preschool && <li>Preschool (3-5 years)</li>}
                    {ageGroups.schoolAge && <li>School Age (5+ years)</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">TN Compliance Status:</h4>
                  <p className="mb-1">
                    <Badge variant={getCompliancePercentage() === 100 ? "outline" : "outline"}>
                      {getCompliancePercentage()}% Complete
                    </Badge>
                  </p>
                  <p className="text-sm">
                    {cart.filter((item: any) => item.tnRequirement).length} of required items included
                  </p>
                </div>
              </div>
              
              {centerInfo.notes && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Planning Notes:</h4>
                  <div className="bg-muted p-3 rounded-md">
                    {centerInfo.notes}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Equipment by Category</h3>
            
            {Object.entries(getItemsByCategory()).map(([category, items]) => (
              <Card key={category} className="mb-4">
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    {items.length} items • Total: {formatCurrency(items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0))}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Age Group</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Required</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.notes && <p className="text-xs text-muted-foreground">{item.notes}</p>}
                            </div>
                          </TableCell>
                          <TableCell>{item.ageGroup === 'general' ? 'All Ages' : item.ageGroup}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.price)}</TableCell>
                          <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
                          <TableCell>
                            {item.tnRequirement ? (
                              <Badge variant="outline" className="bg-primary/20">TN Required</Badge>
                            ) : item.essential ? (
                              <Badge variant="outline">Essential</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-muted">Optional</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Equipment by Age Group</h3>
            
            {Object.entries(getItemsByAgeGroup()).filter(([_, items]) => items.length > 0).map(([ageGroup, items]) => (
              <Card key={ageGroup} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    {ageGroup === 'infants' ? 'Infants (0-12 months)' : 
                     ageGroup === 'toddlers' ? 'Toddlers (12-30 months)' : 
                     ageGroup === 'preschool' ? 'Preschool (3-5 years)' : 
                     ageGroup === 'schoolAge' ? 'School Age (5+ years)' : 'General (All Ages)'}
                  </CardTitle>
                  <CardDescription>
                    {items.length} items • Total: {formatCurrency(items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0))}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Required</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.notes && <p className="text-xs text-muted-foreground">{item.notes}</p>}
                            </div>
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
                          <TableCell>
                            {item.tnRequirement ? (
                              <Badge variant="outline" className="bg-primary/20">TN Required</Badge>
                            ) : item.essential ? (
                              <Badge variant="outline">Essential</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-muted">Optional</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tennessee Regulation References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Rule 1240-04-01-.14(1)</strong> - All indoor and outdoor equipment must be safe with no dangerous angles, sharp edges, splinters, etc.</p>
                <p><strong>Rule 1240-04-01-.14(1)(e)</strong> - All large and heavy equipment must be secured to prevent tipping.</p>
                <p><strong>Rule 1240-04-01-.14(2)</strong> - Indoor equipment must be developmentally appropriate and accessible to children.</p>
                <p><strong>Rule 1240-04-01-.14(3)</strong> - Outdoor equipment must have proper fall zones and shock-absorbing surfaces.</p>
                <p><strong>Rule 1240-04-01-.14(4)</strong> - Napping/sleeping equipment must be provided for all children 6 weeks to 5 years.</p>
                <p><strong>Rule 1240-04-01-.14(4)(c)</strong> - Specific requirements for cribs, mats, and bedding.</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-xs text-center mt-8 text-muted-foreground">
            <p>This is an internal planning document for {centerInfo.centerName || 'your childcare center'}.</p>
            <p>For official submissions to Tennessee DHS, please use the official format.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentBudgetPrintable;
