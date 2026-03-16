import  { Router } from 'express';
import * as ProductService from "./product.services.js"
import * as auth from "../../middleware/auth.middleware.js"


const router  = Router()
//  localhost:3000/product/{create-product}
router.post("/create-product" ,auth.authenticate, auth.isAdmin , ProductService.createProduct)
router.get("/AllProduct" ,auth.authenticate, ProductService.getAllProduct)
router.delete("/delete-product/:id" ,auth.authenticate, auth.isAdmin , ProductService.deleteProduct)
router.put("/update-product/:id" ,auth.authenticate, auth.isAdmin , ProductService.updateProduct)

export default router