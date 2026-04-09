import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileNav from '../../src/components/navigation/MobileNav';

const mockDivisions = [
  { name: 'Crop Farming', slug: 'crop-farming', clusterSlug: 'agriculture-processing' },
  { name: 'Animal Husbandry', slug: 'animal-husbandry', clusterSlug: 'agriculture-processing' },
  { name: 'Agro-Processing', slug: 'agro-processing', clusterSlug: 'agriculture-processing' },
  { name: 'Commodity Marketing', slug: 'commodity-marketing', clusterSlug: 'trade-services' },
  { name: 'Import & Export', slug: 'import-export', clusterSlug: 'trade-services' },
  { name: 'Travel & Mobility', slug: 'travel-mobility', clusterSlug: 'trade-services' },
  { name: 'Real Estate', slug: 'real-estate', clusterSlug: 'built-environment-energy' },
  { name: 'Oil & Gas', slug: 'oil-gas', clusterSlug: 'built-environment-energy' },
];

const mockClusters = [
  { name: 'Agriculture & Processing', slug: 'agriculture-processing' },
  { name: 'Trade & Services', slug: 'trade-services' },
  { name: 'Built Environment & Energy', slug: 'built-environment-energy' },
];

const defaultProps = {
  divisions: mockDivisions,
  clusters: mockClusters,
  currentPath: '/',
};

describe('MobileNav', () => {
  it('renders hamburger button', () => {
    render(<MobileNav {...defaultProps} />);
    expect(screen.getByLabelText(/open navigation menu/i)).toBeInTheDocument();
  });

  it('opens Sheet when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows all L1 nav items in open Sheet', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Home')).toBeInTheDocument();
    expect(within(dialog).getByText('About the Group')).toBeInTheDocument();
    expect(within(dialog).getByText('Divisions')).toBeInTheDocument();
    expect(within(dialog).getByText('Insights')).toBeInTheDocument();
    expect(within(dialog).getByText('Investors & Partners')).toBeInTheDocument();
    expect(within(dialog).getByText('Contact')).toBeInTheDocument();
  });

  it('expands Divisions accordion to show clusters', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    const divisionsTrigger = within(screen.getByRole('dialog')).getByRole('button', {
      name: /divisions/i,
    });
    await user.click(divisionsTrigger);

    expect(screen.getByText('Agriculture & Processing')).toBeInTheDocument();
    expect(screen.getByText('Trade & Services')).toBeInTheDocument();
    expect(screen.getByText('Built Environment & Energy')).toBeInTheDocument();
  });

  it('expands cluster accordion to show member divisions', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: /divisions/i }));
    await user.click(screen.getByRole('button', { name: /agriculture & processing/i }));

    expect(screen.getByText('Crop Farming')).toBeInTheDocument();
    expect(screen.getByText('Animal Husbandry')).toBeInTheDocument();
    expect(screen.getByText('Agro-Processing')).toBeInTheDocument();
  });

  it('has aria-label on mobile navigation', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    expect(screen.getByLabelText(/mobile navigation/i)).toBeInTheDocument();
  });

  it('has aria-expanded on accordion triggers', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));

    const divisionsTrigger = within(screen.getByRole('dialog')).getByRole('button', {
      name: /divisions/i,
    });
    expect(divisionsTrigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(divisionsTrigger);
    expect(divisionsTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows Get In Touch CTA button', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    expect(within(screen.getByRole('dialog')).getByText('Get In Touch')).toBeInTheDocument();
  });

  it('marks current page as active', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...defaultProps} currentPath="/about/" />);

    await user.click(screen.getByLabelText(/open navigation menu/i));
    expect(within(screen.getByRole('dialog')).getByText('About the Group')).toHaveAttribute('aria-current', 'page');
  });

  it('keeps focus trapped inside the sheet when tabbing', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Outside Action</button>
        <MobileNav {...defaultProps} />
      </>,
    );

    await user.click(screen.getByLabelText(/open navigation menu/i));
    const dialog = screen.getByRole('dialog');

    for (let i = 0; i < 8; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement);
    }
  });
});
