'use client';

import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

import rootReducer from './reducer';

interface StoreProviderProps {
  children: React.ReactNode;
}

const store = configureStore({
  reducer: rootReducer, // ใช้ rootReducer ที่รวม reducers ของคุณ
});

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
