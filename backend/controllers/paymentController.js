// ─────────────────────────────────────────────────────────────────────────────
// @desc    Process a simulated payment
// @route   POST /api/payment/process
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const processPayment = async (req, res, next) => {
  try {
    const { cardNumber, name, amount, expiry, cvv } = req.body;

    // ── Input validation ────────────────────────────────────────────────────
    if (!cardNumber || !name || !amount) {
      return res.status(400).json({
        success: false,
        message: 'cardNumber, name, and amount are required.',
      });
    }

    const cleanCard = String(cardNumber).replace(/\s/g, '');

    if (!/^\d{16}$/.test(cleanCard)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card number. Must be exactly 16 digits.',
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number.',
      });
    }

    // ── Simulate card decline for numbers starting with 0 ──────────────────
    if (cleanCard.startsWith('0')) {
      return res.status(402).json({
        success: false,
        message: 'Payment declined. Please check your card details and try again.',
        code: 'CARD_DECLINED',
      });
    }

    // ── Detect card type ────────────────────────────────────────────────────
    let cardType = 'unknown';
    if (/^4/.test(cleanCard)) cardType = 'visa';
    else if (/^5[1-5]/.test(cleanCard) || /^2[2-7]/.test(cleanCard)) cardType = 'mastercard';
    else if (/^3[47]/.test(cleanCard)) cardType = 'amex';
    else if (/^6(?:011|5)/.test(cleanCard)) cardType = 'discover';

    // ── Simulate 2-second processing delay ─────────────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // ── Generate transaction ID ─────────────────────────────────────────────
    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`;

    console.log(
      `[PAYMENT] Processed ₹${amount} via ${cardType.toUpperCase()} for ${name} — TXN: ${transactionId}`
    );

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully.',
      transactionId,
      cardType,
      amount: Number(amount),
      currency: 'INR',
      paidBy: name,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get payment history (simulated static list)
// @route   GET /api/payment/history
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getPaymentHistory = async (req, res) => {
  // Simulated history — in production this would query a Payments collection
  const history = [
    {
      transactionId: `TXN${Date.now() - 100000}`,
      amount: 25,
      status: 'success',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      transactionId: `TXN${Date.now() - 200000}`,
      amount: 50,
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ];

  res.status(200).json({ success: true, history });
};

module.exports = { processPayment, getPaymentHistory };
