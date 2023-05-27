'use client';

import React from 'react'
import Navbar from "../navbar/navbar";
import Sidebar from '../sidebar/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, selectDialogOpen } from '@/core/global-redux/reducers/dialog.reducer';
import DialogForm from '../dialog-form/dialog-form';

const Layout = ({ children }: {
    children: React.ReactNode
  }) => {
    const isOpen = useSelector(selectDialogOpen);

  return (
    <div>
        { isOpen && <DialogForm /> }
        <Navbar />
        {/* <Sidebar /> */}
        { children }
    </div>
  )
}

export default Layout