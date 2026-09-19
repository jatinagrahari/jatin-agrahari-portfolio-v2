import {
  ampss2,
  ampss3,
  ampss4,
  ttsss1,
  ttsss2,
  ttsss3,
  ttsss4,
  ttsss5,
  bass1,
  bass2,
  bass3,
  bass4,
  bass5,
  astra,
  storejj,
  taskflow,
  blogstack,
  stjjss1,
  stjjss2,
  stjjss3,
  stjjss4,
  stjjss5,
  stjjss6,
  stjjss7,
  stjjss8,
  stjjss9,
  stjjss10,
} from "../assets/projectsImages";

export const projectsData = [
  // store jj
  {
    id: "storejj",
    projectType: "Full-Stack",
    projectTitle: "JJ STORE: A FULL-STACK ECOMMERCE APP",
    projectDescription:
      "A MERN ecommerce app with JWT auth, admin-managed products, cart, addresses, Razorpay payments and a 15+ endpoint REST API.",
    title: "JJ Store: MERN Ecommerce App",
    projectPrimaryLink: "https://appstorejj.netlify.app/",
    projectPrimaryButton: "View Live",
    projectThumbnail: storejj,
    overview: {
      paragraph:
        "A full-stack ecommerce app that covers the whole shopping flow: sign up and login, browsing products, cart, saving an address, paying with Razorpay and placing an order. The React frontend talks to a Node.js and Express REST API backed by MongoDB, with Cloudinary handling product images.",

      role: "I built all of it: the React storefront, the REST API, the database models, JWT authentication with an admin role, product management and the order flow.",

      org: "MongoDB, Express.js, React, Node.js, Cloudinary and Razorpay.",

      catalyst:
        "I wanted to move beyond frontend-only projects and build the backend side of a real product: authentication, data modeling, image uploads, payments and orders.",

      outcome:
        "A working store where users register with email verification, log in, add products to a cart, save an address, pay through Razorpay and place an order. Orders move through defined statuses from pending to delivered, and admins manage the product catalog.",
    },

    background: [
      {
        title: "More than a product list",
        text: "The app had to do more than show products. A user signs up, verifies their email, browses, fills a cart, gives an address, pays and ends up with an order, and every step depends on the one before it.",
      },

      {
        title: "Keeping the data connected",
        text: "Users, products, addresses, payments and orders all reference each other. The backend needed clear MongoDB models, REST endpoints, protected routes and a predictable order lifecycle.",
      },
    ],

    approach:
      "I built it around the customer journey: register and verify, log in, browse products, add to cart, choose an address, pay and create the order. On the backend I split the code into models, controllers and routes, and the React frontend consumes those endpoints.",

    solution:
      "The frontend is React. The backend is Node.js and Express, exposing 15+ REST endpoints for auth, products, cart, addresses and orders. MongoDB stores users, products, addresses and orders, and Mongoose references with populate link them without copying data. Cloudinary stores product images. Authentication uses a JWT issued at login, and admin routes are restricted by role. Razorpay handles payment, and orders move through defined statuses from pending to delivered.",

    outcomes: [
      {
        metric: "15+",
        label:
          "REST API endpoints across auth, products, cart, addresses and orders",
      },
      {
        metric: "RAZORPAY",
        label: "payment integration in the checkout flow",
      },
      {
        metric: "AUTH",
        label: "JWT login with email verification and an admin role",
      },
    ],

    reflection: [
      {
        title: "Ecommerce is mostly a backend problem.",
        text: "Auth, product data, images, addresses, cart state, payments and orders all have to stay consistent with each other. The UI is the visible part, but most of the work is in the API and the data.",
      },

      {
        title: "Payments add real responsibility.",
        text: "Connecting a real payment gateway means the order lifecycle has to stay correct whatever the payment result is. It is very different from a simulated checkout.",
      },
    ],

    projectImages: [
      { id: 1, source: stjjss1 },
      { id: 2, source: stjjss2 },
      { id: 3, source: stjjss3 },
      { id: 4, source: stjjss4 },
      { id: 5, source: stjjss5 },
      { id: 6, source: stjjss6 },
      { id: 7, source: stjjss7 },
      { id: 8, source: stjjss8 },
      { id: 9, source: stjjss9 },
      { id: 10, source: stjjss10 },
    ],
  },
  // blog stack
  {
    id: "blog",
    projectType: "Frontend",
    projectTitle: "BLOGSTACK: A PUBLISHING PLATFORM WITH RICH-TEXT EDITING",
    projectDescription:
      "A blog app where users write, publish and manage their own articles. Built with React and Appwrite.",
    title: "BlogStack: Publishing Platform",
    projectPrimaryLink: "https://appblogstack.netlify.app",
    projectPrimaryButton: "View Live",
    projectThumbnail: blogstack,
    overview: {
      paragraph:
        "A blog application where anyone can read published articles and signed-in users can write, edit and delete their own. It has authentication, a rich-text editor, featured image uploads and a personal dashboard. The frontend is React with reusable components, and Appwrite provides the authentication and backend services.",

      role: "I built the whole frontend: the reusable React components, the create, edit and delete flow for articles, protected routes and the Appwrite integration.",

      org: "React, Redux, React Hook Form, TinyMCE and Appwrite.",

      catalyst:
        "I wanted to build a complete content workflow, not just an article list: auth, rich-text writing, image uploads, publishing and managing your own posts.",

      outcome:
        "A responsive blog where readers browse articles and open individual posts, and signed-in users publish with a rich-text editor, upload featured images and manage their posts and profile from a protected dashboard.",
    },

    background: [
      {
        title: "From reading to publishing",
        text: "Users can do more than read. They create articles, upload a featured image, and edit or delete their own posts.",
      },

      {
        title: "One consistent flow",
        text: "Authentication, the editor, image handling, slug generation, publishing and profile management all have to work together as one experience.",
      },
    ],

    approach:
      "I built it around the publishing flow: log in, write an article, attach an image, publish, then manage it from the dashboard. Public pages and protected pages are kept separate.",

    solution:
      "Visitors browse articles and open individual posts. Signed-in users get a protected area to create and manage content. TinyMCE handles the rich-text editing, Appwrite provides authentication and backend services, React components structure the interface, and React Hook Form and Redux keep forms and app state organized.",

    outcomes: [
      {
        metric: "CRUD",
        label: "create, edit and delete articles",
      },

      {
        metric: "RICH TEXT",
        label: "TinyMCE editor for writing posts",
      },

      {
        metric: "AUTH",
        label: "protected dashboard with Appwrite authentication",
      },
    ],

    reflection: [
      {
        title: "A content platform is more than an article feed.",
        text: "Publishing, authentication, media handling and content management need to work together as one system.",
      },

      {
        title: "Reusable components keep it maintainable.",
        text: "Reusable React components and a clear split between public browsing and authenticated management kept the code organized as features were added.",
      },
    ],
    projectImages: [
      { id: 1, source: bass1 },
      { id: 2, source: bass2 },
      { id: 3, source: bass3 },
      { id: 4, source: bass4 },
      { id: 5, source: bass5 },
    ],
  },
  // taskflow
  {
    id: "taskflow",
    projectType: "Frontend",
    title: "TaskFlow: Task Manager",
    projectTitle:
      "TASKFLOW: A TASK MANAGER WITH PRIORITIES AND PROGRESS TRACKING",
    projectDescription:
      "A task manager where you organize tasks by category, priority and due date, and track progress on a dashboard. Tasks stay saved in the browser.",
    projectPrimaryLink: "https://taskflowtodos.netlify.app/",
    projectPrimaryButton: "View Live",
    projectThumbnail: taskflow,
    overview: {
      paragraph:
        "A responsive task manager for creating, organizing, updating, completing and deleting daily tasks. Redux Toolkit holds the app state, Local Storage keeps tasks between sessions, and a dashboard shows progress and stats at a glance.",

      role: "I built the task workflow, the Redux state, the dashboard and the responsive layout.",

      org: "React, Redux Toolkit and Local Storage.",

      catalyst:
        "A plain to-do list stops being useful once you need categories, priorities, due dates and progress, so I built something closer to a daily planner.",

      outcome:
        "A responsive task manager with a progress dashboard, task creation and organization, completion tracking, sorting, saved data and instant feedback on every action.",
    },

    background: [
      {
        title: "Beyond a basic to-do list",
        text: "Once users need priorities, categories, due dates and a clear view of finished work, a simple list stops working. I designed the app around those everyday needs.",
      },

      {
        title: "Keeping state consistent",
        text: "Creating, updating, completing or deleting a task changes both the task list and the dashboard stats, so state updates had to be predictable and survive a page refresh.",
      },
    ],

    approach:
      "I kept all task state in one place and built a small set of workflows around it: create a task, organize it, update it, complete it, and reflect the result in the dashboard.",

    solution:
      "The app has a dashboard with task stats and progress, a task creation flow, an organized task list, completion tracking, sorting options, toast notifications and Local Storage persistence.",

    outcomes: [
      {
        metric: "CRUD",
        label: "create, update, complete and delete tasks",
      },

      {
        metric: "STATE",
        label: "centralized app state with Redux Toolkit",
      },

      {
        metric: "PERSISTENT",
        label: "tasks saved in Local Storage",
      },
    ],

    reflection: [
      {
        title: "Small apps still expose state problems.",
        text: "One task action can change several parts of the interface, so predictable state management matters even in a small project.",
      },

      {
        title: "Derive data from one source of truth.",
        text: "Computing dashboard numbers from the central state avoids duplicated logic and keeps the UI in sync with the data.",
      },
    ],
    projectImages: [
      { id: 1, source: ttsss1 },
      { id: 2, source: ttsss2 },
      { id: 3, source: ttsss3 },
      { id: 4, source: ttsss4 },
      { id: 5, source: ttsss5 },
    ],
  },
  // astra
  {
    id: "astra",
    projectType: "Frontend",
    title: "Astra: Music Player",
    projectTitle:
      "ASTRA: A MUSIC PLAYER WITH PLAYLISTS AND PERSISTENT PLAYBACK",
    projectDescription:
      "A music app for browsing albums, searching, managing playlists and playing tracks, with a bottom player that stays on screen.",
    projectPrimaryLink: "https://astramusicplay.netlify.app/",
    projectPrimaryButton: "View Live",
    projectThumbnail: astra,
    overview: {
      paragraph:
        "A responsive music app for browsing albums, searching, managing playlists and playing tracks. The bottom player stays visible while you move around the app, so playback never gets interrupted.",

      role: "I built the interface, the navigation, the playlist view and the audio player logic.",

      org: "React, Vite, JavaScript and Tailwind CSS.",

      catalyst:
        "I wanted to build an app where music keeps playing while you browse, which meant treating the player as part of the app shell instead of a single page.",

      outcome:
        "A responsive music interface with album browsing, search, playlist management, highlighting for the active track, playback controls and a persistent bottom player.",
    },

    background: [
      {
        title: "Playback needs continuity",
        text: "In a music app you browse albums and tracks while a song is playing. The interface needed clear navigation, organized discovery, visible playlists and playback controls that are always within reach.",
      },

      {
        title: "Discovery and playback together",
        text: "I structured the app around three connected parts: finding music, managing playlists and controlling the active track.",
      },
    ],

    approach:
      "I built it from reusable React components inside one consistent app shell. Discovery, playlists and playback controls are parts of the same flow, not separate screens.",

    solution:
      "The app combines album browsing with a dedicated playlist view and a fixed bottom player. The player keeps the active track, its progress and the controls available while you keep exploring.",

    outcomes: [
      {
        metric: "DISCOVERY",
        label: "album browsing and search",
      },

      {
        metric: "PLAYLISTS",
        label: "playlist management interface",
      },

      {
        metric: "PERSISTENT",
        label: "bottom player available on every screen",
      },
    ],

    reflection: [
      {
        title: "Playback state belongs to the whole app.",
        text: "Keeping the player persistent means its state has to live above any single page, and the interface has to balance information density with quick access to the controls.",
      },

      {
        title: "A persistent player changes the feel of the app.",
        text: "When the player never leaves the screen, playback feels like part of the app itself instead of a feature of one page.",
      },
    ],
    projectImages: [
      { id: 2, source: ampss2 },
      { id: 3, source: ampss3 },
      { id: 4, source: ampss4 },
    ],
  },
];

