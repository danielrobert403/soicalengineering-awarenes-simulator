import { Campaign, Participant, ActivityLog, LearningModule, QuizQuestion } from './types';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_hostel_01',
    title: 'Urgent Hostel Allocation Re-verification',
    theme: 'urgency',
    sender: 'Bingham Hostel Boarding Committee',
    senderEmail: 'allocations@bingham-uni-portal.com', // Fake domain
    subject: 'URGENT: Re-verification required for immediate room reservation',
    previewText: 'Attention all students. Due to a system misalignment, you must re-verify your credential details online within 24 hours or risk losing your hostel space allocation.',
    body: `Dear Student,

It has come to the attention of the Senate Hostel Accommodation Committee that several room allocations were generated with duplicate records. 

To prevent loss of your assigned room allocation for the upcoming semester, you are requested to immediately re-verify your current student login credentials. 

Failure to do so within 24 hours will result in automatic release of your bed space back into the public pool.

Please click the secure link below to proceed:`,
    timestamp: 'Today, 8:30 AM',
    portalTriggerText: 'Verify Portal Space & Keep Allocation Now',
    portalBannerText: 'URGENCY CRITICAL: Update your details within 24 hours or your hostel room will be released!',
    portalBannerType: 'urgency',
    portalTitle: 'Bingham University - Hostel Allocation Portal',
    portalSubtitle: 'Please enter your current matriculation details to lock your room allocation.',
    flaws: [
      {
        id: 'f1',
        elementId: 'email-sender',
        title: 'Suspicious Email Domain',
        description: 'The official bingham university domain is "binghamuni.edu.ng", not "bingham-uni-portal.com". This is a spoofed lookalike domain.',
        highlightText: 'allocations@bingham-uni-portal.com'
      },
      {
        id: 'f2',
        elementId: 'email-urgency',
        title: 'High Pressure & Urgency Tactic',
        description: 'Phishers pressure you with severe consequences (losing your hostel allocation) inside a strict 24-hour limit to force panic actions.',
        highlightText: 'Failure to do so within 24 hours will result in automatic release of your bed space'
      },
      {
        id: 'f3',
        elementId: 'portal-url',
        title: 'Mismatched Target URL',
        description: 'Check the browser address bar. The mock login page is running on this application, but in a real attack, the address bar would mismatch the legitimate university page.',
        highlightText: 'ais-dev-u5to7stczkybi5xocjekqz...'
      }
    ]
  },
  {
    id: 'camp_vc_02',
    title: 'Directive from the Office of the Vice-Chancellor',
    theme: 'authority',
    sender: 'Office of the Vice-Chancellor',
    senderEmail: 'vc-direct-office@verification-bhuni.net', // Spoofed net domain
    subject: 'MANAGEMENT DIRECTIVE: Official security patch mandate for all user accounts',
    previewText: 'By order of the Vice-Chancellor and Executive Council, all academic staff and registered students must update their web profiles immediately.',
    body: `Dear Members of the Bingham University Community,

As part of the Vice-Chancellor's new Cyber-Infrastructure Upgrade scheme, we are upgrading the global institutional registry logs. 

Pursuant to Senate Decision Resolution 442, all active students and teaching departments are instructed to synchronize their directory credentials.

This is a mandatory security exercise. Failure to comply is a breach of security guidelines and will result in portal lockouts.

Access the administrative compliance tool via the official node link below:`,
    timestamp: 'Yesterday, 2:15 PM',
    portalTriggerText: 'Authenticate Senate Active Directory Verification',
    portalBannerText: 'AUTHORITY MANDATE: Official Directive from the Management - Senate Resolution 442 Profile Synchronization',
    portalBannerType: 'authority',
    portalTitle: 'Bingham Portal - Institutional ID Management',
    portalSubtitle: 'Authorized Senate login only. All authentication activity is archived.',
    flaws: [
      {
        id: 'f1',
        elementId: 'email-sender',
        title: 'Administrative Spoofing',
        description: 'The Vice-Chancellor\'s office uses official internal communication channels or @binghamuni.edu.ng. Phishers use addresses ending with generic extensions like ".net".',
        highlightText: 'vc-direct-office@verification-bhuni.net'
      },
      {
        id: 'f2',
        elementId: 'email-authority',
        title: 'Abuse of Authority',
        description: 'Using high authority figures (like the VC or the Senate) makes you feel like you must obey instantly, bypassing your critical doubts.',
        highlightText: 'Pursuant to Senate Decision Resolution 442, all active students are instructed to synchronize...'
      }
    ]
  },
  {
    id: 'camp_grant_03',
    title: 'Limited COVID-19 Student Grant Disbursements',
    theme: 'scarcity',
    sender: 'University Financial Relief Board',
    senderEmail: 'reimbursements@univ-grant-disbursal.org',
    subject: 'SCARCITY ALERT: Secure your ₦50,000 welfare allowance before funding expires',
    previewText: 'Limited undergraduate financial assistance token allocation available. First 150 applicants registered immediately will get disbursement today.',
    body: `Attention Undergraduates and Staff,

The Federal Ministry of Education, in coordination with Bingham University Support Services, has disbursed structural welfare allowances of ₦50,000 to offset internet data and study costs.

However, funding is strictly limited. Only the first 150 authenticated matriculants to apply will receive the instantaneous direct deposit today.

There are currently only 14 allowance spots remaining. Register immediately to verify your account status and receive your relief voucher.`,
    timestamp: 'May 18, 11:15 AM',
    portalTriggerText: 'Claim ₦50,000 Welfare Voucher Instantly',
    portalBannerText: 'SCARCITY WARNING: Only 14 relief slots remaining! Register immediately to lock in your ₦50,000 payment.',
    portalBannerType: 'scarcity',
    portalTitle: 'University Electronic Disbursement Interface',
    portalSubtitle: 'Validate matriculation identity details to claim active financial aid credits.',
    flaws: [
      {
        id: 'f1',
        elementId: 'email-scarcity',
        title: 'Artificial Scarcity',
        description: 'Claims of "only 14 spots left" create anxiety and FOMO (Fear Of Missing Out), prompting you to fill out details without thinking.',
        highlightText: 'Only the first 150 authenticated matriculants to apply... only 14 allowance spots remaining'
      },
      {
        id: 'f2',
        elementId: 'email-financial',
        title: 'Too Good To Be True',
        description: 'Unsolicited offers of free money or direct bursaries that require typing your main account credentials should always be treated with high skepticism.',
        highlightText: 'allowances of ₦50,000 to offset internet data and study costs'
      }
    ]
  },
  {
    id: 'camp_wifi_04',
    title: 'University Campus Gigabit Wifi Portal Upgrade',
    theme: 'trust',
    sender: 'IT & Infrastructure Services Helpline',
    senderEmail: 'wifi-support@bhuni-it-desk.com',
    subject: 'WIFI UPGRADE: Access code for unlimited high-speed campus internet',
    previewText: 'The IT Department has deployed high-capacity Gigabit access nodes in all lecture rooms. Verify your matriculation details to load your personal wifi key.',
    body: `Hello Binghamite,

We are happy to announce the rollout of our new campus-wide Gigabit-speed fiber-optic WIFI networks across all faculties.

To receive your personal, unlimited SSID entry code and bypass bandwidth throttling, please activate your profile using our institutional centralized authorization gateway.

Use the link below to get your permanent digital wifi passcode immediately. Thank you for making our campus better!`,
    timestamp: 'May 17, 9:02 AM',
    portalTriggerText: 'Get Gigabit Campus Wifi Passcode',
    portalBannerText: 'CAMPUS UTILITIES: Centralized security authentication to obtain your unlimited Gigabit wifi token.',
    portalBannerType: 'trust',
    portalTitle: 'Bingham University Campus Wifi Gatekeeper',
    portalSubtitle: 'Enter your Active Student Directory to render authorization token.',
    flaws: [
      {
        id: 'f1',
        elementId: 'email-trust',
        title: 'Exploitation of Daily Comfort',
        description: 'Wifi is a daily convenience. Attackers exploit your trust in IT services to steal credentials using helpful "upgrades".',
        highlightText: 'Gigabit-speed fiber-optic WIFI networks across all faculties'
      },
      {
        id: 'f2',
        elementId: 'email-spoof-it',
        title: 'Vague Technical Helpdesk Name',
        description: 'Legitimate IT support at Bingham is managed by standard ICT centers. Generic lookalikes like "IT Helpline" is an attempt to create false safety.',
        highlightText: 'wifi-support@bhuni-it-desk.com'
      }
    ]
  }
];

