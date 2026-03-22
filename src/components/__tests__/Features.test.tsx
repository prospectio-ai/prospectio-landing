import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Features from '../Features';

describe('Features', () => {
  it('renders without crashing', () => {
    render(<Features />);
  });

  it('displays the section heading', () => {
    render(<Features />);
    expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
    expect(screen.getByText('Puissantes')).toBeInTheDocument();
  });

  it('displays the section description', () => {
    render(<Features />);
    expect(
      screen.getByText(/Tous les outils nécessaires pour transformer votre prospection/)
    ).toBeInTheDocument();
  });

  it('displays all six feature cards', () => {
    render(<Features />);
    expect(screen.getByText('Ciblage Intelligent')).toBeInTheDocument();
    expect(screen.getByText('Informations Entreprises')).toBeInTheDocument();
    expect(screen.getByText('Enrichissement Contact')).toBeInTheDocument();
    expect(screen.getByText('Aide à la prospection')).toBeInTheDocument();
    expect(screen.getByText('Gestion de Profil')).toBeInTheDocument();
    expect(screen.getByText('Coach IA')).toBeInTheDocument();
  });

  it('displays feature descriptions', () => {
    render(<Features />);
    expect(
      screen.getByText(/identifie les offres d'emploi récentes pertinentes/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Récupérez automatiquement les données clés des entreprises/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Trouvez les bons décideurs/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Personnalisez vos messages et approches/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Optimisez et gérez facilement votre profil/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Un assistant IA intégré pour vous aider/)
    ).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    const { container } = render(<Features />);
    const section = container.querySelector('#features');
    expect(section).toBeInTheDocument();
  });
});
