import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: "dzrtiatsj",
    api_key: "989934455237749",
    api_secret: "hsGfb4viUsUoo_MnCDzvxZhrJpQ",
});
const uploadToCloudinary = (file: Express.Multer.File) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

export default uploadToCloudinary;
