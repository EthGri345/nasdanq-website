"use client";

import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Card } from "./Card";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export function StatCard({
  label,
  value,
  subtitle,
  trend,
  icon,
  isLoading = false,
  className,
  ...props
}: StatCardProps) {
  const trendColors = {
    up: "text-accent-green",
    down: "text-accent-pink",
    neutral: "text-accent-orange",
  };

  return (
    <Card hover glow className={cn("relative overflow-hidden", className)} {...props}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

      <div className="relative z-10 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            {label}
          </span>
          {icon && <div className="text-accent-green opacity-70">{icon}</div>}
        </div>

        {isLoading ? (
          <div className="h-10 w-3/4 animate-pulse rounded bg-background-secondary" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-baseline space-x-2"
          >
            <span className="font-mono text-3xl font-bold text-text-primary">
              {value}
            </span>
            {trend && (
              <span className={cn("text-sm font-medium", trendColors[trend])}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
              </span>
            )}
          </motion.div>
        )}

        {subtitle && (
          <span className="text-xs text-text-tertiary">{subtitle}</span>
        )}

        {/* Update indicator */}
        <div className="absolute bottom-2 right-2">
          <div className="h-2 w-2 rounded-full bg-accent-green animate-glow-pulse" />
        </div>
      </div>
    </Card>
  );
}
