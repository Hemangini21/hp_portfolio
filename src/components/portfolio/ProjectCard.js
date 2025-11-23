import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isTechExpanded, setIsTechExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleTech = () => {
    setIsTechExpanded(!isTechExpanded);
  };

  // Split description in half for preview
  const words = project.description.split(' ');
  const halfLength = Math.ceil(words.length / 2);
  const shortDescription = words.slice(0, halfLength).join(' ') + '...';
  const fullDescription = project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer relative hover:shadow-2xl hover:shadow-blue-500/25 hover:border-blue-400/30 transition-all duration-500"
      layout
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Enhanced glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-cyan-400/10 blur-sm" />
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-cyan-400/15 to-pink-500/15 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover group-hover:brightness-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30 hover:bg-blue-500/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/25"
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </motion.a>

          <div className="absolute bottom-4 left-4 right-4">
            <motion.div 
              className="flex items-center gap-2 text-white/80 text-sm mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-medium">{project.date}</span>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="p-6 space-y-4"
          layout
        >
          <motion.div layout>
            <h3 className="text-xl font-bold group-hover:text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500 mb-1">
              {project.title}
            </h3>
            <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-500">
              {project.subtitle}
            </p>
          </motion.div>
          
          <motion.div layout>
            <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.3)] transition-all duration-500">
              {isDescriptionExpanded ? fullDescription : shortDescription}
            </p>
            
            {/* View More Button for Description */}
            <motion.button
              onClick={toggleDescription}
              className="mt-3 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDescriptionExpanded ? "View Less" : "View More"}
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            layout
          >
            {(isTechExpanded ? project.tech : project.tech.slice(0, 4)).map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
            
            {!isTechExpanded && project.tech.length > 4 && (
              <motion.button
                onClick={toggleTech}
                className="px-3 py-1.5 text-xs bg-white/10 rounded-full text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + {project.tech.length - 4} More
              </motion.button>
            )}
            
            {isTechExpanded && project.tech.length > 4 && (
              <motion.button
                onClick={toggleTech}
                className="px-3 py-1.5 text-xs bg-cyan-500/20 rounded-full text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show Less
              </motion.button>
            )}
          </motion.div>

          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium pt-2 group/link"
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <span className="group-hover/link:underline">View Project</span>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}