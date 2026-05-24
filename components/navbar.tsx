"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/electronics", label: "Electronics" },
  { href: "/cabs", label: "Cabs" },
  { href: "/food", label: "Food" },
  { href: "/grocery", label: "Grocery" },
  { href: "/ai", label: "AI" },
  { href: "/deals", label: "Deals" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#03100d]/78 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-400 text-emerald-950 shadow-glow">
            <Search className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-normal text-white">
            one<span className="text-emerald-300">Compare</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition hover:text-white",
                pathname === item.href && "text-white"
              )}
            >
              {pathname === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md bg-white/8"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1.5 text-xs font-medium text-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            Live demo data
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 px-4 py-3 lg:hidden"
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-semibold text-zinc-300",
                  pathname === item.href && "bg-emerald-400/12 text-emerald-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
