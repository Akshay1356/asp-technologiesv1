'use client';

import { useMemo } from 'react';

const palette = [
  { bg: 'from-blue-900/30 via-blue-800/10 to-cyan-900/30', accent: '#0A84FF', line: '#00E5FF' },
  { bg: 'from-slate-900/30 via-indigo-800/10 to-blue-900/30', accent: '#4DA6FF', line: '#0A84FF' },
  { bg: 'from-gray-900/30 via-cyan-800/10 to-teal-900/30', accent: '#00E5FF', line: '#4DA6FF' },
  { bg: 'from-zinc-900/30 via-blue-900/10 to-indigo-900/30', accent: '#6366F1', line: '#0A84FF' },
  { bg: 'from-slate-900/30 via-teal-800/10 to-cyan-900/30', accent: '#14B8A6', line: '#00E5FF' },
  { bg: 'from-neutral-900/30 via-indigo-900/10 to-blue-900/30', accent: '#3B82F6', line: '#6366F1' },
];

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
  return Math.abs(h);
}

export default function ProjectVisual({ title, category, className = '' }) {
  const colors = useMemo(() => palette[hashStr(title) % palette.length], [title]);

  const traces = useMemo(() => {
    const t = [];
    const seed = hashStr(title);
    for (let i = 0; i < 8; i++) {
      const x1 = (seed * (i + 1) * 7) % 140 + 10;
      const y1 = (seed * (i + 1) * 13) % 100 + 10;
      const x2 = ((seed * (i + 1) * 17) + 50) % 140 + 10;
      const y2 = ((seed * (i + 1) * 23) + 30) % 100 + 10;
      t.push({ x1, y1, x2, y2, delay: (i * 0.15).toFixed(2) });
    }
    return t;
  }, [title]);

  const chips = useMemo(() => {
    const c = [];
    const seed = hashStr(title + 'chip');
    for (let i = 0; i < 3; i++) {
      c.push({
        x: ((seed * (i + 1) * 11) % 120) + 20,
        y: ((seed * (i + 1) * 19) % 80) + 20,
        w: 12 + ((seed * (i + 1)) % 8),
        h: 12 + ((seed * (i + 2)) % 8),
      });
    }
    return c;
  }, [title]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 160 120" className="absolute inset-0">
        <defs>
          <pattern id={`grid-${hashStr(title)}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke={colors.line} strokeWidth="0.3" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="160" height="120" fill={`url(#grid-${hashStr(title)})`} />
        {traces.map((t, i) => (
          <g key={i}>
            <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={colors.accent} strokeWidth="0.8" opacity="0.4" />
            <circle cx={t.x1} cy={t.y1} r="1.5" fill={colors.line} opacity="0.6" />
            <circle cx={t.x2} cy={t.y2} r="1.5" fill={colors.accent} opacity="0.6" />
          </g>
        ))}
        {chips.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="1.5" fill={colors.accent} opacity="0.12" stroke={colors.line} strokeWidth="0.5" opacity="0.3" />
            {Array.from({ length: 4 }).map((_, p) => (
              <circle key={p} cx={c.x + 2 + (p % 2) * (c.w - 4)} cy={c.y + 2 + Math.floor(p / 2) * (c.h - 4)} r="0.8" fill={colors.line} opacity="0.5" />
            ))}
          </g>
        ))}
        <circle cx="80" cy="60" r="20" fill="none" stroke={colors.accent} strokeWidth="0.5" opacity="0.15" />
        <circle cx="80" cy="60" r="12" fill="none" stroke={colors.line} strokeWidth="0.3" opacity="0.1" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
    </div>
  );
}
