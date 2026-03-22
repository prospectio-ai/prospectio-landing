import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the Index page by default', () => {
    render(<App />);
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });

  it('renders the full landing page structure', () => {
    render(<App />);
    // Navbar
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    // Hero
    expect(screen.getByText(/Prospectez les/)).toBeInTheDocument();
    // Features
    expect(screen.getByText('Ciblage Intelligent')).toBeInTheDocument();
    // Footer
    expect(screen.getByText(/Tous droits réservés/)).toBeInTheDocument();
  });
});
