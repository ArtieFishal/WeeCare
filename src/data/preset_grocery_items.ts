export interface PresetGroceryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity_per_child: number;
  estimated_cost: number;
  age_groups: string[];
  tn_cacfp_notes?: string;
}

export const presetGroceryItems: PresetGroceryItem[] = [
  // Dairy & Alternatives
  {
    id: "dairy-1",
    name: "Whole milk",
    category: "Dairy",
    unit: "gallon",
    quantity_per_child: 0.1,
    estimated_cost: 3.89,
    age_groups: ["infant", "toddler"],
    tn_cacfp_notes: "Required for children 1 year of age"
  },
  {
    id: "dairy-2",
    name: "Low-fat 1% milk",
    category: "Dairy",
    unit: "gallon",
    quantity_per_child: 0.1,
    estimated_cost: 3.79,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Required for children 2 years and older"
  },
  {
    id: "dairy-3",
    name: "Fat-free milk",
    category: "Dairy",
    unit: "gallon",
    quantity_per_child: 0.1,
    estimated_cost: 3.69,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Acceptable for children 2 years and older"
  },
  {
    id: "dairy-4",
    name: "Almond milk (unsweetened)",
    category: "Dairy",
    unit: "half-gallon",
    quantity_per_child: 0.1,
    estimated_cost: 3.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Requires medical statement for milk substitution"
  },
  {
    id: "dairy-5",
    name: "Soy milk (unsweetened)",
    category: "Dairy",
    unit: "half-gallon",
    quantity_per_child: 0.1,
    estimated_cost: 3.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Nutritionally equivalent milk substitute, no medical statement required"
  },
  {
    id: "dairy-6",
    name: "Plain yogurt",
    category: "Dairy",
    unit: "32oz container",
    quantity_per_child: 0.25,
    estimated_cost: 4.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Must contain no more than 23g of sugar per 6oz"
  },
  {
    id: "dairy-7",
    name: "Cheddar cheese",
    category: "Dairy",
    unit: "8oz block",
    quantity_per_child: 0.25,
    estimated_cost: 3.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "dairy-8",
    name: "Mozzarella cheese",
    category: "Dairy",
    unit: "8oz block",
    quantity_per_child: 0.25,
    estimated_cost: 3.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "dairy-9",
    name: "Cottage cheese",
    category: "Dairy",
    unit: "16oz container",
    quantity_per_child: 0.25,
    estimated_cost: 2.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "dairy-10",
    name: "Lactose-free cheese",
    category: "Dairy",
    unit: "8oz block",
    quantity_per_child: 0.25,
    estimated_cost: 4.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },

  // Fruits & Vegetables
  {
    id: "produce-1",
    name: "Apples",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.5,
    estimated_cost: 1.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },
  {
    id: "produce-2",
    name: "Bananas",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.5,
    estimated_cost: 0.59,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },
  {
    id: "produce-3",
    name: "Oranges",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.5,
    estimated_cost: 1.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },
  {
    id: "produce-4",
    name: "Grapes",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.3,
    estimated_cost: 2.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component; choking hazard for younger children"
  },
  {
    id: "produce-5",
    name: "Strawberries",
    category: "Produce",
    unit: "16oz container",
    quantity_per_child: 0.25,
    estimated_cost: 3.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },
  {
    id: "produce-6",
    name: "Blueberries",
    category: "Produce",
    unit: "pint",
    quantity_per_child: 0.2,
    estimated_cost: 3.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },
  {
    id: "produce-7",
    name: "Carrots",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.3,
    estimated_cost: 1.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-8",
    name: "Broccoli",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.3,
    estimated_cost: 1.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-9",
    name: "Spinach",
    category: "Produce",
    unit: "8oz bag",
    quantity_per_child: 0.2,
    estimated_cost: 2.49,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-10",
    name: "Bell peppers",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.2,
    estimated_cost: 1.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-11",
    name: "Cucumber",
    category: "Produce",
    unit: "each",
    quantity_per_child: 0.25,
    estimated_cost: 0.79,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-12",
    name: "Sweet potatoes",
    category: "Produce",
    unit: "lb",
    quantity_per_child: 0.3,
    estimated_cost: 1.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-13",
    name: "Frozen mixed vegetables",
    category: "Produce",
    unit: "16oz bag",
    quantity_per_child: 0.25,
    estimated_cost: 1.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-14",
    name: "Frozen peas",
    category: "Produce",
    unit: "16oz bag",
    quantity_per_child: 0.25,
    estimated_cost: 1.79,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "produce-15",
    name: "Applesauce (unsweetened)",
    category: "Produce",
    unit: "24oz jar",
    quantity_per_child: 0.25,
    estimated_cost: 2.49,
    age_groups: ["infant", "toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },

  // Grains & Bread
  {
    id: "grains-1",
    name: "Whole wheat bread",
    category: "Grains",
    unit: "loaf",
    quantity_per_child: 0.2,
    estimated_cost: 2.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as whole grain-rich component"
  },
  {
    id: "grains-2",
    name: "Whole grain cereal (low sugar)",
    category: "Grains",
    unit: "18oz box",
    quantity_per_child: 0.2,
    estimated_cost: 3.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Must contain no more than 6g sugar per dry ounce"
  },
  {
    id: "grains-3",
    name: "Oatmeal",
    category: "Grains",
    unit: "42oz container",
    quantity_per_child: 0.15,
    estimated_cost: 4.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as whole grain-rich component"
  },
  {
    id: "grains-4",
    name: "Brown rice",
    category: "Grains",
    unit: "2lb bag",
    quantity_per_child: 0.15,
    estimated_cost: 3.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as whole grain-rich component"
  },
  {
    id: "grains-5",
    name: "Whole wheat pasta",
    category: "Grains",
    unit: "16oz box",
    quantity_per_child: 0.15,
    estimated_cost: 1.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as whole grain-rich component"
  },
  {
    id: "grains-6",
    name: "Whole grain crackers",
    category: "Grains",
    unit: "8oz box",
    quantity_per_child: 0.15,
    estimated_cost: 3.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as grain component"
  },
  {
    id: "grains-7",
    name: "Whole grain tortillas",
    category: "Grains",
    unit: "10ct package",
    quantity_per_child: 0.2,
    estimated_cost: 2.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as whole grain-rich component"
  },
  {
    id: "grains-8",
    name: "Quinoa",
    category: "Grains",
    unit: "16oz bag",
    quantity_per_child: 0.1,
    estimated_cost: 4.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as whole grain-rich component"
  },
  {
    id: "grains-9",
    name: "Iron-fortified infant cereal",
    category: "Grains",
    unit: "8oz box",
    quantity_per_child: 0.25,
    estimated_cost: 2.49,
    age_groups: ["infant"],
    tn_cacfp_notes: "Required for infants 6-11 months"
  },
  {
    id: "grains-10",
    name: "Gluten-free bread",
    category: "Grains",
    unit: "loaf",
    quantity_per_child: 0.2,
    estimated_cost: 5.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "For children with gluten sensitivity"
  },

  // Protein
  {
    id: "protein-1",
    name: "Chicken breast",
    category: "Protein",
    unit: "lb",
    quantity_per_child: 0.25,
    estimated_cost: 3.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat component"
  },
  {
    id: "protein-2",
    name: "Ground turkey",
    category: "Protein",
    unit: "lb",
    quantity_per_child: 0.25,
    estimated_cost: 4.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat component"
  },
  {
    id: "protein-3",
    name: "Lean ground beef",
    category: "Protein",
    unit: "lb",
    quantity_per_child: 0.25,
    estimated_cost: 5.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat component"
  },
  {
    id: "protein-4",
    name: "Canned tuna (in water)",
    category: "Protein",
    unit: "5oz can",
    quantity_per_child: 0.5,
    estimated_cost: 1.29,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat component"
  },
  {
    id: "protein-5",
    name: "Salmon fillets",
    category: "Protein",
    unit: "lb",
    quantity_per_child: 0.2,
    estimated_cost: 9.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat component"
  },
  {
    id: "protein-6",
    name: "Eggs",
    category: "Protein",
    unit: "dozen",
    quantity_per_child: 0.25,
    estimated_cost: 3.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "protein-7",
    name: "Tofu (firm)",
    category: "Protein",
    unit: "14oz package",
    quantity_per_child: 0.25,
    estimated_cost: 2.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "protein-8",
    name: "Black beans (canned, low sodium)",
    category: "Protein",
    unit: "15oz can",
    quantity_per_child: 0.25,
    estimated_cost: 0.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "protein-9",
    name: "Kidney beans (canned, low sodium)",
    category: "Protein",
    unit: "15oz can",
    quantity_per_child: 0.25,
    estimated_cost: 0.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "protein-10",
    name: "Lentils (dry)",
    category: "Protein",
    unit: "16oz bag",
    quantity_per_child: 0.15,
    estimated_cost: 1.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate"
  },
  {
    id: "protein-11",
    name: "Peanut butter",
    category: "Protein",
    unit: "16oz jar",
    quantity_per_child: 0.15,
    estimated_cost: 2.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate; not for children under 3 or with allergies"
  },
  {
    id: "protein-12",
    name: "Sunflower seed butter",
    category: "Protein",
    unit: "16oz jar",
    quantity_per_child: 0.15,
    estimated_cost: 5.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as meat alternate; nut-free alternative"
  },

  // Pantry Items
  {
    id: "pantry-1",
    name: "Olive oil",
    category: "Pantry",
    unit: "16oz bottle",
    quantity_per_child: 0.1,
    estimated_cost: 7.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "For food preparation"
  },
  {
    id: "pantry-2",
    name: "Canola oil",
    category: "Pantry",
    unit: "32oz bottle",
    quantity_per_child: 0.1,
    estimated_cost: 3.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "For food preparation"
  },
  {
    id: "pantry-3",
    name: "Low-sodium chicken broth",
    category: "Pantry",
    unit: "32oz carton",
    quantity_per_child: 0.15,
    estimated_cost: 2.49,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "For food preparation"
  },
  {
    id: "pantry-4",
    name: "Tomato sauce (no salt added)",
    category: "Pantry",
    unit: "15oz can",
    quantity_per_child: 0.2,
    estimated_cost: 1.29,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "Counts as vegetable component"
  },
  {
    id: "pantry-5",
    name: "100% fruit juice",
    category: "Pantry",
    unit: "64oz bottle",
    quantity_per_child: 0.1,
    estimated_cost: 3.49,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Limited to one serving per day"
  },
  {
    id: "pantry-6",
    name: "Dried fruit (no added sugar)",
    category: "Pantry",
    unit: "8oz bag",
    quantity_per_child: 0.1,
    estimated_cost: 3.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Counts as fruit component"
  },
  {
    id: "pantry-7",
    name: "Herbs and spices (assorted)",
    category: "Pantry",
    unit: "set",
    quantity_per_child: 0.05,
    estimated_cost: 15.99,
    age_groups: ["toddler", "preschool", "schoolage"],
    tn_cacfp_notes: "For food preparation, no added salt"
  },
  {
    id: "pantry-8",
    name: "Honey",
    category: "Pantry",
    unit: "12oz bottle",
    quantity_per_child: 0.05,
    estimated_cost: 4.99,
    age_groups: ["preschool", "schoolage"],
    tn_cacfp_notes: "Not for children under 1 year"
  }
];
