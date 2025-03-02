import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import StoreProvider from '@/store/StoreProvider';

import CombinedComponent from './page';

const LIMIT = 10; // Adjust the number of items per load as needed

export default function MainpageGroupScrollTag() {
  const [tags, setTags] = useState<string[]>([]);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Define the loading state
  const { ref, inView } = useInView();

  const loadItems = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true); // Set loading to true when fetching data

    try {
      const response = await axios.get(
        'https://b5-teal.vercel.app/api/name-header',
        {
          params: { start, limit: LIMIT },
        },
      );

      setTags((prevTags) => [...prevTags, ...response.data.items]);
      setHasMore(response.data.hasMore);
      setStart((prevStart) => prevStart + LIMIT); // Move the increment here
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Reset loading state after data fetching
    }
  }, [start, hasMore, loading]);

  useEffect(() => {
    if (inView && hasMore) {
      loadItems();
    }
  }, [inView, loadItems]);

  // Define the function for fetching more data
  const handleFetchMore = () => {
    if (hasMore) {
      loadItems();
    }
  };

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>My App</h1>
      <StoreProvider>
        <CombinedComponent tags={tags} onFetchMore={handleFetchMore} />
      </StoreProvider>
      {loading && <div>Loading...</div>} {/* Show loading indicator */}
      {hasMore && !loading && (
        <div ref={ref} style={{ height: '100px', background: 'transparent' }} />
      )}{' '}
      {/* Sentinel */}
    </div>
  );
}
