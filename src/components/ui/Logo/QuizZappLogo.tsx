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
      src="https://private-user-images.githubusercontent.com/76923032/279826261-22cfd9bc-5391-4feb-be33-a294b3b0603f.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDUyNTE0OTMsIm5iZiI6MTcwNTI1MTE5MywicGF0aCI6Ii83NjkyMzAzMi8yNzk4MjYyNjEtMjJjZmQ5YmMtNTM5MS00ZmViLWJlMzMtYTI5NGIzYjA2MDNmLnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTE0VDE2NTMxM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU4NzFkYTZhMzk4NmM1NDlkYmU5MDIzNTM4NzQ1NjFjMmNhMjY1OWRmZjI4NTA1M2FkZTlhZjY4N2E2ZWQ4M2EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.iJj94shtiBOC9OCHaZHEWHGfGBZbkuzhMhIkbzK07tc"
    />
  );
};

export default QuizZappLogo;
