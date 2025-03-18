export const categorizeItem = (itemName: string): string => {
    const categories = {
      "food": ["burger", "salad", "pizza", "pie"],
      "beverage": ["soft drink", "coffee", "tea"],
      "tax": ["tax"],
    };
  
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => itemName.toLowerCase().includes(keyword))) {
        return category;
      }
    }
  
    return "other"; // Default category
  };
  