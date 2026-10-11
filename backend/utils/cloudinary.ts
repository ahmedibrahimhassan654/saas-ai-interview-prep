import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
        if (error || !result) {
          return reject(error ?? new Error("Upload failed"));
        }
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      }
    );
  });
};

export const deleteFile = async (publicId: string): Promise<boolean> => {
  const res = await cloudinary.uploader.destroy(publicId);
  return res.result === "ok";
};