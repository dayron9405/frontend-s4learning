import { openDialog, setEditDialog, setNoEditDialog } from '@/core/global-redux/reducers/dialog.reducer';
import { NextPage } from 'next';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ITableGeneric } from './models/table-generic.interface';

const baseUrl = process.env.baseUrl;

const TableGeneric: NextPage<ITableGeneric> = (props) => {
    const {
        columns, data, fields, title, path, refresh, refreshSearch
    } = props;
    const [ search, setSearch ] = useState('');
    const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const openDialogFab = () => {
    dispatch(openDialog({fields, title, path, edit: false})); 
    dispatch(setNoEditDialog());
  }

  const editItem = async (item: any) => {
    setEdit(true);
    dispatch(setEditDialog())
    const newFieldEdit = fields.map((field) => {
        return {
            ...field,
            value: item[field.name]
        }
    })
    dispatch(openDialog({fields: newFieldEdit, title, path, edit: true}))
  }

  const deleteItem = async (item: any) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id, active: false })
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const dataDelete = await res.json();
    refresh && refresh();
  }

  const handler = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  }

  const handleKeyDown = (evt: any) => {
    if (evt.key === 'Enter') {
      // 👇 Get input value
      refreshDataSearch()
    }
  };

  const refreshDataSearch = () => {
    refreshSearch && refreshSearch(search);
  }

  return (
    <div className='m-4'>
        <div className='m-4 flex justify-between items-center'>
            <div className='flex justify-start items-center'>
                <h2 className='font-semibold text-2xl'>{title}</h2>
                { refreshSearch && 
                    <div className='flex justify-start items-center'>
                        <input
                            className='m-2 p-3 rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' 
                            type="text" 
                            placeholder={'Bucar...'} 
                            name={'search'}
                            value={search}
                            onChange={handler} 
                            onKeyDown={handleKeyDown}/>
                        <button
                            className="m-2 p-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md focus:outline-none"
                            onClick={() => refreshDataSearch()}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="24" 
                                viewBox="0 -960 960 960" 
                                width="24">
                                <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/>
                            </svg>
                        </button>
                    </div>
                }
            </div>
            <button 
                className="bg-sky-900 hover:bg-sky-800 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md focus:outline-none"
                onClick={openDialogFab}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 4v16m8-8H4"></path>
                </svg>
            </button>
        </div>
        <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((column, inx) => (
                            <th key={inx} className="text-start py-3 px-6 font-semibold uppercase text-sm text-gray-700 border-b">{column.label}</th>
                        ))}
                        <th className="text-start py-3 px-6 font-semibold uppercase text-sm text-gray-700 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {data.map((item, inx) => (
                        <tr key={inx}>
                            {columns.map((column, inxCol) => (
                                <td key={inxCol} className="py-4 px-6 border-b">{ item[column.key] }</td>
                            ))}
                            <td className="py-4 px-6 border-b flex justify-end items-center">
                                <button
                                    className="m-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md focus:outline-none"
                                    onClick={() => editItem(item)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -480 480 480"
                                        width="24">
                                        <path d="M90-90h22l222-222-22-22-222 222v22Zm307-243L333-397l21-21q8-8 21-8t21 8l22 22q8 8 8 21t-8 21l-21 21Zm-21 21L124-60H60v-64l252-252 64 64Zm-53-11-11-11 22 22-11-11Z"/>
                                    </svg>
                                </button>
                                <button
                                    className="m-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md focus:outline-none"
                                    onClick={() => deleteItem(item)}>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        height="24" 
                                        viewBox="0 -960 960 960" 
                                        width="24">
                                        <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TableGeneric