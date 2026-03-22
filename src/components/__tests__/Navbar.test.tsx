import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<Navbar />);
    expect(container).toBeInTheDocument();
  });

  it('displays the brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('Prospectio')).toBeInTheDocument();
  });

  it('displays the logo image', () => {
    render(<Navbar />);
    const logo = screen.getByRole('img', { name: 'Prospectio Logo' });
    expect(logo).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
    expect(screen.getByText('Comment ça marche')).toBeInTheDocument();
    expect(screen.getByText('Avantages')).toBeInTheDocument();
  });

  it('displays connexion and trial buttons', () => {
    render(<Navbar />);
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText('Essai gratuit')).toBeInTheDocument();
  });

  it('navigates to correct anchors', () => {
    render(<Navbar />);
    const featuresLink = screen.getByText('Fonctionnalités');
    expect(featuresLink.closest('a')).toHaveAttribute('href', '#features');

    const howLink = screen.getByText('Comment ça marche');
    expect(howLink.closest('a')).toHaveAttribute('href', '#how-it-works');

    const benefitsLink = screen.getByText('Avantages');
    expect(benefitsLink.closest('a')).toHaveAttribute('href', '#benefits');
  });

  it('redirects to app on Connexion click', async () => {
    const user = userEvent.setup();
    // Mock globalThis.location
    const originalLocation = globalThis.location;
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: { ...originalLocation, href: '' },
    });

    render(<Navbar />);
    const connexionBtn = screen.getByText('Connexion');
    await user.click(connexionBtn);

    expect(globalThis.location.href).toBe('https://dev.prospectio.fr');

    // Restore
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('redirects to app on Essai gratuit click', async () => {
    const user = userEvent.setup();
    const originalLocation = globalThis.location;
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: { ...originalLocation, href: '' },
    });

    render(<Navbar />);
    const trialBtn = screen.getByText('Essai gratuit');
    await user.click(trialBtn);

    expect(globalThis.location.href).toBe('https://dev.prospectio.fr');

    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: originalLocation,
    });
  });
});
