import { useState, useRef, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaDownload, FaFile } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { StarSeparator } from "~/components/star-separator";
import { useTranslation } from "react-i18next";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Typewriter from "~/components/fancy/text/typewriter";
import { EducationSection } from "~/components/educationSection";
import { ProjectsSection } from "~/components/projectsSection";
import { SkillsMarquee } from "~/components/SkillsMarquee";
import {
  containerVariants,
  imageVariants,
  itemVariants,
} from "~/consts/animations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio" },
    {
      name: "Portfolio",
      content: "Bem-vindos ao meu portfolio construido em Remix.",
    },
  ];
};

export default function Index() {
  type UILanguage = keyof typeof languages; // pt | en | tr
  type CVLanguage = "pt" | "en";

  const { t, i18n } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    // só ativa se estiver descendo E não estiver no topo
    if (latest > previous && latest > 40) {
      setScrolled(true);
    }

    // desativar quando voltar pro topo
    if (latest <= 40) {
      setScrolled(false);
    }

    lastScrollY.current = latest;
  });

  // idioma atual
  const lng: UILanguage = ["pt", "en", "tr"].includes(i18n.language)
    ? (i18n.language as UILanguage)
    : "pt";

  const [cvOpen, setCvOpen] = useState(false);

  // idioma selecionado no modal (sincroniza com site)
  const [cvLang, setCvLang] = useState<CVLanguage>("pt");

  useEffect(() => {
    if (lng === "pt") setCvLang("pt");
    else setCvLang("en"); // inglês vira fallback global
  }, [lng]);

  // fechar modal com ESC
  useEffect(() => {
    if (!cvOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCvOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cvOpen]);

  // trava scroll do body quando modal aberto
  useEffect(() => {
    if (cvOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cvOpen]);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // focus trap dentro do modal
  useEffect(() => {
    if (!cvOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, [cvOpen]);

  const cvFiles: Record<CVLanguage, string> = {
    pt: "/cv/cv-pt.pdf",
    en: "/cv/cv-en.pdf",
  };

  const projectsRaw = t("projects.items", {
    returnObjects: true,
    defaultValue: [],
  });

  const projects = Array.isArray(projectsRaw)
    ? projectsRaw
    : Object.values(projectsRaw);

  const languages = {
    pt: {
      label: "Português",
      flag: "🇧🇷",
    },
    en: {
      label: "English",
      flag: "🇺🇸",
    },
    tr: {
      label: "Türkçe",
      flag: "🇹🇷",
    }
  } as const;

  const cvLanguages = {
    pt: languages.pt,
    en: languages.en,
  };

  const current = languages[lng];

  const copyEmail = () => {
    const email = "barbosajesse419@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert("Copiado para sua área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar email: ", err);
      });
  };

  const navRef = useRef<HTMLElement | null>(null);

  const lastScrollY = useRef(0);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    const target = document.getElementById(id);
    if (!target) {
      // console.warn(`Seção ${id} não encontrada`);
      return;
    }

    // pega altura atual da nav (considera mudança de tamanho quando scrolled)
    const navEl = navRef.current ?? document.querySelector("nav");
    const navHeight = navEl ? (navEl as HTMLElement).offsetHeight : 80;

    // calcula posição final
    const top =
      target.getBoundingClientRect().top + window.scrollY - navHeight - 8; // -8 padding extra

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    // atualiza hash sem causar jump/reload
    try {
      history.replaceState(null, "", `#${id}`);
    } catch (err) {
      // fallback simples
      location.hash = `#${id}`;
    }
  };

  return (
    // Wrapper
    <div className="pt-20 text-center">
      <motion.nav
        ref={navRef as any}
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(10,10,10,0.60)"
            : "rgba(10,10,10,0)",
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.35)"
            : "0 0 0 rgba(0,0,0,0)",
          height: scrolled ? "64px" : "80px",
          borderRadius: scrolled ? "16px" : "0px",
          top: scrolled ? "12px" : "0px",
          width: scrolled ? "calc(100% - 32px)" : "100%",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed left-1/2 z-50 backdrop-blur-md"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* logo imagem */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <Link to="/">
              <motion.img
                src="/logo.png"
                alt="logo"
                className="w-40 md:w-48 background-none rounded rounded-3xl"
                animate={{
                  scale: scrolled ? 0.9 : 1,
                  opacity: scrolled ? 0.9 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8 ml-12">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t("nav.home")}
            </a>

            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, "skills")}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t("nav.skills")}
            </a>

            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t("nav.projects")}
            </a>

            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t("nav.about")}
            </a>

            <a
              href="#education"
              onClick={(e) => scrollToSection(e, "education")}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t("nav.education")}
            </a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setCvOpen(true)}
              className={`
                hidden md:flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
                ${scrolled
                  ? "border border-white/20 text-white hover:bg-white/10"
                  : "bg-primary text-white"
                }
              `}
            >
              {t("nav.curriculum")}
              <FaFile className="h-4 w-4" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="language"
                  className="group flex items-center gap-2 px-3"
                >
                  <span className="text-lg">{current.flag}</span>

                  <span className="text-sm font-medium text-foreground">
                    {current.label}
                  </span>

                  <ChevronDown
                    className="
                      ml-1 h-4 w-4 text-muted-foreground
                      transition-transform duration-200
                      group-data-[state=open]:rotate-180
                    "
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={8}
                avoidCollisions={false}
              >
                {/* Português */}
                <DropdownMenuItem asChild>
                  <Form method="post">
                    <button
                      type="submit"
                      onClick={() => i18n.changeLanguage("pt")}
                      className="flex w-full items-center gap-3"
                    >
                      <span className="text-lg">🇧🇷</span>
                      <span>Português</span>
                      {lng === "pt" && <Check className="ml-auto h-4 w-4" />}
                    </button>
                  </Form>
                </DropdownMenuItem>

                {/* English */}
                <DropdownMenuItem asChild>
                  <Form method="post">
                    <button
                      type="submit"
                      onClick={() => i18n.changeLanguage("en")}
                      className="flex w-full items-center gap-3"
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span>English</span>
                      {lng === "en" && <Check className="ml-auto h-4 w-4" />}
                    </button>
                  </Form>
                </DropdownMenuItem>

                {/* Turkish */}
                <DropdownMenuItem asChild>
                  <Form method="post">
                    <button
                      type="submit"
                      onClick={() => i18n.changeLanguage("tr")}
                      className="flex w-full items-center gap-3"
                    >
                      <span className="text-lg">🇹🇷</span>
                      <span>Türkçe</span>
                      {lng === "tr" && <Check className="ml-auto h-4 w-4" />}
                    </button>
                  </Form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>

      <section
        id="hero"
        className="flex flex-col relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div className="absolute h-[500px] w-[500px] rounded-full bg-primary blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <span className="mb-4 block font-semibold text-2xl text-gray-600">
            {t("title")}
          </span>

          <Typewriter
            text={["Mobile Developer", "Full-Stack Engineer", "Front-end Specialist", "ML & AI Enthusiast", "UI/UX Designer"]}
            speed={70}
            className="font-libre-baskerville text-5xl font-bold text-accent md:text-7xl"
            waitTime={1500}
            deleteSpeed={40}
            cursorChar={"_"}
          />
        </div>
        <button
          onClick={() => setCvOpen(true)}
          className="flex md:hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-red text-white hover:bg-white/10 transition z-10 mt-6"
        >
          {t("nav.curriculum")}
          <FaFile className="h-4 w-4" />
        </button>
      </section>

      <section id="skills" className="scroll-mt-24">
        <SkillsMarquee />
      </section>

      <section id="projects" className="scroll-mt-24">
        <ProjectsSection
          title={t("projects.title")}
          projects={projects}
        />
      </section>

      <StarSeparator />

      <section
        id="about"
        className="scroll-mt-24 mx-auto max-w-6xl overflow-hidden px-4 py-16"
      >
        {/* title */}
        <motion.h2
          className="text-center text-4xl font-kaushan text-white mb-8"
          variants={itemVariants}
        >
          {t("about.title")}
        </motion.h2>
        <motion.div
          className="flex flex-col items-center gap-12 md:flex-row md:items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex-1 text-left">
            <motion.p
              className="mb-6 text-lg leading-relaxed"
              variants={itemVariants}
            >
              {t("about.line1")}

              <span className="font-bold text-primary">{t("about.line2")}</span>
              {t("about.line3")}
              <span className="font-bold text-primary">{t("about.line4")}</span>
              {t("about.line5")}
            </motion.p>

            <motion.p
              className="mb-6 text-lg leading-relaxed"
              variants={itemVariants}
            >
              {t("about.line6")}
            </motion.p>

            <motion.p
              className="mb-0 text-lg leading-relaxed"
              variants={itemVariants}
            >
              {t("about.line7")}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col items-center"
            variants={imageVariants}
          >
            <motion.img
              src="/photo.png"
              alt="Foto de perfil"
              className="mb-6 h-96 w-96 rounded-xl object-cover shadow-xl"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            />

            <motion.div className="flex gap-6" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={copyEmail}
                  className="block text-3xl text-primary transition-colors hover:text-[#FFBC33]"
                >
                <FaEnvelope />
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="https://www.linkedin.com/in/jesse-barbosa-moreira/"
                  target="_blank"
                  className="block text-3xl text-primary transition-colors hover:text-blue-700"
                >
                  <FaLinkedin />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="https://github.com/jesse-barbosa"
                  target="_blank"
                  className="block text-3xl text-primary transition-colors hover:text-gray-900"
                >
                  <FaGithub />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="https://www.instagram.com/jessebm.br/"
                  target="_blank"
                  className="block text-3xl text-primary transition-colors hover:text-[#E1306C]"
                >
                  <FaInstagram />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="https://api.whatsapp.com/send?phone=5533984238958"
                  target="_blank"
                  className="block text-3xl text-primary transition-colors hover:text-green-300"
                >
                  <FaWhatsapp />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="education" className="scroll-mt-24">
        <EducationSection />
      </section>

      <footer className="w-full py-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </footer>

      {/* Modal for CV download */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            onClick={() => setCvOpen(false)} // fechar clicando fora
          >
            <motion.div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
              className="w-[90%] max-w-md rounded-2xl bg-[#111] p-6 shadow-2xl border border-white/10"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
                filter: "blur(8px)",
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("nav.chooseLanguage") ?? "Choose CV language"}
              </h3>

              <div className="flex flex-col gap-3">
                {Object.entries(cvLanguages).map(([key, lang]) => (
                  <button
                    key={key}
                    onClick={() => setCvLang(key as CVLanguage)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition
                      ${
                        cvLang === key
                          ? "bg-primary text-white"
                          : "bg-white/5 hover:bg-white/10 text-gray-300"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>

                    {cvLang === key && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-between gap-3">
                <button
                  onClick={() => setCvOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 py-2 text-gray-300 hover:bg-white/5"
                >
                  {t("common.cancel") ?? "Cancel"}
                </button>

                <a
                  href={cvFiles[cvLang]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-primary py-2 text-center font-medium text-white hover:bg-primary/80"
                >
                  {t("common.download") ?? "Download"}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
