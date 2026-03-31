import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

interface MobileNavProps {
  divisions: DivisionNavItem[];
  clusters: ClusterNavItem[];
  currentPath: string;
  headerVariant?: 'solid' | 'transparent';
}

function isActive(href: string, currentPath: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About the Group', href: '/about/' },
] as const;

const NAV_LINKS_AFTER = [
  { label: 'Insights', href: '/insights/' },
  { label: 'Investors & Partners', href: '/investors-partners/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export default function MobileNav({ divisions, clusters, currentPath, headerVariant = 'solid' }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [divisionsExpanded, setDivisionsExpanded] = useState('');
  const [clustersExpanded, setClustersExpanded] = useState<string[]>([]);

  function handleNavClick() {
    setOpen(false);
    setDivisionsExpanded('');
    setClustersExpanded([]);
  }

  const divisionsActive = isActive('/divisions/', currentPath);

  const groupedDivisions = clusters.map((cluster) => ({
    cluster,
    divisions: divisions.filter((d) => d.clusterSlug === cluster.slug),
  }));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          'flex md:hidden items-center justify-center min-h-11 min-w-11 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          headerVariant === 'transparent'
            ? 'text-white hover:text-white/80'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
        )}
        aria-label="Open navigation menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-96 flex flex-col gap-0 p-0"
        aria-label="Navigation menu"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        {/* Scrollable nav area */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-6 pt-14 pb-6"
        >
          <ul className="space-y-1">
            {/* Home, About */}
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleNavClick}
                  className={cn(
                    'block min-h-11 py-3 text-lg font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    isActive(href, currentPath)
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600',
                  )}
                  aria-current={isActive(href, currentPath) ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}

            {/* Divisions accordion */}
            <li>
              <Accordion type="single" collapsible value={divisionsExpanded} onValueChange={setDivisionsExpanded}>
                <AccordionItem value="divisions" className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      'min-h-11 text-lg font-medium',
                      divisionsActive
                        ? 'text-primary-600'
                        : 'text-neutral-700 hover:text-primary-600',
                    )}
                    aria-current={divisionsActive ? 'page' : undefined}
                  >
                    Divisions
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <Accordion type="multiple" value={clustersExpanded} onValueChange={setClustersExpanded}>
                      {groupedDivisions.filter(({ divisions: d }) => d.length > 0).map(({ cluster, divisions: clusterDivisions }) => (
                        <AccordionItem key={cluster.slug} value={cluster.slug} className="border-b-0">
                          <AccordionTrigger className="min-h-11 pl-4 text-overline font-semibold uppercase text-gold-600">
                            {cluster.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-0.5">
                              {clusterDivisions.map((division) => (
                                <li key={division.slug}>
                                  <a
                                    href={`/divisions/${division.slug}/`}
                                    onClick={handleNavClick}
                                    className={cn(
                                      'block min-h-11 py-3 pl-8 text-base rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                                      currentPath === `/divisions/${division.slug}/`
                                        ? 'text-primary-600 font-medium'
                                        : 'text-neutral-700 hover:text-primary-600',
                                    )}
                                    aria-current={
                                      currentPath === `/divisions/${division.slug}/`
                                        ? 'page'
                                        : undefined
                                    }
                                  >
                                    {division.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    <a
                      href="/divisions/"
                      onClick={handleNavClick}
                      className="block min-h-11 py-3 pl-4 text-sm font-medium text-primary-600 hover:text-primary-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      View All Divisions
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>

            {/* Insights, Investors & Partners, Contact */}
            {NAV_LINKS_AFTER.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleNavClick}
                  className={cn(
                    'block min-h-11 py-3 text-lg font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    isActive(href, currentPath)
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600',
                  )}
                  aria-current={isActive(href, currentPath) ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}

            {/* Search link */}
            <li>
              <a
                href="/search/"
                onClick={handleNavClick}
                className="flex items-center gap-3 min-h-11 py-3 text-base text-neutral-500 hover:text-primary-600 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
                Search the site
              </a>
            </li>
          </ul>
        </nav>

        {/* Pinned CTA */}
        <div className="border-t border-neutral-200 p-4">
          <a
            href="/contact/"
            onClick={handleNavClick}
            className="block w-full min-h-11 rounded-lg bg-primary-600 px-8 py-4 text-center font-semibold text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Get In Touch
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
