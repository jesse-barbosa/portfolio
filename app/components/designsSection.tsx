import { motion } from "framer-motion";
import { CiStar } from "react-icons/ci";
import { HoverMagnifier } from "./HoverMagnifier";
import { MasonryGrid } from "./MasonryGrid";

interface Design {
  name: string;
  description: string;
  technologies: string[];
  platforms: string[];
  images: string[];
  link?: string;
}

export function DesignsSection({ designs, title }: { designs: Design[]; title: string }) {
  const tiles = designs.flatMap((design, dIndex) =>
    design.images.map((src, i) => ({
      id: `${dIndex}-${i}`,
      design,
      src,
    }))
  );

  const items = tiles.map((tile, idx) => {
    const wide = idx % 8 === 0;

    return {
      key: tile.id,
      wide,
      node: (
        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative"
          style={{
            margin: 0,
            padding: 0,
            lineHeight: 0,
          }}
        >
          {/* tile livre, sem container */}
          <HoverMagnifier
            src={tile.src}
            alt={tile.design.name}
            delayMs={220}
            zoom={1.8}
            lensSize={560}
            anchor="top-right"
            fit="contain"
            className="block w-full"
          />
        </motion.div>
      ),
    };
  });

  return (
    <section id="designs" className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-10 pb-24">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-start text-4xl font-kaushan text-white"
      >
        <div className="relative z-30 mb-2 flex w-full items-center gap-2 text-gray-300 dark:text-gray-500">
          {title}
          <CiStar className="ms-3 h-6 w-6 scale-90 transform" />
          <div className="h-[1px] w-full flex-1 bg-gray-300/60 dark:bg-gray-500/60" />
        </div>
      </motion.h2>

      <MasonryGrid items={items} columns={4} gap={0} rowHeight={8} className="w-full" />
    </section>
  );
}