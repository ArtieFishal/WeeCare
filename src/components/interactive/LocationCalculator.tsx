import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";

interface LocationData {
  name: string;
  address: string;
  county: string;
  city: string;
  zipCode: string;
  proximity: {
    residential: number;
    schools: number;
    parks: number;
    publicTransport: number;
    businesses: number;
  };
  demographics: {
    childrenPopulation: number;
    averageIncome: number;
    growthRate: number;
    familyDensity: number;
  };
  facility: {
    size: number;
    parking: number;
    outdoor: number;
    accessibility: number;
    visibility: number;
  };
  tennessee: {
    zoningCompliance: number;
    childcareDeserts: number;
    subsidyEligibility: number;
    disasterRisk: number;
    competitionDensity: number;
  };
  notes: string;
}

interface LocationAnalysis {
  id: string;
  data: LocationData;
  score: number;
  date: string;
}

const tnCounties = [
  "Anderson", "Bedford", "Benton", "Bledsoe", "Blount", "Bradley", "Campbell", "Cannon", 
  "Carroll", "Carter", "Cheatham", "Chester", "Claiborne", "Clay", "Cocke", "Coffee", 
  "Crockett", "Cumberland", "Davidson", "Decatur", "DeKalb", "Dickson", "Dyer", "Fayette", 
  "Fentress", "Franklin", "Gibson", "Giles", "Grainger", "Greene", "Grundy", "Hamblen", 
  "Hamilton", "Hancock", "Hardeman", "Hardin", "Hawkins", "Haywood", "Henderson", "Henry", 
  "Hickman", "Houston", "Humphreys", "Jackson", "Jefferson", "Johnson", "Knox", "Lake", 
  "Lauderdale", "Lawrence", "Lewis", "Lincoln", "Loudon", "Macon", "Madison", "Marion", 
  "Marshall", "Maury", "McMinn", "McNairy", "Meigs", "Monroe", "Montgomery", "Moore", 
  "Morgan", "Obion", "Overton", "Perry", "Pickett", "Polk", "Putnam", "Rhea", "Roane", 
  "Robertson", "Rutherford", "Scott", "Sequatchie", "Sevier", "Shelby", "Smith", "Stewart", 
  "Sullivan", "Sumner", "Tipton", "Trousdale", "Unicoi", "Union", "Van Buren", "Warren", 
  "Washington", "Wayne", "Weakley", "White", "Williamson", "Wilson"
];

// Tennessee childcare desert data by county (higher number = more severe desert)
const tnChildcareDesertData: Record<string, number> = {
  "Davidson": 3,
  "Shelby": 4,
  "Knox": 2,
  "Hamilton": 3,
  "Rutherford": 5,
  "Williamson": 2,
  "Montgomery": 4,
  "Sumner": 4,
  "Wilson": 3,
  "Blount": 4,
  "Anderson": 5,
  "Bedford": 6,
  "Benton": 7,
  "Bledsoe": 8,
  "Bradley": 4,
  "Campbell": 6,
  "Cannon": 7,
  "Carroll": 6,
  "Carter": 5,
  "Cheatham": 5,
  "Chester": 7,
  "Claiborne": 8,
  "Clay": 8,
  "Cocke": 7,
  "Coffee": 5,
  "Crockett": 7,
  "Cumberland": 6,
  "Decatur": 8,
  "DeKalb": 7,
  "Dickson": 5,
  "Dyer": 6,
  "Fayette": 6,
  "Fentress": 8,
  "Franklin": 6,
  "Gibson": 6,
  "Giles": 7,
  "Grainger": 8,
  "Greene": 5,
  "Grundy": 8,
  "Hamblen": 5,
  "Hancock": 9,
  "Hardeman": 7,
  "Hardin": 7,
  "Hawkins": 6,
  "Haywood": 7,
  "Henderson": 7,
  "Henry": 6,
  "Hickman": 7,
  "Houston": 8,
  "Humphreys": 7,
  "Jackson": 8,
  "Jefferson": 6,
  "Johnson": 7,
  "Lake": 8,
  "Lauderdale": 7,
  "Lawrence": 6,
  "Lewis": 8,
  "Lincoln": 6,
  "Loudon": 5,
  "Macon": 7,
  "Madison": 5,
  "Marion": 7,
  "Marshall": 6,
  "Maury": 5,
  "McMinn": 6,
  "McNairy": 7,
  "Meigs": 8,
  "Monroe": 7,
  "Moore": 7,
  "Morgan": 8,
  "Obion": 6,
  "Overton": 7,
  "Perry": 8,
  "Pickett": 9,
  "Polk": 7,
  "Putnam": 5,
  "Rhea": 7,
  "Roane": 6,
  "Robertson": 5,
  "Scott": 8,
  "Sequatchie": 7,
  "Sevier": 5,
  "Smith": 7,
  "Stewart": 8,
  "Sullivan": 5,
  "Tipton": 6,
  "Trousdale": 7,
  "Unicoi": 7,
  "Union": 8,
  "Van Buren": 9,
  "Warren": 6,
  "Washington": 4,
  "Wayne": 8,
  "Weakley": 6,
  "White": 7
};

