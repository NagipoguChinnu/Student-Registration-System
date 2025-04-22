
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">404 - Page Not Found</h1>
      <p className="text-secondary">Oops! The page you're looking for doesn't exist.</p>
      <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
}

export default ErrorPage;
