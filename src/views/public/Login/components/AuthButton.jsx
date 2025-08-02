import React from 'react';

const AuthButton = ({ onClick, text, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {text}
    </button>
  );
};

export default AuthButton;