const Tesseract = require('tesseract.js');

// A simple parser to find the total amount in the OCR text
const parseReceipt = (text) => {
    // Look for lines that might contain a total amount.
    // This is a very basic implementation and can be greatly improved.
    const lines = text.split('\n');
    let total = null;
    
    const keywords = ['total', 'amount', 'subtotal', 'balance'];
    
    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        // Check if any keyword exists in the line
        if (keywords.some(keyword => lowerLine.includes(keyword))) {
            // Use regex to find a monetary value (e.g., 123.45)
            const match = line.match(/(\d+\.\d{2})/);
            if (match && match[0]) {
                total = parseFloat(match[0]);
                break; // Stop after finding the first potential total
            }
        }
    }
    return { total };
};


exports.scanReceipt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded.' });
  }

  try {
    console.log('Starting OCR process...');
    const { data: { text } } = await Tesseract.recognize(
      req.file.buffer,
      'eng', // language
      { logger: m => console.log(m) } // Optional logger
    );
    console.log('OCR process finished.');
    
    const extractedData = parseReceipt(text);

    res.json({
      success: true,
      data: {
        rawText: text,
        extracted: extractedData
      }
    });

  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ msg: 'Failed to process the receipt.', error: error.message });
  }
};