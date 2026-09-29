import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
  x: number; // smoothed -1 to 1
  y: number; // smoothed -1 to 1
  targetX: number; // instant -1 to 1
  targetY: number; // instant -1 to 1
  isTouch: boolean;
  isActive: boolean;
}

export function useMousePosition(damping: number = 0.08): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isTouch: false,
    isActive: false,
  });

  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    isTouch: false,
    isActive: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      stateRef.current.targetX = (e.clientX - halfW) / halfW;
      stateRef.current.targetY = (e.clientY - halfH) / halfH;
      stateRef.current.isTouch = false;
      stateRef.current.isActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        stateRef.current.targetX = (touch.clientX - halfW) / halfW;
        stateRef.current.targetY = (touch.clientY - halfH) / halfH;
        stateRef.current.isTouch = true;
        stateRef.current.isActive = true;
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.targetX = 0;
      stateRef.current.targetY = 0;
      stateRef.current.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const tick = () => {
      const state = stateRef.current;
      state.currentX += (state.targetX - state.currentX) * damping;
      state.currentY += (state.targetY - state.currentY) * damping;

      setPos({
        x: state.currentX,
        y: state.currentY,
        targetX: state.targetX,
        targetY: state.targetY,
        isTouch: state.isTouch,
        isActive: state.isActive,
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [damping]);

  return pos;
}
