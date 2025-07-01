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
    title: "Restaurant Management SaaS Application",
    description: "A web application designed for restaurateurs to efficiently manage their operations. It allows for product, order, and ingredient stock management, as well as daily special planning. The admin interface offers an intuitive dashboard with sales statistics, while the front-office simulates a fluid user experience for order taking. It all relies on a robust RESTful architecture and a secure authentication system.",
    image: "https://placehold.co/600x400/3498db/ffffff?text=Restaurant+App",
    tags: ["Vue.js", "Express.js", "MySQL", "SaaS"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
  },
  {
    id: "project2",
    title: "Car Sales Management Application",
    description: "Development of a complete platform for managing new and used vehicle sales. The application allows administrators to manage listings, users, payments, and contact requests. It also includes a customer interface with search filters, favorites, and history management. Backend developed with Spring Boot and a NoSQL database for optimal scalability.",
    image: "https://placehold.co/600x400/9b59b6/ffffff?text=Car+Sales+App",
    tags: ["React.js", "Spring Boot", "MongoDB"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
  },
  {
    id: "project3",
    title: "FIFO/LIFO Stock Management Program with Equivalence Units",
    description: "An advanced stock management tool integrating FIFO and LIFO methods for precise inventory movement tracking. The system manages purchases, consumption, and unit conversions (e.g., kg ↔️ liters) through a conversion module based on equivalence units. Interface built with JSP using a classic MVC architecture, and an optimized relational database.",
    image: "https://placehold.co/600x400/1abc9c/ffffff?text=Stock+Management",
    tags: ["Java", "JSP", "PostgreSQL"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
  },
  {
    id: "project4",
    title: "Nail Salon Loyalty Card Management Program",
    description: "A lightweight and modern application for managing loyalty cards for clients of a beauty salon. It offers tracking of services, attendance, and loyalty points balance. Employees can record visits, credit points, and offer discounts. The interface is designed to be usable on a tablet, with a secure Node.js backend and a MongoDB database.",
    image: "https://placehold.co/600x400/e74c3c/ffffff?text=Loyalty+App",
    tags: ["React.js", "Express.js", "MongoDB"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
  },
  {
    id: "project5",
    title: "Garage Management Program (Services and Users)",
    description: "A business application for the daily management of an automotive garage. It allows recording of clients, vehicles, services performed, and generated quotes or invoices. An ergonomic Angular interface provides access to search, filtering, and history functionalities. The system distinguishes rights according to roles (admin, mechanic) and ensures comprehensive service management.",
    image: "https://placehold.co/600x400/f1c40f/ffffff?text=Garage+Management",
    tags: ["MongoDB", "Express.js", "Angular", "Node.js", "MEAN Stack"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
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
