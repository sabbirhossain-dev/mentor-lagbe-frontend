/**
 * Helper utility to upload image files directly to the ImgBB API.
 * Uses NEXT_PUBLIC_IMGBB_API_KEY from environment variables.
 * Returns the permanent direct image URL on success.
 */
export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing in environment variables (.env)");
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file (JPEG, PNG, WebP, etc.)");
  }

  // Max 5MB file size limit
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size should not exceed 5MB");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const errMsg = data.error?.message || "Failed to upload image to ImgBB";
      throw new Error(errMsg);
    }

    // Direct display URL provided by ImgBB
    return data.data.display_url || data.data.url;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image. Please try again.";
    console.error("ImgBB upload error:", message);
    throw new Error(message);
  }
}
