export default {
  title: "Jessé Barbosa",
  description:
    "Harika web deneyimleri oluşturma konusunda tutkulu bir Full-Stack Geliştirici.",

  common: {
    cancel: "İptal",
    download: "İndir",
  },

  nav: {
    home: "Ana Sayfa",
    skills: "Yetenekler",
    projects: "Projeler",
    about: "Hakkımda",
    education: "Eğitim & Deneyim",

    curriculum: "CV İndir",
    chooseLanguage: "Dil Seçin",
  },

  skills: {
    title: "Yeteneklerim",
  },

  projects: {
    title: "Bazı Projeler",
    description: "Üzerinde çalıştığım projelerden bazıları.",

    technologies: "Teknolojiler:",
    platform: "Platform:",
    items: [
      {
        name: "Enerium",
        description:
          "Tarafımdan tasarlanıp geliştirilen Enerium, enerji optimizasyonuna odaklanan açık kaynaklı bir SaaS projesidir. Laravel, Next.js, React Native ve Python ile geliştirilen yapay zekâ algoritmaları kullanılarak oluşturulmuştur. Asenkron iş akışları, öngörücü analizler ve uyarlanabilir sezgisel yöntemler sayesinde sanayi tesisleri ve ofisler için gerçek zamanlı, kişiselleştirilmiş öneriler sunar. Bu proje büyük bir özveriyle geliştirilmektedir ve henüz planlanmış bir yayın tarihi bulunmamaktadır.",
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
          "Marcos Rodrigues Alves tarafından kurulan bu sistem, gelişmiş formüller ve algoritmalar kullanarak Gayrimenkul Yatırım Fonları için alım ve satım fırsatlarının akıllı analizini ve yönetimini amaçlamaktadır.",
        technologies: ["NextJS", "NestJS"],
        platforms: ["Web"],
        images: ["/projects/fiiTraderPrint.png"],
      },
      {
        name: "TechMix",
        description:
          "Teknoloji mağazaları için geliştirilmiş bir e-ticaret sistemidir. Mağaza yönetimi ve müşteri desteği için Laravel ile geliştirilen bir yönetim paneli ve son kullanıcılar için React Native ile oluşturulmuş bir mobil uygulama içerir.",
        technologies: ["React Native", "JavaScript", "Laravel / PHP"],
        platforms: ["Android", "iOS", "PC"],
        images: ["/projects/techMixPrint.png"],
      },
      {
        name: "Monyra",
        description:
          "React Native kullanılarak geliştirdiğim ilk uygulamadır. Backend tarafında PHP ve JavaScript, frontend tarafında ise React Native kullanılmıştır.",
        technologies: ["React Native", "JavaScript", "PHP"],
        platforms: ["Android", "iOS", "PC"],
        images: ["/projects/monyraPrint.png"],
      },
      {
        name: "Notten",
        description:
          "HTML, CSS, Bootstrap ve JavaScript kullanılarak geliştirilen, backend tarafında PHP bulunan bir masaüstü not alma uygulamasıdır.",
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

  about: {
    title: "Ben Kimim?",

    line1: "Merhaba, ben Jessé Barbosa. Web geliştirme ve modern çözümlere odaklanan ",
    line2: "bir öğrenci ve teknoloji meraklısıyım. ",
    line3:
      "Şu anda Brezilya’nın Minas Gerais eyaletine bağlı Teófilo Otoni şehrinde yaşıyorum ve ",
    line4:
      "iyi yapılandırılmış tasarım, yüksek kullanılabilirlik ve düzenli kodu bir araya getiren uygulamalar geliştirmeye büyük ilgi duyuyorum. ",
    line5:
      "React, Next.js, Node.js ve TypeScript gibi teknolojilerle deneyim sahibiyim ve her zaman verimli, okunabilir ve ölçeklenebilir çözümler üretmeyi hedefliyorum.",
    line6:
      "Bir geliştirici olarak kendimi sürekli geliştirmek ve daha karmaşık zorluklarla başa çıkabilmek için yeni kavramlar, araçlar ve en iyi uygulamaları öğrenmeye devam ediyorum.",
    line7:
      "Amacım teknoloji alanında profesyonel olarak gelişmek, etkili projelere katkıda bulunmak ve gerçekten fark yaratan çözümler üretmektir.",
  },

  education: {
    title: "Eğitim & Deneyim",
    tabs: {
      formations: "Eğitim",
      experience: "Profesyonel Deneyim",
    },
  },

  formations: {
    subtitle: "Daha fazla detay görmek için bir eğitime tıklayın",
    items: [
      {
        title: "Sistem Geliştirme Teknik Eğitimi",
        location: "Senac",
        details:
          "Yaklaşık 21 ay süren çevrim içi teknik eğitim programı. Yazılım oluşturma, uygulama ve bakım süreçlerine odaklanır. Masaüstü, web ve veritabanı (MySQL, SQL) sistemlerinin planlanması ve geliştirilmesini kapsar. Ayrıca Veritabanı Asistanı ve Sistem Geliştirme Asistanı gibi ara sertifikalar sunar. Eğitim; videolar, podcast’ler ve deneyimli eğitmenlerle canlı oturumlar gibi esnek öğrenme yöntemleri içerir.",
        period: "2025",
      },
      {
        title: "React ile Front-end Geliştirme",
        location: "Ada Tech",
        details:
          "Ada Tech platformu üzerinden verilen çevrim içi bir eğitimdir. Eğitmen Walisson Silva, webin temel kavramlarından React’a kadar kapsamlı bir içerik sunar. İlk bölümde HTML, CSS ve JavaScript/TypeScript temel ve ileri düzey konularıyla ele alınır. İkinci bölümde ise React, temel kavramlar ve pratik projeler üzerinden öğretilir.",
        period: "2025",
      },
      {
        title: "Modül II – Web Geliştirme (Full Stack)",
        location: "SenacTEC",
        details:
          "Teófilo Otoni’de yüz yüze gerçekleştirilen bu eğitimde, eğitmen Diego Jardim tarafından HTML, CSS, Bootstrap ve PHP gibi ileri seviye web teknolojileri öğretilmiştir. Eğitim sürecinde uygulamalı çalışmalar ve ekip projeleriyle modern nesne yönelimli programlama yaklaşımları ele alınmıştır.",
        period: "2024",
      },
      {
        title: "JavaScript [40 Saat]",
        location: "Curso em Vídeo",
        details:
          "Curso em Vídeo platformu üzerinden sunulan, Google destekli başlangıç seviyesinde bir JavaScript eğitimidir. Eğitmen Gustavo Guanabara tarafından verilen kurs, programlama dilinin temellerinden fonksiyon kullanımına kadar altı modülden oluşmaktadır.",
        period: "2024",
      },
      {
        title: "Modül I – Web Geliştirme (Full Stack)",
        location: "SenacTEC",
        details:
          "Teófilo Otoni’de yüz yüze gerçekleştirilen bu eğitimde, HTML, CSS, Bootstrap ve PHP gibi web geliştirme teknolojileri uygulamalı çalışmalar ve ekip projeleriyle öğretilmiştir. Modern nesne yönelimli programlama uygulamalarına odaklanılmıştır.",
        period: "2023",
      },
      {
        title: "Bilgisayar Kullanımı 2.0",
        location: "CEBRAC",
        details:
          "Teófilo Otoni’de verilen yüz yüze bir eğitimdir. Programlama içermemekle birlikte donanım, yazılım, ağlar ve güvenlik gibi temel bilişim kavramlarını kapsar. Ayrıca Office paketleri ve GIMP gibi temel görsel düzenleme araçlarının kullanımı öğretilmiştir.",
        period: "2021",
      },
    ],
  },

  experiences: {
    subtitle: "Daha fazla detay görmek için bir deneyime tıklayın",
    items: [
      {
        title: "Mobil Geliştirme Stajyeri",
        location: "Mobil Uygulama Geliştirme",
        period: "Nisan 2025 — Günümüz",
        details:
          "React Native ve TypeScript ağırlıklı olmak üzere bir mobil proje üzerinde çalışıyorum ve PHP (Laravel) ile backend entegrasyonu sağlıyorum. Bu staj, teknik gelişimime ve profesyonel yazılım geliştirme ortamını daha iyi anlamama önemli katkılar sağlamaktadır.",
      },
    ],
  },

  footer: {
    rights: "Jessé Barbosa. Tüm hakları saklıdır.",
  },
};