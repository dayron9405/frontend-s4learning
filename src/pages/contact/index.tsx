import FormDynamic from '@/components/form-dynamic/form-dynamic';
import { ETypeField, EValidation } from '@/components/form-dynamic/models/field.enum';
import { IFieldFormDynamic } from '@/components/form-dynamic/models/form-dynamic.interface';
import TableGeneric from '@/components/table-generic/table-generic';
import { NextPage } from 'next';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { IContactProps } from './models/contect-props.interface';
import { IContact } from '@/shared/interfaces/contact.interface';
import { refreshData } from '@/core/global-redux/reducers/table-refresh.reducer';
import { useSelector } from 'react-redux';

const baseUrl = process.env.baseUrl;

 const Contacts: NextPage<IContactProps> = () => {
  const [ contactList, setContactList ] = useState<IContact[]>([]);

  useEffect(() => {
    getListContacts('');
  }, []);

  const refreshDataTable = useSelector(refreshData);
  useEffect(() => {
    getListContacts('');
  }, [refreshDataTable]);

  const fields: IFieldFormDynamic[] = [
    {
      type: ETypeField.text,
      name: 'id',
      hidden: true,
      label: 'id'
    },
    {
      type: ETypeField.text,
      name: 'name',
      label: 'nombre del contacto',
      validators: [
        { validation: EValidation.required, message: 'Campo nombre es requerido' }
      ]
    },
    {
      type: ETypeField.text,
      name: 'phone',
      label: 'Telefono del contacto',
      validators: [
        { validation: EValidation.required, message: 'Campo telefono es requerido' }
      ]
    },
    {
      type: ETypeField.text,
      name: 'address',
      label: 'Dirección del contacto',
    }
  ];
  const columns = [
    {
      key: 'name',
      label: 'Nombre de contacto',
    },
    {
      key: 'phone',
      label: 'Telefono',
    },
    {
      key: 'address',
      label: 'Dirección',
    },
  ]

  const getListContacts = async (search: string) => {
    // setContactList([]);
    const res = await fetch(`${baseUrl}/contact?page=1&perPage=10&search=${search}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const { data } = await res.json();
    setContactList(data);
  }

  const refresh = () => {
    getListContacts('');
  }

  const refreshSearch = (search: string) => {
    getListContacts(search);
  }
  

  return (
    <div className='m-4'>
      <TableGeneric 
        columns={columns} 
        data={contactList} 
        fields={fields} 
        title={'Contactos'} 
        path={'contact'} 
        refreshSearch={refreshSearch}
        refresh={refresh}/>
    </div>
  )
}

export default Contacts;
