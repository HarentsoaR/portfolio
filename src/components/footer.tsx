"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      href: "https://github.com",
      color: "hover:text-white hover:bg-black",
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      href: "https://twitter.com",
      color: "hover:text-white hover:bg-blue-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
      color: "hover:text-white hover:bg-blue-700",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      href: "https://instagram.com",
      color: "hover:text-white hover:bg-pink-600",
    },
  ];

  return (
    <footer className="bg-muted py-12 relative">
      <div className="container mx-auto px-4">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="icon"
            className="rounded-full bg-background shadow-md hover:shadow-lg transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-primary mb-6">Portfolio</div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex space-x-4 mb-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full text-muted-foreground transition-all ${social.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${social.name}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="text-center text-muted-foreground text-sm">
            <p className="mb-2">
              © {new Date().getFullYear()} Soul_meg. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
