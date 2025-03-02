import './mor.css';

import React from 'react';

// Define the props type for MoreButton
interface MoreButtonProps {
  onClick: () => void; // Type the onClick prop as a function with no parameters and no return value
}

const MoreButton: React.FC<MoreButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="load-more-buttonF" onClick={onClick}>
      ดูทั้งหมด
    </button>
  );
};

export default MoreButton;
