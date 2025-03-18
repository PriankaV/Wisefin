"use client"; 

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Tesseract from "tesseract.js"; 

const ReceiptScanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();

  //Process Image with Tesseract.js
  const processReceipt = async (imageFile: File) => {
    setIsProcessing(true);
    setExtractedText(null);

    try {
      const { data: { text } } = await Tesseract.recognize(
        imageFile, 
        "eng", 
        { logger: (m) => console.log(m) } // Optional: Log progress
      );

      setExtractedText(text);
      setIsProcessing(false);

      // You can now process `text` to extract structured data (e.g., total amount, store name, items)
    } catch (error) {
      console.error("Error processing receipt:", error);
      setIsProcessing(false);
    }
  };

  // Handle File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      processReceipt(file); // Extract text
    }
  };

  return (
    <div className="receipt-scanner p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Scan Your Receipt</h2>

      {/* File Upload */}
      <label className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer inline-block text-center">
        Choose File
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Processing Indicator */}
      {isProcessing && <p className="mt-2 text-sm text-blue-600">Processing receipt...</p>}

      {/* Display Extracted Text */}
      {extractedText && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-50">
          <h3 className="font-semibold">Extracted Text:</h3>
          <pre className="text-xs">{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default ReceiptScanner;
