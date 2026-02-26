import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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

  // responsivo
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const next =
        w < 640 ? 1 : w < 1024 ? 2 : w < 1280 ? 3 : columns;
      setColCount(next);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [columns]);

  const measure = () => {
    const el = containerRef.current;
    if (!el) return;

    // mede cada item e calcula o row-span baseado na altura real
    items.forEach((it) => {
      const node = itemRefs.current.get(it.key);
      if (!node) return;

      const content = node.firstElementChild as HTMLElement | null;
      const h = (content?.getBoundingClientRect().height ?? node.getBoundingClientRect().height);

      // span = (altura + gap) / (rowHeight + gap)
      const span = Math.ceil((h + gap) / (rowHeight + gap));
      node.style.gridRowEnd = `span ${span}`;
    });
  };

  // mede após render
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    measure();

    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);

    itemRefs.current.forEach((n) => ro.observe(n));

    return () => ro.disconnect();
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
      }}
    >
      {items.map((it) => (
        <div
          key={it.key}
          ref={(n) => {
            if (!n) itemRefs.current.delete(it.key);
            else itemRefs.current.set(it.key, n);
          }}
          style={{
            // wide
            gridColumn: it.wide && colCount > 1 ? "span 2" : "span 1",
          }}
        >
          {it.node}
        </div>
      ))}
    </div>
  );
}