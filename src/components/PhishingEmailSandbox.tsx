import { Campaign } from '../types';
import { Mail, MailWarning, AlertTriangle, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface PhishingEmailSandboxProps {
  campaigns: Campaign[];
  onSelectCampaign: (campaign: Campaign) => void;
  selectedCampaign: Campaign;
  onReportPhish: (campaign: Campaign) => void;
  onClickLink: (campaign: Campaign) => void;
}

export default function PhishingEmailSandbox({
  campaigns,
  onSelectCampaign,
  selectedCampaign,
  onReportPhish,
  onClickLink
}: PhishingEmailSandboxProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'flagged'>('all');

  // Badge background helper mapping
  const getThemeBadge = (theme: Campaign['theme']) => {
    switch (theme) {
      case 'urgency': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'authority': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'scarcity': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'trust': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
      {/* Inbox List Sidebar (Col Span 4) */}
      <div className="lg:col-span-5 xl:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg flex flex-col h-[650px] overflow-hidden">
        {/* Inbox Header */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              <h3 className="font-serif font-bold text-slate-100 text-sm">Security Training Inbox</h3>
            </div>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 font-mono px-2 py-0.5 rounded-full font-bold">
              {campaigns.length} Challenges
            </span>
          </div>
          {/* Email Type Filter Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              School Campaigns
            </button>
            <button
              onClick={() => setActiveTab('flagged')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'flagged' ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MailWarning className="w-3.5 h-3.5 text-rose-400" />
              Flagged Threats
            </button>
          </div>
        </div>

        {/* Mailbox List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 bg-slate-900/50">
          {activeTab === 'flagged' ? (
            <div className="p-8 text-center flex flex-col items-center justify-center h-full">
              <ShieldCheck className="w-12 h-12 text-slate-700 mb-2 animate-pulse" />
              <p className="text-xs font-semibold text-slate-400">No Custom Flagged Threats Found</p>
              <p className="text-[11px] text-slate-500 mt-2 max-w-xs leading-relaxed">
                To flag an active campaign, select one and click the "Report Phishing Template" button on the mail preview board.
              </p>
            </div>
          ) : (
            campaigns.map((camp) => {
              const isSelected = camp.id === selectedCampaign.id;
              return (
                <button
                  id={`campaign-${camp.id}`}
                  key={camp.id}
                  onClick={() => onSelectCampaign(camp)}
                  className={`w-full text-left p-4 hover:bg-slate-800/40 transition-all flex flex-col gap-1.5 border-l-4 ${
                    isSelected ? 'bg-slate-800/60 border-l-indigo-500' : 'border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-xs text-slate-200 truncate font-mono">{camp.sender}</span>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">{camp.timestamp}</span>
                  </div>
                  <h4 className={`text-xs font-bold leading-snug truncate ${isSelected ? 'text-indigo-300 font-extrabold' : 'text-slate-300'}`}>
                    {camp.subject}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {camp.previewText}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] px-2 py-0.5 rounded border ${getThemeBadge(camp.theme)} uppercase font-bold`}>
                      Trigger: {camp.theme}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Mailbox Preview Canvas (Col Span 8) */}
      <div className="lg:col-span-7 xl:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg flex flex-col h-[650px] overflow-hidden">
        {/* Email Header Info */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-serif leading-tight">
                {selectedCampaign.subject}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-300 bg-slate-800 px-2 py-1 rounded-md font-mono border border-slate-700/50">
                  From: {selectedCampaign.sender}
                </span>
                <span className="text-slate-500 font-mono">&lt;{selectedCampaign.senderEmail}&gt;</span>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap md:self-start">
              Received: {selectedCampaign.timestamp}
            </span>
          </div>
        </div>

        {/* Email Body */}
        <div className="flex-1 p-6 overflow-y-auto max-w-none bg-slate-900">
          <div className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            {selectedCampaign.body}
          </div>

          {/* Core Malicious Link Accent Container representing the fake portal button */}
          <div className="mt-8 p-4 bg-slate-950/60 rounded-xl border border-dashed border-slate-850 max-w-md">
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-2 font-mono">Simulated Link Target Highlight</p>
            <button
              id="mock-phish-link"
              onClick={() => onClickLink(selectedCampaign)}
              className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-indigo-400 font-medium text-xs py-3 px-4 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
            >
              <span className="font-bold underline truncate pr-2 font-serif">{selectedCampaign.portalTriggerText}</span>
              <ExternalLink className="w-4 h-4 text-indigo-300 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-500 mt-2 font-mono truncate">
              Link destination: <span className="text-rose-400">https://login.{selectedCampaign.senderEmail}/auth?redir=allocate</span>
            </p>
          </div>
        </div>

        {/* Foot Action Buttons (Pass vs Fail vectors) */}
        <div className="p-4 bg-slate-950/40 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium max-w-md">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Reporting correctly logs a pass. Clicking links starts simulated risk counters.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="report-phish-btn"
              onClick={() => onReportPhish(selectedCampaign)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg block transition-all shadow-sm hover:shadow-md cursor-pointer border border-emerald-500/20"
            >
              🛡️ Report This Email
            </button>
            <button
              id="click-phish-link-btn"
              onClick={() => onClickLink(selectedCampaign)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg block transition-all shadow-sm hover:shadow-md cursor-pointer border border-rose-500/20"
            >
              ⚠️ Click Embedded Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
