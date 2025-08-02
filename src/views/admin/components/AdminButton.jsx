import React from 'react';

const AdminButton = ({ children, onClick, type = 'primary' }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md";
  const primaryStyle = "bg-blue-600 text-white hover:bg-blue-700";
  const secondaryStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${type === 'primary' ? primaryStyle : secondaryStyle}`}
    >
      {children}
    </button>
  );
};

export default AdminButton;