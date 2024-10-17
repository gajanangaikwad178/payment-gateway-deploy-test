import express from "express";
const router = express.Router();

//Other components routes  
import paymentDetailsRoutes from "./paymentDetails.routes.js";

// Use the Profile match routes

router.use("/api/payment-details", paymentDetailsRoutes); //Payment Details Routes


export default router;
