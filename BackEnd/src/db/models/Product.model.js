import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

   category: {
  type: Schema.Types.ObjectId,
  ref: "Category",
  required: true
} 
  },
  {
    timestamps: true,
  },
);

export const Product = model("Product", productSchema);
