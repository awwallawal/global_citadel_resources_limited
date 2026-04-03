import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnchorNavClientProps {
  items: Array<{ label: string; href: string }>;
}

export default function AnchorNavClient({ items }: AnchorNavClientProps) {
  const [activeId, setActiveId] = useState(items[0]?.href.slice(1) || '');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll-spy via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });

    // Click handler for smooth scroll
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();
      const id = anchor.getAttribute('href')?.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }

    const nav = navRef.current;
    nav?.addEventListener('click', handleClick);

    return () => {
      observer.disconnect();
      nav?.removeEventListener('click', handleClick);
    };
  }, [items]);

  // Scroll active item into view within the nav
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(`[href="#${activeId}"]`) as HTMLElement | null;
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'auto' });
    }
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      aria-label="Page sections"
      className="anchor-nav-wrapper sticky top-16 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-4 sm:px-6 lg:px-8 scrollbar-hidden">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium motion-safe:transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              activeId === item.href.slice(1)
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-900',
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
