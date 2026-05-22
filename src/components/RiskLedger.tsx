import { Participant, ActivityLog } from '../types';
import { Shield, TrendingDown, Users, AlertTriangle, Play, RefreshCw, BarChart2, ShieldCheck, HardDrive, Filter, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface RiskLedgerProps {
  participants: Participant[];
  activityLogs: ActivityLog[];
  onTriggerTrainingEmail: (participantId: string) => void;
}

export default function RiskLedger({ participants, activityLogs, onTriggerTrainingEmail }: RiskLedgerProps) {
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'staff'>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | 'High Risk' | 'Moderate Risk' | 'Low Risk'>('all');
  const [trainingScheduled, setTrainingScheduled] = useState<Record<string, boolean>>({});

  const handleScheduleTraining = (id: string) => {
    setTrainingScheduled(prev => ({ ...prev, [id]: true }));
    onTriggerTrainingEmail(id);
    setTimeout(() => {
      setTrainingScheduled(prev => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const getRiskColor = (status: Participant['status']) => {
    switch (status) {
      case 'High Risk': return 'bg-rose-500/10 text-rose-400 border-rose-550/20 ring-1 ring-rose-500/10 animate-pulse';
      case 'Moderate Risk': return 'bg-amber-500/10 text-amber-400 border-amber-500/20 ring-1 ring-amber-500/10';
      case 'Low Risk': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 ring-1 ring-emerald-500/10';
      default: return 'bg-slate-800 text-slate-400 border-slate-705';
    }
  };

  const filteredParticipants = participants.filter(p => {
    const roleMatch = roleFilter === 'all' || p.role === roleFilter;
    const riskMatch = riskFilter === 'all' || p.status === riskFilter;
    return roleMatch && riskMatch;
  });

  return (
    <div className="space-y-6">
      {/* Filtering Control Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium font-serif">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Refine Behavioral Scoring and Risk Standing Indexes:</span>
        </div>

        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <div>
            <label className="sr-only" htmlFor="role-ledger-filter">Role Filter</label>
            <select
              id="role-ledger-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-300 cursor-pointer"
            >
              <option value="all">All Roles Combined</option>
              <option value="student">Students Directory</option>
              <option value="staff">Staff Directory</option>
            </select>
          </div>

          <div>
            <label className="sr-only" htmlFor="risk-ledger-filter">Risk Filter</label>
            <select
              id="risk-ledger-filter"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-300 cursor-pointer"
            >
              <option value="all">All Risk Bandwidths</option>
              <option value="High Risk">🔴 High Risk Standing</option>
              <option value="Moderate Risk">🟡 Moderate Risk Standing</option>
              <option value="Low Risk">🟢 Low Risk Standing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Scoreboard Ledger Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg animate-fadeIn">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
          <div className="space-y-0.5">
            <h3 className="font-serif font-bold text-slate-100 text-sm">Automated riskAnalyzer Dynamic score Ledgers</h3>
            <p className="text-[10px] text-slate-400 max-w-lg leading-normal">
              Positive actions increase scores; clicking links schedules additional training loops automatically. All participant records are strictly anonymized.
            </p>
          </div>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20 px-3 py-1 rounded-full font-bold">
            Total Matched Records: {filteredParticipants.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800">
                <th className="py-4 px-6 font-mono">Participant ID</th>
                <th className="py-4 px-4 font-mono">Entity Type</th>
                <th className="py-4 px-4 font-mono">Academic Faculty</th>
                <th className="py-4 px-4 text-center font-mono">Score Index</th>
                <th className="py-4 px-4 text-center font-mono">Risk Standing</th>
                <th className="py-4 px-4 text-center font-mono">Habits (Safes vs Errors)</th>
                <th className="py-4 px-6 text-center font-mono">Action Handlers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-305">
              {filteredParticipants.map((p) => {
                const isHighRisk = p.status === 'High Risk';
                return (
                  <tr key={p.id} className="hover:bg-slate-950/40 transition-colors">
                    {/* Anonymized Student ID Info & history logs popovers */}
                    <td className="py-4 px-6 font-mono font-medium text-slate-200">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold flex items-center gap-1">
                          {p.id}
                          {isHighRisk && <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping"></span>}
                        </span>
                        <span className="text-[10px] text-slate-500 normal-case font-sans font-normal italic truncate max-w-[140px]">
                          Last logged: {p.lastAction}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 capitalize font-semibold text-slate-200 font-serif">
                      {p.role}
                    </td>

                    <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                      {p.department}
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-black text-sm text-slate-101">
                      {p.riskScore} / 100
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full border ${getRiskColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>

                    {/* Positive vs Vulnerable Habits trackbars */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                          +{p.positiveActions}
                        </span>
                        <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded font-mono">
                          -{p.negativeActions}
                        </span>
                      </div>
                    </td>

                    {/* Educational Action Trigger buttons */}
                    <td className="py-4 px-6 text-center">
                      <button
                        id={`schedule-training-btn-${p.id}`}
                        onClick={() => handleScheduleTraining(p.id)}
                        disabled={trainingScheduled[p.id]}
                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all ${
                          trainingScheduled[p.id]
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold'
                            : isHighRisk
                            ? 'bg-rose-500/10 hover:bg-rose-550/20 border border-rose-500/30 text-rose-400 cursor-pointer'
                            : 'bg-slate-950 hover:bg-slate-910 border border-slate-800 text-slate-350 cursor-pointer'
                        }`}
                      >
                        {trainingScheduled[p.id] ? '✓ Email Sent' : isHighRisk ? '🚨 Dispatch Retraining' : '📧 Send Assessment Email'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredParticipants.length === 0 && (
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-slate-600 mb-2" />
              <p className="text-xs font-medium text-slate-400">No Participants Match Selected Filter Ranges</p>
              <button
                onClick={() => { setRoleFilter('all'); setRiskFilter('all'); }}
                className="text-[11px] text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/10 px-3 py-1.5 rounded-xl mt-3 transition-colors cursor-pointer"
              >
                Reset active filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
