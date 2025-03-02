import { createSelector } from 'reselect';

import type { RootState } from '../store'; // Adjust the path based on your directory structure

// Base selector
const selectIconState = (state: RootState) => state.iconfortag; // Match with rootReducer slice name

// Memoized selectors
export const selectAllIcons = createSelector(
  [selectIconState],
  (iconState) => iconState.icons,
);
