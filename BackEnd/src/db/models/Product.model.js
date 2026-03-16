import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    price: { 
      type: Number, 
      required: true 
    },

    category: { 
      type: String, 
      required: true 
    },

    description: { 
      type: String 
    },
  },
  {
    timestamps: true
  }
);

export const Product = model("Product", productSchema);