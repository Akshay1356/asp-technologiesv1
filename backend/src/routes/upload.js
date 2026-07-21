const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/multiple', auth, upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files.map(f => ({ url: `/uploads/${f.filename}`, filename: f.filename }));
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
