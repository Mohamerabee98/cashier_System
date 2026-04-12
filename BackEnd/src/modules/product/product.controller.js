import { Router } from "express";
import * as ProductService from "./product.services.js";
import * as auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/error/async-handler.js";

const router = Router();

// CREATE
router.post(
  "/create-product",
  auth.authenticate,
  auth.isAdmin,
  asyncHandler(ProductService.createProduct)
);

// GET ALL + FILTER
router.get(
  "/",
  auth.authenticate,
  asyncHandler(ProductService.getAllProduct)
);

// DELETE
router.delete(
  "/:id",
  auth.authenticate,
  auth.isAdmin,
  asyncHandler(ProductService.deleteProduct)
);

// UPDATE
router.put(
  "/:id",
  auth.authenticate,
  auth.isAdmin,
  asyncHandler(ProductService.updateProduct)
);

export default router;