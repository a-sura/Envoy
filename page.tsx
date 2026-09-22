"use client";

import React, { useState } from 'react';
import { 
  Shield, UserCheck, Layers, FileText, CheckCircle2, 
  AlertTriangle, Copy, Check, Settings, User, 
  DollarSign, TrendingDown, Terminal, LogOut, Code, RefreshCw
} from 'lucide-react';

type UserRole = 'Admin' | 'Writer' | 'Client';
type TabType = 'dashboard' | 'audits' | 'settings' | 'profile';

interface ClientProfile {
  id: string;
  name: string;
  domain: string;
  monthlyFee: number;
  frictionScore: number;
  ragReadiness: number;
  ticketsDeflected: number;
}

export default function ClarytyPortal() {
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedClient, setSelectedClient] = useState<string>('c1');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [retainerFee, setRetainerFee] = useState<string>('3500');
  const [auditFrequency, setAuditFrequency] = useState<string>('Monthly');
  
  const [userName, setUserName] = useState<string>('Claryty Consultant');
  const [userEmail, setUserEmail] = useState<string>('partner@claryty.co');

  const clients: Record<string, ClientProfile> = {
    c1: { id: 'c1', name: 'ApexFin Infrastructure', domain: 'api.apexfin.io', monthlyFee: 3500, frictionScore: 24, ragReadiness: 88, ticketsDeflected: 142 },
    c2: { id: 'c2', name: 'Voxel Vector DB', domain: 'docs.voxel.ai', monthlyFee: 4200, frictionScore: 48, ragReadiness: 62, ticketsDeflected: 89 },
  };

  const activeClient = clients[selectedClient];

  const activePatches = [
    {
      id: "patch-1",
      title: "Missing 402 Payment Required Error Schema",
      type: "OpenAPI Spec Fix",
      impact: "High Friction",
      description: "Cursor and Claude Code throw hallucinations when payment limits trigger an unmapped response body.",
      code: `responses:
  '402':
    description: Payment Required
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'`
    },
    {
      id: "patch-2",
      title: "Fix Chunk Breakage in Webhook Re-try Logic",
      type: "Markdown Content Patch",
      impact: "RAG Visibility Decay",
      description: "Split structural code paragraphs to ensure semantic chunkers store authorization instructions coherently.",
      code: `### Webhook Retries
<!-- @semantic-priority: high -->
All failed delivery queries automatically attempt verification cycles across sequential 30-second windows. 
Ensure your ingestion endpoint returns an explicit \`HTTP 200 OK\` layout instantly to avoid cascading drops.`
    }
  ];

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-emerald-500 selection:text-slate-900">
      <div className="bg-slate-800/80 border-b border-slate-700/60 backdrop-blur-md px-6 py-2 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Live Environment Controls</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 mr-2">Simulate Portal Persona:</span>
          {(['Admin', 'Writer', 'Client'] as UserRole[]).map((role) => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                setActiveTab('dashboard');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all \${
                currentRole === role 
                  ? 'bg-emerald-500 text-slate-900 shadow-md font-bold' 
                  : 'bg-slate-700/50 hover:bg-slate-700 text-slate-400'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="space-y-6">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-500">
                <Layers size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">Claryty Co.</h1>
                <p className="text-xs text-slate-400">Revenue-Audit Engine</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard Workspace', icon: Layers },
                { id: 'audits', label: 'Monthly Code Patches', icon: FileText },
                { id: 'settings', label: 'Retainer Advanced Settings', icon: Settings },
                { id: 'profile', label: 'Account Profile Editor', icon: User }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left \${
                      activeTab === tab.id 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold' 
                        : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {currentRole !== 'Client' && (
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">Active Retainer Client</label>
              <select 
                value={selectedClient} 
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="c1">ApexFin Infrastructure</option>
                <option value="c2">Voxel Vector DB</option>
              </select>
            </div>
          )}
        </aside>

        <main className="lg:col-span-3 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-500 tracking-widest uppercase bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    {currentRole} Session Workspace
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-2 tracking-tight">{activeClient.name}</h2>
                  <p className="text-sm text-slate-400">{activeClient.domain}</p>
                </div>
                <div className="bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl text-right">
                  <div className="text-xs text-slate-400 font-medium">Active Flat Retainer</div>
                  <div className="text-xl font-bold text-emerald-400">\${retainerFee}/mo</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider">Revenue Friction Score</span>
                    <TrendingDown size={18} className="text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-white">{activeClient.frictionScore}%</div>
                  <p className="text-xs text-slate-400 mt-1">Lower values equal less drop-offs</p>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider">RAG/AI Retrievability</span>
                    <Terminal size={18} className="text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-white">{activeClient.ragReadiness}%</div>
                  <p className="text-xs text-slate-400 mt-1">LLM context extraction health</p>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider">Support Deflections</span>
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-white">+{activeClient.ticketsDeflected}</div>
                  <p className="text-xs text-emerald-400/80 mt-1 font-medium">Direct retention ROI verified</p>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 space-y-4">
                <h3 className="text-base font-bold text-white">Current Audit Assessment Checklist</h3>
                <div className="divide-y divide-slate-700/50">
                  {[
                    { label: "Scan public OpenAPI schemas for undocumented payload items", status: "completed", date: "Checked 4 days ago" },
                    { label: "Analyze Cursor & Claude Code structural interpretation paths", status: "completed", date: "Checked 4 days ago" },
                    { label: "Correlate Zendesk friction spikes against onboarding modules", status: "pending", date: "Under manual review" }
                  ].map((item, idx) => (
                    <div key={idx} className="py-3 flex items-start gap-3 justify-between">
                      <div className="flex gap-3 items-start">
                        {item.status === 'completed' ? (
                          <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className={\`text-sm \${item.status === 'completed' ? 'text-slate-300' : 'text-slate-400 italic'}\`}>{item.label}</p>
                          <span className="text-xs text-slate-500">{item.date}</span>
                        </div>
                      </div>
                      <span className={\`text-xs px-2 py-0.5 rounded-full font-medium \${
                        item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }\`}>
                        {item.status === 'completed' ? 'Audited' : 'In-Progress'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'audits' && (
            <div className="space-y-6">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-xl font-bold text-white tracking-tight">Production-Ready Markdown & Spec Patches</h2>
                <p className="text-sm text-slate-400 mt-1">Copy and paste these pre-crafted structural fixes directly into your development repositories to reduce developer onboarding friction immediately.</p>
              </div>

              {activePatches.map((patch, index) => (
                <div key={patch.id} className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden shadow-lg">
                  <div className="p-5 border-b border-slate-700/50 flex items-start justify-between gap-4 bg-slate-800/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">{patch.type}</span>
                        <span className="text-xs font-semibold bg-slate-900 text-amber-400 px-2 py-0.5 rounded-md">{patch.impact}</span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">{patch.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{patch.description}</p>
                    </div>
                    {currentRole === 'Admin' && (
                      <button className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 border border-slate-700 rounded-lg px-2 py-1 transition-all">
                        <RefreshCw size={12} /> Edit
                      </button>
                    )}
                  </div>
                  
                  <div className="relative bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto border-t border-slate-900">
                    <div className="absolute right-3 top-3 z-10">
                      <button 
                        onClick={() => handleCopyCode(patch.code, index)}
                        className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white p-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={14} className="text-emerald-400" />
                            <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span className="text-[10px] font-medium">Copy Patch</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="whitespace-pre">{patch.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Retainer Advanced Controls</h2>
                <p className="text-sm text-slate-400 mt-1">Configure structural values for this client engagement layer. Changes update functional state parameters globally.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700/50">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Flat Monthly Retainer Fee ($ USD)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <DollarSign size={16} />
                    </div>
                    <input 
                      type="number" 
                      value={retainerFee}
                      disabled={currentRole === 'Client'}
                      onChange={(e) => setRetainerFee(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                    />
                  </div>
                  <p className="text-xs text-slate-500">Billed recurrently every first business week.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Audit Execution Frequency</label>
                  <select 
                    value={auditFrequency}
                    disabled={currentRole === 'Client'}
                    onChange={(e) => setAuditFrequency(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                  >
                    <option value="Weekly">Weekly Deep Continuous Scan</option>
                    <option value="Monthly">Monthly Retainer Audit Delivery</option>
                    <option value="Quarterly">Quarterly Strategic Review</option>
                  </select>
                  <p className="text-xs text-slate-500">Controls target frequency indicators across schedules.</p>
                </div>
              </div>

              {currentRole !== 'Client' && (
                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={() => alert("Retainer configuration saved successfully!")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-500/10"
                  >
                    Save Retention Rules
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Account Profile Configuration</h2>
                <p className="text-sm text-slate-400 mt-1">Manage active authentication parameters for system identity logs.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-700/50 max-w-xl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Profile Full Name</label>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Notification Delivery Address</label>
                  <input 
                    type="email" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => alert("Identity parameters committed to local state context.")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md"
                >
                  Update Profile Context
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}