// Tennessee subsidy eligibility data by county (higher number = higher eligibility)
const tnSubsidyEligibilityData: Record<string, number> = {
  "Davidson": 7,
  "Shelby": 8,
  "Knox": 6,
  "Hamilton": 7,
  "Rutherford": 5,
  "Williamson": 3,
  "Montgomery": 6,
  "Sumner": 5,
  "Wilson": 4,
  "Blount": 5,
  "Anderson": 6,
  "Bedford": 6,
  "Benton": 7,
  "Bledsoe": 8,
  "Bradley": 6,
  "Campbell": 7,
  "Cannon": 6,
  "Carroll": 7,
  "Carter": 7,
  "Cheatham": 5,
  "Chester": 7,
  "Claiborne": 8,
  "Clay": 8,
  "Cocke": 8,
  "Coffee": 6,
  "Crockett": 7,
  "Cumberland": 7,
  "Decatur": 7,
  "DeKalb": 7,
  "Dickson": 6,
  "Dyer": 7,
  "Fayette": 7,
  "Fentress": 8,
  "Franklin": 6,
  "Gibson": 7,
  "Giles": 6,
  "Grainger": 7,
  "Greene": 7,
  "Grundy": 8,
  "Hamblen": 7,
  "Hancock": 9,
  "Hardeman": 8,
  "Hardin": 7,
  "Hawkins": 7,
  "Haywood": 8,
  "Henderson": 7,
  "Henry": 7,
  "Hickman": 7,
  "Houston": 7,
  "Humphreys": 7,
  "Jackson": 8,
  "Jefferson": 7,
  "Johnson": 8,
  "Lake": 9,
  "Lauderdale": 8,
  "Lawrence": 7,
  "Lewis": 7,
  "Lincoln": 6,
  "Loudon": 5,
  "Macon": 7,
  "Madison": 7,
  "Marion": 7,
  "Marshall": 6,
  "Maury": 6,
  "McMinn": 7,
  "McNairy": 7,
  "Meigs": 8,
  "Monroe": 7,
  "Moore": 6,
  "Morgan": 8,
  "Obion": 7,
  "Overton": 8,
  "Perry": 7,
  "Pickett": 8,
  "Polk": 7,
  "Putnam": 7,
  "Rhea": 8,
  "Roane": 7,
  "Robertson": 6,
  "Scott": 8,
  "Sequatchie": 7,
  "Sevier": 6,
  "Smith": 7,
  "Stewart": 7,
  "Sullivan": 7,
  "Tipton": 7,
  "Trousdale": 7,
  "Unicoi": 7,
  "Union": 8,
  "Van Buren": 8,
  "Warren": 7,
  "Washington": 6,
  "Wayne": 7,
  "Weakley": 7,
  "White": 7
};

// Tennessee disaster risk data by county (higher number = higher risk)
const tnDisasterRiskData: Record<string, number> = {
  "Davidson": 7, // Flood risk
  "Shelby": 8, // Earthquake risk (New Madrid)
  "Knox": 4,
  "Hamilton": 5,
  "Rutherford": 5,
  "Williamson": 6,
  "Montgomery": 6,
  "Sumner": 7, // Flood risk
  "Wilson": 5,
  "Blount": 4,
  "Anderson": 4,
  "Bedford": 5,
  "Benton": 6,
  "Bledsoe": 4,
  "Bradley": 5,
  "Campbell": 5,
  "Cannon": 5,
  "Carroll": 6,
  "Carter": 5,
  "Cheatham": 7, // Flood risk
  "Chester": 7,
  "Claiborne": 5,
  "Clay": 6,
  "Cocke": 6,
  "Coffee": 5,
  "Crockett": 7,
  "Cumberland": 4,
  "Decatur": 6,
  "DeKalb": 5,
  "Dickson": 6,
  "Dyer": 8, // Earthquake and flood risk
  "Fayette": 7,
  "Fentress": 4,
  "Franklin": 5,
  "Gibson": 7,
  "Giles": 5,
  "Grainger": 5,
  "Greene": 5,
  "Grundy": 5,
  "Hamblen": 5,
  "Hancock": 5,
  "Hardeman": 7,
  "Hardin": 6,
  "Hawkins": 5,
  "Haywood": 7,
  "Henderson": 6,
  "Henry": 6,
  "Hickman": 6,
  "Houston": 7,
  "Humphreys": 7, // Flood risk
  "Jackson": 6,
  "Jefferson": 5,
  "Johnson": 5,
  "Lake": 8, // Earthquake and flood risk
  "Lauderdale": 8, // Earthquake and flood risk
  "Lawrence": 5,
  "Lewis": 5,
  "Lincoln": 5,
  "Loudon": 5,
  "Macon": 6,
  "Madison": 7,
  "Marion": 5,
  "Marshall": 5,
  "Maury": 6,
  "McMinn": 5,
  "McNairy": 7,
  "Meigs": 5,
  "Monroe": 5,
  "Moore": 4,
  "Morgan": 4,
  "Obion": 8, // Earthquake risk
  "Overton": 5,
  "Perry": 6,
  "Pickett": 5,
  "Polk": 5,
  "Putnam": 6,
  "Rhea": 5,
  "Roane": 5,
  "Robertson": 6,
  "Scott": 4,
  "Sequatchie": 5,
  "Sevier": 5,
  "Smith": 6,
  "Stewart": 7,
  "Sullivan": 4,
  "Tipton": 8, // Earthquake and flood risk
  "Trousdale": 6,
  "Unicoi": 5,
  "Union": 5,
  "Van Buren": 5,
  "Warren": 5,
  "Washington": 4,
  "Wayne": 5,
  "Weakley": 7, // Earthquake risk
  "White": 5
};

