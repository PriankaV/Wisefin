import { createAdminClient } from "@/lib/appwrite";
import { categorizeItem } from "@/lib/categorization"; // Utility function to categorize items

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  category: string;
}

interface ReceiptData {
  store: string;
  date: string;
  total: number;
  tax: number;
  items: ReceiptItem[];
}

export const processReceiptText = async (extractedText: string, userId: string) => {
  const { database } = await createAdminClient();  // Move await here, inside the async function

  const lines = extractedText.split("\n").map(line => line.trim()).filter(line => line);
  
  let store = lines[0]; // Assume first line is store name
  let date = "";
  let tax = 0;
  let total = 0;
  let items: ReceiptItem[] = [];

  const itemRegex = /^(\d+)x\s(.+?)\s\$([\d.]+)$/;
  const taxRegex = /Tax\s+\$([\d.]+)/i;
  const totalRegex = /Total\s+\$([\d.]+)/i;

  for (const line of lines) {
    let itemMatch = line.match(itemRegex);
    let taxMatch = line.match(taxRegex);
    let totalMatch = line.match(totalRegex);

    if (line.toLowerCase().includes("date")) {
      date = line.split(":")[1].trim();
    } else if (itemMatch) {
      const quantity = parseInt(itemMatch[1]);
      const name = itemMatch[2].trim();
      const price = parseFloat(itemMatch[3]);
      const category = categorizeItem(name); // Assign category based on keywords

      items.push({ name, quantity, price, category });
    } else if (taxMatch) {
      tax = parseFloat(taxMatch[1]);
    } else if (totalMatch) {
      total = parseFloat(totalMatch[1]);
    }
  }

  const receiptData: ReceiptData = { store, date, total, tax, items };

  // Store in Appwrite database
  try {
    await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,  // Use actual database ID
      "receiptsCollection",
      "unique()", // You can generate a unique ID for each receipt
      {
        userId,
        store,
        date,
        total,
        tax,
        items,
      }
    );
    console.log("Receipt data saved successfully!");
  } catch (error) {
    console.error("Error saving receipt data:", error);
  }

  return receiptData;
};
