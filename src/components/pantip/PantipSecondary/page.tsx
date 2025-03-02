import MessageIcon from '@mui/icons-material/Message';
// Import the thumb-up icon
import { SvgIcon } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadMoreButton from '@/components/MoreComponet/LoadMoreButton/LoadMoreButton';
import { fetchPantip, incrementPage } from '@/features/pantipSlie';
import type { AppDispatch, RootState } from '@/store/store';

import styles from './PantipSecondary.module.css';

interface CommentItem {
  id: string; // Unique identifier for each comment
  message: string;
}

// Define types for items and other data structures
interface TagItem {
  link_tag: string;
  tag_title: string;
}

interface UserItem {
  link_user: string;
  text_user: string;
}

interface CommentItem {
  message: string;
}

interface Item {
  id: string; // Ensure id is unique and a string
  img_url?: string;
  text_title: string;
  tags: TagItem[];
  User: UserItem[];
  info: string;
  comments: CommentItem[];
}

interface PantipSecondaryProps {
  tag: string;
}

const PantipSecondary: React.FC<PantipSecondaryProps> = ({ tag }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, pages, totalPages, status } = useSelector(
    (state: RootState) => state.pantip,
  );

  useEffect(() => {
    if (tag) {
      console.log(`Fetching data for tag: ${tag}`);
      dispatch(fetchPantip({ tagX: [tag], page: 1, perPage: 5 }));
    }
  }, [dispatch, tag]);

  const itemsForTag = items[tag] || [];

  const loadMoreData = (currentTag: string) => {
    const currentPage = pages[currentTag] || 1;
    if (currentPage < (totalPages[currentTag] || 1)) {
      dispatch(incrementPage(currentTag));
      dispatch(
        fetchPantip({ tagX: [currentTag], page: currentPage + 1, perPage: 5 }),
      );
    }
  };

  const shouldShowLoadMoreButton = (currentTag: string) => {
    const currentPage = pages[currentTag] || 1;
    const totalPagesForTag = totalPages[currentTag] || 1;
    return currentPage < totalPagesForTag;
  };

  return (
    <div className={styles.container}>
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
          {itemsForTag.map((item: Item) => (
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
                style={{ width: item.img_url ? 'calc(100% - 86px)' : '100%' }}
              >
                <div>
                  <h2 className="mainPageTag" style={{ marginTop: '-7px' }}>
                    {item.text_title}
                  </h2>{' '}
                </div>
                <div
                  className="flex items-center"
                  style={{ gap: '5px', marginTop: '3px' }}
                >
                  {item.tags.map((tagItem) => (
                    <a
                      key={tagItem.link_tag}
                      href={tagItem.link_tag}
                      className="list_font_tag"
                    >
                      <h2 className="list_font_tag">{tagItem.tag_title}</h2>
                    </a>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-end" style={{ gap: '0px' }}>
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
                      {' '}
                      <SvgIcon
                        component={MessageIcon}
                        style={{ fontSize: '1rem', marginRight: '8px' }}
                      />
                      {item.comments.length > 0
                        ? item.comments.map((comment) => (
                            <span
                              key={comment.id}
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
        {shouldShowLoadMoreButton(tag) && (
          <LoadMoreButton
            onClick={() => loadMoreData(tag)}
            loading={status === 'loading'}
          />
        )}
      </section>
    </div>
  );
};

export default PantipSecondary;
