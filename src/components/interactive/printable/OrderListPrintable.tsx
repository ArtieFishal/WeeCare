import React from 'react';
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Separator } from "../../ui/separator";
import { DownloadIcon, FileIcon } from '@radix-ui/react-icons';

interface OrderListPrintableProps {
  shoppingList: any[];
  centerName: string;
  orderMethod: string;
  storeLocation: string;
  pickupTime: string;
  deliveryAddress: string;
  deliveryTime: string;
}

const OrderListPrintable: React.FC<OrderListPrintableProps> = ({
  shoppingList,
  centerName,
  orderMethod,
  storeLocation,
  pickupTime,
  deliveryAddress,
  deliveryTime
}) => {
  const calculateTotal = () => {
    return shoppingList.reduce((total, item) => total + item.estimated_cost, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Grocery Order List</h1>
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
          <CardTitle className="text-lg">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Order Method:</p>
              <p>{orderMethod === 'pickup' ? 'Pickup' : 'Delivery'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Date:</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            
            {orderMethod === 'pickup' ? (
              <>
                <div>
                  <p className="text-sm font-medium">Store Location:</p>
                  <p>{storeLocation || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Pickup Time:</p>
                  <p>{pickupTime || 'Not specified'}</p>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Delivery Address:</p>
                  <p>{deliveryAddress || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Delivery Time:</p>
                  <p>{deliveryTime || 'Not specified'}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Items to Order</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Est. Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shoppingList.map((item, index) => {
              const [quantity, ...unitParts] = item.quantity.split(' ');
              const unit = unitParts.join(' ');
              
              return (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{unit}</TableCell>
                  <TableCell className="text-right">${item.estimated_cost.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">Total:</TableCell>
              <TableCell className="text-right font-bold">${calculateTotal().toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="mb-6 p-4 bg-muted/50 rounded-md">
        <h3 className="font-medium mb-2">Ordering Instructions</h3>
        <p>To place this order, visit: <a href="https://www.walmart.com/grocery" target="_blank" className="underline">Walmart Grocery</a></p>
        <p className="mt-2">Tennessee CACFP guidelines require proper documentation of all food purchases. Please save your receipt.</p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="text-xs text-muted-foreground">
        <p>This order list follows Tennessee CACFP guidelines for childcare nutrition.</p>
        <p>For more information, visit the Tennessee Department of Human Services website.</p>
        <p className="mt-2">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default OrderListPrintable;
