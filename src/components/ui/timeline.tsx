"use client";
import { useScroll, useTransform, useMotionValueEvent, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const [height, setHeight] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
      offsetsRef.current = rowRefs.current.map((el) =>
        el ? el.getBoundingClientRect().top - rect.top : 0
      );
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(heightTransform, "change", (latest) => {
    const count = offsetsRef.current.filter((offset) => offset <= latest).length;
    setActiveCount((prev) => (prev === count ? prev : count));
  });

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative mx-auto max-w-6xl px-6 pb-20 md:px-12">
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className="grid grid-cols-1 gap-0 pt-10 md:grid-cols-12 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex flex-col items-center self-start md:col-span-4 md:flex-row">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border p-2 transition-colors duration-500",
                    index < activeCount ? "bg-accent border-accent" : "bg-surface border-foreground/20"
                  )}
                />
              </div>
              <h3
                className={cn(
                  "hidden md:block font-display text-xl md:pl-20 md:text-4xl font-bold transition-colors duration-500",
                  index < activeCount ? "text-foreground" : "text-foreground/50"
                )}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:col-span-8 md:pl-0">
              <h3
                className={cn(
                  "md:hidden block font-display text-2xl mb-4 text-left font-bold transition-colors duration-500",
                  index < activeCount ? "text-foreground" : "text-foreground/50"
                )}
              >
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-14 md:left-20 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-foreground/15 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-accent via-accent/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
