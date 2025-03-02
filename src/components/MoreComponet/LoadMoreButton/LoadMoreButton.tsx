import './mor.css';

import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  loading,
}) => {
  return (
    <button
      type="button" // Explicit type attribute
      className="load-more-button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
};

export default LoadMoreButton;
