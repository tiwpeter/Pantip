import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

// Define the interface for the props
interface LeftArrowIconProps {
  className?: string; // className is optional and a string
  border?: boolean; // border is optional and a boolean
  borderRadius?: boolean; // borderRadius is optional and a boolean
}

const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({
  className,
  border,
  borderRadius,
}) => (
  <FontAwesomeIcon
    icon={faAngleLeft}
    className={`fa-solid fa-angle-left ${className || ''}`}
    style={{
      border: border ? '1px solid #000' : 'none',
      borderRadius: borderRadius ? '50%' : '0',
    }}
  />
);

export default LeftArrowIcon;
