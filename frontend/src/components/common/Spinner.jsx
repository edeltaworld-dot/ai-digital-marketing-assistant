/**
 * Loading Spinner
 */

import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} animate-spin`}>
        <div className="h-full w-full border-4 border-gray-300 border-t-primary-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
