import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface TabWrapperProps {
  className?: string;
  children?: ReactNode;
}

const TabWrapper: React.FC<TabWrapperProps> = ({ className, children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`w-full h-full ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TabWrapper;
