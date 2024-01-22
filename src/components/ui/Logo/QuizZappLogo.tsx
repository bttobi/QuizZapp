import React from 'react';
interface QuizZappLogoProps {
  width: string | number;
  height: string | number;
  className?: string;
}

const QuizZappLogo: React.FC<QuizZappLogoProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <img
      className={`mr-4 + ${className}`}
      width={width}
      height={height}
      src="https://i.imgur.com/VRwVtXr.png"
    />
  );
};

export default QuizZappLogo;