export const INITIAL_PARTICIPANTS: Participant[] = [
  { id: 'User_4021', role: 'student', department: 'Computer Science', riskScore: 78, positiveActions: 1, negativeActions: 3, status: 'High Risk', lastAction: 'Clicked Hostel Allocation Link' },
  { id: 'User_5112', role: 'student', department: 'Humanities & Art', riskScore: 82, positiveActions: 0, negativeActions: 4, status: 'High Risk', lastAction: 'Submitted Credentials on VC Link' },
  { id: 'User_2187', role: 'staff', department: 'Registry & Admissions', riskScore: 45, positiveActions: 3, negativeActions: 2, status: 'Moderate Risk', lastAction: 'Completed Phishing Awareness Course' },
  { id: 'User_6330', role: 'student', department: 'College of Health Sciences', riskScore: 12, positiveActions: 8, negativeActions: 0, status: 'Low Risk', lastAction: 'Successfully Reported Free Grant scam' },
  { id: 'User_8871', role: 'staff', department: 'Faculty of Science', riskScore: 30, positiveActions: 4, negativeActions: 1, status: 'Low Risk', lastAction: 'Reported Campus Wifi scam Office' },
  { id: 'User_3345', role: 'student', department: 'Social Sciences', riskScore: 65, positiveActions: 2, negativeActions: 3, status: 'Moderate Risk', lastAction: 'Clicked Campus Wifi Link' },
  { id: 'User_1092', role: 'staff', department: 'Legal Studies & Library', riskScore: 18, positiveActions: 6, negativeActions: 0, status: 'Low Risk', lastAction: 'Successfully Reported VC Security mandate email' },
  { id: 'User_7143', role: 'student', department: 'Engineering Faculty', riskScore: 50, positiveActions: 3, negativeActions: 3, status: 'Moderate Risk', lastAction: 'Completed Training Quiz' },
  { id: 'User_3045', role: 'student', department: 'Humanities & Art', riskScore: 90, positiveActions: 0, negativeActions: 5, status: 'High Risk', lastAction: 'Submitted Credentials on Hostel Portal' }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'act_101', timestamp: 'May 20, 10:45 AM', userId: 'User_4021', userRole: 'student', department: 'Computer Science', action: 'Clicked Landing Link', campaignId: 'camp_hostel_01', campaignTitle: 'Urgent Hostel Allocation Re-verification', riskImpact: 'increased' },
  { id: 'act_102', timestamp: 'May 20, 09:12 AM', userId: 'User_6330', userRole: 'student', department: 'College of Health Sciences', action: 'Reported Phishing', campaignId: 'camp_grant_03', campaignTitle: 'Limited COVID-19 Student Grant Disbursements', riskImpact: 'decreased' },
  { id: 'act_103', timestamp: 'May 19, 04:30 PM', userId: 'User_5112', userRole: 'student', department: 'Humanities & Art', action: 'Submitted Credentials', campaignId: 'camp_vc_02', campaignTitle: 'Directive from Office of Vice-Chancellor', riskImpact: 'increased' },
  { id: 'act_104', timestamp: 'May 19, 11:20 AM', userId: 'User_2187', userRole: 'staff', department: 'Registry & Admissions', action: 'Completed Course', campaignId: 'camp_hostel_01', campaignTitle: 'Urgent Hostel Allocation Re-verification', riskImpact: 'decreased' },
  { id: 'act_105', timestamp: 'May 18, 02:15 PM', userId: 'User_8871', userRole: 'staff', department: 'Faculty of Science', action: 'Reported Phishing', campaignId: 'camp_wifi_04', campaignTitle: 'Campus Gigabit Wifi Portal Upgrade', riskImpact: 'decreased' },
  { id: 'act_106', timestamp: 'May 18, 01:05 PM', userId: 'User_3045', userRole: 'student', department: 'Humanities & Art', action: 'Submitted Credentials', campaignId: 'camp_hostel_01', campaignTitle: 'Urgent Hostel Allocation Re-verification', riskImpact: 'increased' }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod_phishing_101',
    title: 'Anatomy of Phishing',
    description: 'Master the core digital deception mechanics. Learn how attackers spoof identities and create highly convincing lookalike portals.',
    icon: 'mail',
    readTime: '4 min read',
    sections: [
      {
        heading: '1. What is Phishing?',
        content: 'Phishing is a cyber attack technique where criminals impersonate reputable organizations, administrators, or service providers. Their main objective is to trick you into supplying login user credentials, full matriculation IDs, or biological information. Unlike brute-force hacking, phishing targets the human element.'
      },
      {
        heading: '2. Domain Spoofing Explained',
        content: 'Attackers create web domain names that sound almost identical to the institution. For example, replacing a hyphen with a dot, or adding ".net" / "-portal.com" at the end. Always verify that your browser address bar points to standard official domains ending in binghamuni.edu.ng before typing any security passwords.'
      },
      {
        heading: '3. Standard Red Flags',
        content: '• Bad Sender Addresses: Hidden symbols or spelling typos in client emails.\n• Mismatched Links: Hovering over standard anchor text loads unrelated domains.\n• Impersonal Salutations: Beginning with "Dear Matriculated Student" or "Dear Faculty Colleague" instead of your unique identifier name.'
      }
    ],
    interactiveCheck: {
      prompt: 'Verify your detection skills instantly:',
      scenario: 'You receive an email from "it-services@binghamuni-ng.org" claiming your password expires in 3 hours because of a system crash. The official domain is "binghamuni.edu.ng". What is the correct response?',
      choices: [
        { text: 'Click the security compliance button and enter your default password to refresh it.', isCorrect: false, feedback: 'Incorrect. This address utilizes a lookalike extension ".org" with a secondary hyphen. This is a phishing trap.' },
        { text: 'Ignore the email and report it to the legitimate ICT Helpdesk.', isCorrect: true, feedback: 'Splendid! You correctly identified the mismatched root domain name and spoofed suffix.' },
        { text: 'Reply directly to the sender requesting proof of their administrative position.', isCorrect: false, feedback: 'Incorrect. Replying validates that your school email address is active, inducing more targeted spam.' }
      ]
    }
  },
  {
    id: 'mod_psychology_102',
    title: 'The Psychological Triggers',
    description: 'Understand the primary emotional manipulation tactics attackers exploit to bypass your analytical safeguards.',
    icon: 'brain',
    readTime: '5 min read',
    sections: [
      {
        heading: '1. Why Social Engineering Works',
        content: 'People do not generally fail because they are unintelligent; they fall because they are manipulated using refined psychological triggers. Attackers intentionally target your defense system by appealing directly to emotions: anxiety, greed, respect for authority, and public compliance rules.'
      },
      {
        heading: '2. The Core Triggers Explained',
        content: '• Urgency: Short, stressful deadlines ("Act in 24 hours!") disable analytical reflection.\n• Authority: Supposed directives in the name of the Senate, the Vice-Chancellor, or Government commissions.\n• Scarcity: Implying resources are limited ("only 10 grants remaining") to trigger immediate actions.\n• Trust & Helpful Upgrades: Offering everyday comforts like campus-wide Gigabit Wifi or study aid bonuses to masquerade as friendly helpers.'
      }
    ],
    interactiveCheck: {
      prompt: 'Identify the underlying trigger:',
      scenario: 'An email is signed by "The Dean of Student Affairs" declaring that you must authenticate your profile details immediately or face automatic academic suspension.',
      choices: [
        { text: 'Authority & Fear/Urgency', isCorrect: true, feedback: 'Excellent! The attacker is exploiting the Dean\'s executive status (Authority) coupled with fears of academic discipline to bypass your logic.' },
        { text: 'Scarcity & Greed', isCorrect: false, feedback: 'Incorrect. There is no limited financial allowance or limited material item being presented here.' }
      ]
    }
  },
  {
    id: 'mod_reporting_103',
    title: 'Emergency Response Protocols',
    description: 'Learn the exact steps to report ongoing security threats, quarantine suspicious links, and handle credential exposure.',
    icon: 'shield',
    readTime: '3 min read',
    sections: [
      {
        heading: '1. The Golden Rule: STOP and Report',
        content: 'The moment your security instincts highlight potential red flags, stop all physical interaction immediately. Do not test by clicking links "to see where they lead." Clicking links registers as a visual landing on hacker platforms and exposes your IP and browser footprint.'
      },
      {
        heading: '2. Actionable Reporting Steps',
        content: '• Use the official security dashboard or email add-in tool if available.\n• Send a clean forwarding copy to "threat-report@binghamuni.edu.ng".\n• Never forward the email directly with normal "Reply" or context text intact, as you might inadvertently copy your coworkers on the phishing chain.'
      },
      {
        heading: '3. What if I entered credentials already?',
        content: 'Do not panic. You must immediately log in to the legitimate school directory and modify your security passcodes. Promptly notify IT Helpdesk security administrators about the incident so they can suspend current active session tokens.'
      }
    ],
    interactiveCheck: {
      prompt: 'Test your incident behavior response:',
      scenario: 'You accidentally typed your university password into a suspicious portal page before noticing the url was fraudulent. What is your very first action?',
      choices: [
        { text: 'Shut down your computer and wait to see if strange activity occurs on your account.', isCorrect: false, feedback: 'Incorrect. Inaction gives attackers ample time to hijack session parameters and locking systems.' },
        { text: 'Go directly to the legitimate university portal and update your password immediately.', isCorrect: true, feedback: 'Perfect! Rapid password resets invalidate credentials before attacker servers can exploit them.' },
        { text: 'Email the suspicious website sender requesting to delete your submitted profile data.', isCorrect: false, feedback: 'Incorrect. Attackers are criminals; they will ignore requests and exploit credentials faster.' }
      ]
    }
  }
];

