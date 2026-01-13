import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SignatureInteractionProps {
  type: 'reveal' | 'hover' | 'text-reveal' | 'clip-reveal' | 'parallax' | 'marquee' | 'sticky-progress';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SignatureInteraction: React.FC<SignatureInteractionProps> = ({ 
  type, 
  children, 
  className = '',
  onClick
}) => {
  
  if (type === 'hover') {
    return (
      <motion.div
        className={className}
        whileHover={{ y: -10, borderColor: '#00f0ff' }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  if (type === 'text-reveal') {
    return (
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Default fallback (pass-through)
  return <div className={className} onClick={onClick}>{children}</div>;
};
