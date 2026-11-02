import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary at module level
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadFile = (
  file: string,
  folder: string
): Promise<{ public_id: string; url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error details:", error);
          console.error("Cloudinary upload error message:", error.message);
          console.error("Cloudinary upload error http_code:", error.http_code);
          console.error("Cloudinary upload error error:", error.error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error("Upload failed: no result from Cloudinary"));
        }
        resolve({
          public_id: result.public_id,
          url: result.secure_url || result.url,
        });
      }
    );
  });
};

export const deleteFile = async (publicId: string): Promise<boolean> => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
};
