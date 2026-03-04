import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type MasonryItem = {
  key: string;
  wide?: boolean;
  node: React.ReactNode;
};

export function MasonryGrid({
  items,
  columns = 4,
  gap = 0,
  rowHeight = 8,
  className = "",
}: {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
  rowHeight?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [colCount, setColCount] = useState(columns);

  // ===== Responsivo
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const next = w < 640 ? 1 : w < 1024 ? 2 : w < 1280 ? 3 : columns;
      setColCount(next);
    };
    calc();

    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, [columns]);

  // ===== Medição rápida e “segura”
  const rafId = useRef<number | null>(null);
  const pendingKeys = useRef<Set<string>>(new Set());

  // ===== Medição rápida e segura
  const applySpan = (key: string) => {
    const node = itemRefs.current.get(key);
    if (!node) return;

    // 1) tenta medir um IMG real (mais confiável no seu caso)
    const img = node.querySelector("img") as HTMLImageElement | null;

    let h = 0;

    if (img) {
      // se ainda não carregou, h pode ser 0
      h = img.getBoundingClientRect().height;

      // fallback: se já tem dimensões naturais e largura calculada, estima a altura
      if (h <= 1 && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const w = img.getBoundingClientRect().width || node.getBoundingClientRect().width;
        if (w > 0) h = (img.naturalHeight / img.naturalWidth) * w;
      }
    }

    // 2) fallback: tenta o primeiro filho (como seu código original)
    if (h <= 1) {
      const content = node.firstElementChild as HTMLElement | null;
      if (content) h = content.getBoundingClientRect().height;
    }

    // 3) fallback final: wrapper
    if (h <= 1) h = node.getBoundingClientRect().height;

    // nunca deixa ficar 0
    const safeH = Math.max(1, Math.ceil(h));

    const span = Math.max(1, Math.ceil((safeH + gap) / (rowHeight + gap)));
    node.style.gridRowEnd = `span ${span}`;
  };

  const flushMeasure = () => {
    rafId.current = null;
    const keys = Array.from(pendingKeys.current);
    pendingKeys.current.clear();
    for (const k of keys) applySpan(k);
  };

  const scheduleMeasure = (key?: string) => {
    if (key) pendingKeys.current.add(key);
    else items.forEach((it) => pendingKeys.current.add(it.key));

    if (rafId.current != null) return;
    rafId.current = window.requestAnimationFrame(flushMeasure);
  };

  // ===== Setup observers + “espera” das imagens
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // mede tudo ao montar / mudar colCount / items
    scheduleMeasure();

    // Observa só mudanças de tamanho nos itens (não precisa observar container)
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLDivElement;
        const key = el.dataset.masonryKey;
        if (key) scheduleMeasure(key);
      }
    });

    // Liga RO + hooks de load/decode das imgs
    const cleanups: Array<() => void> = [];

    for (const it of items) {
      const el = itemRefs.current.get(it.key);
      if (!el) continue;

      ro.observe(el);

      // se tiver <img> dentro, mede quando carregar/decodificar
      const imgs = Array.from(el.querySelectorAll("img"));
      for (const img of imgs) {
        const onDone = () => scheduleMeasure(it.key);

        // decode costuma reduzir flicker/reflow
        if (img.complete) {
          // já carregou: tenta decode (se suportado) e mede
          // (se decode falhar, mede mesmo assim)
          // @ts-ignore
          const p: Promise<void> | undefined = img.decode?.();
          if (p) p.then(onDone).catch(onDone);
          else onDone();
        } else {
          img.addEventListener("load", onDone, { once: true });
          img.addEventListener("error", onDone, { once: true });

          cleanups.push(() => {
            img.removeEventListener("load", onDone);
            img.removeEventListener("error", onDone);
          });
        }
      }
    }

    return () => {
      ro.disconnect();
      cleanups.forEach((fn) => fn());
      if (rafId.current != null) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      pendingKeys.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, colCount, gap, rowHeight]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
        gridAutoRows: `${rowHeight}px`,
        gap: `${gap}px`,
        // evita “dança” bizarra quando spans mudam
        gridAutoFlow: "row",
      }}
    >
      {items.map((it) => (
        <div
          key={it.key}
          data-masonry-key={it.key}
          ref={(n) => {
            if (!n) itemRefs.current.delete(it.key);
            else itemRefs.current.set(it.key, n);
          }}
          style={{
            gridColumn: it.wide && colCount > 1 ? "span 2" : "span 1",

            // performance: o browser pode pular render fora da viewport
            contentVisibility: "auto",
            containIntrinsicSize: "600px 400px",
          }}
        >
          {it.node}
        </div>
      ))}
    </div>
  );
}