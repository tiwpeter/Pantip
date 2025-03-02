import MessageIcon from '@mui/icons-material/Message';
import { SvgIcon } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPantip } from '@/features/pantipSlie';
import type { AppDispatch, RootState } from '@/store/store'; // Adjust import path as needed

const PantipRealtime: React.FC<{ tag: string }> = ({ tag }) => {
  const dispatch: AppDispatch = useDispatch(); // Type dispatch with AppDispatch
  const items = useSelector((state: RootState) => state.pantip.items); // Adjust selector path if needed

  useEffect(() => {
    if (tag) {
      console.log(`Fetching data for tag: ${tag}`);
      dispatch(fetchPantip({ tagX: [tag], page: 1, perPage: 10 }));
    }
  }, [dispatch, tag]);

  // Get the items for the specific tag
  const itemsForTag = items[tag] || [];

  return (
    <section
      className="dw container mx-auto"
      style={{
        height: '430px',
        background: 'aliceblue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '1078px',
      }}
    >
      <ul className="flex flex-wrap" style={{ width: '1080px' }}>
        {itemsForTag.map((item: any) => (
          <li
            key={item.id}
            className="boxslie flex items-start border p-2"
            style={{ width: '50%', height: '86px' }}
          >
            {item.img_url && item.img_url !== 'not found url' ? (
              <Image
                src={item.img_url} // Ensure this URL is valid and properly formatted
                alt="Pantip item" // Provide descriptive alt text for accessibility
                width={86} // Define the width of the image
                height={64} // Define the height of the image
                style={{ width: '86px', height: '64px' }}
              />
            ) : null}
            <div
              className="flex h-full flex-col justify-between"
              style={{ width: item.img_url ? 'calc(100% - 86px)' : '100%' }}
            >
              <div>
                <h2 className="mainPageTag" style={{ marginTop: '-7px' }}>
                  {item.text_title}
                </h2>
              </div>
              <div
                className="flex items-center"
                style={{ gap: '5px', marginTop: '3px' }}
              >
                {(item.tags || []).map((tagItem: any) => (
                  <a
                    key={tagItem.link_tag}
                    href={tagItem.link_tag}
                    className="tag-link"
                  >
                    <h2 className="list_font_tag">{tagItem.tag_title || ''}</h2>
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-end" style={{ gap: '0px' }}>
                  {(item.User || []).map((userItem: any) => (
                    <a
                      key={userItem.link_user}
                      href={userItem.link_user}
                      className="text-center"
                      style={{
                        margin: '0',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <h5 style={{ margin: '0' }}>{userItem.text_user}</h5>
                    </a>
                  ))}
                  <h5
                    style={{ margin: '0', marginLeft: '6px' }}
                    className="text-center"
                  >
                    {item.info}
                  </h5>
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
                    {item.comments && item.comments.length > 0
                      ? item.comments.map((comment: any) => (
                          <span
                            key={comment.message}
                            style={{ marginRight: '4px' }}
                          >
                            {comment.message}
                          </span>
                        ))
                      : '0'}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PantipRealtime;
