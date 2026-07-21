'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { FiLogOut, FiGrid, FiList, FiMessageSquare, FiBriefcase, FiSettings, FiPlus, FiEdit2, FiTrash2, FiEye, FiX } from 'react-icons/fi';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api' });

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { id: 'projects', label: 'Projects', icon: FiList },
  { id: 'services', label: 'Services', icon: FiBriefcase },
  { id: 'messages', label: 'Messages', icon: FiMessageSquare },
  { id: 'careers', label: 'Careers', icon: FiBriefcase },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admin, setAdmin] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [editType, setEditType] = useState('');
  const [editData, setEditData] = useState({});
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/admin/login'); return; }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projRes, servRes, msgRes, carRes] = await Promise.all([
        api.get('/projects'), api.get('/services/all'), api.get('/contact'), api.get('/careers/all'),
      ]);
      setProjects(projRes.data);
      setServices(servRes.data);
      setMessages(msgRes.data);
      setCareers(carRes.data);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('token'); router.push('/admin/login'); }
    }
    setLoading(false);
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/${type}/${id}`);
      toastSuccess(`${type.slice(0, -1)} deleted`);
      loadData();
    } catch (err) { alert('Failed to delete'); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editData._id) {
        await api.put(`/${editType}/${editData._id}`, editData);
      } else {
        await api.post(`/${editType}`, editData);
      }
      setEditModal(null);
      loadData();
    } catch (err) { alert('Failed to save'); }
  };

  const openEdit = (type, data = {}) => {
    setEditType(type);
    setEditData(data);
    setEditModal(type);
  };

  if (loading) return <div className="min-h-screen bg-graphite-950 flex items-center justify-center"><div className="loader" /></div>;

  return (
    <div className="min-h-screen bg-graphite-950 flex">
      <aside className="w-64 bg-graphite-900 border-r border-white/5 p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-8">
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            <rect x="2" y="2" width="32" height="32" rx="8" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
            <path d="M10 18L18 10L26 18L18 26Z" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="text-sm font-bold text-white">ASP Admin</span>
        </div>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-graphite-400 hover:text-white hover:bg-graphite-800'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => { localStorage.removeItem('token'); router.push('/admin/login'); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-graphite-500 hover:text-red-400 mt-auto absolute bottom-6"
        >
          <FiLogOut size={16} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-primary text-white' : 'bg-graphite-800 text-graphite-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Projects', value: projects.length, color: 'from-blue-500/20 to-blue-600/10', icon: FiList },
                { label: 'Services', value: services.length, color: 'from-green-500/20 to-green-600/10', icon: FiBriefcase },
                { label: 'Messages', value: messages.filter(m => m.status === 'unread').length, color: 'from-amber-500/20 to-amber-600/10', icon: FiMessageSquare },
                { label: 'Careers', value: careers.length, color: 'from-purple-500/20 to-purple-600/10', icon: FiBriefcase },
              ].map((stat) => (
                <div key={stat.label} className={`card bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="text-2xl text-graphite-400 mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-graphite-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Projects</h1>
              <button onClick={() => openEdit('projects', { title: '', slug: '', category: 'High-Speed', description: '', published: true })} className="btn-primary text-sm py-2.5 px-4">
                <FiPlus size={14} className="inline mr-1" /> Add Project
              </button>
            </div>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p._id} className="card flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                    <span className="text-xs text-graphite-500">{p.category} · {p.slug}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('projects', p)} className="p-2 rounded-lg bg-graphite-800 text-graphite-400 hover:text-primary transition-colors"><FiEdit2 size={14} /></button>
                    <button onClick={() => handleDelete('projects', p._id)} className="p-2 rounded-lg bg-graphite-800 text-graphite-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Services</h1>
              <button onClick={() => openEdit('services', { title: '', slug: '', description: '', published: true })} className="btn-primary text-sm py-2.5 px-4">
                <FiPlus size={14} className="inline mr-1" /> Add Service
              </button>
            </div>
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s._id} className="card flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                    <span className="text-xs text-graphite-500">{s.slug}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('services', s)} className="p-2 rounded-lg bg-graphite-800 text-graphite-400 hover:text-primary transition-colors"><FiEdit2 size={14} /></button>
                    <button onClick={() => handleDelete('services', s._id)} className="p-2 rounded-lg bg-graphite-800 text-graphite-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Messages ({messages.filter(m => m.status === 'unread').length} unread)</h1>
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m._id} className={`card p-4 ${m.status === 'unread' ? 'border-primary/20' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-white">{m.name}</span>
                      <span className="text-xs text-graphite-500 ml-2">{m.email}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      m.status === 'unread' ? 'bg-primary/10 text-primary' :
                      m.status === 'read' ? 'bg-graphite-800 text-graphite-400' : 'bg-green-500/10 text-green-400'
                    }`}>{m.status}</span>
                  </div>
                  {m.company && <div className="text-xs text-graphite-500 mb-1">Company: {m.company} {m.phone && `· ${m.phone}`}</div>}
                  <p className="text-sm text-graphite-400">{m.message}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={async () => { await api.put(`/contact/${m._id}`, { status: m.status === 'unread' ? 'read' : 'replied' }); loadData(); }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-graphite-800 text-graphite-400 hover:text-white transition-colors">
                      Mark as {m.status === 'unread' ? 'Read' : 'Replied'}
                    </button>
                    <button onClick={() => handleDelete('contact', m._id)} className="text-xs px-3 py-1.5 rounded-lg bg-graphite-800 text-red-400 hover:bg-red-500/20 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {messages.length === 0 && <p className="text-graphite-500 text-sm">No messages yet.</p>}
            </div>
          </div>
        )}

        {activeTab === 'careers' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Careers</h1>
              <button onClick={() => openEdit('careers', { title: '', department: '', location: '', type: 'Full-time', description: '', status: 'open' })} className="btn-primary text-sm py-2.5 px-4">
                <FiPlus size={14} className="inline mr-1" /> Add Job
              </button>
            </div>
            <div className="space-y-3">
              {careers.map((c) => (
                <div key={c._id} className="card flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                    <span className="text-xs text-graphite-500">{c.department} · {c.location} · {c.type}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('careers', c)} className="p-2 rounded-lg bg-graphite-800 text-graphite-400 hover:text-primary transition-colors"><FiEdit2 size={14} /></button>
                    <button onClick={() => handleDelete('careers', c._id)} className="p-2 rounded-lg bg-graphite-800 text-graphite-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
            <div className="card max-w-2xl">
              <p className="text-graphite-400 text-sm mb-4">Company information and site settings can be managed here.</p>
              <button className="btn-primary text-sm py-2.5 px-4">Save Settings</button>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setEditModal(null)}>
          <div className="card max-w-lg w-full max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">{editData._id ? 'Edit' : 'Add'} {editType.slice(0, -1)}</h2>
              <button onClick={() => setEditModal(null)} className="text-graphite-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <input name="title" placeholder="Title" required value={editData.title || ''} onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none" />
              <input name="slug" placeholder="Slug" required value={editData.slug || ''} onChange={(e) => setEditData({ ...editData, slug: e.target.value.toLowerCase().replace(/[^\w]+/g, '-') })}
                className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none" />
              <textarea name="description" placeholder="Description" rows={3} value={editData.description || ''} onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none resize-none" />
              {editType === 'projects' && (
                <select value={editData.category || 'High-Speed'} onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white focus:border-primary focus:outline-none">
                  {['High-Speed', 'Automotive', 'Medical', 'IoT', 'Consumer', 'RF'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              )}
              {editType === 'careers' && (
                <>
                  <input name="department" placeholder="Department" value={editData.department || ''} onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none" />
                  <input name="location" placeholder="Location" value={editData.location || ''} onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none" />
                  <select value={editData.type || 'Full-time'} onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white focus:border-primary focus:outline-none">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select value={editData.status || 'open'} onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white focus:border-primary focus:outline-none">
                    <option value="open">Open</option><option value="closed">Closed</option>
                  </select>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 py-3">{editData._id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setEditModal(null)} className="btn-secondary flex-1 py-3">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function toastSuccess(msg) {
  if (typeof window !== 'undefined') {
    const el = document.createElement('div');
    el.className = 'fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}
