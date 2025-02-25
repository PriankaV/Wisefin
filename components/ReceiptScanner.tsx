"use client"; // ✅ Ensure this is a Client Component

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const ReceiptScanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();

  // ✅ Open Camera and Capture Image
  const handleScanReceipt = async () => {
    if (!isCameraOpen) {
      // Open Camera
      setIsCameraOpen(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Could not access the camera. Please allow camera permissions.");
        setIsCameraOpen(false);
      }
    } else {
      // Capture Image and Process
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], "scanned-receipt.jpg", { type: "image/jpeg" });
              setSelectedFile(file);
              setIsCameraOpen(false);

              // Stop the camera stream
              const tracks = video.srcObject as MediaStream;
              tracks.getTracks().forEach((track) => track.stop());

              // 🚀 Redirect to receipt-scanning page
              router.push("/receipt-scanning");
            }
          }, "image/jpeg");
        }
      }
    }
  };

  // ✅ Handle File Upload (for manual selection)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="receipt-scanner p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Scan Your Receipt</h2>

      {/* ✅ Buttons Layout (Side by Side) */}
      <div className="flex gap-4">
        {/* ✅ Custom Styled File Upload Button */}
        <label className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer inline-block text-center">
          Choose File
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {/* ✅ Scan Receipt Button */}
        <button
          className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          onClick={handleScanReceipt}
        >
          {isCameraOpen ? "Capture Receipt" : "Scan Receipt"}
        </button>
      </div>

      {/* ✅ Show Selected File Name */}
      {selectedFile && <p className="mt-2 text-sm">Selected: {selectedFile.name}</p>}

      {/* ✅ Camera Capture Mode */}
      {isCameraOpen && (
        <div className="camera-preview mt-4">
          <video ref={videoRef} autoPlay className="w-full h-auto" />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default ReceiptScanner;
