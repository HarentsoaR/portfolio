"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  category: "web" | "design" | "mobile" | "all";
};

// Sample projects data
const projectsData: Project[] = [
  {
    id: "project1",
    title: "E-commerce Website",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
    image: "https://placehold.co/600x400/3498db/ffffff?text=E-commerce+Website",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
  },
  {
    id: "project2",
    title: "Mobile Banking App",
    description: "A secure and intuitive mobile banking application with transaction history, bill payments, and account management.",
    image: "https://placehold.co/600x400/9b59b6/ffffff?text=Banking+App",
    tags: ["React Native", "Firebase", "Redux", "Auth0"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "mobile",
  },
  {
    id: "project3",
    title: "Portfolio Design System",
    description: "A comprehensive design system including components, colors, typography, and guidelines for consistent branding.",
    image: "https://placehold.co/600x400/1abc9c/ffffff?text=Design+System",
    tags: ["Figma", "Design Systems", "UI/UX"],
    liveLink: "https://example.com",
    category: "design",
  },
  {
    id: "project4",
    title: "Task Management App",
    description: "A productivity tool for managing tasks, projects, and deadlines with team collaboration features.",
    image: "https://placehold.co/600x400/e74c3c/ffffff?text=Task+Management",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
  },
  {
    id: "project5",
    title: "Travel App UI Design",
    description: "A visually stunning travel app user interface design with booking flows, destination discovery, and user profiles.",
    image: "https://placehold.co/600x400/f1c40f/ffffff?text=Travel+App+UI",
    tags: ["UI Design", "Figma", "Prototyping"],
    liveLink: "https://example.com",
    category: "design",
  },
  {
    id: "project6",
    title: "Fitness Tracking App",
    description: "A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
    image: "https://placehold.co/600x400/27ae60/ffffff?text=Fitness+App",
    tags: ["React Native", "GraphQL", "Health APIs"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "mobile",
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "web" | "design" | "mobile">("all");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = filter === "all"
    ? projectsData
    : projectsData.filter((project) => project.category === filter);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web" },
    { id: "design", label: "Design" },
    { id: "mobile", label: "Mobile" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            My <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-8"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Take a look at some of my recent projects and work samples.
          </motion.p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id as "all" | "web" | "design" | "mobile")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-primary/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="flex-grow p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 gap-2">
                    {project.liveLink && (
                      <Button size="sm" className="gap-2" asChild>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button size="sm" variant="outline" className="gap-2" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github size={16} /> Code
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more button */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Button size="lg" variant="outline" className="rounded-full">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
