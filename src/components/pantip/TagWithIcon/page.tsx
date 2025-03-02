import MessageIcon from '@mui/icons-material/Message';
import { SvgIcon } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MoreButton from '@/components/MoreComponet/more/more';
import type { Item } from '@/components/pantip/TagWithIcon/tpye'; // Correctly import types
import { fetchIconData } from '@/features/forTagWithIcon/IconTag';
import { fetchData } from '@/features/forTagWithIcon/TagSlice';
import type { AppDispatch, RootState } from '@/store/store';

import styles from './Combined.module.css';

interface CombinedDisplayComponentProps {
  tags: string[];
  onFetchMore: () => void;
}

const CombinedDisplayComponent: React.FC<CombinedDisplayComponentProps> = ({
  tags,
  onFetchMore,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const {
    icons,
    status: iconStatus,
    error: iconError,
  } = useSelector((state: RootState) => state.iconfortag);
  const {
    items,
    status: dataStatus,
    error: dataError,
  } = useSelector((state: RootState) => state.tagsforicon);

  const [loadedTags, setLoadedTags] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tags.forEach((tag) => {
      dispatch(fetchIconData(tag));
      dispatch(fetchData({ tagX: [tag] }));
    });
  }, [dispatch, tags]);

  useEffect(() => {
    const allTagsLoaded = tags.every((tag) => icons[tag] && items[tag]);
    if (allTagsLoaded) {
      setLoadedTags(tags.reduce((acc, tag) => ({ ...acc, [tag]: true }), {}));
    }
  }, [icons, items, tags]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            if (
              rect.top < viewportHeight / 2 &&
              rect.bottom > viewportHeight / 2
            ) {
              onFetchMore();
            }
          }
        });
      },
      { threshold: [0.5] },
    );

    const elements = containerRef.current?.querySelectorAll('.tag-container');
    elements?.forEach((element) => observer.observe(element));

    return () => {
      elements?.forEach((element) => observer.unobserve(element));
    };
  }, [tags, onFetchMore]);

  const isLoading = iconStatus === 'loading' || dataStatus === 'loading';
  const allTagsLoaded = tags.every((tag) => loadedTags[tag]);

  if (isLoading || !allTagsLoaded) {
    return <div>Loading...</div>;
  }

  if (iconStatus === 'failed' || dataStatus === 'failed') {
    return <div>Error: {iconError || dataError}</div>;
  }

  return (
    <div ref={containerRef}>
      <h2>Combined Data</h2>
      {tags.map((tag) => {
        const tagIcons = icons[tag] || [];
        const tagItems: Item[] = items[tag] || [];

        return (
          <section
            key={tag}
            className="tag-container"
            style={{ marginBottom: '20px' }}
          >
            <div>
              {tagIcons.length > 0 ? (
                <div>
                  <div style={{ background: '#7f99ff', padding: '10px' }}>
                    <section
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '60px',
                        overflowX: 'auto', // Optional: adds horizontal scroll if icons overflow
                      }}
                    >
                      {tagIcons.map((icon, index) => (
                        <div
                          key={icon.background_image_url || index} // Ensure unique key
                          style={{
                            display: 'inline-block',
                            marginRight: '10px',
                          }}
                        >
                          {icon.background_image_url && (
                            <Image
                              src={icon.background_image_url}
                              alt={icon.text_eng || 'Icon image'}
                              width={48}
                              height={48}
                              style={{ objectFit: 'cover' }} // Ensures the image fits well
                            />
                          )}
                        </div>
                      ))}
                      <h3>{tag}</h3>
                    </section>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#7f99ff', padding: '10px' }}>
                  <section
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '60px',
                      justifyContent: 'center',
                    }}
                  >
                    <h3>{tag}</h3>
                  </section>
                </div>
              )}
            </div>
            {/* title tag */}

            {tagItems.length > 0 && (
              <section
                className="dw container mx-auto"
                style={{
                  height: '100%',
                  background: 'aliceblue',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '711px',
                }}
              >
                <ul
                  className="flex flex-col"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                    padding: 0,
                    listStyleType: 'none',
                    width: '100%',
                  }}
                >
                  {tagItems.map((item) => (
                    <li
                      key={item.id}
                      className="boxslie flex items-start border p-2"
                      style={{ width: '100%' }}
                    >
                      {item.img_url && item.img_url !== 'not found url' ? (
                        <Image
                          src={item.img_url} // Ensure this is a valid URL
                          alt="Pantip item" // Descriptive alt text
                          className={`${styles.IMG} mr-2`} // size-12
                          width={86} // Define the width
                          height={64} // Define the height
                        />
                      ) : null}
                      <div
                        className="flex h-full flex-col justify-between"
                        style={{ width: 'calc(100% - 0px)' }}
                      >
                        <div>
                          <h2
                            className="mainPageTag"
                            style={{ marginTop: '-7px' }}
                          >
                            {item.text_title}
                          </h2>
                        </div>
                        <div
                          className="flex items-center"
                          style={{ gap: '5px', marginTop: '3px' }}
                        >
                          {(item.tags || []).map((tagItem, index) => (
                            <a
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              href={tagItem.link_tag}
                              className="tag-link"
                            >
                              <h2 className="list_font_tag">
                                {tagItem.tag_title || ''}
                              </h2>
                            </a>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div
                            className="flex items-end"
                            style={{ gap: '0px' }}
                          >
                            {item.User.map((userItem) => (
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
                                <h5 style={{ margin: '0' }}>
                                  {userItem.text_user}
                                </h5>
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
                              {' '}
                              <SvgIcon
                                component={MessageIcon}
                                style={{ fontSize: '1rem', marginRight: '8px' }}
                              />
                              {item.comments.length > 0
                                ? item.comments.map((comment) => (
                                    <span
                                      key={comment.id as React.Key} // Cast if necessary
                                      className={styles.commentMessage}
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

                <MoreButton onClick={() => router.push(`/tag/${tag}`)} />
              </section>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default CombinedDisplayComponent;
