import { createSelector } from 'reselect';

import type { RootState } from '../store';

// Base selector
const selectItems = (state: RootState) => state.tagsforicon.items;
// Memoized selector
export const selectData = createSelector([selectItems], (items) => ({
  items,
}));
