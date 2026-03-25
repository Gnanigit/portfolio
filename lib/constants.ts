import type { Project, Skill, Experience, Stat } from "./types";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const SI = "https://cdn.simpleicons.org";

export const PERSONAL = {
  name: "Gnaneswar Yalla",
  initials: "GN",
  tagline: "Building scalable, AI-powered full stack solutions.",
  bio: "I'm a Full Stack Developer at Quadric Information Technology, building enterprise-grade applications powered by AI and modern cloud infrastructure. I specialize in the MERN stack, AWS serverless architecture, and integrating Generative AI into real-world products — from government platforms to enterprise SaaS.",
  location: "Hyderabad, Telangana, India",
  email: "gnani4412@gmail.com",
  phone: "+91 9392864866",
  github: "https://github.com/Gnanigit",
  linkedin: "https://linkedin.com/in/gnaneswar-yalla-730ba4250",
  twitter: "https://twitter.com/gnani",
  resumeUrl: "/Gnaneswar_Yalla_Resume.pdf",
  roles: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "AWS & Azure Cloud Engineer",
    "Generative AI Integrator",
    "React & React Native Developer",
    "Enterprise App Developer",
    "SPFx & SharePoint Developer",
  ],
  availableForWork: true,
  funFact: "I debug with console.log and I'm not ashamed.",
  currentlyLearning: "Deepening AI expertise & Cloud / DevOps mastery",
};

export const STATS: Stat[] = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Projects Completed", value: 8, suffix: "+" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Problems Solved", value: 600, suffix: "+" },
];

