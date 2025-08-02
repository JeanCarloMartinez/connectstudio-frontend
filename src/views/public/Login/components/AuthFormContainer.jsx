import React from 'react';

const AuthFormContainer = ({ children, title, subtitle }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto border border-gray-100 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">{title}</h2>
      <p className="text-center text-gray-600 mb-8">{subtitle}</p>
      {children}
    </div>
  );
};

export default AuthFormContainer;