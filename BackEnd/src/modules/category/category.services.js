import { Category } from "../../db/models/Category.model.js";

/**
 * CREATE CATEGORY
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // check duplicate (case-insensitive)
    const checkCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (checkCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await Category.create({ name });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL CATEGORIES
 */
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      message: "Done",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE CATEGORY
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Done",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE CATEGORY
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // check duplicate name
    if (name) {
      const checkCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
        _id: { $ne: id },
      });

      if (checkCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE CATEGORY
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};