export const SKILLS: Skill[] = [
  // ── Frontend ──────────────────────────────────────────
  {
    name: "React.js",
    icon: `${DI}/react/react-original.svg`,
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: `${DI}/nextjs/nextjs-original.svg`,
    category: "Frontend",
  },
  {
    name: "React Native",
    icon: `${DI}/react/react-original.svg`,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: `${DI}/typescript/typescript-original.svg`,
    category: "Frontend",
  },
  {
    name: "JavaScript",
    icon: `${DI}/javascript/javascript-original.svg`,
    category: "Frontend",
  },
  {
    name: "HTML5",
    icon: `${DI}/html5/html5-original.svg`,
    category: "Frontend",
  },
  { name: "CSS3", icon: `${DI}/css3/css3-original.svg`, category: "Frontend" },
  {
    name: "Tailwind CSS",
    icon: `${DI}/tailwindcss/tailwindcss-original.svg`,
    category: "Frontend",
  },
  {
    name: "Framer Motion",
    icon: `${DI}/framermotion/framermotion-original.svg`,
    category: "Frontend",
  },
  {
    name: "SPFx",
    icon: `https://img.icons8.com/?size=100&id=117558&format=png&color=FFFFFF`,
    category: "Frontend",
  },

  // ── Backend ───────────────────────────────────────────
  {
    name: "Node.js",
    icon: `${DI}/nodejs/nodejs-original.svg`,
    category: "Backend",
  },
  {
    name: "Express.js",
    icon: `${DI}/express/express-original.svg`,
    category: "Backend",
  },
  {
    name: "AWS Lambda",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "Backend",
  },
  {
    name: "REST APIs",
    icon: `${DI}/fastapi/fastapi-original.svg`,
    category: "Backend",
  },
  {
    name: "Serverless",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "Backend",
  },
  { name: "Java", icon: `${DI}/java/java-original.svg`, category: "Backend" },
  {
    name: "Python",
    icon: `${DI}/python/python-original.svg`,
    category: "Backend",
  },

  // ── Database ──────────────────────────────────────────
  {
    name: "MongoDB",
    icon: `${DI}/mongodb/mongodb-original.svg`,
    category: "Database",
  },
  {
    name: "PostgreSQL",
    icon: `${DI}/postgresql/postgresql-original.svg`,
    category: "Database",
  },
  {
    name: "MySQL",
    icon: `${DI}/mysql/mysql-original.svg`,
    category: "Database",
  },
  {
    name: "Firebase",
    icon: `${DI}/firebase/firebase-plain.svg`,
    category: "Database",
  },
  {
    name: "AWS Aurora",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "Database",
  },

  // ── Cloud & DevOps ────────────────────────────────────
  {
    name: "AWS",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "AWS EC2",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "AWS S3",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "Azure",
    icon: `${DI}/azure/azure-original.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "Azure AD",
    icon: `${DI}/azure/azure-original.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "Azure App Service",
    icon: `${DI}/azure/azure-original.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "Docker",
    icon: `${DI}/docker/docker-original.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "GitHub Actions",
    icon: `${DI}/github/github-original.svg`,
    category: "Cloud & DevOps",
  },
  {
    name: "CI/CD",
    icon: ``,
    category: "Cloud & DevOps",
  },
  {
    name: "Linux",
    icon: `${DI}/linux/linux-original.svg`,
    category: "Cloud & DevOps",
  },

  // ── AI & ML ───────────────────────────────────────────
  {
    name: "Gemini AI",
    icon: `${DI}/google/google-original.svg`,
    category: "AI & ML",
  },
  {
    name: "AWS Bedrock",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "AI & ML",
  },
  {
    name: "AWS Textract",
    icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    category: "AI & ML",
  },
  {
    name: "NLP",
    icon: `${DI}/python/python-original.svg`,
    category: "AI & ML",
  },
  {
    name: "Machine Learning",
    icon: `${DI}/tensorflow/tensorflow-original.svg`,
    category: "AI & ML",
  },

  // ── Tools ─────────────────────────────────────────────
  { name: "Git", icon: `${DI}/git/git-original.svg`, category: "Tools" },
  {
    name: "GitHub",
    icon: `${DI}/github/github-original.svg`,
    category: "Tools",
  },
  { name: "Figma", icon: `${DI}/figma/figma-original.svg`, category: "Tools" },
  {
    name: "Postman",
    icon: `${DI}/postman/postman-original.svg`,
    category: "Tools",
  },
  {
    name: "VS Code",
    icon: `${DI}/vscode/vscode-original.svg`,
    category: "Tools",
  },
  {
    name: "WordPress",
    icon: `${DI}/wordpress/wordpress-plain.svg`,
    category: "Tools",
  },
  { name: "Canva", icon: `${DI}/canva/canva-original.svg`, category: "Tools" },
  {
    name: "Google Colab",
    icon: `${DI}/google/google-original.svg`,
    category: "Tools",
  },
  {
    name: "SharePoint",
    icon: `https://img.icons8.com/?size=100&id=117558&format=png&color=FFFFFF`,
    category: "Tools",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "conference-astrazeneca",
    title: "Conference App - AstraZeneca",
    description:
      "Enterprise conference management with role-based access, Microsoft SSO, and a fully serverless AWS backend.",
    longDescription:
      "Enterprise-grade conference management application for AstraZeneca with role-based access for Admins and Attendees. Integrated Microsoft SSO via Azure AD. Architected a fully serverless backend on AWS Lambda + Aurora PostgreSQL with CloudFront, S3, API Gateway, VPC, Secrets Manager, and KMS.",
    image: "/images/project-conference.jpg",
    techStack: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "AWS Lambda",
      "AWS KMS",
      "Aurora PostgreSQL",
      "Azure AD",
      "AWS S3",
      "AWS CloudFront",
      "AWS API Gateway",
      "AWS VPC",
      "AWS Secrets Manager",
    ],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: "clofast",
    title: "Clofast - AI Reconciliation Platform",
    description:
      "AI-powered enterprise reconciliation platform reducing manual financial effort by 90% using AWS Bedrock and Gemini AI.",
    longDescription:
      "Intelligent enterprise-grade reconciliation platform automating complex multi-way financial reconciliations using AI and NLP. Integrated AWS Textract and Google Gemini AI for document processing, and AWS Bedrock (Claude 3.5 Sonnet) for multi-way matching and discrepancy detection.",
    image: "/images/project-clofast.jpg",
    techStack: [
      "React",
      "Express.js",
      "Node.js",
      "AWS Bedrock",
      "Gemini AI",
      "MongoDB",
      "Tailwind CSS",
    ],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: "hack2build",
    title: "Hack2Build – Hackathon Platform",
    description:
      "Full-featured hackathon management platform with AI-driven NLP, CI/CD pipelines, and role-based access for 4 user types.",
    longDescription:
      "Hackathon management platform with end-to-end architecture for Participants, Organizers, Reviewers, and Admins. Features AI-driven NLP for hackathon creation, resume data extraction, and personalized recommendations. Deployed on Azure App Service with Docker and GitHub Actions CI/CD.",
    image: "/images/project-hack2build.jpg",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
      "Microsoft Azure App Service",
      "GitHub Actions",
      "Tailwind CSS",
      "Figma",
      "Email Automation",
      "Gemini AI",
      "NLP",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/QuadricIT2018/hack2build",
    featured: true,
  },
  {
    id: "obu-calendar",
    title: "US OBU Calendar – AstraZeneca",
    description:
      "Enterprise SharePoint planning calendar with 6 calendar views, Microsoft SSO, and automated email notifications.",
    longDescription:
      "Enterprise business planning calendar for AstraZeneca supporting multiple business units. Features monthly, quarterly, yearly, list, single-day, and multi-day views with event overlays and timezone handling. Integrated Microsoft SSO via Active Directory and export options (PDF, Excel, CSV).",
    image: "/images/project-calendar.jpg",
    techStack: [
      "React",
      "SPFx",
      "SharePoint Lists",
      "Azure AD",
      "Microsoft Graph API",
      "Custom SPFx Package",
      "Email - Graph API",
    ],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
  {
    id: "nibandhana",
    title: "Nibandhana – AI Legal Translation",
    description:
      "AI platform translating Telangana Secretariat legal documents from English to Telugu, deployed on AWS.",
    longDescription:
      "AI platform to translate Telangana Secretariat legal documents from English to Telugu with high legal accuracy. Integrated Google Gemini AI for contextual translation of confidential government documents. Deployed on AWS (EC2, S3, Route 53) with Docker and GitHub Actions CI/CD.",
    image: "/images/project-nibandhana.jpg",
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS EC2",
      "Gemini AI",
      "Docker",
      "Tailwind CSS",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/Gnanigit/nibandhana",
    featured: false,
  },
  {
    id: "expiry-tracker",
    title: "Expiry Tracker",
    description:
      "Mobile app for automated product expiry tracking with barcode scanning, AI text extraction, and cross-platform price comparison.",
    longDescription:
      "Mobile app for automated product expiry tracking using barcode scanning and Azure AI-powered text extraction. Features price comparison across Amazon, Flipkart, MedPlus, and Apollo Pharmacy. Includes multilingual support, text-to-audio, fake product detection, and Google login.",
    image: "/images/project-expiry.jpg",
    techStack: [
      "React Native",
      "Express.js",
      "MongoDB",
      "Azure AI Services",
      "Google OAuth",
      "Third-party APIs",
      "Barcode Scanning",
      "Audio to Text",
      "Tailwind CSS",
      "Figma",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/Gnanigit/Expiry_Tracker",
    featured: false,
  },
  {
    id: "studyeasy",
    title: "StudyEasy",
    description:
      "Centralized study resource platform with Gemini-powered chatbot, role-based access, and JWT + OTP authentication.",
    longDescription:
      "Centralized study resource platform minimizing distractions and enhancing learning efficiency. Deployed on Vercel with role-based access for Admins and Learners, course management, and interactive dashboards. Integrated Gemini API for chatbot assistance and JWT + OTP-based secure authentication.",
    image: "/images/project-studyeasy.jpg",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Gemini API",
      "Tailwind CSS",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/Gnanigit/StudyEasy_React",
    featured: false,
  },
  {
    id: "anusan",
    title: "Anusan – AI Judicial Translation",
    description:
      "AI platform translating Telangana High Court judgments to Telugu and generating headnotes with full confidentiality.",
    longDescription:
      "AI platform to translate Telangana High Court judgments from English to Telugu and generate accurate headnotes, ensuring confidentiality and legal compliance. Integrated Google Gemini AI for sensitive judicial document translation. Deployed on AWS with Docker and GitHub Actions CI/CD.",
    image: "/images/project-anusan.jpg",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "AWS",
      "Gemini AI",
      "Docker",
      "Tailwind CSS",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/QuadricIT2018/Anusan_MVP",
    featured: false,
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "quadric-fulltime",
    company: "Quadric Information Technology",
    role: "Software Developer",
    duration: "March 2025 - Present",
    startDate: "2025-03",
    endDate: "present",
    location: "Hyderabad, Telangana",
    current: true,
    description: [
      "Developed and maintained US OBU Calendar for AstraZeneca — a custom SharePoint application with React, SPFx, and SharePoint Lists, enhancing team collaboration and scheduling efficiency.",
      "Contributing as a Software Developer to an AI-driven project for a Telangana government department and designing a prototype for an AI full-stack solution in the judicial sector.",
      "Building Hack2Build, Quadric IT's internal Hackathon management platform, to streamline event coordination and innovation tracking.",
      "Designed and delivered an enterprise-scale Conference Management Application for AstraZeneca with full-stack development, Microsoft Azure AD SSO, and complete AWS infrastructure (Lambda, API Gateway, Aurora PostgreSQL).",
    ],
    techStack: [
      "React",
      "SPFx",
      "SharePoint Lists",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS Lambda",
      "AWS API Gateway",
      "AWS Aurora (PostgreSQL)",
      "AWS S3",
      "AWS CloudFront",
      "AWS Secrets Manager",
      "AWS KMS",
      "AWS VPC",
      "AWS EC2",
      "Azure AD",
      "Azure App Service",
      "Azure Blob Storage",
      "Microsoft Graph API",
      "Docker",
      "GitHub Actions",
      "Gemini AI",
      "NLP",
    ],
  },
  {
    id: "quadric-intern",
    company: "Quadric Information Technology",
    role: "Full Stack Developer – Intern",
    duration: "June 2024 – September 2024",
    startDate: "2024-06",
    endDate: "2024-09",
    location: "Hyderabad, Telangana",
    current: false,
    description: [
      "Worked on CloFast, an AI-powered platform leveraging NLP and Generative AI to perform data reconciliation and automate enterprise workflows across finance domains.",
      "Gained in-depth knowledge of integrating Artificial Intelligence with accounting principles, leveraging SAP and financial domain insights.",
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "AWS Bedrock",
      "Gemini AI",
      "NLP",
      "Figma",
      "Tailwind CSS",
    ],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const TECH_FILTER_TAGS = [
  "All",
  "React",
  "Node.js",
  "AWS",
  "MongoDB",
  "Gemini AI",
  "Docker",
  "Azure AD",
];

export const CHATBOT_SYSTEM_PROMPT = `You are a helpful portfolio assistant for Gnaneswar Yalla (Gnani), a Full Stack Developer.
Answer visitor questions about his skills, experience, projects, and availability.
Be concise, friendly, and professional. If you don't know something, say so honestly.

About Gnaneswar Yalla:
- Full name: Gnaneswar Yalla
- Role: Software Developer at Quadric Information Technology
- Location: Hyderabad, Telangana, India
- Email: gnani4412@gmail.com
- Phone: +91 9392864866
- GitHub: github.com/Gnanigit
- LinkedIn: linkedin.com/in/gnaneswar-yalla-730ba4250
- Available for: Full-time roles and freelance projects

Education:
- B.Tech in Computer Science & Engineering — Vishnu Institute of Technology (2021–2025), GPA: 9.02/10
- Honors in CSE — Vishnu Institute of Technology, GPA: 8.4/10

Skills:
- Frontend: React.js, Next.js, React Native, TypeScript, JavaScript, Tailwind CSS, Framer Motion, SPFx
- Backend: Node.js, Express.js, AWS Lambda, REST APIs, Serverless Architecture
- Databases: MongoDB, PostgreSQL, AWS Aurora, MySQL, Firebase
- Cloud & DevOps: AWS (EC2, S3, CloudFront, Lambda, Bedrock, Textract, API Gateway, Secrets Manager, KMS), Azure AD, Azure App Service, Docker, GitHub Actions, CI/CD
- AI: Google Gemini AI, AWS Bedrock (Claude 3.5 Sonnet), AWS Textract, NLP, Generative AI
- Languages: JavaScript, Java, Python

Experience:
- Software Developer at Quadric IT (March 2025–Present): Building enterprise apps for AstraZeneca and Telangana government
- Full Stack Developer Intern at Quadric IT (June–September 2024): Built AI-powered financial reconciliation platform CloFast

Key Projects:
1. Conference App (AstraZeneca) — React, AWS Lambda, Aurora PostgreSQL, Azure AD
2. Clofast — AI reconciliation platform with AWS Bedrock + Gemini AI, reduced manual effort by 90%
3. Hack2Build — Hackathon management platform with NLP and CI/CD
4. US OBU Calendar (AstraZeneca) — SPFx + React + SharePoint
5. Nibandhana & Anusan — AI legal/judicial document translation for Telangana government
6. Expiry Tracker — React Native mobile app with Azure AI and price comparison
7. StudyEasy — Study platform with Gemini chatbot

Achievements:
- GFG Institute Rank: Top 1% (12 out of 3000)
- Solved 600+ problems on LeetCode & GeeksForGeeks
- 2nd Prize in IoT Protothon at VIT College Fest
- Best Full Stack Project Award — Codinza/StudyOwl
- Participated in Smart India Hackathon 2022 & 2023`;
