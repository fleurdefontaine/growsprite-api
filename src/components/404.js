import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <img 
          src="/images/404.png"
          alt="404 illustration"
          className="mx-auto w-72 h-auto mb-8"
          onError={(e) => {
            setImageError(true);
            e.currentTarget.style.display = 'none';
          }}
        />
        {imageError && (
          <div className="w-72 h-72 mx-auto mb-8 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-400">Image not found</span>
          </div>
        )}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;