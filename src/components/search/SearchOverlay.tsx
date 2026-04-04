import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { SearchItem } from '@/lib/search';

interface SearchOverlayProps {
  index: SearchItem[];
}

const TYPE_BADGE_COLORS: Record<string, string> = {
  page: 'bg-primary-50 text-primary-700',
  division: 'bg-amber-50 text-amber-700',
  insight: 'bg-sky-50 text-sky-700',
  contact: 'bg-gold-100 text-gold-600',
};

function search(index: SearchItem[], query: string): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return index
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q),
    )
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
      return bTitle - aTitle;
    })
    .slice(0, 5);
}

export default function SearchOverlay({ index }: SearchOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const results = search(index, query);

  const open = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    setQuery('');
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    });
  }, []);

  // Listen for custom event from search trigger button
  useEffect(() => {
    const handler = () => open();
    document.addEventListener('open-search-overlay', handler);
    return () => document.removeEventListener('open-search-overlay', handler);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Escape closes
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Trap focus within overlay
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'input, a, button, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, results]);

  if (!isOpen) return <div hidden />;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-900/50 pt-20 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        ref={overlayRef}
        className="mx-4 w-full max-w-xl rounded-2xl bg-white shadow-lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              window.location.href = `/search/?q=${encodeURIComponent(query)}`;
            }
          }}
          className="relative"
        >
          <label htmlFor="search-overlay-input" className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            id="search-overlay-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-t-2xl border-b border-neutral-200 bg-transparent py-4 pl-5 pr-14 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-3 text-neutral-400 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="Submit search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>

        {/* Quick Results */}
        {query.trim() && results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto p-2">
            {results.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <span
                    className={cn(
                      'mt-0.5 inline-block shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold capitalize',
                      TYPE_BADGE_COLORS[item.type] ||
                        'bg-neutral-100 text-neutral-600',
                    )}
                  >
                    {item.type}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 truncate">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-neutral-500 truncate">
                      {item.summary}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* No results */}
        {query.trim() && results.length === 0 && (
          <p className="p-4 text-center text-sm text-neutral-500">
            No results found.
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between rounded-b-2xl border-t border-neutral-200 px-4 py-3">
          {query.trim() ? (
            <a
              href={`/search/?q=${encodeURIComponent(query)}`}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              View all results &rarr;
            </a>
          ) : (
            <span className="text-xs text-neutral-400">
              Type to search
            </span>
          )}
          <button
            type="button"
            onClick={close}
            className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg px-3 text-xs font-medium text-neutral-500 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            ESC
          </button>
        </div>
      </div>
    </div>
  );
}
