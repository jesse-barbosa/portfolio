import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type LensAnchor = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type FitMode = "auto" | "cover" | "contain";

export function HoverMagnifier({
  src,
  alt,
  delayMs = 350,
  zoom = 2.0,
  lensSize = 520,
  anchor = "top-right",
  fit = "auto",
  className = "",
}: {
  src: string;
  alt: string;
  delayMs?: number;
  zoom?: number;
  lensSize?: number;
  anchor?: LensAnchor;
  fit?: FitMode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [lensOpen, setLensOpen] = useState(false);

  // mouse % => pan do conteúdo na lupa
  const [pos, setPos] = useState({ xPct: 50, yPct: 50 });

  // metadados da imagem pra saber proporção
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const holdTimer = useRef<number | null>(null);
  const lastMoveTs = useRef<number>(0);

  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  const fitResolved: "cover" | "contain" = useMemo(() => {
    if (fit === "cover" || fit === "contain") return fit;
    if (!natural) return "cover"; // fallback até carregar
    return natural.h > natural.w ? "contain" : "cover"; // portrait => contain
  }, [fit, natural]);

  const clearTimer = () => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    clearTimer();
    holdTimer.current = window.setTimeout(() => {
      const now = Date.now();
      if (isHovering && now - lastMoveTs.current > 180) setLensOpen(true);
    }, delayMs);
  };

  const onEnter = () => {
    if (isCoarsePointer) return;
    setIsHovering(true);
    lastMoveTs.current = Date.now();
    scheduleOpen();
  };

  const onLeave = () => {
    setIsHovering(false);
    clearTimer();
    setLensOpen(false);
  };

  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    lastMoveTs.current = Date.now();

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // cover
    if (fitResolved === "cover" || !natural) {
      const xPct = clamp((x / rect.width) * 100, 3, 97);
      const yPct = clamp((y / rect.height) * 100, 3, 97);
      setPos({ xPct, yPct });
      if (!lensOpen) scheduleOpen();
      return;
    }

    // contain
    const imgRatio = natural.w / natural.h;
    const boxRatio = rect.width / rect.height;

    let dispW = rect.width;
    let dispH = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > boxRatio) {
      // imagem mais “wide”: largura ocupa tudo, sobra em cima/baixo
      dispW = rect.width;
      dispH = rect.width / imgRatio;
      offsetY = (rect.height - dispH) / 2;
    } else {
      // imagem mais “tall”: altura ocupa tudo, sobra nas laterais
      dispH = rect.height;
      dispW = rect.height * imgRatio;
      offsetX = (rect.width - dispW) / 2;
    }

    const xIn = clamp(x - offsetX, 0, dispW);
    const yIn = clamp(y - offsetY, 0, dispH);

    const xPct = clamp((xIn / dispW) * 100, 3, 97);
    const yPct = clamp((yIn / dispH) * 100, 3, 97);
    setPos({ xPct, yPct });

    if (!lensOpen) scheduleOpen();
  };

  useEffect(() => {
    if (isCoarsePointer) {
      setLensOpen(false);
      clearTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCoarsePointer]);

  const bgPosition = `${pos.xPct}% ${pos.yPct}%`;
  const bgSize = `${zoom * 100}%`;

  const anchorStyle: React.CSSProperties = (() => {
    const pad = 18;
    switch (anchor) {
      case "top-left":
        return { left: pad, top: pad };
      case "bottom-left":
        return { left: pad, bottom: pad };
      case "bottom-right":
        return { right: pad, bottom: pad };
      case "top-right":
      default:
        return { right: pad, top: pad };
    }
  })();

  const isPortrait = natural ? natural.h > natural.w : false;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className={`relative ${className}`}
      style={{ lineHeight: 0 }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={(e) =>
          setNatural({
            w: e.currentTarget.naturalWidth,
            h: e.currentTarget.naturalHeight,
          })
        }
        className="block w-full h-auto select-none"
        draggable={false}
      />

      {/* Lupa fixa via portal */}
      {lensOpen && !isCoarsePointer && typeof document !== "undefined"
        ? createPortal(
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="pointer-events-none fixed z-[9999]"
              style={{
                width: lensSize,
                height: lensSize,
                ...anchorStyle,
              }}
            >
              <div
                className="
                  relative h-full w-full rounded-[999px] overflow-hidden
                  border border-white/35
                  shadow-[0_25px_90px_rgba(0,0,0,0.70)]
                  ring-1 ring-black/30
                "
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: bgPosition,
                  backgroundSize: bgSize,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.30), rgba(255,255,255,0) 58%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ boxShadow: "inset 0 0 55px rgba(0,0,0,0.28)" }}
                />
              </div>
            </motion.div>,
            document.body
          )
        : null}
    </div>
  );
}
