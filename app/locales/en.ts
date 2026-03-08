export default {
  title: "Jessé Barbosa",
  description:
    "Full-Stack Developer passionate about creating great web experiences.",

  common: {
    cancel: "Cancel",
    download: "Download",
  },
  
  nav: {
    home: "Home",
    skills: "Skills",
    projects: "Projects",
    about: "About Me",
    education: "Education & Experience",

    curriculum: "Download CV",
    chooseLanguage: "Choose Language",
  },

  skills: {
    title: "My Skills",
  },

  projects: {
    title: "Some Projects",
    description: "Some of the projects I have worked on.",

    technologies: "Technologies:",
    platform: "Platform:",
    items: [
      {
        name: "Enerium",
        description:
          "Conceived and developed by me, Enerium is an open-source SaaS focused on energy optimization, built with Laravel, Next.js, React Native, and artificial intelligence algorithms in Python. It leverages asynchronous pipelines, predictive analysis, and adaptive heuristics to generate real-time personalized recommendations for industries and offices. This is a project I am developing with great effort and dedication and, therefore, does not yet have a scheduled release date.",
        technologies: [
          "NextJS",
          "React Native",
          "TypeScript",
          "Python",
          "Laravel / PHP",
        ],
        platforms: ["Web"],
        images: [
          "/projects/enerium-screenshots/intro-hero.png",
          "/projects/enerium-screenshots/dash-home.png",
          "/projects/enerium-screenshots/dash-sustainability.png",
          "/projects/enerium-screenshots/intro-benefits.png",
        ],
      },
      {
        name: "FII Trader",
        description:
          "This system, founded by Marcos Rodrigues Alves, aims to manage and perform intelligent analyses of buying and selling opportunities for Real Estate Investment Funds, based on advanced formulas and algorithms.",
        technologies: ["NextJS", "NestJS"],
        platforms: ["Web"],
        images: ["/projects/fiiTraderPrint.png"],
      },
      {
        name: "TechMix",
        description:
          "An e-commerce system for technology stores, featuring an administrative panel developed with Laravel for store management and customer support, and a mobile application built with React Native for end users.",
        technologies: ["React Native", "JavaScript", "Laravel / PHP"],
        platforms: ["Android", "iOS", "PC"],
        images: ["/projects/techMixPrint.png"],
      },
      {
        name: "Monyra",
        description:
          "This was my first application developed with React Native. PHP and JavaScript were used for the backend, while React Native handled the frontend.",
        technologies: ["React Native", "JavaScript", "PHP"],
        platforms: ["Android", "iOS", "PC"],
        images: ["/projects/monyraPrint.png"],
      },
      {
        name: "Notten",
        description:
          "A desktop note-taking application built with HTML, CSS, Bootstrap, JavaScript, and PHP for the backend.",
        technologies: [
          "Electron",
          "HTML",
          "Bootstrap",
          "CSS",
          "JavaScript",
          "PHP",
        ],
        platforms: ["PC"],
        images: ["/projects/nottenPrint.png"],
      },
    ],
  },

  designs: {
    title: "Designs & Prototypes",
    description: "Some of the design projects I have done.",

    items: [
      {
        images: [
          "/designs/enerium1.png",
          "/designs/enerium2.png",
          "/designs/enerium3.png",
        ],
      },
      {
        images: [
          "/designs/pizzaria.png"
        ]
      },
      {
        images: [
          "/designs/event-invitation.png",
        ]
      }
    ],
  },

  about: {
    title: "Who am I?",

    line1: "Hello, I am Jessé Barbosa, a student and technology enthusiast ",
    line2: "focused on web development and modern solutions. ",
    line3:
      "I currently live in Teófilo Otoni, Minas Gerais, and I have a strong interest in building applications that combine ",
    line4:
      "well-structured design, good usability, and clean, organized code. ",
    line5:
      "I have experience with technologies such as React, Next.js, Node.js, and TypeScript, always aiming to write efficient, readable, and scalable solutions.",
    line6:
      "I am constantly learning, exploring new concepts, tools, and best practices to grow as a developer and tackle increasingly complex challenges.",
    line7:
      "My goal is to grow professionally in the technology field, contributing to impactful projects and developing solutions that truly make a difference.",
  },

  education: {
    title: "Education & Experience",
    tabs: {
      formations: "Education",
      experience: "Professional Experience",
    },
  },

  formations: {
    subtitle: "Click on an education item to see more details",
    items: [
      {
        title: "Technical Degree in Systems Development",
        location: "Senac",
        details:
          "Online technical course from Senac with an approximate duration of 21 months, focused on the creation, implementation, and maintenance of software. It covers planning and development of desktop, web, and database systems (MySQL, SQL), as well as intermediate certifications as a Database Assistant and Systems Development Assistant. The course uses flexible learning methods, including videos, podcasts, and live sessions with experienced instructors.",
        period: "2025",
      },
      {
        title: "Front-end with React",
        location: "Ada Tech",
        details:
          "Remote course from the Ada Tech platform, where the instructor Walisson Silva covers everything from basic web concepts and core technologies to React. The first part focuses on HTML, CSS, JavaScript/TypeScript, from fundamental concepts to more advanced and modern structures, including object-oriented and functional programming paradigms. The second part introduces React through its core concepts combined with practical projects.",
        period: "2025",
      },
      {
        title: "Module II – Web Development (Full Stack)",
        location: "SenacTEC",
        details:
          "On-site course in Teófilo Otoni, where the instructor Diego Jardim taught advanced technologies for building web systems, such as HTML, CSS, Bootstrap, and PHP, with hands-on exercises and team projects, always emphasizing modern best practices in object-oriented programming.",
        period: "2024",
      },
      {
        title: "JavaScript [40 Hours]",
        location: "Curso em Vídeo",
        details:
          "Remote course from the Curso em Vídeo platform, where the instructor Gustavo Guanabara introduces the JavaScript language in a beginner-friendly course sponsored by Google. The content is divided into six modules, covering everything from basic language concepts to the use of functions.",
        period: "2024",
      },
      {
        title: "Module I – Web Development (Full Stack)",
        location: "SenacTEC",
        details:
          "On-site course in Teófilo Otoni, where the instructor Diego Jardim taught advanced technologies for building web systems, such as HTML, CSS, Bootstrap, and PHP, with hands-on exercises and team projects, always emphasizing modern best practices in object-oriented programming.",
        period: "2023",
      },
      {
        title: "Complete Computer Skills 2.0",
        location: "CEBRAC",
        details:
          "On-site course in Teófilo Otoni. Although it does not involve programming or development, it covers basic computing concepts such as hardware, software, networking, and security. It also includes training on Office Suite tools and basic image editing software like GIMP.",
        period: "2021",
      },
    ],
  },

  experiences: {
    subtitle: "Click on an experience to see more details",
    items: [
      {
        title: "Mobile Development Internship",
        location: "Mobile Application Development",
        period: "April 2025 — Present",
        details:
          "I work on the development of a mobile project, mainly using React Native and TypeScript, along with backend integration using PHP (Laravel). This internship has significantly contributed to my technical growth and understanding of software development in a professional environment.",
      },
    ],
  },

  footer: {
    rights: "Jessé Barbosa. All rights reserved.",
  },
};