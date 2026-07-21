const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const store = require('../store');

router.get('/', (req, res) => {
  try {
    const services = store.getServices(true);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/all', auth, (req, res) => {
  try {
    const services = store.getServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:slug', (req, res) => {
  try {
    const service = store.getServiceBySlug(req.params.slug);
    if (!service || !service.published) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, (req, res) => {
  try {
    const service = store.createService(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const service = store.updateService(req.params.id, req.body);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const deleted = store.deleteService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
