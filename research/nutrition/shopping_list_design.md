# Tennessee Childcare Nutrition Shopping List Design

## Age-Specific Food Categories and Items

### Infant (0-12 months)
- **Formula & Milk**
  - Iron-fortified infant formula
  - Breastmilk storage bags
  - Whole milk (for 12+ months)
  
- **Cereals & Grains**
  - Iron-fortified infant rice cereal
  - Iron-fortified infant oatmeal
  - Iron-fortified infant mixed grain cereal
  - Teething biscuits (6+ months)
  - Infant puffs (8+ months)
  
- **Fruits & Vegetables**
  - Pureed apples
  - Pureed pears
  - Pureed peaches
  - Pureed bananas
  - Pureed sweet potatoes
  - Pureed carrots
  - Pureed green beans
  - Pureed peas
  - Pureed squash
  
- **Proteins**
  - Pureed chicken
  - Pureed turkey
  - Pureed beef
  - Pureed beans
  - Plain whole milk yogurt (8+ months)
  - Cottage cheese (10+ months)

### Toddler (1-3 years)
- **Milk & Dairy**
  - Whole milk (1-2 years)
  - Low-fat milk (2-3 years)
  - Yogurt (low sugar)
  - String cheese
  - Cottage cheese
  - Cheese cubes (mild cheddar, mozzarella)
  
- **Grains**
  - Whole grain bread
  - Whole grain crackers
  - Whole grain cereal (low sugar)
  - Oatmeal
  - Brown rice
  - Whole grain pasta
  - Whole grain tortillas
  
- **Fruits & Vegetables**
  - Bananas
  - Apples (for slicing)
  - Pears
  - Peaches
  - Berries
  - Melon
  - Carrots
  - Sweet potatoes
  - Peas
  - Green beans
  - Broccoli (small florets)
  - Cucumber
  
- **Proteins**
  - Ground turkey
  - Chicken breast
  - Lean ground beef
  - Fish (mild white fish)
  - Eggs
  - Beans (black, pinto)
  - Hummus
  - Sunflower seed butter

### Preschool (3-5 years)
- **Milk & Dairy**
  - Low-fat milk
  - Yogurt (low sugar)
  - String cheese
  - Sliced cheese
  - Cottage cheese
  
- **Grains**
  - Whole grain bread
  - Whole grain English muffins
  - Whole grain crackers
  - Whole grain cereal
  - Brown rice
  - Quinoa
  - Whole grain pasta
  - Whole grain tortillas
  
- **Fruits & Vegetables**
  - Apples
  - Oranges
  - Bananas
  - Berries
  - Grapes (halved)
  - Melon
  - Pineapple
  - Carrots
  - Celery
  - Bell peppers
  - Cucumber
  - Cherry tomatoes
  - Broccoli
  - Cauliflower
  - Spinach
  - Sweet potatoes
  
- **Proteins**
  - Chicken breast
  - Ground turkey
  - Lean ground beef
  - Tuna (canned in water)
  - Eggs
  - Beans (black, kidney, pinto)
  - Lentils
  - Tofu
  - Hummus
  - Nut or seed butters

### School Age (5+ years)
- **Milk & Dairy**
  - Fat-free milk
  - Low-fat yogurt
  - Greek yogurt
  - String cheese
  - Sliced cheese
  
- **Grains**
  - Whole grain bread
  - Whole grain bagels
  - Whole grain wraps
  - Whole grain pasta
  - Brown rice
  - Quinoa
  - Whole grain cereal
  - Oatmeal
  - Popcorn (low sodium)
  
- **Fruits & Vegetables**
  - Apples
  - Oranges
  - Bananas
  - Berries
  - Grapes
  - Melon
  - Pineapple
  - Carrots
  - Celery
  - Bell peppers
  - Cucumber
  - Cherry tomatoes
  - Broccoli
  - Cauliflower
  - Spinach
  - Lettuce
  - Sweet potatoes
  - Corn
  
- **Proteins**
  - Chicken breast
  - Turkey
  - Lean beef
  - Fish
  - Eggs
  - Beans (variety)
  - Lentils
  - Tofu
  - Nuts and seeds
  - Nut or seed butters

## Master List Logic

The master list will:
1. Combine items from all age groups
2. Calculate quantities based on number of children in each age group
3. Consolidate duplicate items with adjusted quantities
4. Organize by food category for easy shopping
5. Include Tennessee CACFP compliance indicators
6. Support dietary restriction filtering

## Quantity Calculation Logic

For each age group:
- Calculate servings needed per meal type per day
- Multiply by number of children in that age group
- Adjust for Tennessee portion size requirements
- Factor in weekly meal plan (5 days)
- Add 10% buffer for spillage/waste

## Print/Export Functionality

- Direct printing of shopping list with proper formatting
- PDF export option with Tennessee CACFP header
- Option to print master list or age-specific lists
- Include center information and date
- Support for Walmart ordering format

## Ordering Integration

- Generate formatted list for manual Walmart ordering
- Include item names, quantities, and categories
- Support delivery/pickup options
- Maintain Tennessee CACFP compliance information
