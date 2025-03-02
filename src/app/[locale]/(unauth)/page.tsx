'use client';

import './stick.css';

import React from 'react';

import SecodSlie from '@/components/abouSlie/sliecod/data';
import PantipIndex from '@/components/pantiprealtime/page';

import PantipMain from './Pantip';
import MainTagHiz from './TagHiz';

const ClientComponent = () => {
  return (
    <div>
      <SecodSlie />
      <PantipIndex />
      <div className="contaimain">
        <div className="container">
          <div className="pantip-main">
            <PantipMain />
          </div>
          <div className="main-tag-hiz">
            <MainTagHiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;
