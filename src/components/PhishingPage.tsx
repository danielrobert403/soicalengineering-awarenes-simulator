import React, { useState } from 'react';
import { Campaign } from '../types';
import { AlertCircle, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface PhishingPageProps {
  campaign: Campaign;
  onSubmitMock: () => void;
  onCancelMock: () => void;
}

export default function PhishingPage({ campaign, onSubmitMock, onCancelMock }: PhishingPageProps) {
  const [matricNo, setMatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFieldClicked, setIsFieldClicked] = useState({ matricNo: false, password: false });

  // Handle fake submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricNo.trim() || !password.trim()) {
      setErrorMessage('Please enter both your matriculation/ID number and network portal password.');
      return;
    }
    setIsSubmitting(true);
    // Simulating credential discard and logging behavior
    setTimeout(() => {
      setIsSubmitting(false);
      // Clean up fields to guarantee zero persistence of real passwords
      setMatricNo('');
      setPassword('');
      onSubmitMock();
    }, 1000);
  };

  const handleFieldClick = (field: 'matricNo' | 'password') => {
    setIsFieldClicked(prev => ({ ...prev, [field]: true }));
  };

  const getThemeColorClass = () => {
    switch (campaign.theme) {
      case 'urgency': return 'bg-rose-950/40 border-b border-rose-900/40 text-rose-300';
      case 'authority': return 'bg-amber-950/40 border-b border-amber-900/40 text-amber-200';
      case 'scarcity': return 'bg-orange-950/40 border-b border-orange-900/40 text-orange-200';
      case 'trust': return 'bg-sky-950/40 border-b border-sky-900/40 text-sky-200';
      default: return 'bg-indigo-950/40 border-b border-indigo-900/40 text-indigo-200';
    }
  };

  const getThemeIcon = () => {
    switch (campaign.theme) {
      case 'urgency': return <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
      case 'authority': return <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />;
      default: return <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col">
      {/* Top Banner Alert System representing Psychological triggers */}
      <div className={`p-4 flex gap-3 items-start ${getThemeColorClass()}`}>
        {getThemeIcon()}
        <div>
          <span className="font-semibold text-[10px] uppercase tracking-wider block font-mono text-slate-400">Security Alert Notification</span>
          <p className="text-sm font-medium mt-0.5 leading-relaxed">{campaign.portalBannerText}</p>
        </div>
      </div>

      <div className="p-8">
        {/* Fake School Branding Header */}
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white font-serif font-black text-2xl shadow-inner">
            BU
          </div>
          <h2 className="text-lg font-serif font-bold text-slate-100 tracking-tight">{campaign.portalTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">{campaign.portalSubtitle}</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-500/10 border-l-4 border-rose-500 rounded text-xs text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1" htmlFor="matric-no">
              Matriculation ID / Institutional Email
            </label>
            <input
              id="matric-no"
              type="text"
              required
              placeholder="e.g. BU/ST/22/1004"
              value={matricNo}
              onChange={(e) => setMatricNo(e.target.value)}
              onClick={() => handleFieldClick('matricNo')}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-slate-100 placeholder-slate-600 font-mono"
            />
            {isFieldClicked.matricNo && (
              <p className="text-[10px] text-amber-500 font-mono mt-1 leading-normal">
                ⚠️ [Assessment Tracker] System captured field selection event.
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1" htmlFor="password">
              Security Account Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => handleFieldClick('password')}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-slate-100 placeholder-slate-600 font-mono"
            />
            {isFieldClicked.password && (
              <p className="text-[10px] text-amber-500 font-mono mt-1 leading-normal">
                ⚠️ [Assessment Tracker] Password entry action registered.
              </p>
            )}
          </div>

          <button
            id="phish-login-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-705 transition-all flex items-center justify-center gap-2 text-sm shadow-md disabled:bg-slate-800 disabled:text-slate-500 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>
                Verifying Credentials...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Sign In & Complete Directory Verification
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center flex flex-col gap-3">
          <p className="text-[11px] text-slate-500 leading-normal">
            🛡️ <span className="font-semibold text-slate-400">Security Guard Protocol active:</span> For compliance reasons, submitted passwords are discarded securely by standard Garbage Collection immediately upon verification, and are never saved or recorded.
          </p>
          <button
            onClick={onCancelMock}
            className="text-xs text-slate-400 hover:text-slate-200 hover:underline cursor-pointer"
          >
            Cancel and Return safely to student hub
          </button>
        </div>
      </div>
    </div>
  );
}
