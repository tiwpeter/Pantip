'use client';

import AddBoxIcon from '@mui/icons-material/AddBox';
import MessageIcon from '@mui/icons-material/Message';
import { SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { fetchTred } from '@/features/tagsReducerId';
import { useAppDispatch } from '@/store/hook'; // Adjust the path according to your project structure

interface TitleItem {
  id: string;
  url: string;
  'Title-Topic': string;
  user?: string;
  time?: string;
  comments?: {
    message?: string;
  };
  votes?: number;
  img_url?: string;
}

interface LocalData {
  header: string;
  titles: TitleItem[];
}

interface TredPageProps {
  params: {
    tag: string;
  };
}

const TredPage: React.FC<TredPageProps> = ({ params }) => {
  const dispatch = useAppDispatch(); // Use the typed dispatch
  const { tag } = params;
  const [localData, setLocalData] = useState<LocalData | null>(null);

  useEffect(() => {
    if (tag) {
      dispatch(fetchTred(tag))
        .unwrap()
        .then((data) => {
          console.log('fetchTred data:', data);
          setLocalData(data);
        })
        .catch((error) => {
          console.error('fetchTred error:', error);
        });
    }
  }, [dispatch, tag]);

  if (!localData) {
    return <div>Loading...</div>; // Render a loading state or spinner while data is being fetched
  }

  return (
    <div>
      <div className="copmain" style={{ width: '1078px' }}>
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
          <h3>{localData.header}</h3>
        </div>
        <section
          className="dw container mx-auto"
          style={{
            height: '418px',
            background: 'aliceblue',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '1078px',
            overflow: 'hidden',
          }}
        >
          <ul className="flex flex-wrap" style={{ width: '1080px' }}>
            {localData.titles.map((item) => (
              <li
                key={item.id}
                className="boxslie flex items-start border p-2"
                style={{ width: '50%' }}
              >
                {item.img_url && item.img_url !== 'not found url' && (
                  <img
                    src={item.img_url}
                    alt=""
                    className="mr-2 size-12"
                    style={{ width: '86px', height: '64px' }}
                  />
                )}

                <div
                  className="flex h-full flex-col justify-between"
                  style={{ width: '428px' }}
                >
                  <div className="mb-4">
                    <h2>{item['Title-Topic']}</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-end">
                      {item.user && (
                        <h5 className="text-center">{item.user}</h5>
                      )}
                      {item.time && (
                        <h5
                          className="text-center"
                          style={{ marginLeft: '6px' }}
                        >
                          {item.time}
                        </h5>
                      )}
                    </div>
                    <div className="pt-list-item__stats flex">
                      <span
                        style={{
                          fontSize: '.75rem',
                          marginRight: '16px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <SvgIcon
                          component={MessageIcon}
                          style={{ fontSize: '1rem', marginRight: '8px' }}
                        />
                        {item.comments?.message || 'No messages'}
                      </span>
                      <span
                        style={{
                          fontSize: '.75rem',
                          marginRight: '16px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <SvgIcon
                          component={AddBoxIcon}
                          style={{ fontSize: '1rem', marginRight: '8px' }}
                        />
                        {item.votes || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TredPage;
