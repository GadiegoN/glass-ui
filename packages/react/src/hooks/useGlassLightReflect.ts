import { useState, useCallback, useRef } from 'react';

export interface LightReflectState {
  x: number; // percentage 0 to 100
  y: number; // percentage 0 to 100
  isHovered: boolean;
}

export function useGlassLightReflect() {
  const [reflect, setReflect] = useState<LightReflectState>({
    x: 50,
    y: 0,
    isHovered: false,
  });

  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setReflect({ x, y, isHovered: true });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setReflect((prev) => ({ ...prev, isHovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setReflect({ x: 50, y: 0, isHovered: false });
  }, []);

  return {
    ref,
    reflect,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
