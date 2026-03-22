import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stats from '../Stats';

describe('Stats', () => {
  it('renders without crashing', () => {
    render(<Stats />);
  });

  it('displays the section heading', () => {
    render(<Stats />);
    expect(screen.getByText(/Des résultats/)).toBeInTheDocument();
    expect(screen.getByText('concrets')).toBeInTheDocument();
  });

  it('displays the section description', () => {
    render(<Stats />);
    expect(
      screen.getByText(/Notre plateforme délivre des résultats mesurables/)
    ).toBeInTheDocument();
  });

  it('displays all stat values', () => {
    render(<Stats />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5h')).toBeInTheDocument();
    expect(screen.getByText('3x')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
  });

  it('displays all stat labels', () => {
    render(<Stats />);
    expect(screen.getByText('Base de données')).toBeInTheDocument();
    expect(screen.getByText('Gagnées par semaine')).toBeInTheDocument();
    expect(screen.getByText('Plus de réponses')).toBeInTheDocument();
    expect(screen.getByText("Modéles d'IA")).toBeInTheDocument();
  });

  it('displays all stat descriptions', () => {
    render(<Stats />);
    expect(screen.getByText("Offres d'emploi analysées")).toBeInTheDocument();
    expect(screen.getByText('En automatisation')).toBeInTheDocument();
    expect(screen.getByText("Qu'avec la prospection manuelle")).toBeInTheDocument();
    expect(screen.getByText('A votre disposition')).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    const { container } = render(<Stats />);
    const section = container.querySelector('#benefits');
    expect(section).toBeInTheDocument();
  });
});