// Tennessee major cities by county
const tnCitiesByCounty: Record<string, string[]> = {
  "Davidson": ["Nashville", "Belle Meade", "Berry Hill", "Forest Hills", "Goodlettsville", "Oak Hill"],
  "Shelby": ["Memphis", "Bartlett", "Collierville", "Germantown", "Lakeland", "Millington"],
  "Knox": ["Knoxville", "Farragut"],
  "Hamilton": ["Chattanooga", "East Ridge", "Red Bank", "Soddy-Daisy", "Signal Mountain"],
  "Rutherford": ["Murfreesboro", "Smyrna", "La Vergne", "Eagleville"],
  "Williamson": ["Franklin", "Brentwood", "Spring Hill", "Thompson's Station", "Nolensville"],
  "Montgomery": ["Clarksville"],
  "Sumner": ["Gallatin", "Hendersonville", "Portland", "White House", "Millersville"],
  "Wilson": ["Lebanon", "Mt. Juliet", "Watertown"],
  "Blount": ["Maryville", "Alcoa", "Friendsville", "Louisville", "Rockford", "Townsend"],
  "Anderson": ["Clinton", "Oak Ridge", "Norris", "Lake City", "Oliver Springs"],
  "Bedford": ["Shelbyville", "Bell Buckle", "Normandy", "Wartrace"],
  "Benton": ["Camden", "Big Sandy"],
  "Bledsoe": ["Pikeville"],
  "Bradley": ["Cleveland", "Charleston"],
  "Campbell": ["Jacksboro", "LaFollette", "Caryville", "Jellico"],
  "Cannon": ["Woodbury", "Auburntown"],
  "Carroll": ["Huntingdon", "McKenzie", "Atwood", "Bruceton", "Hollow Rock", "McLemoresville", "Trezevant"],
  "Carter": ["Elizabethton", "Watauga", "Johnson City"],
  "Cheatham": ["Ashland City", "Kingston Springs", "Pegram", "Pleasant View"],
  "Chester": ["Henderson", "Enville"],
  "Claiborne": ["Tazewell", "Cumberland Gap", "Harrogate", "New Tazewell"],
  "Clay": ["Celina"],
  "Cocke": ["Newport", "Parrottsville"],
  "Coffee": ["Manchester", "Tullahoma"],
  "Crockett": ["Alamo", "Bells", "Friendship", "Gadsden", "Maury City"],
  "Cumberland": ["Crossville", "Crab Orchard", "Pleasant Hill"],
  "Decatur": ["Decaturville", "Parsons"],
  "DeKalb": ["Smithville", "Alexandria", "Dowelltown", "Liberty"],
  "Dickson": ["Dickson", "Burns", "Charlotte", "Slayden", "Vanleer", "White Bluff"],
  "Dyer": ["Dyersburg", "Newbern", "Trimble"],
  "Fayette": ["Somerville", "Braden", "Gallaway", "LaGrange", "Moscow", "Oakland", "Piperton", "Rossville"],
  "Fentress": ["Jamestown", "Allardt"],
  "Franklin": ["Winchester", "Cowan", "Decherd", "Estill Springs", "Huntland"],
  "Gibson": ["Trenton", "Bradford", "Dyer", "Gibson", "Humboldt", "Kenton", "Medina", "Milan", "Rutherford"],
  "Giles": ["Pulaski", "Ardmore", "Elkton", "Lynnville", "Minor Hill"],
  "Grainger": ["Rutledge", "Bean Station", "Blaine"],
  "Greene": ["Greeneville", "Baileyton", "Mosheim", "Tusculum"],
  "Grundy": ["Altamont", "Beersheba Springs", "Coalmont", "Gruetli-Laager", "Monteagle", "Palmer", "Tracy City"],
  "Hamblen": ["Morristown"],
  "Hancock": ["Sneedville"],
  "Hardeman": ["Bolivar", "Grand Junction", "Hickory Valley", "Hornsby", "Middleton", "Saulsbury", "Silerton", "Toone", "Whiteville"],
  "Hardin": ["Savannah", "Adamsville", "Crump", "Saltillo"],
  "Hawkins": ["Rogersville", "Bulls Gap", "Church Hill", "Mount Carmel", "Surgoinsville"],
  "Haywood": ["Brownsville", "Stanton"],
  "Henderson": ["Lexington", "Parker's Crossroads", "Sardis", "Scotts Hill"],
  "Henry": ["Paris", "Cottage Grove", "Henry", "Puryear"],
  "Hickman": ["Centerville"],
  "Houston": ["Erin", "Tennessee Ridge"],
  "Humphreys": ["Waverly", "McEwen", "New Johnsonville"],
  "Jackson": ["Gainesboro"],
  "Jefferson": ["Dandridge", "Jefferson City", "New Market", "White Pine"],
  "Johnson": ["Mountain City"],
  "Lake": ["Tiptonville", "Ridgely"],
  "Lauderdale": ["Ripley", "Gates", "Halls", "Henning"],
  "Lawrence": ["Lawrenceburg", "Ethridge", "Iron City", "Loretto", "St. Joseph"],
  "Lewis": ["Hohenwald"],
  "Lincoln": ["Fayetteville", "Petersburg"],
  "Loudon": ["Loudon", "Greenback", "Lenoir City", "Philadelphia"],
  "Macon": ["Lafayette", "Red Boiling Springs"],
  "Madison": ["Jackson", "Medon", "Three Way"],
  "Marion": ["Jasper", "Kimball", "Monteagle", "New Hope", "Orme", "Powells Crossroads", "South Pittsburg", "Whitwell"],
  "Marshall": ["Lewisburg", "Chapel Hill", "Cornersville", "Petersburg"],
  "Maury": ["Columbia", "Mount Pleasant", "Spring Hill"],
  "McMinn": ["Athens", "Calhoun", "Englewood", "Etowah", "Niota"],
  "McNairy": ["Selmer", "Adamsville", "Bethel Springs", "Eastview", "Finger", "Michie", "Milledgeville", "Ramer", "Stantonville"],
  "Meigs": ["Decatur"],
  "Monroe": ["Madisonville", "Sweetwater", "Tellico Plains", "Vonore"],
  "Moore": ["Lynchburg"],
  "Morgan": ["Wartburg", "Oakdale", "Sunbright"],
  "Obion": ["Union City", "Hornbeak", "Kenton", "Obion", "Rives", "Samburg", "South Fulton", "Troy", "Woodland Mills"],
  "Overton": ["Livingston"],
  "Perry": ["Linden", "Lobelville"],
  "Pickett": ["Byrdstown"],
  "Polk": ["Benton", "Copperhill", "Ducktown"],
  "Putnam": ["Cookeville", "Algood", "Baxter", "Monterey"],
  "Rhea": ["Dayton", "Graysville", "Spring City"],
  "Roane": ["Kingston", "Harriman", "Rockwood", "Oliver Springs"],
  "Robertson": ["Springfield", "Adams", "Cedar Hill", "Coopertown", "Cross Plains", "Greenbrier", "Orlinda", "Ridgetop", "White House"],
  "Scott": ["Huntsville", "Oneida", "Winfield"],
  "Sequatchie": ["Dunlap"],
  "Sevier": ["Sevierville", "Gatlinburg", "Pigeon Forge", "Pittman Center"],
  "Smith": ["Carthage", "Gordonsville", "South Carthage"],
  "Stewart": ["Dover", "Cumberland City"],
  "Sullivan": ["Bluff City", "Bristol", "Kingsport"],
  "Tipton": ["Covington", "Atoka", "Brighton", "Burlison", "Garland", "Gilt Edge", "Mason", "Munford"],
  "Trousdale": ["Hartsville"],
  "Unicoi": ["Erwin", "Unicoi"],
  "Union": ["Maynardville", "Luttrell"],
  "Van Buren": ["Spencer"],
  "Warren": ["McMinnville", "Centertown", "Morrison", "Viola"],
  "Washington": ["Johnson City", "Jonesborough"],
  "Wayne": ["Waynesboro", "Clifton", "Collinwood"],
  "Weakley": ["Dresden", "Gleason", "Greenfield", "Martin", "Sharon"],
  "White": ["Sparta", "Doyle"]
};

