'use client';

import React, { useEffect, useState } from 'react';

import StoreProvider from '@/store/StoreProvider';

import PantipRealtime from './pagepantip/page';

// List of tags to display
const tags: string[] = ['Pantip Realtime'];

export default function PantipIndex() {
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  useEffect(() => {
    const determineNextTags = (): string[] => {
      const storedTags: string[] = JSON.parse(
        localStorage.getItem('currentTags') || '[]',
      );

      let newTags: string[] = [];

      if (storedTags.length === 0) {
        // Initialize with default tags if none are stored
        newTags = tags.slice(0, 1); // Adjusted to slice only one tag if initial
      } else {
        const lastTag = storedTags[storedTags.length - 1];

        // Ensure lastTag is a valid string
        if (typeof lastTag === 'string') {
          const currentIndex = tags.indexOf(lastTag);
          const nextIndex = (currentIndex + 1) % tags.length;
          // Ensure that nextIndex is within bounds
          const nextTag = tags[nextIndex];
          if (nextTag) {
            newTags = [nextTag];
          } else {
            // Handle unexpected case
            console.error('Next tag is undefined, resetting to default.');
            newTags = tags.slice(0, 1); // Default to first tag
          }
        } else {
          // Handle case where lastTag is not a string
          console.error('Last tag is not a string, resetting to default.');
          newTags = tags.slice(0, 1); // Default to first tag
        }
      }

      localStorage.setItem('currentTags', JSON.stringify(newTags));
      return newTags;
    };

    const nextTags = determineNextTags();
    setCurrentTags(nextTags);
  }, []);

  return (
    <div
      style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}
    >
      <div
        className="mt-3"
        style={{
          background: '#7f99ff',
          display: 'flex',
          minHeight: '43px',
          padding: '12px 16px',
          position: 'relative',
          whiteSpace: 'normal',
          width: '1078px',
        }}
      >
        <h3>Pantip Realtime</h3>
      </div>
      <StoreProvider>
        <PantipRealtime tag={currentTags[0] || ''} />
        {/* Ensure that `tag` prop is always a string */}
      </StoreProvider>
    </div>
  );
}
