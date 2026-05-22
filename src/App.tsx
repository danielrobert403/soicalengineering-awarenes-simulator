import { useState } from 'react';
import { Campaign, Participant, ActivityLog } from './types';
import { CAMPAIGNS, INITIAL_PARTICIPANTS, INITIAL_ACTIVITY_LOGS } from './data';
import PhishingEmailSandbox from './components/PhishingEmailSandbox';
import PhishingPage from './components/PhishingPage';
import JiTTrainingPage from './components/JiTTrainingPage';
import KnowledgeBaseQuiz from './components/KnowledgeBaseQuiz';
import AdminDashboard from './components/AdminDashboard';
import RiskLedger from './components/RiskLedger';
import { ShieldAlert, BookOpen, Layers, BarChart3, ListOrdered, CheckCircle, FlameKindling, Info, InfoIcon } from 'lucide-react';

export default function App() {
  // Navigation Tabs state representing clean design philosophies
  const [activeSegment, setActiveSegment] = useState<'sandbox' | 'training' | 'admin' | 'ledger'>('sandbox');

  // Simulation Campaign states
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(CAMPAIGNS[0]);
  const [customOverlayVisible, setCustomOverlayVisible] = useState<boolean>(false);
  const [hasEnteredCredentialFailedState, setHasEnteredCredentialFailedState] = useState<boolean>(false);

  // Participant LEDGER states
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Common scoring utility rules
  const logSecurityAction = (
    userId: string,
    action: ActivityLog['action'],
    campaignId: string,
    campaignTitle: string,
    riskImpact: ActivityLog['riskImpact']
  ) => {
    const timestamp = 'Just Now';
    const targetUser = participants.find(p => p.id === userId) || participants[0];
    
    // Add transaction Log
    const newLogItem: ActivityLog = {
      id: `act_${Date.now()}`,
      timestamp,
      userId,
      userRole: targetUser.role,
      department: targetUser.department,
      action,
      campaignId,
      campaignTitle,
      riskImpact
    };

    setActivityLogs(prev => [newLogItem, ...prev]);

    // Update risk ledger
    setParticipants(prev => {
      return prev.map(p => {
        if (p.id === userId) {
          let scoreShift = 0;
          let positiveActions = p.positiveActions;
          let negativeActions = p.negativeActions;

          if (riskImpact === 'increased') {
            scoreShift = 12;
            negativeActions += 1;
          } else if (riskImpact === 'decreased') {
            scoreShift = -10;
            positiveActions += 1;
          } else {
            // passive complete actions
            positiveActions += 1;
          }

          const rawRiskScore = Math.max(0, Math.min(100, p.riskScore + scoreShift));
          let status: Participant['status'] = 'Moderate Risk';
          if (rawRiskScore > 70) status = 'High Risk';
          else if (rawRiskScore < 30) status = 'Low Risk';

          return {
            ...p,
            riskScore: rawRiskScore,
            status,
            positiveActions,
            negativeActions,
            lastAction: `Simulated: ${action}`
          };
        }
        return p;
      });
    });
  };

  const addIsolatedPositivePoints = (points: number, logMsg: string) => {
    // Standard anonymous random logger or current user
    const defaultSecUser = 'User_7143'; // active student
    logSecurityAction(defaultSecUser, 'Passed Quiz', 'camp_hostel_01', logMsg, 'decreased');
  };

  const addIsolatedNegativePoints = (points: number, logMsg: string) => {
    const defaultSecUser = 'User_7143';
    logSecurityAction(defaultSecUser, 'Failed Quiz', 'camp_hostel_01', logMsg, 'increased');
  };

  // Dispatch interactive campaign simulations requested from admins
  const handleTriggerTargetSim = (targetUserId: string, campaignId: string) => {
    const freshCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];
    setSelectedCampaign(freshCampaign);
    
    // Switch preview tabs directly so developers/users can witness simulator response immediately
    setActiveSegment('sandbox');
    
    // Auto flag campaign list change message
    const targetUserObj = participants.find(p => p.id === targetUserId);
    if (targetUserObj) {
      logSecurityAction(targetUserId, 'Clicked Landing Link', campaignId, freshCampaign.title, 'increased');
    }
  };

  // Administrative send retraining emails manually triggers target dispatch
  const handleTriggerTrainingEmail = (participantId: string) => {
    // Generate simulated training loop logs
    const randomCamp = campaigns[Math.floor(Math.random() * campaigns.length)];
    setSelectedCampaign(randomCamp);
    logSecurityAction(participantId, 'Clicked Landing Link', randomCamp.id, randomCamp.title, 'increased');
  };

  // Safe reset utility to keep application fresh
  const handleRefreshLedgers = () => {
    setParticipants(INITIAL_PARTICIPANTS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
  };

  // Email client link interaction hooks
  const handleReportPhish = (camp: Campaign) => {
    logSecurityAction('User_6330', 'Reported Phishing', camp.id, camp.title, 'decreased');
    alert(`🎉 Successfully Spot the Flaw!\nThreat reported securely! 20 positive safety credit points synced anonymously to the riskLedger.`);
  };

  const handleClickLink = (camp: Campaign) => {
    logSecurityAction('User_4021', 'Clicked Landing Link', camp.id, camp.title, 'increased');
    // Open the high-fidelity Clone Portal Interface
    setCustomOverlayVisible(true);
    setHasEnteredCredentialFailedState(false);
  };

  // Fake Portal Credentials submits
  const handlePhishSubmitted = () => {
    // Log failures
    logSecurityAction('User_4021', 'Submitted Credentials', selectedCampaign.id, selectedCampaign.title, 'increased');
    setCustomOverlayVisible(false);
    setHasEnteredCredentialFailedState(true);
    
    // Redirect instantly to JIT (teachable moment) Training section
    setActiveSegment('training');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-slate-800 flex flex-col">
      {/* Prime Header & Navigation Matrix */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 static md:sticky top-0 z-40 shadow-md sm:px-6">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-serif font-black text-lg shadow-md border border-indigo-500/30">
              BU
            </div>
            <div>
              <h1 className="font-serif font-black text-slate-100 text-base md:text-lg tracking-tight leading-none mb-0.5 uppercase">
                Bingham University Security Hub
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">
                Institutional Cyber-Security Simulation Environment
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setActiveSegment('sandbox'); setHasEnteredCredentialFailedState(false); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSegment === 'sandbox' ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Inbox Simulation
            </button>
            <button
              onClick={() => setActiveSegment('training')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSegment === 'training' ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              JiT & Modules
            </button>
            <button
              onClick={() => setActiveSegment('admin')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSegment === 'admin' ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Admin Command
            </button>
            <button
              onClick={() => setActiveSegment('ledger')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSegment === 'ledger' ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-sky-400" />
              Risk Ledgers
            </button>
          </nav>

        </div>
      </header>

      {/* Primary Application Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {customOverlayVisible ? (
          /* High-Fidelity portal simulation clone view container */
          <div className="py-12 flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-full max-w-lg mb-6 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                🚨 PORTAL SIMULATOR SIMULATION DISPATCHED
              </span>
              <p className="text-xs text-slate-400 leading-relaxed pt-1.5">
                Spot the URL discrepancies! This mock login portal is running safely inside your workspace container sandbox.
              </p>
            </div>
            
            <PhishingPage
              campaign={selectedCampaign}
              onSubmitMock={handlePhishSubmitted}
              onCancelMock={() => setCustomOverlayVisible(false)}
            />
          </div>
        ) : (
          /* Tabbed views matrix */
          <div className="space-y-6">
            
            {activeSegment === 'sandbox' && (
              <div className="space-y-6">
                {/* General introduction guide */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-1">
                    <h2 className="font-serif font-bold text-slate-100 text-base flex items-center gap-1.5">
                      <ShieldAlert className="w-5 h-5 text-rose-400" />
                      In-House Phishing Simulation Sandbox
                    </h2>
                    <p className="text-xs text-slate-400 leading-normal max-w-2xl">
                      Experience simulated attacks designed specifically around real academic portals. Double check domains, select active campaigns, and report threats to earn risk ledger credits, or click embedded targets to test your defensive reflex actions.
                    </p>
                  </div>
                </div>

                <PhishingEmailSandbox
                  campaigns={campaigns}
                  selectedCampaign={selectedCampaign}
                  onSelectCampaign={setSelectedCampaign}
                  onReportPhish={handleReportPhish}
                  onClickLink={handleClickLink}
                />
              </div>
            )}

            {activeSegment === 'training' && (
              <div className="space-y-8">
                {hasEnteredCredentialFailedState && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl text-amber-200 flex items-start gap-3 items-center">
                    <InfoIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="font-extrabold text-xs block uppercase tracking-wider">Intercept Protocol Initiated: Redirected to JiT Portal</span>
                      <p className="text-xs leading-relaxed mt-0.5">
                        Your interaction registered a mock authentication trace event (credential input submitted). The system has securely deleted your input pass values and redirected you here instantly to study the campaign flaws.
                      </p>
                    </div>
                  </div>
                )}

                {/* Combined JiT Teachable moment and standard courses */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="font-serif font-black text-slate-100 text-lg">Just-in-Time (JiT) Interactive Education Center</h2>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Whether you voluntarily wanted to research cyber threats or were automatically routed here from a simulation test run, this center teaches the mechanical triggers of social engineering attacks.
                    </p>
                  </div>

                  <JiTTrainingPage
                    campaign={selectedCampaign}
                    onContinueToDashboard={() => setActiveSegment('sandbox')}
                    onStartCourse={() => { /* scroll to next card */ }}
                  />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="font-serif font-bold text-slate-100 text-base">Interactive Knowledge Courses</h3>
                    <p className="text-xs text-slate-400">Build permanent defense skill sets across standard courses and receive dynamic certifications.</p>
                  </div>
                  
                  <KnowledgeBaseQuiz
                    onAddPositiveAction={addIsolatedPositivePoints}
                    onAddNegativeAction={addIsolatedNegativePoints}
                  />
                </div>
              </div>
            )}

            {activeSegment === 'admin' && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-1">
                    <h2 className="font-serif font-bold text-slate-100 text-base flex items-center gap-1.5">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      Institutional Risk & Vulnerability Dashboards
                    </h2>
                    <p className="text-xs text-slate-400 leading-normal max-w-2xl">
                      Monitor institution compliance indexes, psychological success factors, real-time telemetry streams, and manage testing scopes for both student departments and clinical teaching divisions.
                    </p>
                  </div>
                </div>

                <AdminDashboard
                  participants={participants}
                  activityLogs={activityLogs}
                  onTriggerTargetSim={handleTriggerTargetSim}
                  onRefreshData={handleRefreshLedgers}
                />
              </div>
            )}

            {activeSegment === 'ledger' && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-1">
                    <h2 className="font-serif font-bold text-slate-100 text-base flex items-center gap-1.5">
                      <ListOrdered className="w-5 h-5 text-sky-400" />
                      Automatic Behavior-Driven riskAnalyzer Scores
                    </h2>
                    <p className="text-xs text-slate-400 leading-normal max-w-2xl">
                      Review individual compliance progress, positive/negative audits tracking, and direct retraining dispatches. Scoreboard listings are completely anonymized to preserve participant comfort.
                    </p>
                  </div>
                </div>

                <RiskLedger
                  participants={participants}
                  activityLogs={activityLogs}
                  onTriggerTrainingEmail={handleTriggerTrainingEmail}
                />
              </div>
            )}

          </div>
        )}

      </main>

      {/* Humble Footer containing Zero Technical margin noise */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-12 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500">
            © 2026 Bingham University Cyber Safety Alliance Campaign. Controlled interactive simulation environment.
          </p>
          <div className="flex gap-4 text-xs font-semibold text-slate-400">
            <span className="cursor-help hover:text-slate-200 transition-colors">Privacy Shield</span>
            <span className="cursor-help hover:text-slate-200 transition-colors">Institutional Guidelines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
