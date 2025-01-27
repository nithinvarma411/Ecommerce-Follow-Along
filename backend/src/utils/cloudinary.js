import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            console.error("No file provided for upload");
            return null;
        }

        console.log("Uploading file to Cloudinary:", file);

        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        });

        console.log("Cloudinary upload successful:", res.url);
        return res.url;
    } catch (error) {
        console.error("Error in Cloudinary upload:", error, api_key);
        return null;
    } finally {
        try {
            fs.unlinkSync(file);
            console.log("Temporary file deleted:", file);
        } catch (err) {
            console.error("Error deleting temporary file:", err);
        }
    }
};

export { uploadOnCloudinary };
