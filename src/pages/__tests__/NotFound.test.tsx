import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '../NotFound';

describe('NotFound Page', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <NotFound />
      </MemoryRouter>
    );
  });

  it('displays the 404 heading', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('displays the error message', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
  });

  it('displays a link to return home', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <NotFound />
      </MemoryRouter>
    );
    const link = screen.getByText('Return to Home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('logs a 404 error to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={['/unknown-page']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      expect.any(String)
    );

    consoleSpy.mockRestore();
  });
});
