import { Participant, ActivityLog } from '../types';
import { Shield, TrendingUp, Users, AlertTriangle, Play, RefreshCw, BarChart2, Sparkles, Server } from 'lucide-react';
import { CAMPAIGNS } from '../data';
import { useState } from 'react';

interface AdminDashboardProps {
  participants: Participant[];
  activityLogs: ActivityLog[];
  onTriggerTargetSim: (targetUserId: string, campaignId: string) => void;
  onRefreshData: () => void;
}

export default function AdminDashboard({
  participants,
  activityLogs,
  onTriggerTargetSim,
  onRefreshData
}: AdminDashboardProps) {
  const [selectedTargetUser, setSelectedTargetUser] = useState<string>(participants[0]?.id || '');
  const [selectedTargetCampaign, setSelectedTargetCampaign] = useState<string>(CAMPAIGNS[0].id);
  const [isDeployingSim, setIsDeployingSim] = useState(false);
  const [simDeploySuccess, setSimDeploySuccess] = useState(false);

  // Administrative stats calculations
  const totalImpacts = activityLogs.length;
  const clickCount = activityLogs.filter(log => log.action === 'Clicked Landing Link' || log.action === 'Submitted Credentials').length;
  const reportCount = activityLogs.filter(log => log.action === 'Reported Phishing').length;
  
  // Overall Vulnerability Rating (human risk index)
  const averageRisk = Math.round(participants.reduce((acc, curr) => acc + curr.riskScore, 0) / participants.length);

  // Departmental susceptibility tally
  const departmentTally: Record<string, { total: number; clicks: number }> = {};
  participants.forEach(p => {
    if (!departmentTally[p.department]) {
      departmentTally[p.department] = { total: 0, clicks: 0 };
    }
    departmentTally[p.department].total += 1;
    departmentTally[p.department].clicks += p.negativeActions;
  });

  const handleManualTrigger = () => {
    setIsDeployingSim(true);
    setTimeout(() => {
      setIsDeployingSim(false);
      setSimDeploySuccess(true);
      onTriggerTargetSim(selectedTargetUser, selectedTargetCampaign);
      setTimeout(() => setSimDeploySuccess(false), 3000);
    }, 1200);
  };

  // Human Readable score formatting colors
  const getRiskBadgeColor = (status: Participant['status']) => {
    switch (status) {
      case 'High Risk': return 'bg-rose-500/10 text-rose-400 font-extrabold border-rose-500/20';
      case 'Moderate Risk': return 'bg-amber-500/10 text-amber-400 font-semibold border-amber-500/20';
      case 'Low Risk': return 'bg-emerald-500/10 text-emerald-400 font-semibold border-emerald-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Human Threat Index</span>
            <span className="text-3xl font-mono font-black text-slate-100">{averageRisk}%</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High Risk Priority Needed</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Active Participants</span>
            <span className="text-3xl font-mono font-black text-slate-100">{participants.length}</span>
          </div>
          <span className="mt-4 text-[11px] text-slate-300 font-semibold bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-lg">
            🧑‍🎓 Students & staff audited
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Clicks registered</span>
            <span className="text-3xl font-mono font-black text-slate-100">{clickCount}</span>
          </div>
          <span className="mt-4 text-[11px] text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
            ⚠️ Simulated user failures
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Total Reports Logged</span>
            <span className="text-3xl font-mono font-black text-slate-100">{reportCount}</span>
          </div>
          <span className="mt-4 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
            🛡️ Correct threat quarantine flags
          </span>
        </div>
      </div>

      {/* Tactic Vulnerability Charts & Departmental Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Department / Faculty Vulnerability Map (Col Span 7) */}
        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-lg space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div className="space-y-0.5">
              <h3 className="font-serif font-bold text-slate-100 text-sm">Faculty susceptibility Heatmap</h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                Identifies groups requiring immediate physically hosted security awareness seminars.
              </p>
            </div>
            <BarChart2 className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="space-y-4 pt-1">
            {Object.entries(departmentTally).map(([dept, data]) => {
              const maxActions = Math.max(...participants.map(p => p.negativeActions)) || 1;
              const ratio = Math.round((data.clicks / (data.total * maxActions)) * 105);
              const percentageClamped = Math.min(ratio, 100);

              let heatmapColor = 'from-emerald-400 to-emerald-500';
              if (percentageClamped >= 70) heatmapColor = 'from-rose-500 to-red-655';
              else if (percentageClamped >= 40) heatmapColor = 'from-amber-400 to-amber-500';

              return (
                <div key={dept} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300 font-mono text-[11px]">{dept}</span>
                    <span className="text-slate-500 font-mono">
                      {data.clicks} errors registered across {data.total} profiles
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 border border-slate-800/80 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full bg-gradient-to-r rounded-full transition-all duration-300 ${heatmapColor}`}
                      style={{ width: `${percentageClamped}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tactic Vulnerability Split (Col Span 5) */}
        <div className="lg:col-span-12 xl:col-span-5 bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-lg space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="font-serif font-bold text-slate-100 text-sm">Psychological Strategy Success Ratio</h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              Breakdown of how effective each trigger is across simulated school audiences.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 border border-slate-850">
              <div className="flex justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1 font-serif">⏱️ Urgency / Deadline pressure</span>
                <span className="text-indigo-400">70% Susceptibility</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Creates instant panic about hostel space release or student lockout. Very powerful against undergraduate classes.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 border border-slate-850">
              <div className="flex justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1 font-serif">🏛️ Authority Directives</span>
                <span className="text-indigo-400">45% Susceptibility</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Mimics the VC office, Senate Decisions, or Administrative guidelines commands. Highly effective against research staff.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 border border-slate-850">
              <div className="flex justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1 font-serif">🤝 Comfort Upgrade (Campus Wifi)</span>
                <span className="text-indigo-400">55% Susceptibility</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Exploits trust in helpful IT upgrades for Gigabit connections to trick users bypass logical hurdles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Behavioral Threat Generation Control Panel */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-850 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-slate-100 text-base flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" />
              Automated Behavioral Campaign Dispatcher
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Construct a controlled assessment payload. Dispatches a simulated threat template to target identifiers in the sandbox to monitor real-time exposure.
            </p>
          </div>
          <button
            onClick={onRefreshData}
            id="force-refresh-sandbox"
            className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/50 hover:bg-indigo-950 px-4 py-2 rounded-xl transition-all self-start border border-indigo-900/50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recalculate Ledgers
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2" htmlFor="target-user-select">
              Select Audited Target Profile
            </label>
            <select
              id="target-user-select"
              value={selectedTargetUser}
              onChange={(e) => setSelectedTargetUser(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl text-xs py-2.5 px-3 focus:outline-none focus:ring-1 focus ring-indigo-500 font-mono"
            >
              {participants.map(p => (
                <option key={p.id} value={p.id}>{p.id} ({p.role === 'student' ? 'Student' : 'Staff'} - {p.department})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2" htmlFor="target-camp-select">
              Select Threat Payload
            </label>
            <select
              id="target-camp-select"
              value={selectedTargetCampaign}
              onChange={(e) => setSelectedTargetCampaign(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl text-xs py-2.5 px-3 focus:outline-none focus:ring-1 focus ring-indigo-500"
            >
              {CAMPAIGNS.map(c => (
                <option key={c.id} value={c.id}>[{c.theme.toUpperCase()}] {c.title}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleManualTrigger}
              disabled={isDeployingSim}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:bg-slate-800 disabled:text-slate-500 border border-indigo-500/30"
            >
              <Sparkles className="w-4 h-4 text-indigo-300" />
              {isDeployingSim ? 'Routing Simulation Node...' : 'Dispatch Cyber-Campaign'}
            </button>
          </div>
        </div>

        {simDeploySuccess && (
          <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-900 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Success! Managed payload dispatched. Target profile metrics configured to receive threat campaign on simulated inbox tab.</span>
          </div>
        )}
      </div>

      {/* Live Administrative Audit Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
          <div className="space-y-0.5">
            <h3 className="font-serif font-bold text-slate-100 text-sm">Administrative Live Activity Stream</h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              Real-time audit telemetry tracking user interactions across simulations anonymously.
            </p>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Live Session logs active</span>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-[250px] overflow-y-auto pr-2">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap pt-0.5">{log.timestamp}</span>
                <div className="space-y-0.5">
                  <span className="font-bold text-indigo-400 font-mono">{log.userId}</span>
                  <span className="text-slate-400"> ({log.userRole === 'student' ? 'Student' : 'Staff'} - {log.department})</span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {log.action === 'Submitted Credentials' && (
                      <span className="text-rose-454 text-rose-400 font-mono font-medium">❌ Fell for simulated landing & entry. Entered password deleted immediately.</span>
                    )}
                    {log.action === 'Reported Phishing' && (
                      <span className="text-emerald-454 text-emerald-400 font-mono font-semibold">🛡️ Successfully spotted & reported campaign. Saved space!</span>
                    )}
                    {log.action === 'Clicked Landing Link' && (
                      <span className="text-rose-400/90 font-mono">⚠️ Explored campaign and landed on spoofed login portal path.</span>
                    )}
                    {log.action === 'Completed Course' && (
                      <span className="text-indigo-400 font-medium font-serif">🎓 Completed academic compliance course module.</span>
                    )}
                    {log.action === 'Passed Quiz' && (
                      <span className="text-emerald-400 font-semibold">🏆 Passed Security assessment certification quiz.</span>
                    )}
                    {log.action === 'Failed Quiz' && (
                      <span className="text-slate-500 font-mono">📖 Completed Quiz but score below pass rating.</span>
                    )}
                  </p>
                </div>
              </div>
              <span className={`text-[9px] px-2.5 py-0.5 rounded-full border self-start md:self-center font-bold font-mono ${
                log.riskImpact === 'increased' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                Score {log.riskImpact === 'increased' ? '+' : '-'} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
