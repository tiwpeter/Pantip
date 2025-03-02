import React from 'react';

import AnnouncePage from '@/app/[locale]/(unauth)/RoomDetail/componet/DetailAnuo';
import StoreProvider from '@/store/StoreProvider';

import Recommendations from './Recommendations/Recommendations';
import TredPage from './TredPage/TredPage';

const TagIdLayout = ({ params }: { params: { tag: string } }) => {
  return (
    <div
      className="tag-id-layout"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // textAlign: 'center', // Center the text inside
      }}
    >
      <div style={{ marginBottom: '20px' }}>Layout Link</div>
      <AnnouncePage />
      <StoreProvider>
        <Recommendations params={params} />
        <TredPage params={params} />
      </StoreProvider>
    </div>
  );
};

export default TagIdLayout;
