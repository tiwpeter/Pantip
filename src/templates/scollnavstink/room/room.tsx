'use client';

import './css/iconslie.css'; // Assuming this imports your custom CSS

import React from 'react';

import ReactCardSlider from '@/components/abouSlie/slieIcon/ImageSlider';
import StoreProvider from '@/store/StoreProvider';

const Room = () => {
  return (
    <div className="sw" style={{ width: '1096px' }}>
      <StoreProvider>
        <ReactCardSlider />
      </StoreProvider>
    </div>
  );
};

export default Room;
