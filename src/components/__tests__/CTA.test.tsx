import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CTA from '../CTA';

describe('CTA', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<CTA />);
  });

  it('displays the heading', () => {
    render(<CTA />);
    expect(screen.getByText(/Prêt à booster votre/)).toBeInTheDocument();
    expect(screen.getByText('prospection')).toBeInTheDocument();
  });

  it('displays the description', () => {
    render(<CTA />);
    expect(
      screen.getByText(/Rejoignez les freelances qui automatisent/)
    ).toBeInTheDocument();
  });

  it('displays the primary CTA button', () => {
    render(<CTA />);
    expect(screen.getByText(/Démarrer gratuitement/)).toBeInTheDocument();
  });

  it('displays the demo button', () => {
    render(<CTA />);
    expect(screen.getByText(/Réserver une démo/)).toBeInTheDocument();
  });

  it('displays the trust indicators', () => {
    render(<CTA />);
    expect(screen.getByText(/Sans engagement/)).toBeInTheDocument();
    expect(screen.getByText(/Essai gratuit 14 jours/)).toBeInTheDocument();
    expect(screen.getByText(/Aucune carte bancaire requise/)).toBeInTheDocument();
  });

  it('redirects to app on primary CTA click', async () => {
    const user = userEvent.setup();
    const originalLocation = globalThis.location;
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: { ...originalLocation, href: '' },
    });

    render(<CTA />);
    const ctaBtn = screen.getByText(/Démarrer gratuitement/);
    await user.click(ctaBtn);

    expect(globalThis.location.href).toBe('https://dev.prospectio.fr');

    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: originalLocation,
    });
  });
});
