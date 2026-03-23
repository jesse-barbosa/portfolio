export default {
  title: "Jessé Barbosa",
  description:
    "Desenvolvedor Full-Stack apaixonado por criar experiências web incríveis.",

  common: {
    cancel: "Cancelar",
    download: "Baixar",
  },

  nav: {
    home: "Início",
    skills: "Habilidades",
    projects: "Projetos",
    about: "Sobre mim",
    education: "Educ & Exp",

    curriculum: "Baixar CV",
    chooseLanguage: "Escolha o idioma",
  },

  skills: {
    title: "Minhas Habilidades",
  },

  projects: {
    title: "Alguns Projetos",
    description: "Alguns dos projetos em que trabalhei.",

    technologies: "Tecnologias:",
    platform: "Plataforma:",
    items: [
      {
        name: "Enerium",
        description:
          "Idealizado e desenvolvido por mim, o Enerium é um SaaS de código aberto para otimização energética feito com Laravel, Next.js, React Native e algorítmos de inteligência artificial em Python. Utiliza pipelines assíncronos, análise preditiva e heurísticas adaptativas para gerar recomendações personalizadas em tempo real para indústrias e escritórios. É um projeto que estou desenvolvendo com muito esforço e dedicação, portanto, ainda sem data prevista para o lançamento.",
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
        name: "Circlub",
        description: "O Circlub é um aplicativo mobile voltado para a gestão de contatos, agendamentos e relacionamentos profissionais, oferecendo uma experiência prática e organizada para acompanhar conexões, horários e interações de forma intuitiva. Desenvolvido com React Native, TypeScript, Python e Laravel, o projeto foi pensado para unir usabilidade, desempenho e uma estrutura escalável tanto no Android quanto no iOS.",
        technologies: [
          "React Native",
          "TypeScript",
          "Python",
          "Laravel / PHP",
        ],
        platforms: ["Android, iOS"],
        images: [
          "/projects/circlub/Banner.png",
          "/projects/circlub/demo_1.jpg",
          "/projects/circlub/demo_2.jpg",
          "/projects/circlub/demo_3.jpg",
          "/projects/circlub/demo_4.jpg",
        ],
      },
      {
        name: "FII Trader",
        description:
          "Este sistema fundado por Marcos Rodrigues Alves tem como objetivo gerenciar e fazer análises inteligentes de oportunidades de compra e venda de Fundos Imobiliários com base em fórmulas e algorítmos avançados.",
        technologies: ["NextJS", "NestJS"],
        platforms: ["Web"],
        images: ["/projects/fiiTraderPrint.png"],
      },
    ],
  },

  designs: {
    title: "Desings & Protótipos",
    description: "Alguns dos projetos de desing que eu fiz.",

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
    title: "Quem sou eu?",

    line1: "Olá, eu sou Jessé Barbosa, estudante e entusiasta da tecnologia, ",
    line2: "com foco em desenvolvimento web e soluções modernas. ",
    line3:
      "Atualmente, moro em Teófilo Otoni, Minas Gerais, e tenho grande interesse em criar aplicações que unam ",
    line4:
      "design bem estruturado, boa usabilidade e código organizado. ",
    line5:
      "Tenho experiência com tecnologias como React, Next.js, Node.js e TypeScript, sempre buscando escrever soluções eficientes, legíveis e escaláveis.",
    line6:
      "Estou em constante aprendizado, explorando novos conceitos, ferramentas e boas práticas para evoluir como desenvolvedor e enfrentar desafios cada vez mais complexos.",
    line7:
      "Meu objetivo é crescer profissionalmente na área de tecnologia, contribuindo com projetos de impacto e desenvolvendo soluções que realmente façam diferença.",
  },

  education: {
    title: "Formação & Experiência",
    tabs: {
      formations: "Formações",
      experience: "Experiência Profissional",
    },
  },
  "formations": {
    subtitle: "Clique em uma formação para ver mais detalhes",
      items: [
        {
          title: "Técnico em Desenvolvimento de Sistemas",
          location: "Senac",
          details:
            "Curso Técnico EAD do Senac com duração aproximada de 21 meses, voltado à criação, implementação e manutenção de software. É ensinado como planejar e desenvolver sistemas para desktop, web e bancos de dados (MySQL, SQL); além disso, certificações intermediárias de Assistente de Banco de Dados e Assistente de Desenvolvimento de Sistemas. Com métodos flexíveis, vídeos, podcasts e encontros ao vivo com tutores experientes.",
          period: "2025",
        },
        {
          title: "Front-end em React",
          location: "Ada Tech",
          details:
            "Curso remoto da plataforma Ada Tech, onde o professor Walisson Silva aborda desde os conceitos básicos da Web e suas principais tecnologias até o React. Na primeira parte do curso, é ensinado sobre as linguagens HTML, CSS, JavaScript/TypeScript, desde de seus conceitos mais básicos, até as estruturas mais avançadas e atuais, incluindo os paradigmas de orientação a objetos e programação funcional. Na segunda parte do curso, por fim, é ensinado a ferramenta React por meio da exposição dos seus conceitos fundamentais aliada a projetos práticos que exploram e aprofundam cada um desses conceitos.",
          period: "2025",
        },
        {
          title: "Módulo II - Desenvolvimento Web (Full Stack)",
          location: "SenacTEC",
          details:
            "Curso presencial em Teófilo Otoni, onde o professor Diego Jardim ensinou tecnologias avançadas para construção de sistemas Web, como HTML, CSS, Bootstrap e PHP, com exercícios práticos e trabalhos em equipe, sempre abordando as melhores e mais modernas práticas de POO.",
          period: "2024",
        },
        {
          title: "Javascript [40 Horas]",
          location: "Curso em Vídeo",
          details:
            "Curso remoto da plataforma Curso em Vídeo, onde o professor Gustavo Guanabara apresenta a linguagem JavaScript, em um curso patrocinado pelo Google, voltado para iniciantes, o professor Gustavo Guanabara vai ensinar o conteúdo básico em 6 módulos que vão desde o conhecimento da linguagem até o uso de funções.",
          period: "2024",
        },
        {
          title: "Módulo I - Desenvolvimento Web (Full Stack)",
          location: "SenacTEC",
          details:
            "Curso presencial em Teófilo Otoni, onde o professor Diego Jardim ensinou tecnologias avançadas para construção de sistemas Web, como HTML, CSS, Bootstrap e PHP, com exercícios práticos e trabalhos em equipe, sempre abordando as melhores e mais modernas práticas de POO.",
          period: "2023",
        },
        {
          title: "Informática Completa 2.0",
          location: "CEBRAC",
          details:
            "Curso presencial em Teófilo Otoni, não envolve programação ou desenvolvimento, mas aborda conceitos básicos da informática, como hardware, software, redes, e segurança. Também foi ensinado a utilizar as ferramentas do Pacote Office e softwares simples de edição de imagens como o GIMP.",
          period: "2021",
        },
      ],
  },

  "experiences": {
    subtitle: "Clique em uma experiência para ver mais detalhes",
    items: [
      {
        title: "Estágio em Desenvolvimento Mobile",
        location: "Desenvolvimento de Aplicações Mobile",
        period: "Abril 2025 — Atual",
        details:
          "Atuo no desenvolvimento de um projeto mobile, trabalhando principalmente com React Native e TypeScript, além de integração com backend em PHP (Laravel). O estágio tem contribuído significativamente para meu crescimento técnico e entendimento do desenvolvimento de aplicações em ambiente profissional.",
      },
    ]
  },

  footer: {
    rights: "Jessé Barbosa. Todos os direitos reservados.",
  },
};
