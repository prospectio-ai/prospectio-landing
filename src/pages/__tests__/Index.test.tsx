import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Index from '../Index';

describe('Index Page', () => {
  it('renders without crashing', () => {
    render(<Index />);
  });

  it('renders the Navbar', () => {
    render(<Index />);
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });

  it('renders the Hero section', () => {
    render(<Index />);
    expect(screen.getByText(/Prospectez les/)).toBeInTheDocument();
  });

  it('renders the Features section', () => {
    render(<Index />);
    expect(screen.getByText('Ciblage Intelligent')).toBeInTheDocument();
  });

  it('renders the HowItWorks section', () => {
    render(<Index />);
    expect(screen.getByText('Définissez vos critères')).toBeInTheDocument();
  });

  it('renders the Stats section', () => {
    render(<Index />);
    expect(screen.getByText('Base de données')).toBeInTheDocument();
  });

  it('renders the CTA section', () => {
    render(<Index />);
    expect(screen.getByText(/Démarrer gratuitement/)).toBeInTheDocument();
  });

  it('renders the Footer', () => {
    render(<Index />);
    expect(screen.getByText(/Tous droits réservés/)).toBeInTheDocument();
  });
});
