'use client';

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { dialogSlice } from './reducers/dialog.reducer';
import { refreshSlice } from "./reducers/table-refresh.reducer";

const makeStore = () =>
  configureStore({
    reducer: {
        [dialogSlice.name]: dialogSlice.reducer,
        [refreshSlice.name]: refreshSlice.reducer
    },
    devTools: true,
});


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);