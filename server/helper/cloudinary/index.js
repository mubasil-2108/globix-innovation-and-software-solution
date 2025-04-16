// require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    })
    return result;
}

const uploadImagesToCloudinary = async (files) => {
    try {
        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "projects" }, // Optional folder name
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                ).end(file.buffer);
            });
        });

        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error("Error uploading images:", error);
        throw new Error("Image upload failed");
    }
};

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil, uploadImagesToCloudinary };