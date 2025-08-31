const Transaction = require('../models/Transaction');

// Get all transactions for a logged-in user
exports.getTransactions = async (req, res) => {
  try {
    // --- Filtering ---
    const queryObj = { user: req.user.id };
    if (req.query.startDate && req.query.endDate) {
      queryObj.date = { 
        $gte: new Date(req.query.startDate), 
        $lte: new Date(req.query.endDate) 
      };
    }
    
    // --- Pagination ---
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Transaction.countDocuments(queryObj);
    const transactions = await Transaction.find(queryObj)
      .sort({ date: -1 })
      .skip(startIndex)
      .limit(limit);

    res.json({
      success: true,
      count: transactions.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: transactions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      user: req.user.id,
    });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    // Make sure user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await transaction.deleteOne();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};