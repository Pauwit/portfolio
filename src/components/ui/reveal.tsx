"use client";

import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

// Hand-built stand-in for Motion Primitives' Animated Group (scroll reveals):
// the component's registry endpoint was behind active bot-mitigation at
// install time (see docs/plans), so this replicates fade+slide-up /
// staggered-lines per the spec's fallback clause rather than blocking.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = prefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * 0.08}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
