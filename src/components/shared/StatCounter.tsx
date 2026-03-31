import { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function StatCounter({
  value,
  label,
  prefix = '',
  suffix = '',
}: StatCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const rafRef = useRef<number>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const startTime = performance.now();
          const duration = 2000;

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * eased));
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              setCount(value);
            }
          }

          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  const display = count ?? value;

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl font-bold text-gold-600">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-neutral-400">{label}</div>
      <div className="mx-auto mt-3 h-0.5 w-8 bg-gold-600" />
    </div>
  );
}
