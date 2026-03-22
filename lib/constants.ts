import type { Project, Skill, Experience, Stat } from './types'

export const PERSONAL = {
  name: 'Gnani',
  initials: 'GN',
  tagline: 'Building digital experiences that matter.',
  bio: "I'm a passionate Full Stack Developer specializing in the MERN stack. I craft performant, scalable, and visually compelling web applications — from pixel-perfect UIs to robust server-side architectures. I love turning complex problems into elegant, user-friendly solutions.",
  location: 'India',
  email: 'gnani@example.com',
  github: 'https://github.com/gnani',
  linkedin: 'https://linkedin.com/in/gnani',
  twitter: 'https://twitter.com/gnani',
  resumeUrl: '/resume.pdf',
  roles: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript Engineer',
  ],
  availableForWork: true,
  funFact: 'I debug with console.log and I\'m not ashamed.',
  currentlyLearning: 'Next.js 14 App Router + AI integrations',
}

export const STATS: Stat[] = [
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Projects Completed', value: 25, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Happy Clients', value: 10, suffix: '+' },
]

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'Frontend' },
  { name: 'JavaScript', icon: '🟡', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Frontend' },
  { name: 'Framer Motion', icon: '🎬', category: 'Frontend' },
  { name: 'HTML5', icon: '🧱', category: 'Frontend' },
  { name: 'CSS3', icon: '💅', category: 'Frontend' },
  // Backend
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Express.js', icon: '🚂', category: 'Backend' },
  { name: 'REST APIs', icon: '🔗', category: 'Backend' },
  { name: 'GraphQL', icon: '🔺', category: 'Backend' },
  { name: 'JWT Auth', icon: '🔐', category: 'Backend' },
  // Database
  { name: 'MongoDB', icon: '🍃', category: 'Database' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  { name: 'Redis', icon: '⚡', category: 'Database' },
  { name: 'Mongoose', icon: '🗄️', category: 'Database' },
  // Tools & DevOps
  { name: 'Git', icon: '📦', category: 'Tools & DevOps' },
  { name: 'Docker', icon: '🐳', category: 'Tools & DevOps' },
  { name: 'Vercel', icon: '▲', category: 'Tools & DevOps' },
  { name: 'AWS', icon: '☁️', category: 'Tools & DevOps' },
  { name: 'Postman', icon: '📮', category: 'Tools & DevOps' },
  { name: 'Figma', icon: '🎭', category: 'Tools & DevOps' },
]

export const PROJECTS: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with real-time inventory, Stripe payments, and admin dashboard.',
    longDescription:
      'A production-ready e-commerce platform built with Next.js, Node.js, and MongoDB. Features include real-time inventory tracking, Stripe payment integration, JWT authentication, admin dashboard with analytics, and email notifications.',
    image: '/images/project-ecommerce.jpg',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://demo.gnani.dev',
    githubUrl: 'https://github.com/gnani/ecommerce',
    featured: true,
  },
  {
    id: 'task-manager',
    title: 'Team Task Manager',
    description: 'Real-time collaborative task management app with drag-and-drop, Kanban boards, and WebSocket sync.',
    longDescription:
      'A collaborative task management tool inspired by Linear. Built with React, Socket.io, and Express. Features drag-and-drop Kanban boards, real-time collaboration, team workspaces, priority labels, and deadline tracking.',
    image: '/images/project-tasks.jpg',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    liveUrl: 'https://tasks.gnani.dev',
    githubUrl: 'https://github.com/gnani/task-manager',
    featured: true,
  },
  {
    id: 'ai-content-tool',
    title: 'AI Content Generator',
    description: 'SaaS tool that generates marketing copy, blog posts, and social captions using Claude API.',
    longDescription:
      'A SaaS content generation platform powered by Claude AI. Users can generate marketing copy, blog posts, and social media captions. Built with Next.js App Router, Stripe subscriptions, and rate limiting.',
    image: '/images/project-ai.jpg',
    techStack: ['Next.js', 'Claude API', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://ai.gnani.dev',
    githubUrl: 'https://github.com/gnani/ai-content',
    featured: true,
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts, custom date ranges, and PDF export.',
    longDescription:
      'A comprehensive analytics dashboard built for SaaS products. Features real-time data visualization, custom date range filtering, CSV/PDF export, and role-based access control.',
    image: '/images/project-analytics.jpg',
    techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Redis'],
    githubUrl: 'https://github.com/gnani/analytics',
    featured: false,
  },
  {
    id: 'chat-app',
    title: 'Real-Time Chat App',
    description: 'Slack-like messaging app with channels, DMs, file sharing, and push notifications.',
    longDescription:
      'A real-time messaging application with Socket.io. Features group channels, direct messages, file sharing, read receipts, push notifications, and message threading.',
    image: '/images/project-chat.jpg',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'AWS S3'],
    githubUrl: 'https://github.com/gnani/chat-app',
    featured: false,
  },
  {
    id: 'blog-cms',
    title: 'Headless Blog CMS',
    description: 'Custom CMS with MDX support, draft/publish workflow, and multi-author capabilities.',
    longDescription:
      'A headless CMS built for developer blogs. Features MDX content, draft/publish workflow, multi-author support, SEO optimization, and a beautiful admin interface.',
    image: '/images/project-blog.jpg',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'MDX', 'Tailwind'],
    liveUrl: 'https://blog.gnani.dev',
    githubUrl: 'https://github.com/gnani/blog-cms',
    featured: false,
  },
]

