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
    let animationFrameId: number | null = null;
    let isRunning = false;

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      stateRef.current.targetX = (e.clientX - halfW) / halfW;
      stateRef.current.targetY = (e.clientY - halfH) / halfH;
      stateRef.current.isTouch = false;
      stateRef.current.isActive = true;
      startLoop();
    };

    const handleMouseLeave = () => {
      stateRef.current.targetX = 0;
      stateRef.current.targetY = 0;
      stateRef.current.isActive = false;
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const tick = () => {
      const state = stateRef.current;
      const dx = state.targetX - state.currentX;
      const dy = state.targetY - state.currentY;

      state.currentX += dx * damping;
      state.currentY += dy * damping;

      setPos({
        x: state.currentX,
        y: state.currentY,
        targetX: state.targetX,
        targetY: state.targetY,
        isTouch: false,
        isActive: state.isActive,
      });

      // If difference is negligible and not moving, pause the loop to save CPU & battery
      if (Math.abs(dx) < 0.0008 && Math.abs(dy) < 0.0008) {
        state.currentX = state.targetX;
        state.currentY = state.targetY;
        stopLoop();
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      stopLoop();
    };
  }, [damping]);

  return pos;
}
