const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const store = require('../store');

router.get('/', (req, res) => {
  try {
    const careers = store.getCareers(false);
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/all', auth, (req, res) => {
  try {
    const careers = store.getCareers(true);
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const career = store.getCareerById(req.params.id);
    if (!career) return res.status(404).json({ message: 'Job not found' });
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, (req, res) => {
  try {
    const career = store.createCareer(req.body);
    res.status(201).json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const career = store.updateCareer(req.params.id, req.body);
    if (!career) return res.status(404).json({ message: 'Job not found' });
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const deleted = store.deleteCareer(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/apply', (req, res) => {
  try {
    const application = store.createApplication({
      jobId: req.body.jobId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      resume: req.file ? `/uploads/${req.file.filename}` : '',
      coverLetter: req.body.coverLetter || '',
    });
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/applications/all', auth, (req, res) => {
  try {
    const applications = store.getApplications();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/applications/:id', auth, (req, res) => {
  try {
    const app = store.updateApplication(req.params.id, { status: req.body.status });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
