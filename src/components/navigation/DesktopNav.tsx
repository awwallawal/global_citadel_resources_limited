import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface DivisionNavItem {
  name: string;
  slug: string;
  clusterSlug: string;
}

interface ClusterNavItem {
  name: string;
  slug: string;
}

interface DesktopNavProps {
  currentPath: string;
  divisions: DivisionNavItem[];
  clusters: ClusterNavItem[];
  headerVariant?: 'solid' | 'transparent';
}

function isActive(href: string, currentPath: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
}

function LogoEmblem() {
  return (
    <img src="/brand/grcl-emblem.png" alt="Global Resources Citadel" className="h-10 w-auto" />
  );
}

export default function DesktopNav({ currentPath, divisions, clusters, headerVariant = 'solid' }: DesktopNavProps) {
  const [isScrolled, setIsScrolled] = useState(headerVariant === 'solid');

  useEffect(() => {
    if (headerVariant === 'solid') {
      setIsScrolled(true);
      return;
    }
    setIsScrolled(window.scrollY > 50);
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerVariant]);

  const divisionsActive = currentPath.startsWith('/divisions/');

  const groupedDivisions = clusters.map((cluster) => ({
    cluster,
    divisions: divisions.filter((d) => d.clusterSlug === cluster.slug),
  }));

  const linkClass = (href: string) =>
    cn(
      'inline-flex min-h-11 items-center px-3 py-2 text-nav font-medium rounded-md motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      isActive(href, currentPath)
        ? isScrolled
          ? 'text-primary-600'
          : 'text-white font-semibold'
        : isScrolled
          ? 'text-neutral-600 hover:text-neutral-900'
          : 'text-white hover:text-white/80',
    );

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'hidden md:flex items-center w-full px-6 motion-safe:transition-all motion-safe:duration-300 ease-out',
        isScrolled
          ? 'h-14 bg-white/95 backdrop-blur-lg border-b border-neutral-300'
          : 'h-16 bg-transparent backdrop-blur-sm',
      )}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-label="Global Resources Citadel - Home"
        >
          <LogoEmblem />
        </a>

        {/* Center nav items */}
        <NavigationMenu delayDuration={200} className="mx-auto">
          <NavigationMenuList className="gap-0">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={linkClass('/')}
                aria-current={isActive('/', currentPath) ? 'page' : undefined}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* About the Group */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about/"
                className={linkClass('/about/')}
                aria-current={isActive('/about/', currentPath) ? 'page' : undefined}
              >
                About the Group
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Divisions — dropdown trigger */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  'min-h-11 px-3 py-2 text-nav font-medium rounded-md bg-transparent motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 hover:bg-transparent data-[state=open]:bg-transparent',
                  divisionsActive
                    ? isScrolled
                      ? 'text-primary-600'
                      : 'text-white font-semibold'
                    : isScrolled
                      ? 'text-neutral-600 hover:text-neutral-900'
                      : 'text-white hover:text-white/80',
                )}
                aria-current={divisionsActive ? 'page' : undefined}
              >
                Divisions
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <div className="grid grid-cols-3 gap-x-8 gap-y-5 p-5 min-w-xl">
                  {groupedDivisions.filter(({ divisions: d }) => d.length > 0).map(({ cluster, divisions: clusterDivisions }) => (
                    <div key={cluster.slug}>
                      <p className="text-overline font-semibold uppercase tracking-widest text-gold-600 mb-2">
                        {cluster.name}
                      </p>
                      <ul className="space-y-0.5">
                        {clusterDivisions.map((division) => (
                          <li key={division.slug}>
                            <NavigationMenuLink asChild>
                              <a
                                href={`/divisions/${division.slug}/`}
                                className="block rounded-md px-2 py-1.5 min-h-9 text-body-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-safe:transition-colors motion-safe:duration-150"
                              >
                                {division.name}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="border-t border-neutral-200 px-5 py-2.5">
                  <NavigationMenuLink asChild>
                    <a
                      href="/divisions/"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
                    >
                      View All Divisions
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Insights */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/insights/"
                className={linkClass('/insights/')}
                aria-current={isActive('/insights/', currentPath) ? 'page' : undefined}
              >
                Insights
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Investors & Partners */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/investors-partners/"
                className={linkClass('/investors-partners/')}
                aria-current={isActive('/investors-partners/', currentPath) ? 'page' : undefined}
              >
                Investors & Partners
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact/"
                className={linkClass('/contact/')}
                aria-current={isActive('/contact/', currentPath) ? 'page' : undefined}
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: Search + CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => document.dispatchEvent(new CustomEvent('open-search-overlay'))}
            className={cn(
              'min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isScrolled
                ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                : 'text-white hover:text-white/80',
            )}
            aria-label="Search"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <a
            href="/contact/"
            className={cn(
              'min-h-11 inline-flex items-center px-6 py-2 text-sm font-semibold rounded-md motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isScrolled
                ? 'bg-neutral-900 text-white hover:bg-primary-700'
                : 'border border-white text-white hover:bg-white/10',
            )}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
