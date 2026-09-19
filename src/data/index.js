// COMPONENT: ConfigConstants
// import {
//   Atom,
//   Workflow,
//   Palette,
//   PlugZap,
//   Zap,
//   ShieldCheck,
//   Database,
//   Wrench,
//   Mail,
//   Code2,
//   BriefcaseBusiness,
//   Rocket,
// } from "lucide-react";

// import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
  htmlLogo,
  cssLogo,
  jsLogo,
  reactLogo,
  gitLogo,
  firebaseLogo,
  framerLogo,
  mongodbLogo,
  nodejsLogo,
  reduxLogo,
} from "../assets/index";

export const siteConfig = {
  owner: "Jatin Agrahari",
  alias: "JJ",
  title: "Jatin | FrontEnd Developer",
  footerDescription:
    "Transforming ideas into responsive, performant, and production-ready React applications.",
  heroHeading:
    "Full-Stack Developer building reliable systems with React & Node.js.",
  heroDescription:
    "I'm a full-stack developer with a strong focus on backend fundamentals — building APIs, working with databases, and understanding how systems actually work under the hood, not just how they look.",
  email: "hello@jatinagrahari.com",
  ctaLabel: "Let's Talk",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/jatinagrahari",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jatinagrahari/",
    },
    {
      label: "X",
      href: "https://x.com/agrahari_jatin_",
    },
    // {
    //   label: "Upwork",
    //   href: "https://www.upwork.com/freelancers/~01f725fb64f435cdd9",
    // },
  ],
};

export const aboutData = {
  aboutTitle: `I BUILD WEB APPS END TO END, AND I'M MOVING FROM INTERFACES TO THE BACKEND THAT POWERS THEM.`,
  aboutIntro: `I'm Jatin Agrahari, a web developer based in India with 2.5 years of professional experience. I started on the frontend and now I'm focused on backend engineering: APIs, databases and the systems behind the interface.`,
  cards: [
    {
      title: `FRONTEND ROOTS`,
      description: `I spent 2.5 years building React interfaces for a real organisation. It taught me what users expect from a product and how a change gets from code to production.`,
    },
    {
      title: `BACKEND FOCUS`,
      description: `Now I build the other half: REST APIs, authentication, MongoDB data models and payments. I care about clear structure, validation and error messages that make sense.`,
    },
    {
      title: `LEARNING BY BUILDING`,
      description: `I learn by shipping projects end to end and fixing what breaks. Every project pushes me a bit past what I already know.`,
    },
  ],
  journeyTitle: `From a computer science diploma to full-stack apps. This is how I got here.`,
  timelineData: [
    {
      year: `2021`,
      title: `DIPLOMA · Where it started`,
      description: `I finished a diploma in computer science and started building for the web. JavaScript became my main language.`,
    },
    {
      year: `2022`,
      title: `INEURON · Full-stack JavaScript`,
      description: `I completed iNeuron's full-stack JavaScript course. It covered frontend and backend, and I went deeper on the frontend.`,
    },
    {
      year: `2023`,
      title: `INTERNSHIP · First real projects`,
      description: `As an intern at iNeuron I built The Fade, an ecommerce frontend, on my own, and ResumeHub, a resume builder, with a teammate.`,
    },
    {
      year: `2023`,
      title: `PUNYODAY TRUST · Web Developer`,
      description: `I joined as Web Developer and stayed 2.5 years. I built and maintained the organisation's website in React and Tailwind, handled form requests and kept the events section up to date.`,
    },
    {
      year: `2025`,
      title: `WIDENING THE STACK`,
      description: `Alongside my job I picked up modern frontend libraries and backend fundamentals, and practiced building and testing APIs.`,
    },
    {
      year: `2026`,
      title: `GOING BACKEND FULL-TIME `,
      description: ` I went full-time on backend. I built a MERN ecommerce store and a blog platform, and I'm now exploring React Native and looking for backend roles.`,
    },
  ],
};

export const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "CV",
    path: "/resume/resume.pdf",
    isExternal: true,
  },
];

export const Tech = [
  { name: "html", path: htmlLogo },
  { name: "css", path: cssLogo },
  { name: "js", path: jsLogo },
  { name: "react", path: reactLogo },
  { name: "git", path: gitLogo },
  { name: "firebase", path: firebaseLogo },
  { name: "framer", path: framerLogo },
  { name: "nodejs", path: nodejsLogo },
  { name: "redux", path: reduxLogo },
  { name: "mongodb", path: mongodbLogo },
];

export const ExperienceData = [
  {
    role: "Web Developer",
    company: "Punyoday Trust",
    type: "Organization",
    period: "July 2023 — Jan 2026",
    bullets: [
      "Created and managed the organization's website end-to-end for 2.5 years, handling ongoing maintenance and troubleshooting.",
      "Built and managed form-based data collection workflows used across events and organizational activities.",
      "Shipped feature updates and content changes directly from organizational requirements.",
      "Integrated EmailJS to automate email delivery on form submissions, including auto-reply confirmations for users.",
    ],
    summary:
      "Created and maintained a production React website for an NGO, owning feature development, troubleshooting, form-based workflows, and content updates directly from organizational requirements.",
    stack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Email JS",
      "REST APIs",
      "Git",
      "GitHub",
      "Vite",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "iNeuron",
    type: "Company",
    period: "Jan 2023 — Feb 2023",
    bullets: [
      "Built 'The Fade' — an e-commerce platform frontend — independently, using React, Zustand, and React Router.",
      "Collaborated in a two-person team to build 'ResumeHub' — a resume builder app — using React, Zustand, and Tailwind CSS.",
      "Integrated REST APIs to handle dynamic data across both projects.",
      "Worked with component-based architecture and state management in a fast-paced, project-driven internship.",
    ],
    summary:
      "Completed a focused frontend development internship at iNeuron, building two React applications — an e-commerce frontend built solo and a resume builder app built in a two-person team — with an emphasis on state management, routing, and REST API integration.",
    stack: [
      "React.js",
      "Zustand",
      "React Router",
      "Tailwind CSS",
      "REST APIs",
      "Git",
    ],
  },
];
