import React from "react";
import fetch from 'isomorphic-unfetch';
import { IUser } from "@/shared/interfaces/user.interface";
import { NextPage } from "next";
import { IUserProps } from "./models/user-props.interface";
import TableGeneric from "@/components/table-generic/table-generic";
import { IFieldFormDynamic } from "@/components/form-dynamic/models/form-dynamic.interface";
import { ETypeField, EValidation } from "@/components/form-dynamic/models/field.enum";

const nextApi = process.env.nextApi; 

export const getServerSideProps = async () => {
    const res = await fetch(`${nextApi}/user`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const { data } = await res.json();
    return {
        props: {
            userList: data.data
        }
    }
}

const Users: NextPage<IUserProps> = ({ userList }) => {
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
          label: 'Nombre de usuario',
          validators: [
            { validation: EValidation.required, message: 'Campo nombre es requerido' }
          ]
        },
        {
          type: ETypeField.text,
          name: 'email',
          label: 'Email',
          validators: [
            { validation: EValidation.required, message: 'Campo telefono es requerido' }
          ]
        },
        {
          type: ETypeField.text,
          name: 'password',
          label: 'Contraseña',
        }
      ];
      const columns = [
        {
          key: 'name',
          label: 'Nombre de usuario',
        },
        {
          key: 'email',
          label: 'Email',
        },
      ]

    return (
        <div className='m-4'>
            <TableGeneric 
                columns={columns} 
                data={userList} 
                fields={fields} 
                title={'Usuario'} 
                path={'user'}/>
        </div>
    )
}

export default Users;