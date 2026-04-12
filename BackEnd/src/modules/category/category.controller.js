import { Router } from "express";
import * as CategoryService from "./category.services.js";
import * as auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/error/async-handler.js";

const router = Router();

/**
 * CREATE CATEGORY
 */
router.post(
  "/create-category",
  auth.authenticate,
  auth.isAdmin,
  asyncHandler(CategoryService.createCategory)
);

/**
 * GET ALL CATEGORIES
 */
router.get(
  "/all-categories",
  auth.authenticate,
  asyncHandler(CategoryService.getAllCategories)
);

/**
 * GET CATEGORY BY ID
 */
router.get(
  "/:id",
  auth.isAdmin,
  auth.authenticate,
  asyncHandler(CategoryService.getCategoryById)
);

/**
 * UPDATE CATEGORY
 */
router.put(
  "/update-category/:id",
  auth.authenticate,
  auth.isAdmin,
  asyncHandler(CategoryService.updateCategory)
);

/**
 * DELETE CATEGORY
 */
router.delete(
  "/delete-category/:id",
  auth.authenticate,
  auth.isAdmin,
  asyncHandler(CategoryService.deleteCategory)
);

export default router;