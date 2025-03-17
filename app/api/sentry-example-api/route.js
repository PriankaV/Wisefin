import { NextResponse } from "next/server";
import { uploadReceipt } from "../../lib/appwrite"; // Adjust the path if necessary

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploadResponse = await uploadReceipt(file);
    return NextResponse.json({ success: true, data: uploadResponse });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: "Failed to upload receipt" }, { status: 500 });
  }
}
