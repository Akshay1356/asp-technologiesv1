const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const store = require('../store');

router.post('/', (req, res) => {
  try {
    const contact = store.createContact(req.body);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, (req, res) => {
  try {
    const { status } = req.query;
    const messages = store.getContacts(status);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const message = store.updateContact(req.params.id, { status: req.body.status });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const deleted = store.deleteContact(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
