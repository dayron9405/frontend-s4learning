import { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { IFormDynamic, IFormProps, IFormService } from './models/form-dynamic.interface'
import { inputValidate } from './custom-hooks/validators.service';
import { useCustomForm } from './custom-hooks/useCustomForm';
import { useDispatch, useSelector } from 'react-redux';
import { refreshData } from '@/core/global-redux/reducers/table-refresh.reducer';
import { closeDialog, selectDialogEdit } from '@/core/global-redux/reducers/dialog.reducer';

const baseUrl = process.env.baseUrl;

const FormDynamic: NextPage<IFormProps>= (props) => {
  const {
    title, fields, path, emitForm
  } = props;
  const [ 
    formDynamic, 
    setFormDynamic, 
    buildForm, 
    handleChange, 
    handleTouch, 
    getValues 
  ] = useCustomForm();
  const [ isBuildForm, setBuildForm ] = useState(false);

  useEffect(() => {
    setForm();
  }, [])

  const dispatch = useDispatch();
  const edit = useSelector(selectDialogEdit);

  const setForm = () => {
    const builtForm = buildForm(fields);
    setBuildForm(true)
    emitForm(builtForm)
  }

  const handler = (evt: ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
  }

  const sendData = async (evt: any) => {
    evt.preventDefault();
    const values = getValues();
    if (edit) {
        updateResource(values);
    }else {
        createResoource(values);
    }
    
  }

  const updateResource = async (data: any) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        return 'Failed to fetch data';
    }
    const resourceUpdate = await res.json();
    dispatch(refreshData());
    dispatch(closeDialog());
  }

  const createResoource = async (data: any) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
      return 'Failed to fetch data';
    }
    const resorceCreated = await res.json();
    dispatch(refreshData());
    dispatch(closeDialog());
  }

  return (
    <div className='m-2'>
        { isBuildForm && 
            <form className='flex justify-center items-center flex-col'>
                <div className='flex justify-center items-center flex-col m-2'>
                {fields.map((field, inx) => {
                    if(field.hidden) {
                        return '';
                    }
                    return <input 
                        key={inx} 
                        className='m-2 p-3 rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' 
                        type="text" 
                        placeholder={field.label} 
                        name={field.name}
                        value={formDynamic[field.name].value}
                        onChange={handler} 
                        onBlur={handleTouch} /> 
                })}
                </div>
                <button className='w-full m-2 p-4 rounded-full text-white bg-sky-900 hover:bg-sky-800' onClick={sendData}>
                    { edit ? 'Actualizar' : 'Guardar' } {title}
                </button>
            </form> 
        }
    </div>
  )
}

export default FormDynamic