export const upcomingProjectData = {
  id: "subscription-manager",
  title: "SUBSCRIPTION MANAGER",
  description:
    "A mobile app to track recurring subscriptions, upcoming payments and monthly spend in one place.",
  buttonText: "Coming soon",
  buttonLink: "#",
};

export const engineeringJourney = [
  {
    year: "2026",
    title: "Going Backend Full-Time",
    description:
      "Learned backend by building. Made a MERN ecommerce store with JWT auth, admin role, email verification, products, Cloudinary media, addresses and orders. Also built a blog platform on React and Appwrite. Now exploring React Native.",
    tech: "Node.js · Express · MongoDB · JWT · React",
  },

  {
    year: "2025",
    title: "Widening the Stack",
    description:
      "Picked up modern frontend libraries and backend fundamentals, and practiced building and testing APIs alongside my job.",
    tech: "React · Node.js · REST APIs",
  },

  {
    year: "2023 – 2026",
    title: "Web Developer, Punyoday Trust",
    description:
      "Built and maintained the organisation's website in React and Tailwind. Handled form requests with React Hook Form and kept the events section up to date, from posting new events to updating and removing old ones.",
    tech: "React · Tailwind · React Hook Form",
  },

  {
    year: "2023",
    title: "Frontend Intern, iNeuron",
    description:
      "Built The Fade, an ecommerce frontend, on my own, and ResumeHub, a resume builder, with one teammate.",
    tech: "React · Zustand · Tailwind",
  },

  {
    year: "2022",
    title: "Full-Stack JS Course",
    description:
      "Completed iNeuron's full-stack JavaScript course. Covered frontend and backend, with the focus on frontend.",
    tech: "JavaScript · Frontend · Backend",
  },

  {
    year: "2021",
    title: "The Beginning",
    description:
      "Finished a diploma in computer science and started building for the web.",
    tech: "JavaScript · Web",
  },
];
