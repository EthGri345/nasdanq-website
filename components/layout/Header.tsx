"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const navigation = [
  { name: "Pump.fun Leaderboard", href: "/" },
  { name: "Swap", href: "/swap" },
  { name: "Lore", href: "/lore" },
  { name: "Art", href: "/art" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background-primary/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-green-alt">
                NASDANQ
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-accent-green"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Wallet Connect (Phase 2) */}
          <div className="hidden md:block">
            <div className="px-4 py-2 text-sm text-text-tertiary">
              {/* Placeholder for wallet connect button */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-text-secondary hover:text-text-primary">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation (collapsible) */}
        <div className="md:hidden border-t border-border/50 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "text-accent-green bg-accent-green/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-card"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
