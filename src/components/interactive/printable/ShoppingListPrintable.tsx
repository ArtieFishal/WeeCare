import React from 'react';
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Separator } from "../../ui/separator";
import { DownloadIcon, FileIcon } from '@radix-ui/react-icons';

interface ShoppingListPrintableProps {
  shoppingList: any[];
  ageGroup: string;
  centerName: string;
  budgetLimit: number;
  showMasterList: boolean;
  ageGroupCounts: Record<string, number>;
}

const ShoppingListPrintable: React.FC<ShoppingListPrintableProps> = ({
  shoppingList,
  ageGroup,
  centerName,
  budgetLimit,
  showMasterList,
  ageGroupCounts
}) => {
  const calculateTotal = () => {
    return shoppingList.reduce((total, item) => total + item.estimated_cost, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group items by category
  const groupedItems: Record<string, any[]> = {};
  shoppingList.forEach(item => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tennessee CACFP Shopping List</h1>
          <p className="text-muted-foreground">{centerName || 'Childcare Center'} • {new Date().toLocaleDateString()}</p>
        </div>
        <div className="print:hidden flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <DownloadIcon className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shopping List Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {showMasterList ? (
              <>
                <div className="col-span-2">
                  <p className="text-sm font-medium">List Type:</p>
                  <p>Master List for All Age Groups</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Children:</p>
                  <p>
                    {Object.entries(ageGroupCounts)
                      .filter(([_, count]) => count > 0)
                      .map(([group, count]) => `${count} ${group}`)
                      .join(', ')}
                  </p>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <p className="text-sm font-medium">Age Group:</p>
                <p>{ageGroup}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Date:</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            {budgetLimit > 0 && (
              <div>
                <p className="text-sm font-medium">Budget Limit:</p>
                <p>${budgetLimit.toFixed(2)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Shopping List by Category</h2>
        
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="font-medium mb-2">{category}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">✓</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Est. Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-4 w-4 border border-input rounded"></div>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.estimated_cost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
        
        <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md font-medium">
          <span>Total Estimated Cost:</span>
          <span className={budgetLimit > 0 && calculateTotal() > budgetLimit ? 'text-red-500' : ''}>
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
        
        {budgetLimit > 0 && (
          <div className="flex justify-between items-center p-4 bg-muted/20 rounded-md mt-2">
            <span>{calculateTotal() <= budgetLimit ? 'Under Budget:' : 'Over Budget:'}</span>
            <span className={calculateTotal() <= budgetLimit ? 'text-green-500' : 'text-red-500'}>
              ${Math.abs(budgetLimit - calculateTotal()).toFixed(2)}
            </span>
          </div>
        )}
      </div>
      
      <Separator className="my-6" />
      
      <div className="text-xs text-muted-foreground">
        <p>This shopping list follows Tennessee CACFP guidelines for childcare nutrition.</p>
        <p>For more information, visit the Tennessee Department of Human Services website.</p>
        <p className="mt-2">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default ShoppingListPrintable;
