import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HowItWorks from '../HowItWorks';

describe('HowItWorks', () => {
  it('renders without crashing', () => {
    render(<HowItWorks />);
  });

  it('displays the section heading', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Comment ça/)).toBeInTheDocument();
    expect(screen.getByText('marche')).toBeInTheDocument();
  });

  it('displays the section description', () => {
    render(<HowItWorks />);
    expect(
      screen.getByText(/Trois étapes simples pour automatiser votre prospection/)
    ).toBeInTheDocument();
  });

  it('displays all four steps', () => {
    render(<HowItWorks />);
    expect(screen.getByText('Définissez vos critères')).toBeInTheDocument();
    expect(screen.getByText("Recherches d'offres récentes")).toBeInTheDocument();
    expect(screen.getByText('Recherche de prospects')).toBeInTheDocument();
    expect(screen.getByText('Aide à la prospection par IA')).toBeInTheDocument();
  });

  it('displays step numbers', () => {
    render(<HowItWorks />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('displays step descriptions', () => {
    render(<HowItWorks />);
    expect(
      screen.getByText(/Renseignez votre profil, vos critères de qualification/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Identification des offres récentes et pertinentes/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Identification des prospects correspondant/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Personnalisation des messages et approches/)
    ).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector('#how-it-works');
    expect(section).toBeInTheDocument();
  });
});
