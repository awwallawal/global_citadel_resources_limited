import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchOverlay from '../../src/components/search/SearchOverlay';
import type { SearchItem } from '../../src/lib/search';

const mockIndex: SearchItem[] = [
  {
    id: 'crop-farming',
    slug: 'crop-farming',
    title: 'Crop Farming',
    type: 'division',
    section: 'Divisions',
    summary: "Feeding Nigeria's future through sustainable, large-scale crop production",
    url: '/divisions/crop-farming/',
  },
  {
    id: 'about',
    slug: 'about',
    title: 'About the Group',
    type: 'page',
    section: 'The Group',
    summary: 'Our story, mission, leadership, and credentials.',
    url: '/about/',
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact',
    type: 'contact',
    section: 'Contact',
    summary: 'Get in touch with Global Resources Citadel.',
    url: '/contact/',
  },
  {
    id: 'grcl-launches',
    slug: 'grcl-launches',
    title: 'GRCL Launches Operations',
    type: 'insight',
    section: 'Insights',
    summary: 'Global Resources Citadel marks a new chapter.',
    url: '/insights/grcl-launches/',
  },
];

function renderAndOpen() {
  render(<SearchOverlay index={mockIndex} />);
  fireEvent(document, new Event('open-search-overlay'));
}

describe('SearchOverlay', () => {
  it('is hidden by default', () => {
    render(<SearchOverlay index={mockIndex} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens when open-search-overlay event is dispatched', () => {
    renderAndOpen();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    renderAndOpen();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('has accessible label on search input', () => {
    renderAndOpen();
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'search-overlay-input');
  });

  it('has role="dialog" and aria-modal on overlay', () => {
    renderAndOpen();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('focuses input on open', async () => {
    renderAndOpen();
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search/i)).toHaveFocus();
    });
  });

  it('updates query state when typing', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'crop');

    expect(input).toHaveValue('crop');
  });

  it('displays matching results', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.type(screen.getByPlaceholderText(/search/i), 'crop');
    expect(screen.getByText('Crop Farming')).toBeInTheDocument();
  });

  it('shows no results message when query has no matches', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.type(screen.getByPlaceholderText(/search/i), 'zzzznonexistent');
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('shows "Type to search" when no query', () => {
    renderAndOpen();
    expect(screen.getByText(/type to search/i)).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when clicking ESC button', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.click(screen.getByRole('button', { name: /esc/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when clicking backdrop', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows "View all results" link when query is active', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.type(screen.getByPlaceholderText(/search/i), 'crop');
    expect(screen.getByText(/view all results/i)).toBeInTheDocument();
  });

  it('shows type badges for results', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.type(screen.getByPlaceholderText(/search/i), 'crop');
    expect(screen.getByText('division')).toBeInTheDocument();
  });

  it('result links have correct href', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    await user.type(screen.getByPlaceholderText(/search/i), 'crop');
    expect(screen.getByRole('link', { name: /crop farming/i })).toHaveAttribute(
      'href',
      '/divisions/crop-farming/',
    );
  });

  it('cycles through results with arrow keys', async () => {
    const user = userEvent.setup();
    renderAndOpen();

    const input = screen.getByRole('searchbox');
    await user.type(input, 'g');

    await user.keyboard('{ArrowDown}');
    const firstLink = screen.getByRole('link', { name: /crop farming/i });
    await waitFor(() => {
      expect(firstLink).toHaveAttribute('aria-selected', 'true');
    });

    await user.keyboard('{ArrowDown}');
    const secondLink = screen.getByRole('link', { name: /about the group/i });
    await waitFor(() => {
      expect(secondLink).toHaveAttribute('aria-selected', 'true');
      expect(firstLink).toHaveAttribute('aria-selected', 'false');
    });

    await user.keyboard('{ArrowUp}');
    await waitFor(() => {
      expect(firstLink).toHaveAttribute('aria-selected', 'true');
      expect(secondLink).toHaveAttribute('aria-selected', 'false');
    });
  });
});
