"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

type Skill = {
  name: string;
  level: number;
  category: "design" | "development" | "tools";
  color: string;
};

// Updated skills data
const skillsData: Skill[] = [
  // SYSTEMS (Tools)
  { name: "Windows", level: 85, category: "tools", color: "#0078D4" },
  { name: "Linux", level: 80, category: "tools", color: "#FCC624" },

  // LANGUAGES (Development)
  { name: "Java", level: 85, category: "development", color: "#007396" },
  { name: "PHP", level: 80, category: "development", color: "#777BB4" },
  { name: "C#", level: 80, category: "development", color: "#6A2F7C" },
  { name: "Python", level: 90, category: "development", color: "#3776AB" },
  { name: "JavaScript", level: 95, category: "development", color: "#F7DF1E" },
  { name: "HTML5", level: 95, category: "development", color: "#E34C26" },
  { name: "CSS3", level: 90, category: "development", color: "#1572B6" },

  // SGBD (Development)
  { name: "PostgreSQL", level: 80, category: "development", color: "#336791" },
  { name: "MySQL", level: 85, category: "development", color: "#4479A1" },
  { name: "MongoDB", level: 80, category: "development", color: "#47A248" },

  // FRAMEWORKS & LIBRARIES (Development)
  { name: "Express.js", level: 80, category: "development", color: "#000000" },
  { name: "ReactJS", level: 90, category: "development", color: "#61DAFB" },
  { name: "Vue.js", level: 80, category: "development", color: "#4FC08D" },
  { name: "Bootstrap", level: 85, category: "development", color: "#7952B3" },
  { name: "Next.js", level: 85, category: "development", color: "#000000" },

  // TOOLS
  { name: "VSCode", level: 90, category: "tools", color: "#007ACC" },
  { name: "IntelliJ IDEA", level: 80, category: "tools", color: "#000000" },
  { name: "Git", level: 85, category: "tools", color: "#F05032" },
  { name: "Postman", level: 80, category: "tools", color: "#FF6C37" },
  { name: "Notion", level: 75, category: "tools", color: "#000000" },
  { name: "Docker", level: 75, category: "tools", color: "#2496ED" },
  { name: "Kubernetes", level: 70, category: "tools", color: "#326CE5" },
  { name: "Jupyter", level: 70, category: "tools", color: "#F37626" },
  { name: "CI/CD", level: 70, category: "tools", color: "#000000" },

  // OTHER (Development)
  { name: "JWT", level: 75, category: "development", color: "#000000" },
  { name: "OAuth", level: 75, category: "development", color: "#000000" },
  { name: "OpenAI API", level: 70, category: "development", color: "#47A248" },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "design" | "development" | "tools">("all");
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filter skills based on active tab
  const filteredSkills = activeTab === "all"
    ? skillsData
    : skillsData.filter((skill) => skill.category === activeTab);

  // Animate progress bars when in view
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const values: Record<string, number> = {};
        for (const skill of skillsData) {
          values[skill.name] = skill.level;
        }
        setProgressValues(values);
      }, 400);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [inView]);

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

  const tabs = [
    { id: "all", label: "All Skills" },
    { id: "design", label: "Design" },
    { id: "development", label: "Development" },
    { id: "tools", label: "Tools" },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
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
            My <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-8"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Here are some of my skills and expertise that I&apos;ve developed over the years.
          </motion.p>
        </motion.div>

        {/* Tabs for filtering skills */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "all" | "design" | "development" | "tools")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-primary/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{skill.name}</h3>
                <span className="text-sm font-bold">{progressValues[skill.name] || 0}%</span>
              </div>
              <Progress
                value={progressValues[skill.name] || 0}
                className="h-2"
                style={{
                  "--progress-background": `${skill.color}80`,
                  "--progress-foreground": skill.color
                } as React.CSSProperties}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
