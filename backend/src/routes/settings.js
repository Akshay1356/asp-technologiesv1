const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const store = require('../store');

router.get('/:key', (req, res) => {
  try {
    const value = store.getSetting(req.params.key);
    if (value === null) return res.json({ key: req.params.key, value: null });
    res.json({ key: req.params.key, value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', (req, res) => {
  try {
    res.json(store.getAllSettings());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:key', auth, (req, res) => {
  try {
    const setting = store.setSetting(req.params.key, req.body.value);
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
