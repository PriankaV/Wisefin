// lib/utils/categorization.ts

interface CategoryMapping {
  [key: string]: string;
}

// Define keyword-based mapping for categories
const categoryMappings: CategoryMapping = {
  burger: "Food & Dining",
  salad: "Food & Dining",
  drink: "Beverages",
  soda: "Beverages",
  coffee: "Beverages",
  pie: "Desserts",
  tax: "Fees & Taxes",
  groceries: "Groceries",
  clothing: "Shopping",
  electronics: "Electronics",
  entertainment: "Entertainment",
};

// Function to categorize items based on predefined keywords
export const categorizeItem = (itemName: string): string => {
  const lowerCaseItem = itemName.toLowerCase();

  for (const keyword in categoryMappings) {
    if (lowerCaseItem.includes(keyword)) {
      return categoryMappings[keyword];
    }
  }

  return "Other"; // Default category if no match is found
};
