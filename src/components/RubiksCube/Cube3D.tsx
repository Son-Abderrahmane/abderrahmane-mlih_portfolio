import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CubeState, CUBE_COLORS_HEX, FaceName } from '../../utils/cubeEngine';

interface Cube3DProps {
  cubeState: CubeState;
  onFaceClick?: (face: FaceName, isPrime: boolean) => void;
  size?: number; // size in px (e.g. 210)
  interactive?: boolean;
}

export const Cube3D: React.FC<Cube3DProps> = ({
  cubeState,
  onFaceClick,
  size = 210,
  interactive = true,
}) => {
  // Rotation angles for 3D orbit
  const [rotX, setRotX] = useState<number>(-24);
  const [rotY, setRotY] = useState<number>(36);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: -24,
    rotY: 36,
  });

  const halfSize = size / 2;

  // Mouse & Touch Orbit Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    // Sensitivity factor
    const newRotY = dragStartRef.current.rotY + deltaX * 0.6;
    const newRotX = Math.max(-85, Math.min(85, dragStartRef.current.rotX - deltaY * 0.6));
    setRotX(newRotX);
    setRotY(newRotY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const resetView = useCallback(() => {
    setRotX(-24);
    setRotY(36);
  }, []);

  // Keyboard shortcut listener when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;
      if (e.key === 'ArrowLeft') setRotY((y) => y - 15);
      if (e.key === 'ArrowRight') setRotY((y) => y + 15);
      if (e.key === 'ArrowUp') setRotX((x) => Math.min(85, x + 15));
      if (e.key === 'ArrowDown') setRotX((x) => Math.max(-85, x - 15));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderFaceStickers = (face: FaceName) => {
    const stickers = cubeState[face];
    return (
      <div
        className="w-full h-full grid grid-cols-3 grid-rows-3 gap-[3px] p-[4px] bg-zinc-950 rounded-lg select-none shadow-inner"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {stickers.map((color, idx) => {
          const hex = CUBE_COLORS_HEX[color];
          const isCenter = idx === 4;
          return (
            <div
              key={idx}
              className="relative rounded-[4px] shadow-sm transition-colors duration-150 flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: hex,
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {/* Gloss highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />
              {isCenter && (
                <span className="text-[10px] font-mono font-bold text-zinc-900/60 select-none uppercase tracking-tighter">
                  {face}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 3D Viewport */}
      <div
        className={`perspective-1000 w-[${size + 80}px] h-[${size + 80}px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none`}
        style={{
          width: `${size + 80}px`,
          height: `${size + 80}px`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="preserve-3d transition-transform ease-out will-change-transform"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transitionDuration: isDragging ? '0ms' : '150ms',
          }}
        >
          {/* FRONT (F) */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('F')}
          </div>

          {/* BACK (B) */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('B')}
          </div>

          {/* LEFT (L) */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('L')}
          </div>

          {/* RIGHT (R) */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('R')}
          </div>

          {/* UP (U) */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('U')}
          </div>

          {/* DOWN (D) */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('D')}
          </div>
        </div>
      </div>

      {/* Orbit Helper Indicators */}
      <div className="flex items-center gap-2 mt-2 text-xs text-stone-500 dark:text-stone-400">
        <span>Drag to orbit 3D</span>
        <span>·</span>
        <button
          onClick={resetView}
          type="button"
          className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer underline text-[11px]"
        >
          Reset View
        </button>
      </div>
    </div>
  );
};
