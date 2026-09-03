import React from 'react';
import { APP_CONFIG } from '../config';
import { Github, ArrowUpRight, Code, ShieldCheck, Terminal, GitBranch } from 'lucide-react';

export const GithubSection: React.FC = () => {
  const manifestSnippet = `{
  "name": "Custom Clicks Cursor",
  "version": "${APP_CONFIG.version.replace('v', '')}",
  "manifest_version": 3,
  "description": "WhiteSur-inspired vector cursors for modern browsers.",
  "permissions": ["storage"],
  "host_permissions": [], /* ZERO external web requests */
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "css": ["cursors/whitesur-vector.css"],
      "run_at": "document_start"
    }
  ]
}`;

  return (
    <section
      id="github"
      className="py-20 sm:py-28 bg-white dark:bg-[#0c0d10] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-neutral-900 text-white border border-neutral-800 p-8 sm:p-12 shadow-xl overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Copy & CTA */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
                <Github size={13} />
                <span>Open Source</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built in the open.
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
                Explore the source, inspect the implementation, report issues, or contribute. Full transparency for the code that touches your everyday browsing.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono">
                <span className="px-3 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>License: {APP_CONFIG.license}</span>
                </span>
                <span className="px-3 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center gap-1.5">
                  <GitBranch size={12} />
                  <span>main branch</span>
                </span>
              </div>

              <div className="pt-2">
                <a
                  href={APP_CONFIG.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold px-6 py-3 rounded-full text-sm transition-all active:scale-95 shadow-sm"
                >
                  <Github size={16} />
                  <span>View on GitHub</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: Code Snippet Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <span className="ml-2 text-neutral-400">manifest.json</span>
                  </div>
                  <span className="text-emerald-400">Manifest V3</span>
                </div>

                <pre className="mt-3.5 text-neutral-300 overflow-x-auto text-[11px] leading-relaxed select-all">
                  <code>{manifestSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
