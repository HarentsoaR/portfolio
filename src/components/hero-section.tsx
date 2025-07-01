"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button"; // Assuming you have a shadcn/ui button
import { ArrowDown, Code, Database, FileCode } from "lucide-react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "next-themes";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.8 },
  },
};

// --- REUSABLE COMPONENTS ---

/**
 * Animated Profile Picture Component
 * Features a floating animation and orbiting skill icons.
 */
const AnimatedPhoto = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Floating animation container */}
      <motion.div
        animate={{
          y: ["0%", "-4%", "0%"],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* Main image with glowing border */}
        <div className={`relative w-full aspect-square rounded-full p-2
          bg-gradient-to-br ${isDark ? 'from-primary/20 via-slate-900 to-slate-900' : 'from-primary/10 via-slate-50 to-slate-50'}
          shadow-xl ${isDark ? 'shadow-primary/20' : 'shadow-primary/10'}`}>
            <div className={`rounded-full overflow-hidden w-full h-full border-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                <Image
                    src="/images/megane2.png" // Make sure this path is correct
                    alt="Mégane Rakotonarivo Profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full scale-105"
                    priority
                    // Fallback in case the image fails to load
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/7b4ae2/ffffff?text=MR'; }}
                />
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


/**
 * Particle Background Effect
 */
const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const particleColor = isDark ? 'rgba(123, 74, 226, 0.7)' : 'rgba(123, 74, 226, 0.5)';
        const lineColor = isDark ? 'rgba(123, 74, 226, 0.15)' : 'rgba(123, 74, 226, 0.1)';

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                });
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animateParticles);
        };

        resizeCanvas();
        animateParticles();

        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]); // Rerun effect if theme changes

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
};


// --- MAIN SECTION COMPONENT ---
export default function HeroSection() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section id="home" className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-300 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <ParticleBackground />
            
            <div className="container mx-auto px-4 z-10">
                <motion.div
                    className="grid md:grid-cols-2 items-center gap-12 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Side: Text Content */}
                    <div className="text-center md:text-left">
                        <motion.div variants={textVariants}>
                            <TypeAnimation
                                sequence={[
                                    'Mégane Rakotonarivo',
                                    2000,
                                    'A Fullstack Developer',
                                    2000,
                                    'A Creative Coder',
                                    2000,
                                ]}
                                wrapper="h1"
                                speed={40}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground"
                                repeat={Infinity}
                            />
                        </motion.div>
                        
                        <motion.p
                            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0"
                            variants={textVariants}
                        >
                            I am determined to achieve excellence in all projects I undertake. My commitment drives me to seize every professional opportunity and enrich my experience.
                        </motion.p>
                        
                        <motion.div
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                            variants={buttonContainerVariants}
                        >
                            <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                View My Work
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-semibold hover:bg-primary/10 hover:scale-105 transition-transform">
                                Contact Me
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Side: Animated Photo */}
                    <div className="flex justify-center md:justify-end">
                        <AnimatedPhoto />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
                <Button variant="ghost" size="icon" className="rounded-full animate-bounce">
                  <ArrowDown />
                </Button>
            </motion.div>
        </section>
    );
}
