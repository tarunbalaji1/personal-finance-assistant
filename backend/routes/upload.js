const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/authMiddleware');
const { scanReceipt } = require('../controllers/uploadController');

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   POST api/upload/receipt
// @desc    Upload a receipt image and extract data
// @access  Private
router.post('/receipt', auth, upload.single('receipt'), scanReceipt);

module.exports = router;