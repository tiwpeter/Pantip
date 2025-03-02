'use client';

import './pagetag/css/tag.css';
import './pagetag/css/bottom.css';
import './pagetag/css/boxtestcolor2.css';
import './pagetag/css/boxtestcolor.css';
import './pagetag/css/te.css';

import React from 'react';

import PantipPick from './pagePick/page';

const PantipPickTag = () => {
  return (
    <section className="flex w-[711px]">
      {/* <!--startmore--> */}
      <div style={{ width: '713px;' }}>
        <div
          className="mt-5"
          style={{
            backgroundColor: '#7f99ff',
            display: 'flex',
            minHeight: '43px',
            padding: '12px 16px',
            position: 'relative',
            whiteSpace: 'normal',
          }}
        >
          <h3>Pantip </h3>
        </div>
        <PantipPick />
      </div>
    </section>
  );
};

export default PantipPickTag;
