'use client';

import './pagetag/css/tag.css';
import './pagetag/css/bottom.css';
import './pagetag/css/boxtestcolor2.css';
import './pagetag/css/boxtestcolor.css';
import './pagetag/css/te.css';

import React from 'react';

import StoreProvider from '@/store/StoreProvider';

import PantipSecondary from '../PantipSecondary/page';

const tags: string[] = ['Pantip Pick', 'Pantip Hitz']; // Explicitly define the type

const PantipPickTag: React.FC = () => {
  // Ensure tags array has at least two elements and provide default values if not
  const [firstTag = '', secondTag = ''] = tags;

  return (
    <section
      className="flex"
      style={{ justifyContent: 'center', width: '100%' }}
    >
      <div style={{ width: '711px' }}>
        <StoreProvider>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <section>
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
                <h2>{firstTag}</h2>
              </div>
              {firstTag && <PantipSecondary tag={firstTag} />}
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
                <h2>{secondTag}</h2>
              </div>
              {secondTag && <PantipSecondary tag={secondTag} />}
            </section>
          </div>
        </StoreProvider>
      </div>
    </section>
  );
};

export default PantipPickTag;
