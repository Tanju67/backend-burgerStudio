import cloudinary from "../utils/cloudinary.js";
import type { UploadApiResponse } from "cloudinary";

export const uploadImage = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      })
      .end(buffer);
  });
};
