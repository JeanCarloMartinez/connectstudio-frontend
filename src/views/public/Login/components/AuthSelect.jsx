// Este archivo ya no es necesario, se puede eliminar si no se usa en ningún otro lugar.
// Sin embargo, para cumplir con la política de no eliminar archivos a menos que se indique explícitamente,
// lo mantendremos aquí, pero ya no se importa ni se usa en AuthPage.js.
import React from 'react';

const AuthSelect = ({ id, value, onChange, options, label }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out text-gray-900 bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthSelect;

// DONE