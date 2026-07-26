import { Navbar as ResizableNavbar, NavBody, NavItems } from './ui/resizable-navbar';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { name: 'Home', link: '/' },
  { name: 'Me', link: '/me' },
  { name: 'Projects', link: '/projects' },
  { name: 'Interests', link: '/interests' },
  { name: 'Contact', link: '/contact' },
];

export default function Navbar() {
  return (
    <ResizableNavbar>
      <NavBody>
        <NavItems items={LINKS} />
        <ThemeToggle />
      </NavBody>
    </ResizableNavbar>
  );
}
