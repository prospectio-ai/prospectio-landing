import { useState, useCallback, useRef, useEffect } from "react";

interface MagneticPosition {
  x: number;
  y: number;
}

interface UseMagneticEffectOptions {
  strength?: number;
  maxDistance?: number;
  enabled?: boolean;
}

interface UseMagneticEffectReturn {
  ref: React.RefObject<HTMLElement>;
  style: React.CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

/**
 * Custom hook for magnetic cursor effect on buttons/elements
 * Creates a subtle attraction effect when hovering
 * Respects prefers-reduced-motion
 */
export function useMagneticEffect({
  strength = 0.3,
  maxDistance = 100,
  enabled = true,
}: UseMagneticEffectOptions = {}): UseMagneticEffectReturn {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const shouldAnimate = enabled && !prefersReducedMotion;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!shouldAnimate || !ref.current || !isHovered) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < maxDistance) {
        const factor = 1 - distance / maxDistance;
        const newX = distanceX * strength * factor;
        const newY = distanceY * strength * factor;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          setPosition({ x: newX, y: newY });
        });
      }
    },
    [shouldAnimate, isHovered, strength, maxDistance]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const style: React.CSSProperties = shouldAnimate
    ? {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered
          ? "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)"
          : "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
      }
    : {};

  return {
    ref: ref as React.RefObject<HTMLElement>,
    style,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
  };
}

export default useMagneticEffect;
