import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Tennessee-specific equipment requirements based on official regulations
const EquipmentBudgetPlanner: React.FC = () => {
  const [centerName, setCenterName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [director, setDirector] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState(20000);
  const [notes, setNotes] = useState('');
  
  const [ageGroups, setAgeGroups] = useState({
    infants: true,
    toddlers: true,
    preschool: true,
    schoolAge: false
  });
  
  const [cart, setCart] = useState<Array<{
    id: string;
    name: string;
    category: string;
    ageGroup: string;
    price: number;
    essential: boolean;
    quantity: number;
    tnRequirement: boolean;
    tnCitation?: string;
    notes: string;
  }>>([]);
  
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [essentialFilter, setEssentialFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tennessee-specific equipment items with regulatory citations
  const equipmentItems = [
    // Infant Equipment (0-12 months) - Tennessee Requirements
    { 
      id: 'cribs', 
      name: 'Individual Free-Standing Cribs (22" x 36" minimum)', 
      category: 'Sleeping Equipment', 
      ageGroup: 'infants', 
      price: 200, 
      essential: true, 
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)3'
    },
    { 
      id: 'crib_mattresses', 
      name: 'Manufacturer\'s Waterproof Crib Mattresses', 
      category: 'Sleeping Equipment', 
      ageGroup: 'infants', 
      price: 80, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)9'
    },
    { 
      id: 'crib_sheets', 
      name: 'Fitted Crib Sheets (No Gaps)', 
      category: 'Sleeping Equipment', 
      ageGroup: 'infants', 
      price: 15, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)10-11'
    },
    { 
      id: 'changing_tables', 
      name: 'Secured Changing Tables', 
      category: 'Furniture', 
      ageGroup: 'infants', 
      price: 150, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)'
    },
    { 
      id: 'infant_floor_space', 
      name: 'Safe Floor Space for Crawling/Exploration', 
      category: 'Furniture', 
      ageGroup: 'infants', 
      price: 120, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(2)(d)'
    },
    { 
      id: 'infant_toys', 
      name: 'Developmental Toys (No Small Parts)', 
      category: 'Educational Materials', 
      ageGroup: 'infants', 
      price: 100, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(2)(c)'
    },
    { 
      id: 'infant_books', 
      name: 'Board Books', 
      category: 'Educational Materials', 
      ageGroup: 'infants', 
      price: 75, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'infant_mats', 
      name: 'Activity Mats', 
      category: 'Educational Materials', 
      ageGroup: 'infants', 
      price: 80, 
      essential: false,
      tnRequirement: false
    },
    
    // Toddler Equipment (12-30 months) - Tennessee Requirements
    { 
      id: 'toddler_cots', 
      name: 'Individual Cots or 2" Mats', 
      category: 'Sleeping Equipment', 
      ageGroup: 'toddlers', 
      price: 65, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)1'
    },
    { 
      id: 'toddler_sheets', 
      name: 'Individual Sheets and Blankets', 
      category: 'Sleeping Equipment', 
      ageGroup: 'toddlers', 
      price: 25, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)11-12'
    },
    { 
      id: 'toddler_tables', 
      name: 'Secured Toddler Tables', 
      category: 'Furniture', 
      ageGroup: 'toddlers', 
      price: 120, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)'
    },
    { 
      id: 'toddler_chairs', 
      name: 'Toddler Chairs', 
      category: 'Furniture', 
      ageGroup: 'toddlers', 
      price: 40, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'toddler_toys', 
      name: 'Developmental Toys (No Small Parts)', 
      category: 'Educational Materials', 
      ageGroup: 'toddlers', 
      price: 90, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(2)(c)'
    },
    { 
      id: 'toddler_books', 
      name: 'Picture Books', 
      category: 'Educational Materials', 
      ageGroup: 'toddlers', 
      price: 85, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'toddler_art', 
      name: 'Art Supplies (Non-Toxic)', 
      category: 'Educational Materials', 
      ageGroup: 'toddlers', 
      price: 70, 
      essential: false,
      tnRequirement: false
    },
    { 
      id: 'toddler_music', 
      name: 'Musical Instruments', 
      category: 'Educational Materials', 
      ageGroup: 'toddlers', 
      price: 110, 
      essential: false,
      tnRequirement: false
    },
    
    // Preschool Equipment (3-5 years) - Tennessee Requirements
    { 
      id: 'preschool_cots', 
      name: 'Individual Cots or 2" Mats', 
      category: 'Sleeping Equipment', 
      ageGroup: 'preschool', 
      price: 65, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)1'
    },
    { 
      id: 'preschool_sheets', 
      name: 'Individual Sheets and Blankets', 
      category: 'Sleeping Equipment', 
      ageGroup: 'preschool', 
      price: 25, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(c)11-12'
    },
    { 
      id: 'preschool_tables', 
      name: 'Secured Preschool Tables', 
      category: 'Furniture', 
      ageGroup: 'preschool', 
      price: 150, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)'
    },
    { 
      id: 'preschool_chairs', 
      name: 'Preschool Chairs', 
      category: 'Furniture', 
      ageGroup: 'preschool', 
      price: 45, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'preschool_toys', 
      name: 'Dramatic Play Sets', 
      category: 'Educational Materials', 
      ageGroup: 'preschool', 
      price: 200, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'preschool_books', 
      name: 'Early Reader Books', 
      category: 'Educational Materials', 
      ageGroup: 'preschool', 
      price: 100, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'preschool_art', 
      name: 'Art Easels and Supplies', 
      category: 'Educational Materials', 
      ageGroup: 'preschool', 
      price: 85, 
      essential: false,
      tnRequirement: false
    },
    { 
      id: 'preschool_science', 
      name: 'Science Exploration Kits', 
      category: 'Educational Materials', 
      ageGroup: 'preschool', 
      price: 120, 
      essential: false,
      tnRequirement: false
    },
    
    // School Age Equipment (5+ years) - Tennessee Requirements
    { 
      id: 'school_rest_area', 
      name: 'Quiet Rest Area', 
      category: 'Sleeping Equipment', 
      ageGroup: 'schoolAge', 
      price: 150, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(4)(b)'
    },
    { 
      id: 'school_tables', 
      name: 'Secured School-Age Tables', 
      category: 'Furniture', 
      ageGroup: 'schoolAge', 
      price: 180, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)'
    },
    { 
      id: 'school_chairs', 
      name: 'School-Age Chairs', 
      category: 'Furniture', 
      ageGroup: 'schoolAge', 
      price: 50, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'school_games', 
      name: 'Board Games and Puzzles', 
      category: 'Educational Materials', 
      ageGroup: 'schoolAge', 
      price: 150, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'school_books', 
      name: 'Chapter Books and Reference Materials', 
      category: 'Educational Materials', 
      ageGroup: 'schoolAge', 
      price: 120, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'school_stem', 
      name: 'STEM Materials', 
      category: 'Educational Materials', 
      ageGroup: 'schoolAge', 
      price: 200, 
      essential: false,
      tnRequirement: false
    },
    
    // Outdoor Equipment - Tennessee Requirements
    { 
      id: 'outdoor_climbers', 
      name: 'Secured Climbing Equipment (6ft Fall Zone)', 
      category: 'Outdoor Equipment', 
      ageGroup: 'general', 
      price: 1200, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(3)(c)(e)'
    },
    { 
      id: 'outdoor_swings', 
      name: 'Secured Swings (Extended Fall Zone)', 
      category: 'Outdoor Equipment', 
      ageGroup: 'general', 
      price: 800, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(3)(d)(e)'
    },
    { 
      id: 'outdoor_surface', 
      name: 'CPSC-Approved Shock-Absorbing Surface', 
      category: 'Outdoor Equipment', 
      ageGroup: 'general', 
      price: 1500, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(3)(f)(h)'
    },
    { 
      id: 'outdoor_shade', 
      name: 'Outdoor Shade Structure', 
      category: 'Outdoor Equipment', 
      ageGroup: 'general', 
      price: 500, 
      essential: false,
      tnRequirement: false
    },
    
    // Safety Equipment - Tennessee Requirements
    { 
      id: 'first_aid', 
      name: 'First Aid Kits', 
      category: 'Safety Equipment', 
      ageGroup: 'general', 
      price: 60, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.12'
    },
    { 
      id: 'furniture_anchors', 
      name: 'Furniture/Equipment Anchoring Systems', 
      category: 'Safety Equipment', 
      ageGroup: 'general', 
      price: 120, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)'
    },
    { 
      id: 'cord_covers', 
      name: 'Electrical Cord Covers/Management', 
      category: 'Safety Equipment', 
      ageGroup: 'general', 
      price: 40, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(f)'
    },
    { 
      id: 'window_cord_safety', 
      name: 'Window Blind Cord Safety Devices', 
      category: 'Safety Equipment', 
      ageGroup: 'general', 
      price: 30, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(g)'
    },
    { 
      id: 'cleaning', 
      name: 'Equipment Cleaning Supplies', 
      category: 'Safety Equipment', 
      ageGroup: 'general', 
      price: 100, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(i)'
    },
    
    // Storage and Organization - Tennessee Requirements
    { 
      id: 'storage', 
      name: 'Secured Storage Units', 
      category: 'Furniture', 
      ageGroup: 'general', 
      price: 250, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)5'
    },
    { 
      id: 'cubbies', 
      name: 'Individual Child Cubbies', 
      category: 'Furniture', 
      ageGroup: 'general', 
      price: 200, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(1)(e)5'
    },
    { 
      id: 'toy_storage', 
      name: 'Child-Accessible Toy Storage', 
      category: 'Furniture', 
      ageGroup: 'general', 
      price: 150, 
      essential: true,
      tnRequirement: true,
      tnCitation: 'Rule 1240-04-01-.14(2)(b)'
    },
    
    // Administrative
    { 
      id: 'office', 
      name: 'Office Supplies', 
      category: 'Administrative', 
      ageGroup: 'general', 
      price: 150, 
      essential: true,
      tnRequirement: false
    },
    { 
      id: 'tech', 
      name: 'Technology (Computer/Tablet)', 
      category: 'Administrative', 
      ageGroup: 'general', 
      price: 500, 
      essential: false,
      tnRequirement: false
    }
  ];
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('equipmentBudgetCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    const savedCenterInfo = localStorage.getItem('equipmentBudgetCenterInfo');
    if (savedCenterInfo) {
      const info = JSON.parse(savedCenterInfo);
      setCenterName(info.centerName || '');
      setLicenseNumber(info.licenseNumber || '');
      setDirector(info.director || '');
      setAddress(info.address || '');
      setPhone(info.phone || '');
      setEmail(info.email || '');
      setBudget(info.budget || 20000);
      setNotes(info.notes || '');
    }
    
    const savedAgeGroups = localStorage.getItem('equipmentBudgetAgeGroups');
    if (savedAgeGroups) {
      setAgeGroups(JSON.parse(savedAgeGroups));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('equipmentBudgetCart', JSON.stringify(cart));
  }, [cart]);
  
  // Save center info to localStorage whenever it changes
  useEffect(() => {
    const centerInfo = {
      centerName,
      licenseNumber,
      director,
      address,
      phone,
      email,
      budget,
      notes
    };
    localStorage.setItem('equipmentBudgetCenterInfo', JSON.stringify(centerInfo));
  }, [centerName, licenseNumber, director, address, phone, email, budget, notes]);
  
  // Save age groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('equipmentBudgetAgeGroups', JSON.stringify(ageGroups));
  }, [ageGroups]);
  
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, notes: '' }]);
    }
  };
  
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity } 
        : item
    ));
  };
  
  const updateItemNotes = (itemId, notes) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, notes } 
        : item
    ));
  };
  
  const getTotalCost = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getFilteredItems = () => {
    return equipmentItems.filter(item => {
      // Filter by age group
      if (item.ageGroup !== 'general' && !ageGroups[item.ageGroup]) {
        return false;
      }
      
      // Filter by category
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }
      
      // Filter by essential/optional
      if (essentialFilter === 'essential' && !item.essential) {
        return false;
      }
      if (essentialFilter === 'optional' && item.essential) {
        return false;
      }
      
      // Filter by TN requirement
      if (essentialFilter === 'tnRequired' && !item.tnRequirement) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !item.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };
  
  const getEssentialCost = () => {
    const essentialItems = cart.filter(item => {
      const originalItem = equipmentItems.find(equip => equip.id === item.id);
      return originalItem && originalItem.essential;
    });
    
    return essentialItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getOptionalCost = () => {
    const optionalItems = cart.filter(item => {
      const originalItem = equipmentItems.find(equip => equip.id === item.id);
      return originalItem && !originalItem.essential;
    });
    
    return optionalItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getTnRequiredCost = () => {
    const tnRequiredItems = cart.filter(item => {
      const originalItem = equipmentItems.find(equip => equip.id === item.id);
      return originalItem && originalItem.tnRequirement;
    });
    
    return tnRequiredItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getRemainingBudget = () => {
    return budget - getTotalCost();
  };
  
  const getCompliancePercentage = () => {
    const requiredItems = equipmentItems.filter(item => {
      // Only count required items for selected age groups
      if (item.ageGroup !== 'general' && !ageGroups[item.ageGroup]) {
        return false;
      }
      return item.tnRequirement;
    });
    
    if (requiredItems.length === 0) return 100;
    
    const purchasedRequiredItems = requiredItems.filter(item => 
      cart.some(cartItem => cartItem.id === item.id)
    );
    
    return Math.round((purchasedRequiredItems.length / requiredItems.length) * 100);
  };
  
  const getMissingRequiredItems = () => {
    const requiredItems = equipmentItems.filter(item => {
      // Only count required items for selected age groups
      if (item.ageGroup !== 'general' && !ageGroups[item.ageGroup]) {
        return false;
      }
      return item.tnRequirement;
    });
    
    return requiredItems.filter(item => 
      !cart.some(cartItem => cartItem.id === item.id)
    );
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  const handlePrint = () => {
    window.open('/printable/equipment-budget', '_blank');
  };
  
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      setCart([]);
    }
  };
  
  const saveToFile = () => {
    const data = {
      centerInfo: {
        centerName,
        licenseNumber,
        director,
        address,
        phone,
        email,
        budget,
        notes
      },
      ageGroups,
      cart
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipment_budget_plan.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const loadFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result as string);
        
        if (data.centerInfo) {
          setCenterName(data.centerInfo.centerName || '');
          setLicenseNumber(data.centerInfo.licenseNumber || '');
          setDirector(data.centerInfo.director || '');
          setAddress(data.centerInfo.address || '');
          setPhone(data.centerInfo.phone || '');
          setEmail(data.centerInfo.email || '');
          setBudget(data.centerInfo.budget || 20000);
          setNotes(data.centerInfo.notes || '');
        }
        
        if (data.ageGroups) {
          setAgeGroups(data.ageGroups);
        }
        
        if (data.cart) {
          setCart(data.cart);
        }
        
        alert('Budget plan loaded successfully!');
      } catch (error) {
        alert('Error loading file. Please make sure it is a valid budget plan file.');
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">💰</span> Tennessee Equipment Budget Planner
      </h3>
      
      <Tabs defaultValue="equipment" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="equipment">Equipment Selection</TabsTrigger>
          <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
          <TabsTrigger value="compliance">TN Compliance</TabsTrigger>
          <TabsTrigger value="centerInfo">Center Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equipment">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-1">Total Budget</Label>
                <div className="flex items-center">
                  <Input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mr-4"
                  />
                  <span className="font-bold text-lg">{formatCurrency(budget)}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-1">Remaining</Label>
                <div className={`text-xl font-bold ${getRemainingBudget() < 0 ? 'text-destructive' : 'text-primary'}`}>
                  {formatCurrency(getRemainingBudget())}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="block text-sm font-medium mb-1">Age Groups</Label>
              <div className="flex flex-wrap gap-2">
                <Label className="flex items-center p-2 border rounded-md cursor-pointer">
                  <Checkbox
                    checked={ageGroups.infants}
                    onCheckedChange={(checked) => setAgeGroups({...ageGroups, infants: !!checked})}
                    className="mr-2"
                  />
                  <span>Infants (0-12 months)</span>
                </Label>
                <Label className="flex items-center p-2 border rounded-md cursor-pointer">
                  <Checkbox
                    checked={ageGroups.toddlers}
                    onCheckedChange={(checked) => setAgeGroups({...ageGroups, toddlers: !!checked})}
                    className="mr-2"
                  />
                  <span>Toddlers (12-30 months)</span>
                </Label>
                <Label className="flex items-center p-2 border rounded-md cursor-pointer">
                  <Checkbox
                    checked={ageGroups.preschool}
                    onCheckedChange={(checked) => setAgeGroups({...ageGroups, preschool: !!checked})}
                    className="mr-2"
                  />
                  <span>Preschool (3-5 years)</span>
                </Label>
                <Label className="flex items-center p-2 border rounded-md cursor-pointer">
                  <Checkbox
                    checked={ageGroups.schoolAge}
                    onCheckedChange={(checked) => setAgeGroups({...ageGroups, schoolAge: !!checked})}
                    className="mr-2"
                  />
                  <span>School Age (5+ years)</span>
                </Label>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-1">Category Filter</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Sleeping Equipment">Sleeping Equipment</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Educational Materials">Educational Materials</SelectItem>
                    <SelectItem value="Outdoor Equipment">Outdoor Equipment</SelectItem>
                    <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
                    <SelectItem value="Administrative">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-1">Requirement Filter</Label>
                <Select value={essentialFilter} onValueChange={setEssentialFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="essential">Essential Items</SelectItem>
                    <SelectItem value="optional">Optional Items</SelectItem>
                    <SelectItem value="tnRequired">TN Required Items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-1">Search</Label>
                <Input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4 max-h-[400px] overflow-y-auto">
            {getFilteredItems().length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No items match your filters</p>
            ) : (
              getFilteredItems().map(item => (
                <div key={item.id} className="flex justify-between items-center p-2 border-b">
                  <div className="flex-1">
                    <div className="font-medium flex items-center">
                      {item.name}
                      {item.tnRequirement && (
                        <Badge variant="outline" className="ml-2 text-xs">TN Required</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.category} • {item.ageGroup === 'general' ? 'All Ages' : item.ageGroup}
                      {item.tnCitation && (
                        <span className="ml-1">• {item.tnCitation}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 font-medium">{formatCurrency(item.price)}</div>
                    <Button
                      onClick={() => addToCart(item)}
                      variant="secondary"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="cart">
          <div className="bg-card rounded-lg p-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="max-h-[400px] overflow-y-auto mb-4">
                  {cart.map(item => (
                    <Card key={item.id} className="mb-4">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base flex items-center">
                            {item.name}
                            {item.tnRequirement && (
                              <Badge variant="outline" className="ml-2 text-xs">TN Required</Badge>
                            )}
                          </CardTitle>
                          <Button
                            onClick={() => removeFromCart(item.id)}
                            variant="destructive"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                        <CardDescription>
                          {item.category} • {item.ageGroup === 'general' ? 'All Ages' : item.ageGroup}
                          {item.tnCitation && (
                            <span className="ml-1">• {item.tnCitation}</span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              -
                            </Button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              +
                            </Button>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(item.price)} × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`notes-${item.id}`} className="text-sm">Notes</Label>
                          <Textarea
                            id={`notes-${item.id}`}
                            placeholder="Add notes about this item..."
                            value={item.notes}
                            onChange={(e) => updateItemNotes(item.id, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Essential Items:</span>
                        <span>{formatCurrency(getEssentialCost())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optional Items:</span>
                        <span>{formatCurrency(getOptionalCost())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TN Required Items:</span>
                        <span>{formatCurrency(getTnRequiredCost())}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(getTotalCost())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget:</span>
                        <span>{formatCurrency(budget)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Remaining:</span>
                        <span className={getRemainingBudget() < 0 ? 'text-destructive' : 'text-primary'}>
                          {formatCurrency(getRemainingBudget())}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={clearCart}
                      variant="outline"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      onClick={handlePrint}
                      variant="default"
                    >
                      Print Budget Plan
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Tennessee Compliance Dashboard</CardTitle>
              <CardDescription>
                Track your compliance with Tennessee childcare equipment requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label className="block text-sm font-medium mb-1">Compliance Progress</Label>
                <Progress value={getCompliancePercentage()} className="h-4 mb-2" />
                <div className="flex justify-between text-sm">
                  <span>{getCompliancePercentage()}% Complete</span>
                  <span>{cart.filter(item => item.tnRequirement).length} of {equipmentItems.filter(item => item.tnRequirement).length} Required Items</span>
                </div>
              </div>
              
              {getMissingRequiredItems().length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Missing Required Items</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    {getMissingRequiredItems().map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 border-b">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.category} • {item.ageGroup === 'general' ? 'All Ages' : item.ageGroup}
                            {item.tnCitation && (
                              <span className="ml-1">• {item.tnCitation}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 font-medium">{formatCurrency(item.price)}</div>
                          <Button
                            onClick={() => addToCart(item)}
                            variant="secondary"
                            size="sm"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="font-bold mb-2">Tennessee Regulation References</h4>
                <div className="bg-muted p-4 rounded-lg max-h-[200px] overflow-y-auto">
                  <p className="mb-2"><strong>Rule 1240-04-01-.14(1)</strong> - All indoor and outdoor equipment must be safe with no dangerous angles, sharp edges, splinters, etc.</p>
                  <p className="mb-2"><strong>Rule 1240-04-01-.14(1)(e)</strong> - All large and heavy equipment must be secured to prevent tipping.</p>
                  <p className="mb-2"><strong>Rule 1240-04-01-.14(2)</strong> - Indoor equipment must be developmentally appropriate and accessible to children.</p>
                  <p className="mb-2"><strong>Rule 1240-04-01-.14(3)</strong> - Outdoor equipment must have proper fall zones and shock-absorbing surfaces.</p>
                  <p className="mb-2"><strong>Rule 1240-04-01-.14(4)</strong> - Napping/sleeping equipment must be provided for all children 6 weeks to 5 years.</p>
                  <p><strong>Rule 1240-04-01-.14(4)(c)</strong> - Specific requirements for cribs, mats, and bedding.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handlePrint}
                variant="default"
              >
                Print Compliance Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="centerInfo">
          <Card>
            <CardHeader>
              <CardTitle>Center Information</CardTitle>
              <CardDescription>
                Enter your childcare center details for budget planning and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="centerName">Center Name</Label>
                  <Input
                    id="centerName"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    placeholder="Enter center name"
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="Enter TN license number"
                  />
                </div>
                <div>
                  <Label htmlFor="director">Director Name</Label>
                  <Input
                    id="director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="Enter director name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Center Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter center address"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter any additional notes or special considerations"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={saveToFile}
                  variant="outline"
                >
                  Save to File
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Load from File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    onChange={loadFromFile}
                    className="hidden"
                  />
                </div>
              </div>
              <Button
                onClick={handlePrint}
                variant="default"
              >
                Print Budget Plan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentBudgetPlanner;
