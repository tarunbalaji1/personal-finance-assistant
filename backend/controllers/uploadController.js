const Tesseract = require('tesseract.js');
// We remove the pdfjs-dist import from here and import it dynamically later
const { createCanvas } = require('canvas');

// Helper function to parse text, same as before
const parseReceipt = (text) => {
    const lines = text.split('\n');
    let total = null;
    const keywords = ['total', 'amount', 'subtotal', 'balance'];
    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        if (keywords.some(keyword => lowerLine.includes(keyword))) {
            const match = line.match(/(\d+\.\d{2})/);
            if (match && match[0]) {
                total = parseFloat(match[0]);
                break;
            }
        }
    }
    return { total };
};

// Refactored OCR logic into its own function, same as before
const performOCR = async (imageBuffer) => {
  console.log('Starting OCR process...');
  const { data: { text } } = await Tesseract.recognize(
    imageBuffer,
    'eng',
    { logger: m => console.log(m) }
  );
  console.log('OCR process finished.');
  return parseReceipt(text);
};


// Main controller function with the dynamic import fix
exports.scanReceipt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded.' });
  }

  try {
    let imageBuffer;

    // Check the file's MIME type
    if (req.file.mimetype === 'application/pdf') {
      console.log('PDF detected, starting conversion to image...');
      
      // --- THE FIX: Dynamically import the pdfjs-dist package ---
      const { getDocument } = await import('pdfjs-dist');

      const pdfData = new Uint8Array(req.file.buffer);
      // Update the call to match the modern API
      const doc = await getDocument({ data: pdfData }).promise;
      const page = await doc.getPage(1); // Get the first page
      const viewport = page.getViewport({ scale: 2.0 }); // Increase scale for better quality
      
      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');

      await page.render({ canvasContext: context, viewport: viewport }).promise;
      
      imageBuffer = canvas.toBuffer('image/png');
      console.log('PDF conversion successful.');

    } else if (req.file.mimetype.startsWith('image/')) {
      console.log('Image detected.');
      // If it's already an image, use its buffer directly
      imageBuffer = req.file.buffer;

    } else {
      return res.status(400).json({ msg: 'Unsupported file type. Please upload an image or PDF.' });
    }

    // Perform OCR on the final image buffer
    const extractedData = await performOCR(imageBuffer);

    res.json({
      success: true,
      data: {
        extracted: extractedData
      }
    });

  } catch (error) {
    console.error('File Processing Error:', error);
    res.status(500).json({ msg: 'Failed to process the file.', error: error.message });
  }
};