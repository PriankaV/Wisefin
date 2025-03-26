"use client"; // Use client-side rendering

import { useEffect, useState } from "react";
import { createAdminClient } from "@/lib/appwrite";

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState<any[]>([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const adminClient = await createAdminClient(); 
        const response = await adminClient.database.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          "receiptsCollection"
        );
        setReceipts(response.documents);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };
    fetchReceipts();
  }, []);

  return (
    <div className="receipts-page p-4">
      <h1 className="text-2xl font-semibold">Your Receipts</h1>
      <div>
        {receipts.map((receipt) => (
          <div key={receipt.$id} className="receipt-item mb-4 p-4 border rounded-lg">
            <h2 className="text-xl font-bold">{receipt.store}</h2>
            <p>Date: {receipt.date}</p>
            <p>Total: ${receipt.total}</p>
            <p>Tax: ${receipt.tax}</p>
            <ul>
              {receipt.items.map((item: any, index: number) => (
                <li key={index}>
                  {item.quantity} x {item.name} - ${item.price} (Category: {item.category})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPage;
