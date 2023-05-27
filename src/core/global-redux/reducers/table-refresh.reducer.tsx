'use client';

import { createSlice } from '@reduxjs/toolkit';
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface RefreshState {
    refresh: boolean;
}

const initialState: RefreshState = {
    refresh: false,
}

export const refreshSlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        refreshData: (state) => {
            state.refresh = true;
        },
        noRefreshData: (state) => {
            state.refresh = false; 
        },
        changeStatusRefresh: (state) => {
            state.refresh = !state.refresh;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
          return {
            ...state,
            ...action.payload.refresh,
          };
        },
    },
})

export const { refreshData, noRefreshData, changeStatusRefresh } = refreshSlice.actions;
export const selectRefreshState = (state: AppState) => state.refresh;

export default refreshSlice.reducer;