"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Star, Building, School } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useRef, useEffect, useState } from "react";

// --- DATA ---
type TimelineItemType = {
  title: string;
  subtitle: string;
  period: string;
  Icon: React.ElementType;
  current: boolean;
};

type TimelineSectionType = {
  category: string;
  icon: React.ReactNode;
  items: TimelineItemType[];
};

const timelineData: TimelineSectionType[] = [
  {
    category: "Education",
    icon: <GraduationCap />,
    items: [
      {
        title: "Bachelor's Degree",
        subtitle: "ITU University",
        period: "Oct 2021 - Nov 2024",
        Icon: School,
        current: false,
      },
      {
        title: "Master's Degree",
        subtitle: "ITU University",
        period: "Nov 2024 - Present",
        Icon: GraduationCap,
        current: true,
      },
    ],
  },
  {
    category: "Work Experience",
    icon: <Briefcase />,
    items: [
      {
        title: "Intern Developer",
        subtitle: "Misaina Incorporation",
        period: "July 2024 - Nov 2024",
        Icon: Building,
        current: false,
      },
      {
        title: "Fullstack Developer Junior",
        subtitle: "Misaina Incorporation",
        period: "Feb 2025 - Present",
        Icon: Star,
        current: true,
      },
    ],
  },
];

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const timelineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};

// --- REUSABLE COMPONENTS ---
const TimelineItem: React.FC<{ item: TimelineItemType; isLast: boolean }> = ({ item, isLast }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={itemVariants}
      className={`relative pl-12 pb-10 ${isLast ? "pb-0" : ""}`}
    >
      {/* Timeline Line and Icon */}
      <div className="absolute left-0 top-1">
        <div className={`absolute left-[1.5px] top-9 h-full w-0.5 ${isDark ? 'bg-slate-700' : 'bg-slate-200'} ${isLast ? 'h-0' : ''}`}></div>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className={`absolute -left-1.5 top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full ${
            item.current
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
              : isDark
              ? "bg-slate-800 border-2 border-slate-600"
              : "bg-white border-2 border-slate-200"
          }`}
        >
          <item.Icon className={`h-5 w-5 ${item.current ? "" : "text-primary"}`} />
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div
        whileHover={{ scale: 1.03, y: -5, boxShadow: `0 10px 20px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'}` }}
        className={`rounded-xl p-5 transition-all duration-300 ${
          isDark
            ? "bg-slate-800/50 hover:bg-slate-800 border border-slate-700"
            : "bg-white hover:bg-slate-50 border border-slate-200/80"
        } ${item.current ? `border-2 border-primary/80 ${isDark ? 'bg-primary/10' : 'bg-primary/5'}` : ""}`}
      >
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-md md:text-lg text-foreground">{item.title}</h4>
          {item.current && (
            <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
              Current
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">{item.subtitle}</p>
        <p className="text-xs text-muted-foreground/80">{item.period}</p>
      </motion.div>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineSectionType> = ({ category, icon, items }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={timelineVariants}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 text-foreground">
        <span className="text-primary">{icon}</span>
        {category}
      </h3>
      <div className="relative">
        {items.map((item: TimelineItemType, index: number) => (
          <TimelineItem key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === 'dark';

  return (
    <section id="experience" className={`py-24 md:py-32 transition-colors duration-300 ${isDark ? 'bg-background' : 'bg-muted/30'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2 variants={titleVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-foreground">
            My Journey
          </motion.h2>
          <motion.div
            variants={titleVariants}
            className={`w-24 h-1.5 mx-auto mb-6 rounded-full bg-primary`}
          />
          <motion.p
            variants={titleVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A timeline of my academic achievements and professional milestones.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-12">
          {timelineData.map((data, index) => (
            <Timeline
              key={index}
              category={data.category}
              icon={data.icon}
              items={data.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 