export const KNOWLEDGE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'An email from "finance-services@binghamuni.edu.ng" lists a small spelling error but correctly redirects to binghamuni.edu.ng. Is it 100% safe?',
    options: [
      'Yes, the final link leads to the real university, so you are perfectly protected.',
      'No, attackers can compromised university emails, or create subtle subdomains with invisible characters.',
      'Yes, spelling errors happen on official university memos all the time.'
    ],
    correctIndex: 1,
    explanation: 'System compromises can happen inside official emails. Subtle subdomains or character-spoofing can direct users through unexpected proxies.'
  },
  {
    id: 2,
    question: 'Which emotional response does the banner "YOUR ACCOUNT WILL BE SUSPENDED WITHIN 3 HOURS" directly target?',
    options: [
      'Scarcity',
      'Cognitive Dissonance',
      'Urgency & Fear-induced Compliance'
    ],
    correctIndex: 2,
    explanation: 'By setting an aggressive, hyper-short deadline with extreme loss, phishers exploit panic and flight instincts.'
  },
  {
    id: 3,
    question: 'How can you safely verify if a hyperlink is authentic in your desktop email program?',
    options: [
      'Click the link to check if the browser shows an SSL lock icon first.',
      'Hover your cursor over the link to preview the full actual URL path before clicking.',
      'Assume it is safe if there is a university shield logo present in the body.'
    ],
    correctIndex: 1,
    explanation: 'Hovering displays the real URL path background. Logo images can easily be copy-pasted in seconds by attackers.'
  },
  {
    id: 4,
    question: 'Which of the following describes a Spoofed Domain correctly?',
    options: [
      'A secure secondary system backing up authentic school databases.',
      'An address specifically crafted to match a legitimate site using slight typo variations.',
      'A system configured to automatically redirect spam to quarantine directories.'
    ],
    correctIndex: 1,
    explanation: 'Spoofed domains are lookalike paths (e.g., changing "i" to "1") styled to appear genuine while controlled by malicious operators.'
  }
];
