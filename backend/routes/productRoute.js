// backend/routes/productRoute.js

import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {
    getProducts,
    createProduct,
    deleteProduct,
} from '../controllers/productController.js';

const itemrouter = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file uploads to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'easymart_products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage });

// GET all products
itemrouter.get('/', getProducts);

// POST create a new product (with optional image upload)
itemrouter.post('/', upload.single('image'), createProduct);

// DELETE a product by ID
itemrouter.delete('/:id', deleteProduct);

export default itemrouter;
