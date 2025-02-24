"use client"; // ✅ Ensure this is a Client Component

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const ReceiptScanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();

  // ✅ Open Camera
  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Please allow camera permissions.");
    }
  };

  // ✅ Capture Image from Video Stream
  const captureImage = () => {
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
          }
        }, "image/jpeg");
      }
    }
  };

  // ✅ Handle File Upload (for manual selection)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // ✅ Process the Scanned Receipt
  const handleScanReceipt = () => {
    if (!selectedFile) {
      alert("Please scan or upload a receipt.");
      return;
    }

    // 🚀 TODO: Add OCR Processing or API Upload Logic Here
    console.log("Processing receipt:", selectedFile.name);

    // Redirect to receipt-scanning page
    router.push("/receipt-scanning");
  };

  return (
    <div className="receipt-scanner p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Scan Your Receipt</h2>

      {/* ✅ Camera Capture Mode */}
      {isCameraOpen ? (
        <div className="camera-preview">
          <video ref={videoRef} autoPlay className="w-full h-auto" />
          <canvas ref={canvasRef} className="hidden" />
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={captureImage}
          >
            Capture Image
          </button>
        </div>
      ) : (
        <>
          {/* ✅ Upload File Manually */}
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
          {selectedFile && <p className="mt-2 text-sm">Selected: {selectedFile.name}</p>}

          {/* ✅ Buttons for Camera & Scan */}
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={openCamera}
            >
              Open Camera
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={handleScanReceipt}
            >
              Scan Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiptScanner;

