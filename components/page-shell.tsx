"use client";

import { motion } from "framer-motion";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-screen px-4 pb-12 pt-24 sm:px-6 lg:px-8"
    >
      {children}
    </motion.main>
  );
}
