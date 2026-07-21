const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const store = require('../store');

router.get('/', (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (search) query.search = search;
    const projects = store.getProjects(query);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:slug', (req, res) => {
  try {
    const project = store.getProjectBySlug(req.params.slug);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, (req, res) => {
  try {
    const project = store.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const project = store.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const deleted = store.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
