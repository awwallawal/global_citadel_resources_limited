import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { SearchItem } from '@/lib/search';

interface SearchPageProps {
  index: SearchItem[];
}

const TYPE_LABELS: Record<string, string> = {
  all: 'All',
  page: 'Pages',
  division: 'Divisions',
  insight: 'Insights',
  contact: 'Contacts',
};

const TYPE_BADGE_COLORS: Record<string, string> = {
  page: 'bg-primary-50 text-primary-700',
  division: 'bg-amber-50 text-amber-700',
  insight: 'bg-sky-50 text-sky-700',
  contact: 'bg-gold-100 text-gold-600',
};

const RESULTS_PER_PAGE = 10;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightTerms(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const splitRegex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  const parts = text.split(splitRegex);
  const lowerQuery = query.toLowerCase();
  return parts.map((part, i) =>
    part.toLowerCase() === lowerQuery ? (
      <mark key={i} className="rounded bg-gold-100 px-0.5 text-neutral-900">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function search(
  index: SearchItem[],
  query: string,
  type?: string,
): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return index
    .filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      const matchesType = !type || type === 'all' || item.type === type;
      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
      return bTitle - aTitle;
    });
}

function SearchResultCard({
  item,
  query,
}: {
  item: SearchItem;
  query: string;
}) {
  return (
    <a
      href={item.url}
      className="block rounded-xl border border-neutral-200 p-5 motion-safe:transition-colors motion-safe:hover:border-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      <span
        className={cn(
          'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
          TYPE_BADGE_COLORS[item.type] || 'bg-neutral-100 text-neutral-600',
        )}
      >
        {item.type}
      </span>
      <h3 className="mt-2 font-heading text-lg font-semibold text-neutral-900">
        {highlightTerms(item.title, query)}
      </h3>
      <p className="mt-0.5 text-xs text-neutral-400">{item.url}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 line-clamp-2">
        {highlightTerms(item.summary, query)}
      </p>
      {item.section && (
        <p className="mt-2 text-xs text-neutral-500">{item.section}</p>
      )}
    </a>
  );
}

export default function SearchPage({ index }: SearchPageProps) {
  const [query, setQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('q') || '';
    }
    return '';
  });
  const [activeType, setActiveType] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('type') || 'all';
    }
    return 'all';
  });
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  const updateUrl = useCallback(
    (q: string, type: string) => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (type && type !== 'all') params.set('type', type);
      const url = params.toString()
        ? `/search/?${params.toString()}`
        : '/search/';
      window.history.replaceState({}, '', url);
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisibleCount(RESULTS_PER_PAGE);
    updateUrl(query, activeType);
  };

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    setVisibleCount(RESULTS_PER_PAGE);
    updateUrl(query, type);
  };

  const results = search(index, query, activeType);
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for pages, divisions, insights, contacts..."
          className="w-full rounded-xl border border-neutral-300 bg-white py-4 pl-5 pr-14 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary-600 p-3 text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
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

      {/* Filter Tabs */}
      {query.trim() && (
        <nav
          aria-label="Search result filters"
          className="mt-6 border-b border-neutral-200"
        >
          <div className="flex gap-0 overflow-x-auto">
            {Object.entries(TYPE_LABELS).map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeChange(type)}
                className={cn(
                  'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  activeType === type
                    ? 'border-primary-600 font-semibold text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900',
                )}
                aria-current={activeType === type ? 'true' : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Results Count */}
      {query.trim() && results.length > 0 && (
        <p className="mt-6 text-sm text-neutral-500">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
          for &ldquo;<span className="font-medium text-neutral-700">{query}</span>&rdquo;
        </p>
      )}

      {/* Results */}
      {query.trim() && results.length > 0 && (
        <div className="mt-4 space-y-4" role="list" aria-label="Search results">
          <h2 className="sr-only">Search Results</h2>
          {visibleResults.map((item) => (
            <div key={item.id} role="listitem">
              <SearchResultCard item={item} query={query} />
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + RESULTS_PER_PAGE)}
            className="inline-block rounded-lg border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Load More Results
          </button>
        </div>
      )}

      {/* No Results */}
      {query.trim() && results.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-neutral-600">
            No results found for &ldquo;
            <strong>{query}</strong>&rdquo;.
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Try a different search, or explore:
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/divisions/"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Browse Our Divisions
            </a>
            <a
              href="/insights/"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Read Latest Insights
            </a>
            <a
              href="/contact/"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}

      {/* Empty State (no query) */}
      {!query.trim() && (
        <div className="py-16 text-center">
          <p className="text-lg text-neutral-500">
            Enter a search term to find pages, divisions, insights, and contacts.
          </p>
        </div>
      )}
    </div>
  );
}
