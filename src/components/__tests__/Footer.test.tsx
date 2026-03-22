import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });

  it('displays the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Prospectio')).toBeInTheDocument();
  });

  it('displays the copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/Tous droits réservés/)).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<Footer />);
    expect(
      screen.getByText(/assistant de prospection intelligent/)
    ).toBeInTheDocument();
  });
});
