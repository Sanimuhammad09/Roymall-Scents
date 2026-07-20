import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouterState } from '@tanstack/react-router';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const routerState = useRouterState();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routerState.location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } },
          exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