const LocationCalculator: React.FC = () => {
  const initialLocationData: LocationData = {
    name: '',
    address: '',
    county: '',
    city: '',
    zipCode: '',
    proximity: {
      residential: 5,
      schools: 5,
      parks: 5,
      publicTransport: 5,
      businesses: 5
    },
    demographics: {
      childrenPopulation: 5,
      averageIncome: 5,
      growthRate: 5,
      familyDensity: 5
    },
    facility: {
      size: 5,
      parking: 5,
      outdoor: 5,
      accessibility: 5,
      visibility: 5
    },
    tennessee: {
      zoningCompliance: 5,
      childcareDeserts: 5,
      subsidyEligibility: 5,
      disasterRisk: 5,
      competitionDensity: 5
    },
    notes: ''
  };

  const [location, setLocation] = useState<LocationData>(initialLocationData);
  const [savedLocations, setSavedLocations] = useState<LocationAnalysis[]>([]);
  const [suitabilityScore, setSuitabilityScore] = useState(0);
  const [activeTab, setActiveTab] = useState('location');
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [countyData, setCountyData] = useState<{
    childcareDeserts: number;
    subsidyEligibility: number;
    disasterRisk: number;
  }>({
    childcareDeserts: 5,
    subsidyEligibility: 5,
    disasterRisk: 5
  });
  
  // Load saved locations from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('tnLocationAnalyses');
    if (savedData) {
      try {
        setSavedLocations(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading saved locations:", e);
      }
    }
  }, []);
  
  // Update cities dropdown when county changes
  useEffect(() => {
    if (location.county && tnCitiesByCounty[location.county]) {
      setCities(tnCitiesByCounty[location.county]);
      
      // Update Tennessee-specific data based on county
      const newCountyData = {
        childcareDeserts: tnChildcareDesertData[location.county] || 5,
        subsidyEligibility: tnSubsidyEligibilityData[location.county] || 5,
        disasterRisk: tnDisasterRiskData[location.county] || 5
      };
      
      setCountyData(newCountyData);
      
      // Update location with county-specific data
      setLocation(prev => ({
        ...prev,
        tennessee: {
          ...prev.tennessee,
          childcareDeserts: newCountyData.childcareDeserts,
          subsidyEligibility: newCountyData.subsidyEligibility,
          disasterRisk: newCountyData.disasterRisk
        }
      }));
    } else {
      setCities([]);
    }
  }, [location.county]);
  
  // Calculate suitability score based on all factors
  useEffect(() => {
    // Calculate average scores for each category
    const proximityScore = Object.values(location.proximity).reduce((sum, val) => sum + val, 0) / 
                          Object.values(location.proximity).length;
    
    const demographicsScore = Object.values(location.demographics).reduce((sum, val) => sum + val, 0) / 
                             Object.values(location.demographics).length;
    
    const facilityScore = Object.values(location.facility).reduce((sum, val) => sum + val, 0) / 
                         Object.values(location.facility).length;
    
    const tennesseeScore = Object.values(location.tennessee).reduce((sum, val) => sum + val, 0) / 
                          Object.values(location.tennessee).length;
    
    // Tennessee-specific factors are weighted more heavily (40%) in the final score
    const totalScore = (proximityScore * 0.2) + 
                      (demographicsScore * 0.2) + 
                      (facilityScore * 0.2) + 
                      (tennesseeScore * 0.4);
    
    setSuitabilityScore(Math.round(totalScore * 10) / 10);
  }, [location]);
  
  const handleInputChange = (field: keyof LocationData, value: string) => {
    setLocation(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSliderChange = (category: keyof Omit<LocationData, 'name' | 'address' | 'county' | 'city' | 'zipCode' | 'notes'>, factor: string, value: number) => {
    setLocation(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as Record<string, number>),
        [factor]: value
      }
    }));
  };
  
  const renderSliders = (category: keyof Omit<LocationData, 'name' | 'address' | 'county' | 'city' | 'zipCode' | 'notes'>, factors: Record<string, number>) => {
    return Object.entries(factors).map(([factor, value]) => (
      <div key={`${category}-${factor}`} className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium capitalize">
            {factor.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <span className="text-sm font-bold">{value.toString()}/10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={value.toString()}
          onChange={(e) => handleSliderChange(category, factor, parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    ));
  };
  
  const saveLocation = () => {
    if (!location.name) {
      alert("Please enter a location name before saving.");
      return;
    }
    
    const newAnalysis: LocationAnalysis = {
      id: Date.now().toString(),
      data: { ...location },
      score: suitabilityScore,
      date: new Date().toISOString()
    };
    
    const updatedLocations = [...savedLocations, newAnalysis];
    setSavedLocations(updatedLocations);
    
    // Save to localStorage
    try {
      localStorage.setItem('tnLocationAnalyses', JSON.stringify(updatedLocations));
      setShowSavedAlert(true);
      
      setTimeout(() => {
        setShowSavedAlert(false);
      }, 3000);
    } catch (e) {
      console.error("Error saving location:", e);
      alert("There was an error saving your location. Please try again.");
    }
  };
  
  const deleteLocation = (id: string) => {
    const updatedLocations = savedLocations.filter(loc => loc.id !== id);
    setSavedLocations(updatedLocations);
    
    // Update localStorage
    try {
      localStorage.setItem('tnLocationAnalyses', JSON.stringify(updatedLocations));
    } catch (e) {
      console.error("Error updating saved locations:", e);
    }
  };
  
  const loadLocation = (id: string) => {
    const locationToLoad = savedLocations.find(loc => loc.id === id);
    if (locationToLoad) {
      setLocation(locationToLoad.data);
      setActiveTab('location');
    }
  };
  
  const resetForm = () => {
    setLocation(initialLocationData);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const getScoreColor = (score: number) => {
    if (score < 3) return 'text-destructive';
    if (score < 7) return 'text-amber-500';
    return 'text-green-500';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getLocationRecommendations = () => {
    const recommendations = [];
    
    // Proximity recommendations
    const proximityFactors = Object.entries(location.proximity)
      .filter(([_, value]) => value < 5)
      .sort(([_, a], [__, b]) => a - b);
    
    if (proximityFactors.length > 0) {
      const [worstFactor, worstScore] = proximityFactors[0];
      recommendations.push({
        category: 'Proximity',
        issue: `Low ${worstFactor.replace(/([A-Z])/g, ' $1').trim()} score (${worstScore}/10)`,
        recommendation: `Consider locations closer to ${worstFactor === 'residential' ? 'residential areas' : 
                         worstFactor === 'schools' ? 'schools or educational facilities' :
                         worstFactor === 'parks' ? 'parks or recreational areas' :
                         worstFactor === 'publicTransport' ? 'public transportation' :
                         'local businesses'}.`
      });
    }
    
    // Demographics recommendations
    const demographicsFactors = Object.entries(location.demographics)
      .filter(([_, value]) => value < 5)
      .sort(([_, a], [__, b]) => a - b);
    
    if (demographicsFactors.length > 0) {
      const [worstFactor, worstScore] = demographicsFactors[0];
      recommendations.push({
        category: 'Demographics',
        issue: `Low ${worstFactor.replace(/([A-Z])/g, ' $1').trim()} score (${worstScore}/10)`,
        recommendation: `Look for areas with ${worstFactor === 'childrenPopulation' ? 'higher concentration of children' : 
                         worstFactor === 'averageIncome' ? 'higher average household income' :
                         worstFactor === 'growthRate' ? 'stronger population growth trends' :
                         'higher family density'}.`
      });
    }
    
    // Facility recommendations
    const facilityFactors = Object.entries(location.facility)
      .filter(([_, value]) => value < 5)
      .sort(([_, a], [__, b]) => a - b);
    
    if (facilityFactors.length > 0) {
      const [worstFactor, worstScore] = facilityFactors[0];
      recommendations.push({
        category: 'Facility',
        issue: `Low ${worstFactor.replace(/([A-Z])/g, ' $1').trim()} score (${worstScore}/10)`,
        recommendation: `Prioritize properties with ${worstFactor === 'size' ? 'larger square footage' : 
                         worstFactor === 'parking' ? 'better parking facilities' :
                         worstFactor === 'outdoor' ? 'adequate outdoor space' :
                         worstFactor === 'accessibility' ? 'improved accessibility features' :
                         'better street visibility'}.`
      });
    }
    
    // Tennessee-specific recommendations
    const tennesseeFactors = Object.entries(location.tennessee)
      .filter(([_, value]) => value < 5)
      .sort(([_, a], [__, b]) => a - b);
    
    if (tennesseeFactors.length > 0) {
      const [worstFactor, worstScore] = tennesseeFactors[0];
      recommendations.push({
        category: 'Tennessee Regulations',
        issue: `Low ${worstFactor.replace(/([A-Z])/g, ' $1').trim()} score (${worstScore}/10)`,
        recommendation: `${worstFactor === 'zoningCompliance' ? 'Consult with local zoning office to ensure compliance with Tennessee childcare zoning requirements' : 
                         worstFactor === 'childcareDeserts' ? 'Consider relocating to a Tennessee county with higher childcare desert rating for better market opportunity' :
                         worstFactor === 'subsidyEligibility' ? 'Research areas with higher Tennessee childcare subsidy eligibility rates' :
                         worstFactor === 'disasterRisk' ? 'Choose locations with lower natural disaster risk according to Tennessee Emergency Management Agency' :
                         'Look for areas with less competition from existing childcare providers'}.`
      });
    }
    
    // County-specific recommendations
    if (location.county) {
      if (tnChildcareDesertData[location.county] >= 7) {
        recommendations.push({
          category: 'Market Opportunity',
          issue: `High childcare desert rating in ${location.county} County`,
          recommendation: `${location.county} County has a significant childcare shortage. Consider applying for Tennessee Rural Childcare Investment Credit if eligible.`
        });
      }
      
      if (tnSubsidyEligibilityData[location.county] >= 7) {
        recommendations.push({
          category: 'Financial Opportunity',
          issue: `High subsidy eligibility in ${location.county} County`,
          recommendation: `${location.county} County has high childcare subsidy eligibility. Contact Tennessee DHS to become a certified subsidy provider.`
        });
      }
      
      if (tnDisasterRiskData[location.county] >= 7) {
        recommendations.push({
          category: 'Risk Management',
          issue: `High disaster risk in ${location.county} County`,
          recommendation: `${location.county} County has elevated disaster risk. Ensure adequate insurance coverage and develop a comprehensive emergency plan.`
        });
      }
    }
    
    return recommendations.slice(0, 5); // Return top 5 recommendations
  };
  
  const getCompetitiveAdvantage = () => {
    if (!location.county) return null;
    
    const childcareDesert = tnChildcareDesertData[location.county] || 5;
    const subsidyEligibility = tnSubsidyEligibilityData[location.county] || 5;
    
    if (childcareDesert >= 7 && subsidyEligibility >= 6) {
      return {
        type: 'High Demand & Subsidy Opportunity',
        description: `${location.county} County has both high childcare demand and strong subsidy eligibility, creating an excellent market opportunity.`,
        strategy: 'Focus on becoming a certified Tennessee subsidy provider and emphasize quality to maximize reimbursement rates.'
      };
    } else if (childcareDesert >= 7) {
      return {
        type: 'Underserved Market',
        description: `${location.county} County is considered a childcare desert with significant unmet demand.`,
        strategy: 'Emphasize availability and convenience in marketing materials. Consider applying for Tennessee rural childcare incentives.'
      };
    } else if (subsidyEligibility >= 7) {
      return {
        type: 'Subsidy Opportunity',
        description: `${location.county} County has high subsidy eligibility rates, providing stable income potential.`,
        strategy: 'Complete Tennessee DHS certification to accept subsidies and design programs that meet subsidy requirements.'
      };
    } else if (location.demographics.averageIncome >= 7) {
      return {
        type: 'Premium Service Opportunity',
        description: 'The high average income in this area supports premium childcare services.',
        strategy: 'Focus on enhanced educational programs, lower ratios, and premium amenities to justify higher tuition rates.'
      };
    } else {
      return {
        type: 'Balanced Opportunity',
        description: 'This location presents a balanced market with moderate demand and competition.',
        strategy: 'Differentiate through specialized programs or extended hours to create a unique value proposition.'
      };
    }
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">📍</span> Tennessee Location Suitability Calculator
      </h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="tabs-list mb-4">
          <TabsTrigger value="location">Location Details</TabsTrigger>
          <TabsTrigger value="factors">Evaluation Factors</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="saved">Saved Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-4">
          {showSavedAlert && (
            <Alert className="mb-4 bg-primary/20">
              <AlertDescription>
                Location saved successfully!
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Location Name</label>
              <Input
                type="text"
                value={location.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter location name"
                className="p-2"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Address</label>
              <Input
                type="text"
                value={location.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter street address"
                className="p-2"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Tennessee County</label>
              <select
                value={location.county}
                onChange={(e) => handleInputChange('county', e.target.value)}
                className="p-2 border border-input rounded-md bg-background"
              >
                <option value="">Select a county</option>
                {tnCounties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">City</label>
              <select
                value={location.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="p-2 border border-input rounded-md bg-background"
                disabled={!location.county}
              >
                <option value="">Select a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">ZIP Code</label>
              <Input
                type="text"
                value={location.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="Enter ZIP code"
                className="p-2"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-medium mb-1">Notes</label>
            <Textarea
              value={location.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Enter any additional notes about this location"
              className="w-full p-2 min-h-[100px]"
            />
          </div>
          
          {location.county && (
            <div className="bg-card p-4 rounded-lg mb-6 border border-primary">
              <h4 className="font-bold text-primary mb-3">Tennessee County Data</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Childcare Desert Rating</p>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-muted rounded-full h-2 mr-2">
                      <div 
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${countyData.childcareDeserts * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold">{countyData.childcareDeserts}/10</span>
                  </div>
                  <p className="text-xs mt-1">
                    {countyData.childcareDeserts >= 7 ? 'Severe shortage of childcare' : 
                     countyData.childcareDeserts >= 5 ? 'Moderate childcare availability' : 
                     'Adequate childcare availability'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Subsidy Eligibility</p>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-muted rounded-full h-2 mr-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${countyData.subsidyEligibility * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold">{countyData.subsidyEligibility}/10</span>
                  </div>
                  <p className="text-xs mt-1">
                    {countyData.subsidyEligibility >= 7 ? 'High subsidy eligibility population' : 
                     countyData.subsidyEligibility >= 5 ? 'Moderate subsidy eligibility' : 
                     'Low subsidy eligibility'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Disaster Risk</p>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-muted rounded-full h-2 mr-2">
                      <div 
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${countyData.disasterRisk * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold">{countyData.disasterRisk}/10</span>
                  </div>
                  <p className="text-xs mt-1">
                    {countyData.disasterRisk >= 7 ? 'High risk area (flood/earthquake)' : 
                     countyData.disasterRisk >= 5 ? 'Moderate risk area' : 
                     'Low risk area'}
                  </p>
                </div>
              </div>
              
              <p className="text-xs mt-4">
                <strong>Note:</strong> Data sourced from Tennessee Department of Human Services, Tennessee Emergency Management Agency, and U.S. Census Bureau.
              </p>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
            <Button onClick={() => setActiveTab('factors')} className="bg-primary">
              Continue to Evaluation
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="factors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-card p-4 rounded-lg">
              <h4 className="font-bold text-secondary mb-3">Proximity Factors</h4>
              {renderSliders('proximity', location.proximity)}
            </div>
            
            <div className="bg-card p-4 rounded-lg">
              <h4 className="font-bold text-secondary mb-3">Demographic Factors</h4>
              {renderSliders('demographics', location.demographics)}
            </div>
            
            <div className="bg-card p-4 rounded-lg">
              <h4 className="font-bold text-secondary mb-3">Facility Factors</h4>
              {renderSliders('facility', location.facility)}
            </div>
            
            <div className="bg-card p-4 rounded-lg border-2 border-primary">
              <h4 className="font-bold text-primary mb-3">Tennessee Factors</h4>
              {renderSliders('tennessee', location.tennessee)}
              
              <div className="mt-4 p-2 bg-muted/30 rounded text-xs">
                <p><strong>Note:</strong> Tennessee factors are weighted at 40% of the total score, as they are critical for regulatory compliance and funding eligibility.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab('location')}>
              Back to Location
            </Button>
            <Button onClick={() => setActiveTab('analysis')} className="bg-primary">
              View Analysis
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <div className="bg-card p-4 rounded-lg mb-6">
            <h4 className="font-bold mb-3">Suitability Score</h4>
            <div className="flex items-center mb-4">
              <div className="w-full bg-muted rounded-full h-4 mr-4">
                <div 
                  className="h-4 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${suitabilityScore * 10}%`,
                    backgroundColor: suitabilityScore < 3 ? 'var(--destructive)' : 
                                    suitabilityScore < 7 ? 'var(--warning, var(--amber-500))' : 
                                    'var(--success, var(--green-500))'
                  }}
                ></div>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(suitabilityScore)}`}>
                {suitabilityScore}/10
              </span>
            </div>
            
            <div className="p-3 rounded bg-muted/30">
              {suitabilityScore < 3 && (
                <p className="text-destructive">This location is not suitable for a Tennessee child care center. Consider alternative locations or address the critical issues identified below.</p>
              )}
              {suitabilityScore >= 3 && suitabilityScore < 7 && (
                <p className="text-amber-500">This location has potential but requires improvements in several areas, particularly the Tennessee-specific factors, before proceeding.</p>
              )}
              {suitabilityScore >= 7 && (
                <p className="text-green-500">This location is highly suitable for a Tennessee child care center! It meets or exceeds requirements in most evaluation categories.</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card p-4 rounded-lg">
              <h4 className="font-bold mb-3">Category Breakdown</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Proximity Factors</span>
                    <span className="text-sm font-bold">
                      {(Object.values(location.proximity).reduce((sum, val) => sum + val, 0) / 
                      Object.values(location.proximity).length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ 
                        width: `${(Object.values(location.proximity).reduce((sum, val) => sum + val, 0) / 
                        Object.values(location.proximity).length) * 10}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Demographic Factors</span>
                    <span className="text-sm font-bold">
                      {(Object.values(location.demographics).reduce((sum, val) => sum + val, 0) / 
                      Object.values(location.demographics).length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ 
                        width: `${(Object.values(location.demographics).reduce((sum, val) => sum + val, 0) / 
                        Object.values(location.demographics).length) * 10}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Facility Factors</span>
                    <span className="text-sm font-bold">
                      {(Object.values(location.facility).reduce((sum, val) => sum + val, 0) / 
                      Object.values(location.facility).length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-orange-500"
                      style={{ 
                        width: `${(Object.values(location.facility).reduce((sum, val) => sum + val, 0) / 
                        Object.values(location.facility).length) * 10}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Tennessee Factors (40% weight)</span>
                    <span className="text-sm font-bold">
                      {(Object.values(location.tennessee).reduce((sum, val) => sum + val, 0) / 
                      Object.values(location.tennessee).length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary"
                      style={{ 
                        width: `${(Object.values(location.tennessee).reduce((sum, val) => sum + val, 0) / 
                        Object.values(location.tennessee).length) * 10}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-lg">
              <h4 className="font-bold mb-3">Recommendations</h4>
              
              {getLocationRecommendations().length > 0 ? (
                <div className="space-y-3">
                  {getLocationRecommendations().map((rec, index) => (
                    <div key={index} className="p-2 border-l-4 border-primary bg-muted/20 rounded-r">
                      <p className="text-sm font-medium">{rec.category}: {rec.issue}</p>
                      <p className="text-xs mt-1">{rec.recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm">No specific recommendations needed. This location scores well across all categories.</p>
              )}
            </div>
          </div>
          
          {location.county && getCompetitiveAdvantage() && (
            <div className="bg-card p-4 rounded-lg mb-6 border border-primary">
              <h4 className="font-bold text-primary mb-3">Competitive Advantage Analysis</h4>
              
              <div className="p-3 bg-primary/10 rounded mb-3">
                <p className="font-medium">{getCompetitiveAdvantage()?.type}</p>
                <p className="text-sm mt-1">{getCompetitiveAdvantage()?.description}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-sm mb-2">Recommended Strategy:</h5>
                <p className="text-sm">{getCompetitiveAdvantage()?.strategy}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setActiveTab('factors')}>
                Back to Factors
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                Print Analysis
              </Button>
            </div>
            <Button onClick={saveLocation} className="bg-primary">
              Save Location
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <div className="mb-4">
            <h4 className="font-bold mb-2">Saved Location Analyses</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Compare your saved locations to identify the most suitable options for your Tennessee childcare center.
            </p>
          </div>
          
          {savedLocations.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-md">
              <p className="text-muted-foreground">No saved locations yet. Complete an analysis and save it to compare multiple locations.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Location</th>
                      <th className="text-left py-2">County</th>
                      <th className="text-left py-2">Score</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedLocations
                      .sort((a, b) => b.score - a.score)
                      .map(loc => (
                        <tr key={loc.id} className="border-b">
                          <td className="py-2">{loc.data.name}</td>
                          <td className="py-2">{loc.data.county}</td>
                          <td className="py-2">
                            <span className={getScoreColor(loc.score)}>
                              {loc.score.toFixed(1)}/10
                            </span>
                          </td>
                          <td className="py-2">{formatDate(loc.date)}</td>
                          <td className="py-2">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                className="px-2 py-1 h-auto text-xs"
                                onClick={() => loadLocation(loc.id)}
                              >
                                Load
                              </Button>
                              <Button 
                                variant="outline" 
                                className="px-2 py-1 h-auto text-xs text-destructive hover:text-destructive"
                                onClick={() => deleteLocation(loc.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              
              {savedLocations.length >= 2 && (
                <div className="mt-6 p-4 bg-card rounded-lg">
                  <h4 className="font-bold mb-3">Location Comparison</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Top Location:</h5>
                      <div className="p-3 bg-green-500/10 rounded border border-green-500">
                        <p className="font-bold">{savedLocations.sort((a, b) => b.score - a.score)[0].data.name}</p>
                        <p className="text-sm">{savedLocations.sort((a, b) => b.score - a.score)[0].data.address}</p>
                        <p className="text-sm">{savedLocations.sort((a, b) => b.score - a.score)[0].data.county} County, {savedLocations.sort((a, b) => b.score - a.score)[0].data.city}</p>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-muted rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full bg-green-500"
                              style={{ width: `${savedLocations.sort((a, b) => b.score - a.score)[0].score * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-green-500">
                            {savedLocations.sort((a, b) => b.score - a.score)[0].score.toFixed(1)}/10
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-2">Key Advantages:</h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {savedLocations.sort((a, b) => b.score - a.score)[0].data.county && (
                          <li className="text-sm">
                            Located in {savedLocations.sort((a, b) => b.score - a.score)[0].data.county} County
                            {tnChildcareDesertData[savedLocations.sort((a, b) => b.score - a.score)[0].data.county] >= 7 ? 
                              ' (high childcare demand area)' : ''}
                          </li>
                        )}
                        {Object.entries(savedLocations.sort((a, b) => b.score - a.score)[0].data.tennessee)
                          .filter(([_, value]) => value >= 7)
                          .map(([factor, value], index) => (
                            <li key={index} className="text-sm">
                              Strong {factor.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} ({value}/10)
                            </li>
                          ))
                        }
                        {Object.entries(savedLocations.sort((a, b) => b.score - a.score)[0].data.proximity)
                          .filter(([_, value]) => value >= 7)
                          .slice(0, 2)
                          .map(([factor, value], index) => (
                            <li key={index} className="text-sm">
                              Excellent {factor.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} ({value}/10)
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => loadLocation(savedLocations.sort((a, b) => b.score - a.score)[0].id)}
                      className="w-full"
                    >
                      Load Top Location
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-bold mb-3">Tennessee Location Resources</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Tennessee Department of Human Services:</strong> For childcare licensing requirements by location</p>
              <p><strong>Tennessee Child Care Resource & Referral Network:</strong> For market analysis and location assistance</p>
              <p><strong>Tennessee Small Business Development Centers:</strong> For location selection guidance</p>
              <p><strong>Tennessee Emergency Management Agency:</strong> For disaster risk assessment by county</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Print-specific styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .interactive-element, .interactive-element * {
            visibility: visible;
          }
          .interactive-element {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button, select, .tabs-list {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default LocationCalculator;
