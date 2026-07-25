import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { prefersReducedMotion } from '../lib/reducedMotion';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/me', label: 'Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/interests', label: 'Interests' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
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
    <nav
      className={[
        'fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-6',
        'rounded-chip border border-ink/10 bg-surface/70 backdrop-blur-md',
        reduced ? '' : 'transition-[padding] duration-300',
        scrolled ? 'px-4 py-2' : 'px-6 py-3',
      ].join(' ')}
    >
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="font-body text-sm text-ink/85 transition-colors hover:text-accent"
        >
          {link.label}
        </a>
      ))}
      <ThemeToggle />
    </nav>
  );
}
