/**
 * Helper utility to upload image files directly to the ImgBB API.
 * Uses NEXT_PUBLIC_IMGBB_API_KEY from environment variables.
 * Returns the permanent direct image URL on success.
 * If ImgBB is unreachable, unconfigured, or rate-limited, gracefully
 * falls back to an optimized Data URL so profile/tuition updates never break.
 */

function fileToOptimizedDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") {
        return reject(new Error("Failed to process image file"));
      }

      // If image is small (< 80KB), return as is
      if (file.size < 80 * 1024) {
        return resolve(result);
      }

      // Resize & compress larger images to a reasonable avatar size using an offscreen canvas
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const maxDim = 800;
          let { width, height } = img;

          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(result);

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          resolve(compressed);
        } catch {
          resolve(result);
        }
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

export async function uploadImageToImgBB(file: File): Promise<string> {
  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file (JPEG, PNG, WebP, etc.)");
  }

  // Max 5MB file size limit
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size should not exceed 5MB");
  }

  const apiKey =
    process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
    "0c78446a1e6a350aa2ee4daa64b9e0e9";

  // 1. Attempt direct ImgBB CDN Upload
  if (apiKey) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          return data.data.display_url || data.data.url;
        }
      }
      console.warn("ImgBB upload service unavailable or blocked, falling back to optimized storage.");
    } catch (apiErr) {
      console.warn("ImgBB network call failed, falling back to optimized storage:", apiErr);
    }
  }

  // 2. Fallback: Compress and convert to clean Data URL
  return fileToOptimizedDataUrl(file);
}
