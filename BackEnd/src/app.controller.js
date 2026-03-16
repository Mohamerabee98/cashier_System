import connectDB from "./db/connect.js";
import authController from "./modules/auth/auth.controller.js";
import ProductController from "./modules/product/product.controller.js";
const bootstrap = async (app, express) => {
  app.use(express.json());

   await connectDB()

     app.use("/auth", authController);
     app.use("/product" , ProductController)
};
export default bootstrap;
