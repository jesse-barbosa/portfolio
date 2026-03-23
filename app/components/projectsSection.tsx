import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineExternalLink, HiX } from "react-icons/hi";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  platforms: string[];
  images: string[];
  link?: string;
}

export function ProjectsSection({
  projects,
  title,
}: {
  projects: Project[];
  title: string;
}) {
  const [activeProject, setActiveProject] =
    useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-4 py-32"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 text-center text-5xl font-kaushan text-white"
      >
        {title}
      </motion.h2>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setActiveProject(project)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            {/* Image */}
            <motion.img
              src={project.images[0]}
              alt={project.name}
              className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white">
                {project.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-neutral-900 p-10 text-left text-white"
            >
              {/* Close */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute right-6 top-6 text-2xl text-white/70 hover:text-white"
              >
                <HiX />
              </button>

              {/* Header */}
              <h3 className="mb-6 text-4xl font-extrabold">
                {activeProject.name}
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                {activeProject.description}
              </p>

              {/* Meta */}
              <div className="mb-10 flex flex-wrap gap-3">
                {activeProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/20 px-4 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Gallery */}
              <div className="columns-1 gap-6 md:columns-2">
                {activeProject.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-white/5"
                  >
                    <img
                      src={img}
                      alt={`${activeProject.name} ${i + 1}`}
                      className="w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Link */}
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Ver projeto
                  <HiOutlineExternalLink />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
