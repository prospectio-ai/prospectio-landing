import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../Hero';

describe('Hero', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<Hero />);
  });

  it('displays the main heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Prospectez les/)).toBeInTheDocument();
    expect(screen.getByText(/bonnes personnes au bon moment/)).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/Prospectio vous aide à identifier et qualifier les personnes/)
    ).toBeInTheDocument();
  });

  it('displays the CTA button', () => {
    render(<Hero />);
    expect(screen.getByText(/Démarrer ma prospection/)).toBeInTheDocument();
  });

  it('displays the hero image', () => {
    render(<Hero />);
    const img = screen.getByRole('img', { name: 'Professionnels collaborant' });
    expect(img).toBeInTheDocument();
  });

  it('redirects to app on CTA button click', async () => {
    const user = userEvent.setup();
    const originalLocation = globalThis.location;
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: { ...originalLocation, href: '' },
    });

    render(<Hero />);
    const ctaBtn = screen.getByText(/Démarrer ma prospection/);
    await user.click(ctaBtn);

    expect(globalThis.location.href).toBe('https://dev.prospectio.fr');

    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: originalLocation,
    });
  });
});
