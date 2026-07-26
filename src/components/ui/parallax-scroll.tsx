"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

import { cn } from "@/lib/utils";

// Extended per the design spec: instead of a flat image list split evenly
// into three columns, each column receives pre-resolved cells (titles,
// subtitles, paragraphs, images, or blank quiet-zone spacers) so text can be
// embedded alongside images while keeping the three independently-speed
// scrolling columns from the original component.
export const ParallaxScroll = ({
  left,
  middle,
  right,
  className,
}: {
  left: ReactNode[];
  middle: ReactNode[];
  right: ReactNode[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -200]);

  const columns = [
    { items: left, y: translateFirst },
    { items: middle, y: translateSecond },
    { items: right, y: translateThird },
  ];

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      <div className="mx-auto grid max-w-5xl grid-cols-3 items-start gap-6 px-6 py-20 md:gap-10 md:px-10">
        {columns.map((col, colIdx) => (
          <div className="grid gap-6 md:gap-10" key={colIdx}>
            {col.items.map((item, idx) => (
              <motion.div style={{ y: col.y }} key={`${colIdx}-${idx}`}>
                {item}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
