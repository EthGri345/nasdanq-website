"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { VideoGallery } from "@/components/home/VideoGallery";

function Chapter({
  number,
  title,
  year,
  children,
}: {
  number: string;
  title: string;
  year: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative py-16 md:py-24"
    >
      {/* Chapter Header */}
      <div className="mb-12 space-y-2">
        <div className="flex items-center space-x-4">
          <span className="font-mono text-sm text-accent-green">{number}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent-green/50 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary">
          {title}
        </h2>
        <div className="text-xl md:text-2xl font-mono text-accent-green">
          {year}
        </div>
      </div>

      {/* Chapter Content */}
      <div className="prose prose-invert max-w-none">{children}</div>
    </motion.section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-green via-accent-purple to-accent-pink" />
      <blockquote className="pl-8 py-6 text-2xl md:text-3xl font-medium italic text-gradient-green">
        "{children}"
      </blockquote>
    </div>
  );
}

export default function LorePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background-secondary to-background-primary">
        <div className="container-custom py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display mb-6">
              <span className="text-gradient-rainbow">THE NASDANQ</span>
              <br />
              <span className="text-text-primary">MYTHOLOGY</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              From a Reddit joke to blockchain reality. This is the story of how
              memes became markets.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />
      </section>

      {/* Timeline Chapters */}
      <div className="container-custom max-w-4xl">
        {/* CHAPTER I */}
        <Chapter number="CHAPTER I" title="THE GENESIS" year="2016">
          <p className="text-lg text-text-secondary leading-relaxed">
            In the beginning, there was r/MemeEconomy.
          </p>

          <p className="text-lg text-text-secondary leading-relaxed mt-6">
            On Reddit, in the year 2016, a community formed around a satirical
            premise so obvious it bordered on prophecy: memes were currency. Not
            metaphorically. Literally. A subreddit emerged where users mock-traded
            memes like blue-chip stocks, predicting which formats would moon and
            which would crash harder than a pump-and-dump altcoin.
          </p>

          <div className="my-8 p-6 rounded-lg bg-background-card border border-border">
            <p className="text-text-secondary italic">The pioneers spoke in the language of finance:</p>
            <ul className="mt-4 space-y-2 text-text-secondary">
              <li>"All in on dat boi. Market correction incoming for Harambe."</li>
              <li>"Arthur's Fist showing strong support levels. BUY."</li>
              <li>"This is the top for conceited reaction guy. SELL SELL SELL."</li>
            </ul>
          </div>

          <p className="text-lg text-text-secondary leading-relaxed">
            It was performance art. It was prophecy. It was fucking hilarious.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background-card border border-border">
              <div className="font-bold text-accent-green">Darkpitt</div>
              <div className="text-xs text-text-tertiary mt-1">The Visionary</div>
            </div>
            <div className="p-4 rounded-lg bg-background-card border border-border">
              <div className="font-bold text-accent-green">AchillesDev</div>
              <div className="text-xs text-text-tertiary mt-1">Early Builder</div>
            </div>
            <div className="p-4 rounded-lg bg-background-card border border-border">
              <div className="font-bold text-accent-green">Icedog68</div>
              <div className="text-xs text-text-tertiary mt-1">Early Builder</div>
            </div>
            <div className="p-4 rounded-lg bg-background-card border border-border">
              <div className="font-bold text-accent-green">12-Person Team</div>
              <div className="text-xs text-text-tertiary mt-1">Made It Real</div>
            </div>
          </div>
        </Chapter>

        {/* CHAPTER II */}
        <Chapter number="CHAPTER II" title="THE PLATFORM" year="2017">
          <p className="text-lg text-text-secondary leading-relaxed">
            NASDANQ Beta launched in January 2017. Not as a joke anymore, but as a
            functional trading platform.
          </p>

          <div className="my-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">The Architecture:</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-accent-green mt-1">→</span>
                <span className="text-text-secondary">
                  Each user received 1000 units of NASDANQ currency on signup
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-accent-green mt-1">→</span>
                <div className="text-text-secondary">
                  <strong className="text-text-primary">Three distinct markets:</strong>
                  <ol className="mt-2 ml-4 space-y-2">
                    <li>
                      <span className="text-accent-orange font-mono">1.</span>{" "}
                      <strong>Penny Stocks</strong> - Obscure, low-tier memes (high
                      risk, high reward)
                    </li>
                    <li>
                      <span className="text-accent-orange font-mono">2.</span>{" "}
                      <strong>Text-Based Memes</strong> - Fixed text, variable images
                      (e.g., "One does not simply...")
                    </li>
                    <li>
                      <span className="text-accent-orange font-mono">3.</span>{" "}
                      <strong>Image-Based Memes</strong> - Fixed image, variable text
                      (e.g., Distracted Boyfriend)
                    </li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>

          <p className="text-lg text-text-secondary leading-relaxed">
            Users traded fictional shares based on perceived cultural momentum. The
            platform tracked "meme sentiment" before sentiment analysis was
            everywhere. Before NFTs. Before anyone tokenized anything.
          </p>

          <div className="my-8 p-6 rounded-lg bg-gradient-to-r from-accent-green/10 to-transparent border border-accent-green/20">
            <p className="text-text-secondary">
              <strong className="text-accent-green">The Verge</strong> covered it.{" "}
              <strong className="text-accent-green">Know Your Meme</strong>{" "}
              documented it. The system was real enough to have transaction
              histories, portfolios, and net worth leaderboards denominated in{" "}
              <strong className="text-accent-green font-mono">GBP</strong> (Good Boy
              Points).
            </p>
          </div>
        </Chapter>

        {/* CHAPTER III */}
        <Chapter number="CHAPTER III" title="THE PROPHECY" year="2021-2024">
          <p className="text-lg text-text-secondary leading-relaxed">
            What r/MemeEconomy predicted as satire became reality:
          </p>

          <div className="my-12 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center font-bold text-accent-green">
                2021
              </div>
              <div>
                <p className="text-lg text-text-secondary">
                  NFTs prove that people will pay real money for JPEGs of memes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center font-bold text-accent-purple">
                2024
              </div>
              <div>
                <p className="text-lg text-text-secondary">
                  Pump.fun launches, enabling anyone to create a token in seconds.
                  Suddenly, thousands of meme coins flood Solana daily. The market
                  decides their worth in real-time, exactly like NASDANQ simulated.
                </p>
              </div>
            </div>
          </div>

          <PullQuote>
            The prophecy was complete. Memes aren't just culture—they're liquid
            markets with market caps, volume, and price discovery.
          </PullQuote>
        </Chapter>

        {/* CHAPTER IV */}
        <Chapter number="CHAPTER IV" title="THE RETURN" year="2025">
          <p className="text-lg text-text-secondary leading-relaxed">
            NASDANQ doesn't return as nostalgia. It returns as infrastructure.
          </p>

          <p className="text-lg text-text-secondary leading-relaxed mt-6">
            The original was limited by Web2. No real value transfer. No
            composability. No liquidity.
          </p>

          <div className="my-8">
            <h3 className="text-2xl font-bold text-gradient-green mb-4">
              NASDANQ on Solana is the evolution:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <span className="text-accent-green text-2xl">✓</span>
                <span className="text-lg text-text-secondary">
                  Real markets (Pump.fun integration)
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-accent-green text-2xl">✓</span>
                <span className="text-lg text-text-secondary">
                  Real liquidity (Solana DeFi)
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-accent-green text-2xl">✓</span>
                <span className="text-lg text-text-secondary">
                  Real conviction (no paper trading)
                </span>
              </li>
            </ul>
          </div>

          <PullQuote>One repost can change your portfolio forever.</PullQuote>

          <p className="text-lg text-text-secondary leading-relaxed">
            This isn't a phase. It's the present and future of expression. When the
            world finally caught up to what 12 Redditors built in 2017, we were
            ready.
          </p>
        </Chapter>

        {/* Video Gallery Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative py-16 md:py-24"
        >
          <div className="mb-12 space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary text-center">
              The Visual Archive
            </h2>
            <p className="text-center text-text-secondary max-w-2xl mx-auto">
              A collection of moments, memes, and movements that define NASDANQ
            </p>
          </div>

          <VideoGallery />
        </motion.section>

        {/* WOMP WOMP Ending */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="py-24 text-center"
        >
          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-black text-gradient-rainbow glitch"
            animate={{
              textShadow: [
                "0 0 0px rgba(0,255,136,0)",
                "0 0 20px rgba(0,255,136,0.5)",
                "0 0 0px rgba(0,255,136,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            WOMP WOMP
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}
