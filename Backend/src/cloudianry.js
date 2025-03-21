const cloudiary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDIANRY_CLOUD_NAME,       // Replace with your cloud name
    api_key: process.env.CLOUDIANRY_CLOUD_API_KEY,             // Replace with your API key
    api_secret: process.env.CLOUDIANRY_CLOUD_API_SECRET_KEY        // Replace with your API secret
  });
module.exports = cloudinary;