export const EXPERIENCE: Experience[] = [
  {
    id: 'freelance',
    company: 'Self-Employed',
    role: 'Full Stack Developer (Freelance)',
    duration: '2023 – Present',
    startDate: '2023-01',
    endDate: 'present',
    location: 'Remote',
    current: true,
    description: [
      'Delivered 15+ web applications for clients across e-commerce, SaaS, and fintech verticals.',
      'Built full-stack solutions with Next.js, Node.js, MongoDB — cutting client time-to-market by 40%.',
      'Integrated third-party services: Stripe, Twilio, AWS S3, Cloudinary, and various REST APIs.',
      'Maintained 99.9% uptime across all production deployments on Vercel and AWS.',
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Vercel'],
  },
  {
    id: 'startup',
    company: 'TechWave Solutions',
    role: 'Full Stack Developer',
    duration: '2022 – 2023',
    startDate: '2022-03',
    endDate: '2023-01',
    location: 'Hyderabad, India',
    current: false,
    description: [
      'Led development of the company\'s flagship SaaS product serving 5,000+ active users.',
      'Reduced API response times by 60% through MongoDB query optimization and Redis caching.',
      'Collaborated with design team to implement a complete UI overhaul using React and Tailwind CSS.',
      'Mentored 2 junior developers and established code review practices that improved code quality.',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'Redis', 'Express', 'Tailwind'],
  },
  {
    id: 'intern',
    company: 'DevCraft Agency',
    role: 'Frontend Developer (Intern)',
    duration: '2021 – 2022',
    startDate: '2021-06',
    endDate: '2022-03',
    location: 'Bangalore, India',
    current: false,
    description: [
      'Built responsive landing pages and marketing sites for 8 client projects using React.',
      'Implemented pixel-perfect designs from Figma with cross-browser compatibility.',
      'Reduced bundle sizes by 35% through code splitting and lazy loading strategies.',
      'Contributed to internal component library used across 4 active projects.',
    ],
    techStack: ['React', 'JavaScript', 'CSS3', 'Tailwind', 'Figma', 'Git'],
  },
]

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const TECH_FILTER_TAGS = [
  'All',
  'React',
  'Next.js',
  'Node.js',
  'MongoDB',
  'TypeScript',
  'AWS',
]

export const CHATBOT_SYSTEM_PROMPT = `You are a helpful portfolio assistant for Gnani, a Full Stack MERN developer.
Answer visitor questions about his skills, experience, projects, and availability.
Be concise, friendly, and professional. If you don't know something, say so honestly.

About Gnani:
- Full name: Gnani
- Role: Full Stack Developer (MERN Stack)
- Location: India (available for remote work worldwide)
- Experience: 3+ years of full stack development
- Available for: freelance projects and full-time remote roles

Skills: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Node.js, Express.js, MongoDB, PostgreSQL, Redis, GraphQL, REST APIs, JWT Auth, Docker, AWS, Git, Vercel

Recent Projects:
1. E-Commerce Platform — Next.js + Node.js + MongoDB + Stripe
2. Team Task Manager — React + Socket.io + Express + MongoDB
3. AI Content Generator — Next.js + Claude API + Stripe + PostgreSQL
4. Analytics Dashboard — React + Node.js + Chart.js + Redis

Experience:
- Freelance Full Stack Developer (2023–Present): 15+ web apps delivered
- TechWave Solutions (2022–2023): Led SaaS product development for 5000+ users
- DevCraft Agency (2021–2022): Frontend development intern

Contact: gnani@example.com
GitHub: github.com/gnani
LinkedIn: linkedin.com/in/gnani`
