import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsMobile } from '../use-mobile';

describe('useIsMobile', () => {
  let matchMediaListeners: Array<() => void>;
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    matchMediaListeners = [];
    mockMatchMedia = vi.fn().mockImplementation(() => ({
      addEventListener: (_event: string, handler: () => void) => {
        matchMediaListeners.push(handler);
      },
      removeEventListener: vi.fn(),
    }));
    Object.defineProperty(globalThis, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false on desktop width', () => {
    Object.defineProperty(globalThis, 'innerWidth', {
      writable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true on mobile width', () => {
    Object.defineProperty(globalThis, 'innerWidth', {
      writable: true,
      value: 500,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when window resizes', () => {
    Object.defineProperty(globalThis, 'innerWidth', {
      writable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate resize to mobile
    Object.defineProperty(globalThis, 'innerWidth', {
      writable: true,
      value: 500,
    });
    act(() => {
      matchMediaListeners.forEach((listener) => listener());
    });
    expect(result.current).toBe(true);
  });

  it('calls matchMedia with correct breakpoint', () => {
    Object.defineProperty(globalThis, 'innerWidth', {
      writable: true,
      value: 1024,
    });

    renderHook(() => useIsMobile());
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });
});
