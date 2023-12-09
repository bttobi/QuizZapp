import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ErrorMessageProps {
  value: string | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ value }) => {
  return (
    <AnimatePresence>
      {value && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          className="text-danger text-sm text-center"
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
