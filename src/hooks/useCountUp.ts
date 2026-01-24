import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  enableScrollTrigger?: boolean;
  threshold?: number;
}

interface UseCountUpReturn {
  value: string;
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  hasAnimated: boolean;
}

/**
 * Custom hook for animated counter with Intersection Observer
 * Respects prefers-reduced-motion
 */
export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
  enableScrollTrigger = true,
  threshold = 0.5,
}: UseCountUpOptions): UseCountUpReturn {
  const [value, setValue] = useState<number>(start);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = start + (end - start) * easedProgress;

      setValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
        setHasAnimated(true);
      }
    },
    [start, end, duration]
  );

  const startAnimation = useCallback(() => {
    if (hasAnimated) return;

    // If user prefers reduced motion, jump to end value immediately
    if (prefersReducedMotion) {
      setValue(end);
      setHasAnimated(true);
      return;
    }

    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
  }, [animate, end, hasAnimated, prefersReducedMotion]);

  useEffect(() => {
    if (!enableScrollTrigger) {
      startAnimation();
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            startAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enableScrollTrigger, startAnimation, threshold]);

  const formattedValue = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return {
    value: formattedValue,
    ref: ref as React.RefObject<HTMLElement>,
    isInView,
    hasAnimated,
  };
}

export default useCountUp;
