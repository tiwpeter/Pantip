// store/hooks.ts

import { useDispatch } from 'react-redux';

import type { AppDispatch } from './store'; // Adjust the path according to your project structure

export const useAppDispatch = () => useDispatch<AppDispatch>();
