import { Product } from "../../db/models/Product.model.js";
import { Category } from "../../db/models/Category.model.js";
import mongoose from "mongoose";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, description } = req.body;

    // 1. validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }

    // 2. check category exists
    const checkCategory = await Category.findById(category);
    if (!checkCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // 3. check duplicate INSIDE SAME CATEGORY
    const checkProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      category,
    });

    if (checkProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists in this category",
      });
    }

    // 4. create product
    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL PRODUCTS
 */
export const getAllProduct = async (req, res, next) => {
  try {
    const { category } = req.query;

    let filter = {};

    // filter by category (اختياري)
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate("category", "name") // يجيب الاسم بس
      .sort({ createdAt: -1 }); // أحدث الأول

    return res.status(200).json({
      success: true,
      results: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    // لو هيغير الكاتيجوري
    if (req.body.category) {
      if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category id",
        });
      }

      const checkCategory = await Category.findById(req.body.category);

      if (!checkCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "name");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};