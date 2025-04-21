import { clamp, isPositive } from '@fullstacksjs/toolbox';
import { useEffect, useRef, useState } from 'react';

import { cn } from '../../libs/cn';

const size = 100;

const polarToCartesian = (r: number, angle: number) => ({
  x: r * Math.cos((angle * Math.PI) / 180),
  y: r * Math.sin((angle * Math.PI) / 180),
});

const makeSectorPath = (
  center: number,
  r: number,
  startAngle: number,
  angle: number,
) => {
  const clampedAngle = angle <= 0.3 ? 0 : Math.min(angle, 359.999);

  const endAngle = startAngle + clampedAngle;
  const startCoords = polarToCartesian(r, startAngle);
  const endCoords = polarToCartesian(r, endAngle);

  const x1 = center + startCoords.x;
  const x2 = center + endCoords.x;
  const y1 = center + startCoords.y;
  const y2 = center + endCoords.y;
  return ['M', x1, y1, 'A', r, r, 0, +(clampedAngle > 180), 1, x2, y2].join(
    ' ',
  );
};

type EasingFn = (t: number, b: number, c: number, d: number) => number;
type Easing = 'easeInOutCubic' | 'linear' | 'none';

const easingMap = {
  linear: (time, start, change, duration) => (change * time) / duration + start,
  easeInOutCubic: (time, start, change, duration) => {
    const t = time / (duration / 2);
    if (t < 1) return (change / 2) * t ** 3 + start;
    return (change / 2) * ((t - 2) ** 3 + 2) + start;
  },
} satisfies Record<string, EasingFn>;

export interface CircleProgressProps {
  value?: number;
  min?: number;
  max?: number;
  startAngle?: number;
  animation?: Easing;
  animationDuration?: number;
  className?: string;
}

export const CircleProgress = ({
  value = 0,
  min = 0,
  max = 1,
  startAngle = 0,
  animation = 'none',
  animationDuration = 600,
  className,
}: CircleProgressProps) => {
  const safeValue = clamp(value, min, max);

  const circleThickness = 3;
  const center = size / 2;
  const r = center - circleThickness / 2;
  const svgStartAngle = startAngle - 90;

  const angle = useAnimatedAngle({
    animation,
    safeValue,
    animationDuration,
    min,
    max,
  });

  return (
    <svg
      aria-valuemax={max}
      aria-valuemin={min}
      className={cn('inline-block', className)}
      fill="none"
      aria-valuenow={value}
      role="progressbar"
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgb(0 0 0 / 0.1)"
        strokeDasharray=".8 1"
        strokeDashoffset={1.7}
        strokeWidth={circleThickness}
      />
      {isPositive(value) && (
        <path
          className="transition-all duration-300"
          d={makeSectorPath(center, r, svgStartAngle, angle)}
          stroke="currentColor"
          strokeWidth={circleThickness}
        />
      )}
    </svg>
  );
};

function useAnimatedAngle({
  animation,
  safeValue,
  animationDuration,
  min,
  max,
}: {
  animation: Easing;
  safeValue: number;
  animationDuration: number;
  min: number;
  max: number;
}) {
  const [currentValue, setCurrentValue] = useState<number>(safeValue);
  const prevValueRef = useRef<number>(safeValue);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    if (animation === 'none') {
      setCurrentValue(safeValue);
      prevValueRef.current = safeValue;
      return;
    }

    if (prevValueRef.current === safeValue) return;

    const start = prevValueRef.current;
    const end = safeValue;
    const change = end - start;
    const duration = animationDuration;
    const easeFn = easingMap[animation];

    let startTime: number | null = null;

    function animate(ts: number) {
      startTime ??= ts;
      const elapsed = ts - startTime;
      if (elapsed < duration) {
        setCurrentValue(easeFn(elapsed, start, change, duration));
        animFrame.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
        prevValueRef.current = end;
      }
    }

    if (animFrame.current) {
      cancelAnimationFrame(animFrame.current);
    }
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
      }
    };
  }, [safeValue, animation, animationDuration, setCurrentValue]);

  const angle = ((currentValue - min) / (max - min)) * 360;

  return clamp(angle, 0, 360);
}
