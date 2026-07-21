'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      toast.success('Welcome back!');
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-graphite-950 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8">
        <div className="text-center mb-8">
          <svg width="48" height="48" viewBox="0 0 36 36" fill="none" className="mx-auto mb-4">
            <rect x="2" y="2" width="32" height="32" rx="8" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
            <path d="M10 18L18 10L26 18L18 26Z" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
            <path d="M14 14L22 22M22 14L14 22" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-graphite-400 text-sm mt-1">ASP Technologies Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
