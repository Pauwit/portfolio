import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
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
 * Scroll-aware wrapper. Tracks scroll position and clones `visible`/`reduced`
 * into its child (NavBody), which uses them to shrink on scroll. When
 * prefers-reduced-motion is set, `visible` never flips, so the navbar always
 * renders at its one fixed (unscrolled) size.
 */
export function Navbar({ children, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());

    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('fixed inset-x-0 top-4 z-50 flex justify-center', className)}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<NavBodyProps>, {
              visible: scrolled && !reduced,
              reduced,
            })
          : child,
      )}
    </div>
  );
}

export function NavBody({ children, className, visible, reduced }: NavBodyProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-6 rounded-chip border border-ink/10 bg-surface/70 backdrop-blur-md',
        reduced ? '' : 'transition-all duration-300',
        visible ? 'gap-4 px-4 py-2' : 'px-6 py-3',
        className,
      )}
    >
      {children}
    </div>
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
