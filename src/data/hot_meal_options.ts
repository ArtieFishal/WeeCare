// Hot meal options for childcare centers with kitchen facilities
export interface MealTemplate {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'am_snack' | 'pm_snack';
  ageGroups: string[]; // 'infant', 'toddler', 'preschool', 'schoolage'
  dietaryTags: string[]; // 'dairy-free', 'gluten-free', 'nut-free', etc.
  prepTime?: number; // in minutes
  cookTime?: number; // in minutes
  servingSize?: string;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tnCacfpCompliant: boolean;
  tnCacfpNotes?: string;
  instructions?: string;
  createdAt?: string;
  updatedAt?: string;
  isCustom?: boolean;
}

export const hotMealOptions: MealTemplate[] = [
  // Breakfast Options
  {
    id: 'hot-b-1',
    name: 'Whole Grain Oatmeal with Fruit',
    description: 'Warm oatmeal cooked with milk, topped with fresh seasonal fruit and a sprinkle of cinnamon.',
    ingredients: ['Rolled oats', 'Milk', 'Fresh fruit (apples, berries, bananas)', 'Cinnamon', 'Honey (optional)'],
    mealType: 'breakfast',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 5,
    cookTime: 10,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    nutritionInfo: {
      calories: 180,
      protein: 6,
      carbs: 30,
      fat: 3
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Meets whole grain-rich requirement; pair with milk and fruit to complete the meal pattern.'
  },
  {
    id: 'hot-b-2',
    name: 'Scrambled Eggs with Whole Wheat Toast',
    description: 'Fluffy scrambled eggs served with whole wheat toast and fresh fruit on the side.',
    ingredients: ['Eggs', 'Milk', 'Whole wheat bread', 'Butter', 'Fresh fruit'],
    mealType: 'breakfast',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 5,
    cookTime: 10,
    servingSize: '1 egg + 1/2 slice toast for toddlers, 1-2 eggs + 1 slice toast for older children',
    nutritionInfo: {
      calories: 220,
      protein: 12,
      carbs: 20,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Eggs count as meat/meat alternate; whole wheat toast meets grain requirement.'
  },
  {
    id: 'hot-b-3',
    name: 'Whole Grain Pancakes with Fruit Topping',
    description: 'Warm whole grain pancakes topped with fresh fruit compote (no added sugar).',
    ingredients: ['Whole grain pancake mix', 'Milk', 'Eggs', 'Fresh fruit', 'Maple syrup (optional)'],
    mealType: 'breakfast',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 10,
    cookTime: 15,
    servingSize: '1 small pancake for toddlers, 2 pancakes for preschool, 2-3 pancakes for school-age',
    nutritionInfo: {
      calories: 240,
      protein: 8,
      carbs: 40,
      fat: 6
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Use whole grain mix to meet grain requirement; fruit topping counts toward fruit component.'
  },
  {
    id: 'hot-b-4',
    name: 'Breakfast Burrito',
    description: 'Scrambled eggs with vegetables wrapped in a whole grain tortilla.',
    ingredients: ['Eggs', 'Bell peppers', 'Onions', 'Whole grain tortillas', 'Cheese (optional)'],
    mealType: 'breakfast',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 10,
    cookTime: 15,
    servingSize: '1 small burrito for preschool, 1 regular burrito for school-age',
    nutritionInfo: {
      calories: 280,
      protein: 14,
      carbs: 30,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Eggs count as meat/meat alternate; whole grain tortilla meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-b-5',
    name: 'French Toast Sticks',
    description: 'Whole grain bread dipped in egg mixture, baked until golden, and cut into sticks for easy eating.',
    ingredients: ['Whole grain bread', 'Eggs', 'Milk', 'Cinnamon', 'Vanilla extract'],
    mealType: 'breakfast',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 10,
    cookTime: 15,
    servingSize: '2 sticks for toddlers, 3-4 sticks for preschool, 4-5 sticks for school-age',
    nutritionInfo: {
      calories: 220,
      protein: 10,
      carbs: 30,
      fat: 8
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Whole grain bread meets grain requirement; eggs provide protein.'
  },
  {
    id: 'hot-b-6',
    name: 'Breakfast Potato Bowl',
    description: 'Diced roasted potatoes topped with scrambled eggs and a sprinkle of cheese.',
    ingredients: ['Potatoes', 'Eggs', 'Cheese', 'Bell peppers', 'Onions'],
    mealType: 'breakfast',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'gluten-free'],
    prepTime: 15,
    cookTime: 25,
    servingSize: '1/2 cup for preschool, 3/4 cup for school-age',
    nutritionInfo: {
      calories: 260,
      protein: 14,
      carbs: 30,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Eggs count as meat/meat alternate; potatoes count as vegetable. Serve with fruit and milk to complete the meal pattern.'
  },
  {
    id: 'hot-b-7',
    name: 'Cheesy Grits with Scrambled Eggs',
    description: 'Warm, creamy grits with cheese, served with scrambled eggs on the side.',
    ingredients: ['Grits', 'Cheese', 'Milk', 'Eggs', 'Butter'],
    mealType: 'breakfast',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'gluten-free'],
    prepTime: 5,
    cookTime: 20,
    servingSize: '1/4 cup grits + 1 egg for toddlers, 1/2 cup grits + 1-2 eggs for older children',
    nutritionInfo: {
      calories: 250,
      protein: 15,
      carbs: 25,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Grits count toward grain requirement; eggs count as meat/meat alternate.'
  },
  {
    id: 'hot-b-8',
    name: 'Breakfast Quesadilla',
    description: 'Whole grain tortilla filled with scrambled eggs and cheese, folded and grilled until crispy.',
    ingredients: ['Whole grain tortillas', 'Eggs', 'Cheese', 'Bell peppers', 'Spinach (optional)'],
    mealType: 'breakfast',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 10,
    cookTime: 10,
    servingSize: '1/2 quesadilla for preschool, 1 quesadilla for school-age',
    nutritionInfo: {
      calories: 270,
      protein: 16,
      carbs: 25,
      fat: 14
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Whole grain tortilla meets grain requirement; eggs count as meat/meat alternate.'
  },
  {
    id: 'hot-b-9',
    name: 'Breakfast Grain Bowl',
    description: 'Warm quinoa or farro topped with scrambled eggs and sautéed vegetables.',
    ingredients: ['Quinoa or farro', 'Eggs', 'Bell peppers', 'Spinach', 'Cherry tomatoes'],
    mealType: 'breakfast',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free', 'gluten-free'],
    prepTime: 15,
    cookTime: 20,
    servingSize: '1/2 cup for preschool, 3/4 cup for school-age',
    nutritionInfo: {
      calories: 240,
      protein: 12,
      carbs: 35,
      fat: 6
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Quinoa or farro counts toward grain requirement; eggs count as meat/meat alternate; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-b-10',
    name: 'Baked Oatmeal Cups',
    description: 'Individual portions of baked oatmeal with fruit, served warm.',
    ingredients: ['Rolled oats', 'Milk', 'Eggs', 'Applesauce', 'Cinnamon', 'Berries'],
    mealType: 'breakfast',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 15,
    cookTime: 25,
    servingSize: '1 small cup for toddlers, 1-2 cups for older children',
    nutritionInfo: {
      calories: 180,
      protein: 7,
      carbs: 30,
      fat: 5
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Oats count toward grain requirement; fruit counts toward fruit component.'
  },

  // Lunch Options
  {
    id: 'hot-l-1',
    name: 'Turkey and Vegetable Soup with Whole Grain Roll',
    description: 'Hearty soup with ground turkey, vegetables, and whole grain roll on the side.',
    ingredients: ['Ground turkey', 'Carrots', 'Celery', 'Onions', 'Tomatoes', 'Broth', 'Whole grain rolls'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 40,
    servingSize: '1/2 cup soup + 1/2 roll for toddlers, 3/4 cup soup + 1 roll for preschool, 1 cup soup + 1 roll for school-age',
    nutritionInfo: {
      calories: 280,
      protein: 18,
      carbs: 35,
      fat: 8
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Turkey counts as meat/meat alternate; vegetables count toward vegetable component; whole grain roll meets grain requirement.'
  },
  {
    id: 'hot-l-2',
    name: 'Baked Chicken Tenders with Roasted Vegetables',
    description: 'Homemade baked chicken tenders with a side of roasted seasonal vegetables.',
    ingredients: ['Chicken breast', 'Whole wheat breadcrumbs', 'Eggs', 'Seasonal vegetables', 'Olive oil'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 25,
    servingSize: '1-2 tenders + 1/4 cup vegetables for toddlers, 2-3 tenders + 1/2 cup vegetables for older children',
    nutritionInfo: {
      calories: 320,
      protein: 25,
      carbs: 30,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; breadcrumbs count toward grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-l-3',
    name: 'Whole Grain Pasta with Turkey Meat Sauce',
    description: 'Whole grain pasta topped with homemade turkey meat sauce and vegetables.',
    ingredients: ['Whole grain pasta', 'Ground turkey', 'Tomato sauce', 'Onions', 'Bell peppers', 'Carrots', 'Garlic'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 15,
    cookTime: 30,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    nutritionInfo: {
      calories: 310,
      protein: 20,
      carbs: 45,
      fat: 7
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Turkey counts as meat/meat alternate; whole grain pasta meets grain requirement; sauce counts toward vegetable component.'
  },
  {
    id: 'hot-l-4',
    name: 'Bean and Cheese Quesadillas with Vegetables',
    description: 'Whole grain tortillas filled with beans and cheese, served with a side of vegetables.',
    ingredients: ['Whole grain tortillas', 'Refried beans', 'Cheese', 'Bell peppers', 'Corn', 'Tomatoes'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'vegetarian'],
    prepTime: 15,
    cookTime: 15,
    servingSize: '1/2 quesadilla + 1/4 cup vegetables for toddlers, 1 quesadilla + 1/2 cup vegetables for older children',
    nutritionInfo: {
      calories: 300,
      protein: 15,
      carbs: 40,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Beans and cheese count as meat/meat alternate; whole grain tortilla meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-l-5',
    name: 'Baked Fish with Brown Rice and Vegetables',
    description: 'Mild white fish baked with lemon, served with brown rice and steamed vegetables.',
    ingredients: ['White fish (tilapia or cod)', 'Brown rice', 'Broccoli', 'Carrots', 'Lemon', 'Olive oil'],
    mealType: 'lunch',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free', 'gluten-free'],
    prepTime: 15,
    cookTime: 30,
    servingSize: '2 oz fish + 1/4 cup rice + 1/4 cup vegetables for preschool, 3 oz fish + 1/2 cup rice + 1/2 cup vegetables for school-age',
    nutritionInfo: {
      calories: 290,
      protein: 22,
      carbs: 35,
      fat: 8
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Fish counts as meat/meat alternate; brown rice meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-l-6',
    name: 'Turkey and Cheese Melt with Vegetable Soup',
    description: 'Whole grain bread with turkey and melted cheese, served with a side of vegetable soup.',
    ingredients: ['Whole grain bread', 'Turkey slices', 'Cheese', 'Mixed vegetables', 'Broth'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 15,
    cookTime: 20,
    servingSize: '1/2 sandwich + 1/4 cup soup for toddlers, 1 sandwich + 1/2 cup soup for older children',
    nutritionInfo: {
      calories: 320,
      protein: 20,
      carbs: 35,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Turkey and cheese count as meat/meat alternate; whole grain bread meets grain requirement; soup counts toward vegetable component.'
  },
  {
    id: 'hot-l-7',
    name: 'Chicken and Vegetable Stir-Fry with Brown Rice',
    description: 'Diced chicken and vegetables stir-fried in a light sauce, served over brown rice.',
    ingredients: ['Chicken breast', 'Brown rice', 'Broccoli', 'Carrots', 'Snow peas', 'Bell peppers', 'Low-sodium soy sauce'],
    mealType: 'lunch',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 20,
    servingSize: '1/2 cup for preschool, 3/4 cup for school-age',
    nutritionInfo: {
      calories: 310,
      protein: 25,
      carbs: 40,
      fat: 6
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; brown rice meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-l-8',
    name: 'Beef and Bean Chili with Cornbread',
    description: 'Hearty chili with lean ground beef, beans, and vegetables, served with a side of cornbread.',
    ingredients: ['Lean ground beef', 'Kidney beans', 'Tomatoes', 'Bell peppers', 'Onions', 'Cornmeal', 'Whole wheat flour'],
    mealType: 'lunch',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 20,
    cookTime: 45,
    servingSize: '1/2 cup chili + 1 small piece cornbread for preschool, 3/4 cup chili + 1 piece cornbread for school-age',
    nutritionInfo: {
      calories: 340,
      protein: 22,
      carbs: 45,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Beef and beans count as meat/meat alternate; cornbread meets grain requirement; vegetables in chili count toward vegetable component.'
  },
  {
    id: 'hot-l-9',
    name: 'Vegetable and Cheese Frittata with Whole Grain Toast',
    description: 'Baked egg dish with vegetables and cheese, served with whole grain toast.',
    ingredients: ['Eggs', 'Cheese', 'Spinach', 'Bell peppers', 'Onions', 'Whole grain bread'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'vegetarian', 'gluten-free (without toast)'],
    prepTime: 15,
    cookTime: 25,
    servingSize: '1 small slice + 1/2 slice toast for toddlers, 1 slice + 1 slice toast for older children',
    nutritionInfo: {
      calories: 280,
      protein: 18,
      carbs: 25,
      fat: 14
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Eggs and cheese count as meat/meat alternate; whole grain toast meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-l-10',
    name: 'Baked Chicken and Vegetable Casserole',
    description: 'Chicken and vegetables baked with brown rice in a creamy sauce.',
    ingredients: ['Chicken breast', 'Brown rice', 'Broccoli', 'Carrots', 'Milk', 'Cheese'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 20,
    cookTime: 40,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    nutritionInfo: {
      calories: 330,
      protein: 25,
      carbs: 35,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; brown rice meets grain requirement; vegetables count toward vegetable component.'
  },

  // Dinner Options (New)
  {
    id: 'hot-d-1',
    name: 'Baked Chicken with Sweet Potatoes and Green Beans',
    description: 'Oven-baked chicken breast with roasted sweet potatoes and steamed green beans.',
    ingredients: ['Chicken breast', 'Sweet potatoes', 'Green beans', 'Olive oil', 'Herbs and spices'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free', 'gluten-free'],
    prepTime: 15,
    cookTime: 35,
    servingSize: '1.5 oz chicken + 1/4 cup vegetables for toddlers, 2 oz chicken + 1/2 cup vegetables for older children',
    nutritionInfo: {
      calories: 290,
      protein: 25,
      carbs: 30,
      fat: 8
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; sweet potatoes and green beans count toward vegetable component.'
  },
  {
    id: 'hot-d-2',
    name: 'Turkey Meatballs with Whole Grain Pasta',
    description: 'Homemade turkey meatballs in tomato sauce served over whole grain pasta.',
    ingredients: ['Ground turkey', 'Whole grain pasta', 'Tomato sauce', 'Onions', 'Garlic', 'Italian herbs'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 20,
    cookTime: 30,
    servingSize: '2 small meatballs + 1/4 cup pasta for toddlers, 3-4 meatballs + 1/2 cup pasta for older children',
    nutritionInfo: {
      calories: 320,
      protein: 22,
      carbs: 40,
      fat: 9
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Turkey counts as meat/meat alternate; whole grain pasta meets grain requirement; tomato sauce counts toward vegetable component.'
  },
  {
    id: 'hot-d-3',
    name: 'Vegetable and Bean Enchiladas',
    description: 'Whole grain tortillas filled with beans, vegetables, and cheese, baked in mild enchilada sauce.',
    ingredients: ['Whole grain tortillas', 'Black beans', 'Bell peppers', 'Corn', 'Cheese', 'Enchilada sauce'],
    mealType: 'dinner',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'vegetarian'],
    prepTime: 25,
    cookTime: 30,
    servingSize: '1 small enchilada for preschool, 1-2 enchiladas for school-age',
    nutritionInfo: {
      calories: 310,
      protein: 15,
      carbs: 45,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Beans and cheese count as meat/meat alternate; whole grain tortillas meet grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-d-4',
    name: 'Baked Fish Sticks with Brown Rice and Peas',
    description: 'Homemade baked fish sticks served with brown rice and green peas.',
    ingredients: ['White fish fillets', 'Whole wheat breadcrumbs', 'Brown rice', 'Green peas', 'Lemon'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 25,
    servingSize: '2 small fish sticks + 1/4 cup rice + 2 tbsp peas for toddlers, 3-4 fish sticks + 1/2 cup rice + 1/4 cup peas for older children',
    nutritionInfo: {
      calories: 300,
      protein: 20,
      carbs: 40,
      fat: 7
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Fish counts as meat/meat alternate; brown rice meets grain requirement; peas count toward vegetable component.'
  },
  {
    id: 'hot-d-5',
    name: 'Slow Cooker Chicken and Vegetable Stew',
    description: 'Tender chicken and vegetables in a flavorful broth, served with whole grain rolls.',
    ingredients: ['Chicken thighs', 'Carrots', 'Potatoes', 'Celery', 'Onions', 'Broth', 'Whole grain rolls'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 240,
    servingSize: '1/2 cup stew + 1/2 roll for toddlers, 3/4 cup stew + 1 roll for older children',
    nutritionInfo: {
      calories: 310,
      protein: 22,
      carbs: 35,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; vegetables count toward vegetable component; whole grain roll meets grain requirement.'
  },
  {
    id: 'hot-d-6',
    name: 'Beef and Vegetable Stir-Fry with Brown Rice',
    description: 'Lean beef strips stir-fried with mixed vegetables, served over brown rice.',
    ingredients: ['Lean beef strips', 'Brown rice', 'Broccoli', 'Carrots', 'Snow peas', 'Bell peppers', 'Low-sodium soy sauce'],
    mealType: 'dinner',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 20,
    servingSize: '1/2 cup for preschool, 3/4 cup for school-age',
    nutritionInfo: {
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Beef counts as meat/meat alternate; brown rice meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-d-7',
    name: 'Vegetable Lasagna',
    description: 'Layers of whole grain pasta, vegetables, cheese, and tomato sauce baked until bubbly.',
    ingredients: ['Whole grain lasagna noodles', 'Spinach', 'Zucchini', 'Ricotta cheese', 'Mozzarella cheese', 'Tomato sauce'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'vegetarian'],
    prepTime: 30,
    cookTime: 45,
    servingSize: '1 small piece for toddlers, 1 medium piece for older children',
    nutritionInfo: {
      calories: 330,
      protein: 18,
      carbs: 40,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Cheese counts as meat/meat alternate; whole grain pasta meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-d-8',
    name: 'Turkey and Vegetable Shepherd\'s Pie',
    description: 'Ground turkey and vegetables topped with mashed potatoes and baked until golden.',
    ingredients: ['Ground turkey', 'Carrots', 'Peas', 'Corn', 'Potatoes', 'Milk', 'Butter'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'gluten-free'],
    prepTime: 25,
    cookTime: 35,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    nutritionInfo: {
      calories: 300,
      protein: 20,
      carbs: 35,
      fat: 10
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Turkey counts as meat/meat alternate; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-d-9',
    name: 'Bean and Rice Burrito Bowl',
    description: 'Brown rice topped with beans, vegetables, cheese, and mild salsa.',
    ingredients: ['Brown rice', 'Black beans', 'Corn', 'Bell peppers', 'Cheese', 'Mild salsa', 'Greek yogurt'],
    mealType: 'dinner',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'vegetarian', 'gluten-free'],
    prepTime: 15,
    cookTime: 20,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    nutritionInfo: {
      calories: 290,
      protein: 15,
      carbs: 45,
      fat: 8
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Beans and cheese count as meat/meat alternate; brown rice meets grain requirement; vegetables count toward vegetable component.'
  },
  {
    id: 'hot-d-10',
    name: 'Baked Chicken Parmesan with Whole Grain Pasta',
    description: 'Baked breaded chicken topped with tomato sauce and cheese, served with whole grain pasta.',
    ingredients: ['Chicken breast', 'Whole wheat breadcrumbs', 'Tomato sauce', 'Mozzarella cheese', 'Whole grain pasta', 'Italian herbs'],
    mealType: 'dinner',
    ageGroups: ['preschool', 'schoolage'],
    dietaryTags: ['nut-free'],
    prepTime: 25,
    cookTime: 30,
    servingSize: '1 small piece + 1/4 cup pasta for preschool, 1 medium piece + 1/2 cup pasta for school-age',
    nutritionInfo: {
      calories: 340,
      protein: 28,
      carbs: 35,
      fat: 12
    },
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; whole grain pasta meets grain requirement; tomato sauce counts toward vegetable component.'
  }
];

// Custom meal templates saved by users
export const customMealTemplates: MealTemplate[] = [
  {
    id: 'custom-1',
    name: 'Homestyle Chicken Noodle Soup',
    description: 'Hearty chicken soup with vegetables and whole grain noodles',
    ingredients: ['Chicken breast', 'Whole grain noodles', 'Carrots', 'Celery', 'Onions', 'Chicken broth', 'Herbs'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 45,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Chicken counts as meat/meat alternate; whole grain noodles meet grain requirement; vegetables count toward vegetable component.',
    instructions: '1. Dice chicken and vegetables.\n2. Sauté vegetables until soft.\n3. Add chicken and cook until no longer pink.\n4. Add broth and bring to a boil.\n5. Add noodles and cook until tender.\n6. Season with herbs and serve warm.',
    createdAt: '2025-05-27T10:00:00Z',
    updatedAt: '2025-05-27T10:00:00Z',
    isCustom: true
  },
  {
    id: 'custom-2',
    name: 'Veggie Mac and Cheese',
    description: 'Whole grain macaroni with cheese sauce and hidden vegetables',
    ingredients: ['Whole grain macaroni', 'Cheddar cheese', 'Milk', 'Butternut squash puree', 'Spinach (finely chopped)', 'Butter', 'Flour'],
    mealType: 'lunch',
    ageGroups: ['toddler', 'preschool', 'schoolage'],
    dietaryTags: ['nut-free', 'vegetarian'],
    prepTime: 15,
    cookTime: 25,
    servingSize: '1/2 cup for toddlers, 3/4 cup for preschool, 1 cup for school-age',
    tnCacfpCompliant: true,
    tnCacfpNotes: 'Cheese counts as meat/meat alternate; whole grain macaroni meets grain requirement; vegetables count toward vegetable component.',
    instructions: '1. Cook macaroni according to package directions.\n2. Make cheese sauce with butter, flour, milk, and cheese.\n3. Stir in vegetable puree.\n4. Combine with cooked pasta and serve warm.',
    createdAt: '2025-05-27T11:30:00Z',
    updatedAt: '2025-05-27T11:30:00Z',
    isCustom: true
  }
];
