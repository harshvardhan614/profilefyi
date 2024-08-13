// components/Loader.tsx

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader border-8 border-t-8 border-red-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
