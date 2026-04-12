import connectDB from "./db/connect.js";
import AuthController from "./modules/auth/auth.controller.js";
import ProductController from "./modules/product/product.controller.js";
import CategoryController from "./modules/category/category.controller.js";
import InvoiceController from "./modules/invoices/invoices.controller.js"
import { globalError } from './utils/error/global-error.js';
const bootstrap = async (app, express) => {
  app.use(express.json());
  
  await connectDB()
  
  app.use("/auth", AuthController);
  app.use("/product" , ProductController)
  app.use("/category" , CategoryController)
  app.use("/invoice" , InvoiceController)
  app.use(globalError)
};
export default bootstrap;
