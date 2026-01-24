import { useState, useCallback, useRef, useEffect } from "react";

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseTiltEffectOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
  enabled?: boolean;
}

interface UseTiltEffectReturn {
  ref: React.RefObject<HTMLElement>;
  style: React.CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

/**
 * Custom hook for 3D tilt effect on cards
 * Creates a perspective tilt based on mouse position
 * Respects prefers-reduced-motion
 */
export function useTiltEffect({
  maxTilt = 10,
  scale = 1.02,
  speed = 400,
  perspective = 1000,
  enabled = true,
}: UseTiltEffectOptions = {}): UseTiltEffectReturn {
  const ref = useRef<HTMLElement>(null);
  const [tiltValues, setTiltValues] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
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

      // Calculate normalized position (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp values between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, normalizedX));
      const clampedY = Math.max(-1, Math.min(1, normalizedY));

      // Calculate tilt angles
      const rotateX = -clampedY * maxTilt;
      const rotateY = clampedX * maxTilt;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setTiltValues({ rotateX, rotateY, scale });
      });
    },
    [shouldAnimate, isHovered, maxTilt, scale]
  );

  const handleMouseEnter = useCallback(() => {
    if (!shouldAnimate) return;
    setIsHovered(true);
    setTiltValues((prev) => ({ ...prev, scale }));
  }, [shouldAnimate, scale]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltValues({ rotateX: 0, rotateY: 0, scale: 1 });
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
        transform: `perspective(${perspective}px) rotateX(${tiltValues.rotateX}deg) rotateY(${tiltValues.rotateY}deg) scale(${tiltValues.scale})`,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        transformStyle: "preserve-3d" as const,
        willChange: "transform",
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

export default useTiltEffect;
