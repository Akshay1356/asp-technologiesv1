const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const store = require('../store');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = store.getAdminByEmail(email);
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/verify', auth, (req, res) => {
  const admin = store.getAdminById(req.adminId);
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json({ id: admin.id, name: admin.name, email: admin.email });
});

module.exports = router;
