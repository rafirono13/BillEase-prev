import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
        <div className="card w-full max-w-sm sm:max-w-md bg-base-100 shadow-2xl border border-base-300 animate-fade-in rounded-2xl">
          <div className="card-body items-center text-center">
            <div className="text-6xl">😵</div>
            <h2 className="card-title text-3xl font-bold mt-4">404</h2>
            <p className="text-lg text-base-content/70 mt-2">
              Oops! Page not found.
            </p>
            <div className="card-actions mt-6">
              <Link to="/" className="btn btn-primary btn-wide">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
