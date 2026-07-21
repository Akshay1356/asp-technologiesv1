const bcrypt = require('bcryptjs');

let idCounter = 1;
const genId = () => String(idCounter++);

const store = {
  admin: null,
  projects: [],
  services: [],
  careers: [],
  applications: [],
  contacts: [],
  settings: {},
};

const seedAdmin = async () => {
  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash('admin123', salt);
  store.admin = { id: genId(), email: 'admin@asp-technologies.in', password: hashed, name: 'Admin', createdAt: new Date() };
  console.log('Default admin: admin@asp-technologies.in / admin123');
};

seedAdmin();

module.exports = {
  // Admin
  getAdminByEmail: (email) => store.admin && store.admin.email === email.toLowerCase() ? store.admin : null,
  getAdminById: (id) => store.admin && store.admin.id === id ? store.admin : null,

  // Projects
  getProjects: (query = {}) => {
    let items = [...store.projects];
    if (query.category) items = items.filter(p => p.category === query.category);
    if (query.featured) items = items.filter(p => p.featured);
    if (query.search) items = items.filter(p => p.title.toLowerCase().includes(query.search.toLowerCase()));
    return items.sort((a, b) => (a.order || 0) - (b.order || 0) || new Date(b.createdAt) - new Date(a.createdAt));
  },
  getProjectBySlug: (slug) => store.projects.find(p => p.slug === slug) || null,
  getProjectById: (id) => store.projects.find(p => p.id === id) || null,
  createProject: (data) => {
    const project = { ...data, id: genId(), createdAt: new Date(), updatedAt: new Date() };
    store.projects.push(project);
    return project;
  },
  updateProject: (id, data) => {
    const idx = store.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    store.projects[idx] = { ...store.projects[idx], ...data, updatedAt: new Date() };
    return store.projects[idx];
  },
  deleteProject: (id) => {
    const idx = store.projects.findIndex(p => p.id === id);
    if (idx === -1) return false;
    store.projects.splice(idx, 1);
    return true;
  },

  // Services
  getServices: (publishedOnly = false) => {
    let items = [...store.services];
    if (publishedOnly) items = items.filter(s => s.published);
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  getServiceBySlug: (slug) => store.services.find(s => s.slug === slug) || null,
  getServiceById: (id) => store.services.find(s => s.id === id) || null,
  createService: (data) => {
    const service = { ...data, id: genId(), createdAt: new Date(), updatedAt: new Date() };
    store.services.push(service);
    return service;
  },
  updateService: (id, data) => {
    const idx = store.services.findIndex(s => s.id === id);
    if (idx === -1) return null;
    store.services[idx] = { ...store.services[idx], ...data, updatedAt: new Date() };
    return store.services[idx];
  },
  deleteService: (id) => {
    const idx = store.services.findIndex(s => s.id === id);
    if (idx === -1) return false;
    store.services.splice(idx, 1);
    return true;
  },

  // Careers
  getCareers: (all = false) => {
    let items = [...store.careers];
    if (!all) items = items.filter(c => c.status === 'open');
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getCareerById: (id) => store.careers.find(c => c.id === id) || null,
  createCareer: (data) => {
    const career = { ...data, id: genId(), createdAt: new Date(), updatedAt: new Date() };
    store.careers.push(career);
    return career;
  },
  updateCareer: (id, data) => {
    const idx = store.careers.findIndex(c => c.id === id);
    if (idx === -1) return null;
    store.careers[idx] = { ...store.careers[idx], ...data, updatedAt: new Date() };
    return store.careers[idx];
  },
  deleteCareer: (id) => {
    const idx = store.careers.findIndex(c => c.id === id);
    if (idx === -1) return false;
    store.careers.splice(idx, 1);
    return true;
  },

  // Applications
  getApplications: () => [...store.applications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  createApplication: (data) => {
    const app = { ...data, id: genId(), status: 'pending', createdAt: new Date() };
    store.applications.push(app);
    return app;
  },
  updateApplication: (id, data) => {
    const idx = store.applications.findIndex(a => a.id === id);
    if (idx === -1) return null;
    store.applications[idx] = { ...store.applications[idx], ...data };
    return store.applications[idx];
  },

  // Contacts
  getContacts: (status) => {
    let items = [...store.contacts];
    if (status) items = items.filter(c => c.status === status);
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  createContact: (data) => {
    const contact = { ...data, id: genId(), status: 'unread', createdAt: new Date() };
    store.contacts.push(contact);
    return contact;
  },
  updateContact: (id, data) => {
    const idx = store.contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    store.contacts[idx] = { ...store.contacts[idx], ...data };
    return store.contacts[idx];
  },
  deleteContact: (id) => {
    const idx = store.contacts.findIndex(c => c.id === id);
    if (idx === -1) return false;
    store.contacts.splice(idx, 1);
    return true;
  },

  // Settings
  getSetting: (key) => store.settings[key] ?? null,
  getAllSettings: () => ({ ...store.settings }),
  setSetting: (key, value) => { store.settings[key] = value; return { key, value }; },
};
