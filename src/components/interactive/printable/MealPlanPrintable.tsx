import React from 'react';
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Separator } from "../../ui/separator";
import { DownloadIcon, FileIcon } from '@radix-ui/react-icons';

interface MealPlanPrintableProps {
  mealPlan: any;
  ageGroup: string;
  centerName: string;
  dietaryRestrictions: string[];
}

const MealPlanPrintable: React.FC<MealPlanPrintableProps> = ({
  mealPlan,
  ageGroup,
  centerName,
  dietaryRestrictions
}) => {
  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' }
  ];
  
  const meals = [
    { id: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { id: 'am_snack', label: 'AM Snack', icon: '🍎' },
    { id: 'lunch', label: 'Lunch', icon: '🥪' },
    { id: 'pm_snack', label: 'PM Snack', icon: '🥕' }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tennessee CACFP Meal Plan</h1>
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
          <CardTitle className="text-lg">Meal Plan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Age Group:</p>
              <p>{ageGroup}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Week of:</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            {dietaryRestrictions.length > 0 && (
              <div className="col-span-2">
                <p className="text-sm font-medium">Dietary Accommodations:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dietaryRestrictions.map(restriction => (
                    <Badge key={restriction} variant="outline">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Weekly Meal Schedule</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Day</TableHead>
              {meals.map(meal => (
                <TableHead key={meal.id}>
                  <span className="flex items-center">
                    <span className="mr-1">{meal.icon}</span>
                    {meal.label}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map(day => (
              <TableRow key={day.id}>
                <TableCell className="font-medium">{day.label}</TableCell>
                {meals.map(meal => (
                  <TableCell key={meal.id}>
                    {mealPlan[day.id]?.[meal.id] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Daily Notes</h2>
        {days.map(day => {
          const notes = mealPlan[day.id]?.notes;
          if (!notes) return null;
          
          return (
            <div key={day.id} className="mb-4">
              <h3 className="font-medium">{day.label}</h3>
              <p className="p-3 bg-muted/50 rounded-md">{notes}</p>
            </div>
          );
        })}
      </div>
      
      <Separator className="my-6" />
      
      <div className="text-xs text-muted-foreground">
        <p>This meal plan follows Tennessee CACFP guidelines for {ageGroup}.</p>
        <p>For more information, visit the Tennessee Department of Human Services website.</p>
        <p className="mt-2">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default MealPlanPrintable;
