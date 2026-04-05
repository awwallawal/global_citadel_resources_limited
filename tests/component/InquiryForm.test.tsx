import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InquiryForm from '../../src/components/contact/InquiryForm';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

/** Fill a form field quickly via fireEvent.change (avoids character-by-character typing). */
function fillField(element: HTMLElement, value: string) {
  fireEvent.change(element, { target: { value } });
}

/** Fill the division form with valid data using fast fireEvent approach. */
function fillDivisionForm() {
  fillField(screen.getByLabelText(/full name/i), 'John Doe');
  fillField(screen.getByLabelText(/email/i), 'john@example.com');
  fireEvent.change(screen.getByLabelText(/enquiry type/i), { target: { value: 'product-service' } });
  fillField(screen.getByLabelText(/message/i), 'I would like to learn more about your crop farming services.');
}

// ─── Division variant ──────────────────────────────────────────────

describe('InquiryForm — division variant', () => {
  const divisionProps = {
    variant: 'division' as const,
    divisionSlug: 'crop-farming',
    divisionName: 'Crop Farming',
  };

  it('renders division-specific fields', () => {
    render(<InquiryForm {...divisionProps} />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enquiry type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('does not render Subject field', () => {
    render(<InquiryForm {...divisionProps} />);
    expect(screen.queryByLabelText(/subject/i)).not.toBeInTheDocument();
  });

  it('does not render strategic-only Organization or Title/Role fields', () => {
    render(<InquiryForm {...divisionProps} />);
    // Division has "Company / Organization" but NOT the standalone "Organization" field
    expect(screen.queryByLabelText(/^organization/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/title \/ role/i)).not.toBeInTheDocument();
  });

  it('shows validation error on blur with empty required field', async () => {
    const user = userEvent.setup();
    render(<InquiryForm {...divisionProps} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.click(nameInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/name must be at least/i)).toBeInTheDocument();
    });
  });

  it('clears error when field is corrected', async () => {
    const user = userEvent.setup();
    render(<InquiryForm {...divisionProps} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.click(nameInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/name must be at least/i)).toBeInTheDocument();
    });

    await user.click(nameInput);
    await user.type(nameInput, 'John Doe');

    await waitFor(() => {
      expect(screen.queryByText(/name must be at least/i)).not.toBeInTheDocument();
    });
  });

  it('shows loading state on submit', async () => {
    // Make fetch hang to keep loading state visible
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<InquiryForm {...divisionProps} />);
    fillDivisionForm();

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
    });
  });

  it('shows success state after successful submission', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          routingContext: 'Our Crop Farming team will respond within 2 business days.',
        }),
    });

    render(<InquiryForm {...divisionProps} />);
    fillDivisionForm();

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/enquiry has been received/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/crop farming team/i)).toBeInTheDocument();
  });

  it('shows error state on server error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () =>
        Promise.resolve({
          success: false,
          message: 'Unable to process your request. Please try again.',
        }),
    });

    render(<InquiryForm {...divisionProps} />);
    fillDivisionForm();

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/unable to process/i)).toBeInTheDocument();
    });

    // Form data is preserved
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
  });

  it('has honeypot field present but hidden', () => {
    render(<InquiryForm {...divisionProps} />);
    const honeypot = screen.getByLabelText(/website/i);
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.closest('div')).toHaveClass('sr-only');
  });
});

// ─── General variant ───────────────────────────────────────────────

describe('InquiryForm — general variant', () => {
  it('renders Subject field instead of Enquiry Type dropdown', () => {
    render(<InquiryForm variant="general" />);
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/enquiry type/i)).not.toBeInTheDocument();
  });

  it('renders Message field', () => {
    render(<InquiryForm variant="general" />);
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('does not render Company field', () => {
    render(<InquiryForm variant="general" />);
    expect(screen.queryByLabelText(/company/i)).not.toBeInTheDocument();
  });

  it('shows submit button with correct label', () => {
    render(<InquiryForm variant="general" />);
    expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeInTheDocument();
  });
});

// ─── Strategic variant ─────────────────────────────────────────────

describe('InquiryForm — strategic variant', () => {
  it('renders Organization and Title/Role fields', () => {
    render(<InquiryForm variant="strategic" />);
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title \/ role/i)).toBeInTheDocument();
  });

  it('renders Inquiry Type dropdown', () => {
    render(<InquiryForm variant="strategic" />);
    expect(screen.getByLabelText(/inquiry type/i)).toBeInTheDocument();
  });

  it('renders Brief Description instead of Message', () => {
    render(<InquiryForm variant="strategic" />);
    expect(screen.getByLabelText(/brief description/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/^message/i)).not.toBeInTheDocument();
  });

  it('shows submit button with "Submit Inquiry" label', () => {
    render(<InquiryForm variant="strategic" />);
    expect(screen.getByRole('button', { name: /submit inquiry/i })).toBeInTheDocument();
  });
});

// ─── Division pre-selection ────────────────────────────────────────

describe('InquiryForm — division pre-selection', () => {
  it('sends divisionSlug in payload', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, routingContext: 'Team will respond.' }),
    });

    render(
      <InquiryForm variant="division" divisionSlug="crop-farming" divisionName="Crop Farming" />,
    );

    fillDivisionForm();
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }).closest('form')!);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledOnce();
    });

    const call = mockFetch.mock.calls[0];
    const body = JSON.parse(call[1].body);
    expect(body.divisionSlug).toBe('crop-farming');
    expect(body.inquiryType).toBe('division-business');
  });
});
