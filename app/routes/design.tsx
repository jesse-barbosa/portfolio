import { useState, useRef } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { DesignsSection } from "~/components/designsSection";
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
  const lng: UILanguage = ["pt", "en"].includes(i18n.language)
    ? (i18n.language as UILanguage)
    : "pt";

  const designsRaw = t("designs.items", {
    returnObjects: true,
    defaultValue: [],
  });

  const designs = Array.isArray(designsRaw)
    ? designsRaw
    : Object.values(designsRaw);

  const languages = {
    pt: {
      label: "Português",
      flag: "🇧🇷",
    },
    en: {
      label: "English",
      flag: "🇺🇸",
    }
  } as const;

  const current = languages[lng];

  const navRef = useRef<HTMLElement | null>(null);

  const lastScrollY = useRef(0);

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

          <div className="flex items-center gap-3 ml-auto">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>

      <section
        id="hero"
        className="relative isolate flex min-h-screen flex-col items-center justify-start"
      >
        {/* Blur atrás */}
        <div className="absolute left-5 top-1/6 -z-10 h-[500px] w-[500px] rounded-full bg-primary blur-3xl" />

        {/* Conteúdo acima */}
        <div className="relative z-10 w-full">
          <DesignsSection title={t("designs.title")} designs={designs} />
        </div>
      </section>

      <footer className="w-full py-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </footer>
    </div>
  );
}
