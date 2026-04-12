import mongoose from "mongoose";
import { Product } from "../../db/models/Product.model.js";
import { Invoice } from "../../db/models/Invoice.model.js";

/**
 * CREATE INVOICE
 */
export const createInvoice = async (req, res, next) => {
  try {
    const { products } = req.body;
    const cashierId = req.user.id;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products are required",
      });
    }

    let total = 0;
    const invoiceProducts = [];

    for (const item of products) {
      // ✅ validate product id
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product id",
        });
      }

      const productData = await Product.findById(item.product);

      if (!productData) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // ✅ validate quantity
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid quantity",
        });
      }

      const itemTotal = productData.price * item.quantity;
      total += itemTotal;

      invoiceProducts.push({
        product: productData._id,
        quantity: item.quantity,
        price: productData.price,
        subTotal: itemTotal, 
      });
    }

    const invoice = await Invoice.create({
      cashier: cashierId,
      products: invoiceProducts,
      total,
    });

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL INVOICES
 */
export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find()
      .populate("cashier", "username")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      results: invoices.length,
      data: invoices,
    });
  } catch (err) {
    next(err);
  }
};