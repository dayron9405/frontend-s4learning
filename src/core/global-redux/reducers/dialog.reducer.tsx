'use client';

import { createSlice } from '@reduxjs/toolkit';
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { IFieldFormDynamic } from '@/components/form-dynamic/models/form-dynamic.interface';

export interface DialogState {
    open: boolean;
    title: string;
    path: string;
    edit: boolean;
    fields: IFieldFormDynamic[];
}

const initialState: DialogState = {
    open: false,
    title: '',
    path: '',
    edit: false,
    fields: []
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, {payload}) => {
            state.fields = payload.fields;
            state.title = payload.title;
            state.path = payload.path;
            state.edit = payload.edit;
            state.open = true 
        },
        closeDialog: (state) => { 
            state.fields = [];
            state.open = false; 
        },
        setEditDialog: (state) => {
            state.edit = true;
        },
        setNoEditDialog: (state) => {
            state.edit = false;
        },
        changeStatusDialog: (state) => {
            state.open = !state.open;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
          return {
            ...state,
            ...action.payload,
          };
        },
    },
})

export const { openDialog, closeDialog, setEditDialog, setNoEditDialog, changeStatusDialog } = dialogSlice.actions;
export const selectDialog = (state: AppState) => state.dialog;
export const selectDialogOpen = (state: AppState) => state.dialog.open;
export const selectDialogFields = (state: AppState) => state.dialog.fields;
export const selectDialogTitle = (state: AppState) => state.dialog.title;
export const selectDialogPath = (state: AppState) => state.dialog.path;
export const selectDialogEdit = (state: AppState) => state.dialog.edit;

export default dialogSlice.reducer;