"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SwapPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to a placeholder launch date (can be configured)
  const launchDate = new Date("2025-11-01T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (Mailchimp, ConvertKit, Resend)
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-accent-green/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative text-8xl md:text-9xl">🔄</div>
          </div>
        </motion.div>

        {/* Coming Soon Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display">
            <motion.span
              className="text-gradient-green inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              COMING SOON
            </motion.span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Trade memes directly. No intermediaries.{" "}
            <span className="text-accent-green">Pure chaos.</span>
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="rounded-lg border border-border bg-background-card p-6 hover:border-accent-green transition-colors"
            >
              <div className="font-mono text-4xl md:text-5xl font-bold text-gradient-green">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-text-tertiary uppercase tracking-wide mt-2">
                {unit}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Feature Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            What's Coming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-lg border border-border bg-background-card hover:border-accent-green transition-colors">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-text-primary mb-2">
                Lightning Fast Swaps
              </h3>
              <p className="text-sm text-text-secondary">
                Powered by Jupiter, the best DEX aggregator on Solana
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background-card hover:border-accent-green transition-colors">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-bold text-text-primary mb-2">
                Best Prices
              </h3>
              <p className="text-sm text-text-secondary">
                Automatically routes through multiple liquidity pools
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background-card hover:border-accent-green transition-colors">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="font-bold text-text-primary mb-2">
                Your Keys, Your Crypto
              </h3>
              <p className="text-sm text-text-secondary">
                Non-custodial. Your wallet, your control
              </p>
            </div>
          </div>
        </motion.div>

        {/* Email Signup */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <div className="p-4 rounded-lg bg-accent-green/10 border border-accent-green/30 text-accent-green">
              ✓ Thanks! We'll notify you when swap launches.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-text-secondary">
                Get notified when swap goes live
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background-card text-text-primary placeholder:text-text-tertiary focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-accent-green text-background-primary font-medium hover:bg-accent-green-alt transition-colors"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-xs text-text-tertiary">
                No spam. Just a heads up when trading is live.
              </p>
            </form>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-text-tertiary">
            While you wait, check out the{" "}
            <a
              href="/"
              className="text-accent-green hover:underline font-medium"
            >
              token leaderboard
            </a>{" "}
            or read the{" "}
            <a
              href="/lore"
              className="text-accent-green hover:underline font-medium"
            >
              NASDANQ lore
            </a>
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
