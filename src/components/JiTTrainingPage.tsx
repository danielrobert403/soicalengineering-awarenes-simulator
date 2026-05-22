import { Campaign } from '../types';
import { ShieldCheck, ArrowRight, BookOpen, AlertCircle, Info, Bookmark, HelpCircle } from 'lucide-react';

interface JiTTrainingPageProps {
  campaign: Campaign;
  onContinueToDashboard: () => void;
  onStartCourse: () => void;
}

export default function JiTTrainingPage({ campaign, onContinueToDashboard, onStartCourse }: JiTTrainingPageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Caught You Educational Banner */}
      <div className="bg-rose-950/20 border border-rose-900/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-white text-3xl flex-shrink-0 animate-pulse shadow-md">
          🚨
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-lg md:text-xl font-serif font-black text-rose-300 tracking-tight uppercase">
            Oops! You fell for a controlled security simulation test.
          </h2>
          <p className="text-xs text-rose-200/80 leading-relaxed font-medium">
            Don't worry—there are no real academic or account consequences. This is a secure interactive learning environment designed to help you protect your metrics before real cyber criminals target you.
          </p>
        </div>
      </div>

      {/* Visual X-Ray Breakdown Canvas */}
      <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-400 font-mono ml-2">INTERACTIVE X-RAY PHISHING ANALYSIS</span>
          </div>
          <span className="text-[10px] bg-rose-950 text-rose-400 font-mono border border-rose-900 px-2.5 py-0.5 rounded-full font-bold">
            Red Flags Revealed
          </span>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            Below is the simulated threat representation you interacted with. Review the highlighted <span className="text-rose-400 font-bold underline">red callout sections</span> to explore exactly how the attacker tricked your safety systems.
          </p>

          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
            {/* Email Header Spoof */}
            <div className="border-b border-slate-850 pb-4 space-y-2">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500">From:</span>
                <span className="font-mono text-rose-300 font-bold bg-rose-950/30 px-2 py-0.5 rounded border border-rose-900/50">
                  {campaign.sender} &lt;{campaign.senderEmail}&gt;
                </span>
                <span className="text-amber-400 text-[10px] flex items-center gap-1 font-mono">
                  ← Lookalike Domain Spoof
                </span>
              </div>
              <div className="text-xs">
                <span className="text-slate-500">Subject:</span>
                <span className="text-slate-300 ml-2 font-medium">{campaign.subject}</span>
              </div>
            </div>

            {/* Simulated Email Body text excerpt with highlights */}
            <div className="text-slate-300 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line font-serif max-w-2xl">
              {campaign.body}
            </div>

            {/* Deep Breakdown Pin Map */}
            <div className="mt-6 pt-4 border-t border-slate-850 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Pinpointed Red Flag Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaign.flaws.map((flaw, idx) => (
                  <div key={flaw.id} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 hover:border-rose-900 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-950 border border-rose-800 text-rose-400 font-mono text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs font-bold text-slate-200 font-semibold">{flaw.title}</h5>
                    </div>
                    <p className="text-[11px] text-rose-300 font-mono">
                      "{flaw.highlightText}"
                    </p>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {flaw.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-Learning Cards representing psychological strategies */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-serif font-bold text-slate-100 uppercase tracking-tight">Inside the Attacker's Playbook: Core Manipulation Tactics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-lg">
              ⏱️
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">Artificial Urgency</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              By imposing rapid deadlines (e.g., "within 24 hours"), attackers seek to induce a fear-based response that overrides your logical verification processes.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-lg">
              🏛️
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">Abuse of Authority</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Minimizing critical thinking by mimicking executive channels such as the VC, Senate, or HR Admin. It leverages loyalty biases to bypass cyber safety flags.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-lg">
              🤝
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">The Trust Fall</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Posing as routine upgrades that you expect on campus (like WiFi, student support grants, or hostel allocators) to make you lower your protective barriers.
            </p>
          </div>
        </div>
      </div>

      {/* User awareness transition block */}
      <div className="pt-6 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-slate-800/80 text-center md:text-left">
        <div className="space-y-1">
          <p className="text-xs text-slate-500 font-medium font-mono uppercase tracking-wider">Verification Steps</p>
          <p className="text-sm font-semibold text-slate-200">Complete academic modules and verify security standing on the simulation scoreboard.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onStartCourse}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg block transition-all shadow-md cursor-pointer border border-indigo-500/20"
          >
            Go to Awareness Course
          </button>
          <button
            onClick={onContinueToDashboard}
            className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs px-5 py-2.5 rounded-lg block transition-all border border-slate-705 cursor-pointer"
          >
            Simulation Sandbox
          </button>
        </div>
      </div>
    </div>
  );
}
