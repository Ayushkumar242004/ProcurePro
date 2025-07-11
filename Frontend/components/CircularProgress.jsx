import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const CircularProgress = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start({
        strokeDashoffset: 440 - (440 * value) / 100,
        transition: { duration: 1.5, ease: "easeOut" }
      });

      // Animate the counter
      const duration = 1500;
      const step = (value / duration) * 10;
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setAnimatedValue(Math.round(current));
      }, 10);

      return () => clearInterval(timer);
    }
  }, [isInView, value, controls]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const initialOffset = circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-32">
       <svg className="w-full h-full" viewBox="0 0 160 160">
  {/* Background circle with a light red gradient */}
  <circle
    cx="80"
    cy="80"
    r={radius}
    stroke="url(#bgGradient)"
    strokeWidth="14"
    fill="none"
    strokeLinecap="round"
  />
  {/* Progress circle with animated red gradient and glow */}
  <motion.circle
    cx="80"
    cy="80"
    r={radius}
    stroke="url(#progressGradient)"
    strokeWidth="14"
    strokeLinecap="round"
    fill="none"
    strokeDasharray={strokeDasharray}
    initial={{ strokeDashoffset: initialOffset }}
    animate={controls}
    transform="rotate(-90 80 80)"
    filter="url(#glow)"
  />

  {/* Define red gradient and glow filter */}
 <defs>
  {/* Light red background gradient */}
  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#fecaca" />   {/* Red-200 */}
    <stop offset="100%" stopColor="#fca5a5" />  {/* Red-300 */}
  </linearGradient>

  {/* Light red progress gradient */}
<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#E2142D" />
  <stop offset="100%" stopColor="#E2142D" />
</linearGradient>



  {/* Soft red glow */}
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#fca5a5" floodOpacity="0.5" />
    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#fecaca" floodOpacity="0.3" />
  </filter>
</defs>

</svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground">
            {animatedValue}%
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-center text-muted-foreground">{label}</p>
    </div>
  );
};

export { CircularProgress };