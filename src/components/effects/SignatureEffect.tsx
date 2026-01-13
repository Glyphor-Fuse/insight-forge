import React from 'react';
import { motion } from 'framer-motion';

interface SignatureEffectProps {
  effect: 'hero-viz' | 'glow' | 'grid';
  className?: string;
}

export const SignatureEffect: React.FC<SignatureEffectProps> = ({ effect, className = '' }) => {
  if (effect === 'hero-viz') {
    return (
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full z-[-1] pointer-events-none ${className}`}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          maskImage: 'linear-gradient(to left, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />
    );
  }

  return null;
};
