// routes/paymentDetails.routes.js

import express from "express";
import {
  createPaymentDetail,
  getPaymentDetails,
  getPaymentDetailById,
  updatePaymentDetail,
  deletePaymentDetail
} from "../controllers/paymentDetails.controller.js"; 

const router = express.Router();


router.post("/", createPaymentDetail);  // Create a new payment detail entry
router.put("/:id", updatePaymentDetail);  // Update a payment detail by ID
router.get("/", getPaymentDetails);  // Get all payment details
router.get("/:id", getPaymentDetailById); // Get a single payment detail by ID
router.delete("/:id", deletePaymentDetail);   // Delete a payment detail by ID

export default router;
