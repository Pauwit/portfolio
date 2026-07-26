"use client";

import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

// Hand-built stand-in for Motion Primitives' Text Effect (word/blur reveal):
// the component's registry endpoint was behind active bot-mitigation at
// install time (see docs/plans), so this replicates the same visual per the
// spec's fallback clause rather than blocking on the install.
export function TextEffect({
  text,
  as: Tag = "span",
  className,
  delay = 0,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const reduced = prefersReducedMotion();

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduced ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.4, delay: delay + i * 0.05 }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
