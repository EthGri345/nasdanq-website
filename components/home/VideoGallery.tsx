"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const videos = [
  { id: 1, src: "/videos/3635333496911377835.mov", title: "NASDANQ Intro" },
  { id: 2, src: "/videos/8872483471728788470.mov", title: "Meme Evolution" },
  { id: 3, src: "/videos/copy_6A8D785C-DE38-4EC2-8420-4B96BC47AE81.mov", title: "Trading Culture" },
  { id: 4, src: "/videos/copy_6E44D461-4A00-4AD5-813D-71E2A2EAACE0.mov", title: "Digital Economy" },
  { id: 5, src: "/videos/copy_7C6375B5-CEAA-43C1-9317-65894B5AD2C1.mov", title: "Pump Dynamics" },
  { id: 6, src: "/videos/copy_A420B1F7-C3C5-48A4-8EF3-E6019C9D7CB3.mov", title: "Market Chaos" },
  { id: 7, src: "/videos/copy_A94E4303-697A-4B09-8A74-3B9642D1FF6D.mov", title: "Conviction" },
  { id: 8, src: "/videos/copy_C1C89045-A3E8-47A1-8073-046C7517D926.mov", title: "Community" },
  { id: 9, src: "/videos/copy_C29DA19C-646D-4108-AE83-125968D5ED21.mov", title: "Expression" },
  { id: 10, src: "/videos/copy_C361616C-B20D-420F-82F7-2EA38EEAECC3.mov", title: "Future" },
  { id: 11, src: "/videos/copy_C54D4FED-2661-423C-A218-043F35B72914.mov", title: "Movement" },
  { id: 12, src: "/videos/copy_E1C0520A-F10C-4D9F-869C-3975B1F1ACFA.mov", title: "Momentum" },
  { id: 13, src: "/videos/copy_E70380C3-FA1E-45E5-9831-5B257C593F32.mov", title: "Belief" },
  { id: 14, src: "/videos/copy_FF5D157C-6E7A-4211-A33C-F05F64532875.mov", title: "Legacy" },
];

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const selected = videos.find((v) => v.id === selectedVideo);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedVideo(video.id)}
            className="group relative aspect-video rounded-lg overflow-hidden border border-border bg-background-card cursor-pointer hover:border-accent-green transition-all"
          >
            <video
              src={video.src}
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <div className="p-3 w-full">
                <div className="text-sm font-semibold text-text-primary">
                  {video.title}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-accent-green/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-green ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedVideo && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 bg-background-primary/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-text-secondary hover:text-text-primary z-10"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="rounded-lg overflow-hidden border border-accent-green bg-background-card">
                <video
                  src={selected.src}
                  autoPlay
                  controls
                  loop
                  className="w-full"
                />
                <div className="p-4 border-t border-border">
                  <h3 className="text-lg font-bold text-text-primary">{selected.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
