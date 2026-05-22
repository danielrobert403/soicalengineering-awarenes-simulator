export interface PhishingFlaw {
  id: string;
  elementId: string; // DOM-like identifier or visual tag
  title: string;
  description: string;
  highlightText: string; // The text that is suspicious
}

export interface Campaign {
  id: string;
  title: string;
  theme: 'urgency' | 'authority' | 'scarcity' | 'trust';
  sender: string;
  senderEmail: string;
  subject: string;
  previewText: string;
  body: string;
  timestamp: string;
  portalTriggerText: string; // e.g. "Review hostel allocation list"
  portalBannerText: string;  // e.g. "Bingham Portal Session Expiring!"
  portalBannerType: 'urgency' | 'authority' | 'scarcity' | 'trust';
  portalTitle: string;
  portalSubtitle: string;
  flaws: PhishingFlaw[];
}

export interface Participant {
  id: string;
  role: 'student' | 'staff';
  department: string;
  riskScore: number; // 0 - 100 (high risk is bad)
  positiveActions: number; // Reported, completed quizzes
  negativeActions: number; // Clicked links, submitted password
  status: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  lastAction: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userRole: 'student' | 'staff';
  department: string;
  action: 'Clicked Landing Link' | 'Submitted Credentials' | 'Reported Phishing' | 'Completed Course' | 'Failed Quiz' | 'Passed Quiz';
  campaignId: string;
  campaignTitle: string;
  riskImpact: 'increased' | 'decreased' | 'neutral';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  readTime: string;
  sections: {
    heading: string;
    content: string;
  }[];
  interactiveCheck: {
    prompt: string;
    scenario: string;
    choices: { text: string; isCorrect: boolean; feedback: string }[];
  };
}
