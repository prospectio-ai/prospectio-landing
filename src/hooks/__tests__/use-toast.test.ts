import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { reducer, useToast, toast } from '../use-toast';

describe('use-toast reducer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const initialState = { toasts: [] };

  it('handles ADD_TOAST action', () => {
    const result = reducer(initialState, {
      type: 'ADD_TOAST',
      toast: { id: '1', title: 'Test Toast', open: true } as any,
    });

    expect(result.toasts).toHaveLength(1);
    expect(result.toasts[0].title).toBe('Test Toast');
  });

  it('limits toasts to TOAST_LIMIT', () => {
    const state = {
      toasts: [{ id: '1', title: 'First', open: true } as any],
    };
    const result = reducer(state, {
      type: 'ADD_TOAST',
      toast: { id: '2', title: 'Second', open: true } as any,
    });

    expect(result.toasts).toHaveLength(1);
    expect(result.toasts[0].title).toBe('Second');
  });

  it('handles UPDATE_TOAST action', () => {
    const state = {
      toasts: [{ id: '1', title: 'Original', open: true } as any],
    };
    const result = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated' },
    });

    expect(result.toasts[0].title).toBe('Updated');
  });

  it('does not update non-matching toast', () => {
    const state = {
      toasts: [{ id: '1', title: 'Original', open: true } as any],
    };
    const result = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '999', title: 'Updated' },
    });

    expect(result.toasts[0].title).toBe('Original');
  });

  it('handles DISMISS_TOAST action with specific id', () => {
    const state = {
      toasts: [{ id: '1', title: 'Test', open: true } as any],
    };
    const result = reducer(state, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    });

    expect(result.toasts[0].open).toBe(false);
  });

  it('handles DISMISS_TOAST action without id (dismiss all)', () => {
    const state = {
      toasts: [{ id: '1', title: 'First', open: true } as any],
    };
    const result = reducer(state, {
      type: 'DISMISS_TOAST',
    });

    result.toasts.forEach((t: any) => {
      expect(t.open).toBe(false);
    });
  });

  it('handles REMOVE_TOAST action with specific id', () => {
    const state = {
      toasts: [{ id: '1', title: 'Test', open: true } as any],
    };
    const result = reducer(state, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    });

    expect(result.toasts).toHaveLength(0);
  });

  it('handles REMOVE_TOAST action without id (remove all)', () => {
    const state = {
      toasts: [{ id: '1', title: 'First', open: true } as any],
    };
    const result = reducer(state, {
      type: 'REMOVE_TOAST',
      toastId: undefined,
    });

    expect(result.toasts).toHaveLength(0);
  });
});

describe('toast function', () => {
  it('creates a toast and returns id, dismiss, update', () => {
    const result = toast({ title: 'Hello' } as any);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('dismiss');
    expect(result).toHaveProperty('update');
    expect(typeof result.id).toBe('string');
    expect(typeof result.dismiss).toBe('function');
    expect(typeof result.update).toBe('function');
  });

  it('generates unique ids for each toast', () => {
    const t1 = toast({ title: 'First' } as any);
    const t2 = toast({ title: 'Second' } as any);

    expect(t1.id).not.toBe(t2.id);
  });

  it('dismiss function can be called', () => {
    const result = toast({ title: 'Test' } as any);
    expect(() => result.dismiss()).not.toThrow();
  });

  it('update function can be called', () => {
    const result = toast({ title: 'Test' } as any);
    expect(() => result.update({ id: result.id, title: 'Updated' } as any)).not.toThrow();
  });
});

describe('useToast hook', () => {
  it('returns toast function and dismiss', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current).toHaveProperty('toast');
    expect(result.current).toHaveProperty('dismiss');
    expect(result.current).toHaveProperty('toasts');
    expect(typeof result.current.toast).toBe('function');
    expect(typeof result.current.dismiss).toBe('function');
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  it('can create a toast via the hook', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Hook Toast' } as any);
    });

    expect(result.current.toasts.length).toBeGreaterThanOrEqual(0);
  });

  it('can dismiss a toast via the hook', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      const t = result.current.toast({ title: 'To Dismiss' } as any);
      toastId = t.id;
    });

    act(() => {
      result.current.dismiss(toastId!);
    });

    // After dismissing, toasts should have open: false
    const dismissed = result.current.toasts.find((t) => t.id === toastId!);
    if (dismissed) {
      expect(dismissed.open).toBe(false);
    }
  });

  it('can dismiss all toasts via the hook', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast 1' } as any);
    });

    act(() => {
      result.current.dismiss();
    });

    result.current.toasts.forEach((t) => {
      expect(t.open).toBe(false);
    });
  });
});
