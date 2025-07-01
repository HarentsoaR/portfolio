"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-20 bg-background">
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
            About <span className="text-primary">Me</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-8"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Here you can learn a little more about me, my background, and what I
            do in my free time.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground">
              I'm a passionate Fullstack Developer and Master 1 student at ITU University, with a keen eye for
              aesthetics and functionality. My journey in development started 5 years
              ago, and I&apos;ve been on a continuous learning path ever since.
            </p>
            <p className="text-muted-foreground">
              My specialties include UX/UI design, building secured applications, and developing SaaS solutions.
              My goal is to build digital products that not only look great but also solve real
              problems for users.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Name:</p>
                <p className="text-muted-foreground">Mégane Rakotonarivo</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">rakotonarivomegane@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">From:</p>
                <p className="text-muted-foreground">Antananarivo, MADAGASCAR</p>
              </div>
              <div>
                <p className="font-medium">Freelance:</p>
                <p className="text-primary">Work in progress</p>
              </div>
            </div>
            <a href="/CV-MéganeRakotonarivo.pdf" download>
              <Button className="gap-2">
                <Download size={16} />
                Download Resume
              </Button>
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                id: "stat-commits",
                number: "500+",
                text: "GitHub Commit Count",
                color: "bg-primary/10 text-primary",
              },
              {
                id: "stat-repos",
                number: "4+",
                text: "Repositories",
                color: "bg-blue-500/10 text-blue-500",
              },
              {
                id: "stat-followers",
                number: "4+",
                text: "Followers",
                color: "bg-green-500/10 text-green-500",
              },
              {
                id: "stat-stars",
                number: "5+",
                text: "Stars",
                color: "bg-amber-500/10 text-amber-500",
              },
            ].map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent
                    className={`flex flex-col items-center justify-center p-6 text-center h-full ${stat.color}`}
                  >
                    <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                    <p className="text-sm">{stat.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
