import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortal } from './PortalContext';

export interface BankingInfo {
  id: string;
  parentId: string;
  accountType: 'checking' | 'savings' | 'credit';
  accountName: string;
  accountNumber: string;
  routingNumber?: string;
  bankName?: string;
  cardType?: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  billingAddress: string;
  isDefault: boolean;
  autoPayEnabled: boolean;
  autoPayDay?: number;
  autoPayAmount?: 'full' | 'minimum' | 'custom';
  autoPayCustomAmount?: number;
  notes?: string;
}

export interface ParentBankingInfoProps {
  parentId: string;
}

const ParentBankingInfo: React.FC<ParentBankingInfoProps> = ({ parentId }) => {
  const { state, updateParentBankingInfo } = usePortal();
  
  // Get banking info for this parent
  const parentBankingInfo = state.parentBankingInfo?.filter(info => info.parentId === parentId) || [];
  
  const [activeTab, setActiveTab] = useState("payment-methods");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Default empty banking info
  const emptyBankingInfo: BankingInfo = {
    id: '',
    parentId: parentId,
    accountType: 'checking',
    accountName: '',
    accountNumber: '',
    billingAddress: '',
    isDefault: parentBankingInfo.length === 0,
    autoPayEnabled: false
  };
  
  const [formData, setFormData] = useState<BankingInfo>(emptyBankingInfo);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID if new
    const updatedInfo = {
      ...formData,
      id: formData.id || `banking-${Date.now()}`
    };
    
    // If this is set as default, update other payment methods
    if (updatedInfo.isDefault) {
      parentBankingInfo.forEach(info => {
        if (info.id !== updatedInfo.id && info.isDefault) {
          updateParentBankingInfo({
            ...info,
            isDefault: false
          });
        }
      });
    }
    
    updateParentBankingInfo(updatedInfo);
    setEditingId(null);
    setShowAddForm(false);
    setFormData(emptyBankingInfo);
  };
  
  const handleEdit = (info: BankingInfo) => {
    setFormData(info);
    setEditingId(info.id);
    setShowAddForm(false);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      // Remove from state
      // This would need to be implemented in the context
    }
  };
  
  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData(emptyBankingInfo);
  };
  
  const renderPaymentMethodForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select 
              value={formData.accountType} 
              onValueChange={(value) => handleSelectChange('accountType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking Account</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>
        </div>
        
        {(formData.accountType === 'checking' || formData.accountType === 'savings') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Account Number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                name="routingNumber"
                value={formData.routingNumber || ''}
                onChange={handleInputChange}
                placeholder="Routing Number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                name="bankName"
                value={formData.bankName || ''}
                onChange={handleInputChange}
                placeholder="e.g. First National Bank"
              />
            </div>
          </div>
        )}
        
        {formData.accountType === 'credit' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardType">Card Type</Label>
              <Select 
                value={formData.cardType || 'visa'} 
                onValueChange={(value) => handleSelectChange('cardType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber || ''}
                onChange={handleInputChange}
                placeholder="Card Number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate || ''}
                onChange={handleInputChange}
                placeholder="MM/YY"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={formData.cvv || ''}
                onChange={handleInputChange}
                placeholder="CVV"
                type="password"
                maxLength={4}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="billingAddress">Billing Address</Label>
          <Input
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleInputChange}
            placeholder="Billing Address"
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="isDefault"
            checked={formData.isDefault}
            onCheckedChange={(checked) => handleSwitchChange('isDefault', checked)}
          />
          <Label htmlFor="isDefault">Set as default payment method</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="autoPayEnabled"
            checked={formData.autoPayEnabled}
            onCheckedChange={(checked) => handleSwitchChange('autoPayEnabled', checked)}
          />
          <Label htmlFor="autoPayEnabled">Enable automatic payments</Label>
        </div>
        
        {formData.autoPayEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-primary/20">
            <div className="space-y-2">
              <Label htmlFor="autoPayDay">Payment Day</Label>
              <Select 
                value={String(formData.autoPayDay || 1)} 
                onValueChange={(value) => handleSelectChange('autoPayDay', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day of month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                    <SelectItem key={day} value={String(day)}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="autoPayAmount">Payment Amount</Label>
              <Select 
                value={formData.autoPayAmount || 'full'} 
                onValueChange={(value) => handleSelectChange('autoPayAmount', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Balance</SelectItem>
                  <SelectItem value="minimum">Minimum Payment</SelectItem>
                  <SelectItem value="custom">Custom Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.autoPayAmount === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="autoPayCustomAmount">Custom Amount ($)</Label>
                <Input
                  id="autoPayCustomAmount"
                  name="autoPayCustomAmount"
                  type="number"
                  value={formData.autoPayCustomAmount || ''}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleInputChange}
            placeholder="Additional notes"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            {editingId ? 'Update Payment Method' : 'Add Payment Method'}
          </Button>
        </div>
      </form>
    );
  };
  
  const renderPaymentMethodCard = (info: BankingInfo) => {
    const getCardIcon = () => {
      if (info.accountType === 'checking' || info.accountType === 'savings') {
        return '🏦';
      }
      
      if (info.accountType === 'credit') {
        switch (info.cardType) {
          case 'visa': return '💳 Visa';
          case 'mastercard': return '💳 Mastercard';
          case 'amex': return '💳 Amex';
          case 'discover': return '💳 Discover';
          default: return '💳';
        }
      }
      
      return '💰';
    };
    
    const getAccountDisplay = () => {
      if (info.accountType === 'credit' && info.cardNumber) {
        const last4 = info.cardNumber.slice(-4);
        return `•••• •••• •••• ${last4}`;
      }
      
      if (info.accountNumber) {
        const last4 = info.accountNumber.slice(-4);
        return `•••••••${last4}`;
      }
      
      return 'Account details hidden';
    };
    
    return (
      <Card key={info.id} className={`overflow-hidden transition-all duration-300 ${info.isDefault ? 'border-primary' : ''}`}>
        <div className={`h-2 ${info.isDefault ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl mb-1">{getCardIcon()}</div>
              <h3 className="font-semibold">{info.accountName}</h3>
              <p className="text-sm text-muted-foreground">
                {info.accountType.charAt(0).toUpperCase() + info.accountType.slice(1)}
              </p>
              <p className="font-mono mt-2">{getAccountDisplay()}</p>
              {info.isDefault && (
                <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Default
                </div>
              )}
              {info.autoPayEnabled && (
                <div className="mt-2 ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  AutoPay
                </div>
              )}
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit(info)}
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(info.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderPaymentHistory = () => {
    // This would be populated from actual payment history
    const paymentHistory = [
      { id: 1, date: '2025-05-15', amount: 250.00, method: 'Credit Card (•••• 4567)', status: 'Completed' },
      { id: 2, date: '2025-04-15', amount: 250.00, method: 'Credit Card (•••• 4567)', status: 'Completed' },
      { id: 3, date: '2025-03-15', amount: 250.00, method: 'Bank Account (•••• 8901)', status: 'Completed' },
    ];
    
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paymentHistory.map(payment => (
                <tr key={payment.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm">{payment.date}</td>
                  <td className="px-4 py-3 text-sm">${payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">{payment.method}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {paymentHistory.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No payment history available
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Banking & Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="payment-methods"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger 
              value="payment-history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Payment History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment-methods" className="space-y-4 mt-4">
            {!editingId && !showAddForm && (
              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Add Payment Method
                </Button>
              </div>
            )}
            
            {(editingId || showAddForm) ? (
              renderPaymentMethodForm()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parentBankingInfo.length > 0 ? (
                  parentBankingInfo.map(info => renderPaymentMethodCard(info))
                ) : (
                  <div className="col-span-2 text-center py-8 text-muted-foreground">
                    <p className="mb-4">No payment methods added yet.</p>
                    <Button 
                      onClick={() => setShowAddForm(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      Add Your First Payment Method
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="payment-history" className="mt-4">
            {renderPaymentHistory()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ParentBankingInfo;
