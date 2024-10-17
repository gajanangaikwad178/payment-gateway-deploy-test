import db from "../config/index.js"; 

const PaymentDetails = db.paymentDetailsModel; // Keeping old model reference if needed 

// Create Payment Detail
export const createPaymentDetail = async (req, res) => {
  try {
    const {
      mercid,
      orderid,
      amount,
      order_date,
      ru,
      ip,
      clientid,
      url,
      paymentMethod,
      createdBy,
      jwsFunResponse,
      orderIdGenerateStatus,
    } = req.body;

    // Validate required fields
    if (!mercid || !orderid ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Generate transaction ID and set payment status
    // const transactionId = `TXN${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 15)}${orderid}`;
    const transactionId = `TXN${Math.random().toString(36).substring(2, 6).toUpperCase()}${orderid}`;
    const paymentStatus = 'pending'; // Default status

    const paymentDetail = await PaymentDetails.create({
      mercid,
      orderid,
      amount,
      order_date,
      ru,
      ip,
      clientid,
      url,
      paymentMethod,
      jwsFunResponse,
      orderIdGenerateStatus,
      paymentTimestamp: new Date(), // Current timestamp
      transactionId,
      paymentStatus,
      createdBy,
      createdDate: new Date(), // Current date for createdDate
    });

    res.status(201).json({
      message: "Payment detail created successfully.",
      detail: paymentDetail
    });
  } catch (error) {
    console.error("Error creating payment detail:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all Payment Details
export const getPaymentDetails = async (req, res) => {
  try {
    const { count, rows: paymentDetails } = await PaymentDetails.findAndCountAll();

    if (count === 0) {
      return res.status(404).json({ message: "No payment details found." });
    }

    res.status(200).json({
      message: "Payment details retrieved successfully.",
      totalCount: count,
      details: paymentDetails
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a single Payment Detail by ID
export const getPaymentDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentDetail = await PaymentDetails.findByPk(id);

    if (!paymentDetail) {
      return res.status(404).json({ message: "Payment detail not found." });
    }

    res.status(200).json({
      message: "Payment detail retrieved successfully.",
      detail: paymentDetail
    });
  } catch (error) {
    console.error("Error fetching payment detail:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update Payment Detail
export const updatePaymentDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      mercid,
      orderid,
      amount,
      order_date,
      paymentMethod,
      updatedBy,
      orderIdGenerateStatus,
      jwsFunResponse,
    } = req.body;

    const paymentDetail = await PaymentDetails.findByPk(id);

    if (!paymentDetail) {
      return res.status(404).json({ message: "Payment detail not found." });
    }

    // Update only the fields that are provided in the request
    paymentDetail.mercid = mercid || paymentDetail.mercid;
    paymentDetail.orderid = orderid || paymentDetail.orderid;
    paymentDetail.amount = amount || paymentDetail.amount;
    paymentDetail.order_date = order_date || paymentDetail.order_date;
    paymentDetail.paymentMethod = paymentMethod || paymentDetail.paymentMethod;
    paymentDetail.orderIdGenerateStatus = orderIdGenerateStatus || paymentDetail.orderIdGenerateStatus;
    paymentDetail.jwsFunResponse = jwsFunResponse || paymentDetail.jwsFunResponse;
    paymentDetail.updatedBy = updatedBy || paymentDetail.updatedBy;
    paymentDetail.updatedDate = new Date(); // Update timestamp

    await paymentDetail.save();

    res.status(200).json({
      message: "Payment detail updated successfully.",
      detail: paymentDetail
    });
  } catch (error) {
    console.error("Error updating payment detail:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete Payment Detail
export const deletePaymentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentDetail = await PaymentDetails.findByPk(id);

    if (!paymentDetail) {
      return res.status(404).json({ message: "Payment detail not found." });
    }

    await paymentDetail.destroy();

    res.status(200).json({ message: "Payment detail deleted successfully." });
  } catch (error) {
    console.error("Error deleting payment detail:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
