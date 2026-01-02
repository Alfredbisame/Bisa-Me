import React from 'react';
import { ErrorMessageProps } from '../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-red-100 border border-red-300 rounded-sm text-red-700 text-sm z-10">
      {error}
    </div>
  );
};

export default ErrorMessage;
