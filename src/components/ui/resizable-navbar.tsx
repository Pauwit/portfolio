import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/reducedMotion';

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
  reduced?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
}

/**
 * Scroll-aware wrapper (Aceternity's real mechanism, adapted). Drives a
 * `visible` motion state off actual scroll position via `useScroll` +
 * `useMotionValueEvent`, then clones it into NavBody, which spring-animates
 * its size/shadow off that value. Under prefers-reduced-motion, the scroll
 * callback is a no-op, so `visible` never leaves its initial `false` value
 * and the pill renders at one constant size.
 */
export function Navbar({ children, className }: NavbarProps) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (reduced) return;
    setVisible(latest > 24);
  });

  return (
    <motion.nav className={cn('fixed inset-x-0 top-4 z-50 flex justify-center', className)}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<NavBodyProps>, { visible, reduced })
          : child,
      )}
    </motion.nav>
  );
}

export function NavBody({ children, className, visible, reduced }: NavBodyProps) {
  return (
    <motion.div
      animate={{
        width: visible ? '85%' : '100%',
        paddingLeft: visible ? '16px' : '24px',
        paddingRight: visible ? '16px' : '24px',
        paddingTop: visible ? '8px' : '12px',
        paddingBottom: visible ? '8px' : '12px',
        boxShadow: visible
          ? '0 8px 30px rgba(0, 0, 0, 0.12)'
          : '0 0px 0px rgba(0, 0, 0, 0)',
      }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 50 }}
      className={cn(
        'relative z-[60] mx-auto flex w-full max-w-2xl items-center justify-between gap-6 rounded-chip border border-ink/10 bg-surface/70 backdrop-blur-md',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function NavItems({ items, className }: NavItemsProps) {
  return (
    <div className={cn('flex items-center gap-6', className)}>
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          className="font-body text-sm text-ink/85 transition-colors hover:text-accent"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}
