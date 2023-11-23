const cloudinary = require('cloudinary').v2;

 const upload = async (fileBuffer) => {
     cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET,
     });

     const options = {
         resource_type: "image",
         public_id: "lapaq",
         overwrite: false,
     }

     return new Promise((resolve, reject) => {
         cloudinary.uploader.upload_stream(options, (error, result) => {
             if (error) reject(error);
             resolve(result);
         }).end(fileBuffer);
     });
 }

 module.exports = {
     upload,
 }
// require('dotenv').config()
// console.log('Cloudinary Cloud Name from Environment:', process.env.CLOUDINARY_CLOUD_NAME);
// console.log('Cloudinary API Key from Environment:', process.env.CLOUDINARY_API_KEY);
// console.log('Cloudinary API Secret from Environment:', process.env.CLOUDINARY_API_SECRET);
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;
