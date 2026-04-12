import {Router} from "express"
import * as InvoiceService from "./invoices.services.js"
import * as auth from "../../middleware/auth.middleware.js"
import { asyncHandler } from './../../utils/error/async-handler.js';
const router  = Router()


router.post("/create-invoice" ,auth.authenticate , asyncHandler(InvoiceService.createInvoice ))
router.get("/get-invoices" , auth.authenticate,  asyncHandler( InvoiceService.getInvoices ))
export default router