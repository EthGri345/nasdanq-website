"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Art collection
const artCategories = ["All", "Character Art", "Logos & Branding", "Community"];

const artCollection = [
  {
    id: 1,
    title: "NASDANQ Character",
    artist: "maūru",
    category: "Character Art",
    image: "/art/IMG_8945.webp",
  },
  // Add more artwork as assets are provided
];

export default function ArtPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredArt =
    selectedCategory === "All"
      ? artCollection
      : artCollection.filter((art) => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background-secondary to-background-primary">
        <div className="container-custom py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black font-display mb-6">
              <span className="text-gradient-green">ART</span>
              <br />
              <span className="text-text-primary">GALLERY</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Visual expressions of the NASDANQ movement. From concept art to
              community creations.
            </p>
          </motion.div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
      </section>

      {/* Gallery */}
      <section className="container-custom py-12 md:py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {artCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-accent-green text-background-primary"
                  : "bg-background-card text-text-secondary hover:text-text-primary hover:border-accent-green border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Art Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArt.map((art, index) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-background-card cursor-pointer hover:border-accent-green transition-all"
                onClick={() => setLightboxImage(art.id)}
              >
                {art.image ? (
                  <>
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <div className="font-semibold text-text-primary">
                          {art.title}
                        </div>
                        <div className="text-sm text-text-secondary">
                          by {art.artist}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-3 p-6">
                      <div className="text-6xl">🎨</div>
                      <div>
                        <div className="font-bold text-text-primary">
                          {art.title}
                        </div>
                        <div className="text-sm text-text-secondary">
                          by {art.artist}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Info message */}
          {artCollection.length < 5 && (
            <div className="mt-12 text-center p-8 rounded-lg border border-border bg-background-card">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                More Art Coming Soon
              </h3>
              <p className="text-text-secondary max-w-md mx-auto text-sm">
                Add more artwork files to /public/art/ and update this page to display them.
              </p>
            </div>
          )}
        </div>

        {/* Future: Community Submission Section */}
        <div className="mt-16 max-w-3xl mx-auto p-8 rounded-lg border border-border bg-background-card text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            Community Submissions
          </h3>
          <p className="text-text-secondary mb-6">
            Have NASDANQ art to share? Community submissions coming in Phase 3.
          </p>
          <button
            disabled
            className="px-6 py-3 rounded-lg bg-background-secondary text-text-tertiary cursor-not-allowed"
          >
            Submit Artwork (Coming Soon)
          </button>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (() => {
        const art = artCollection.find((a) => a.id === lightboxImage);
        if (!art) return null;

        return (
          <div
            className="fixed inset-0 z-50 bg-background-primary/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div className="max-w-4xl w-full">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary z-10"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {art.image ? (
                <div className="bg-background-card rounded-lg overflow-hidden border border-accent-green">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-auto"
                  />
                  <div className="p-6 border-t border-border">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {art.title}
                    </h3>
                    <p className="text-text-secondary">by {art.artist}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
