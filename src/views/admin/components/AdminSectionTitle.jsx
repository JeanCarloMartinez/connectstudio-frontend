import React from 'react';

const AdminSectionTitle = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

export default AdminSectionTitle;