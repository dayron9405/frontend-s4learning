import { NextPage } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  IFormDynamic,
  IFormProps,
  IFormService,
} from "./models/form-dynamic.interface";
import { inputValidate } from "./custom-hooks/validators.service";
import { useCustomForm } from "./custom-hooks/useCustomForm";
import { useDispatch, useSelector } from "react-redux";
import { refreshData } from "@/core/global-redux/reducers/table-refresh.reducer";
import {
  closeDialog,
  selectDialogEdit,
} from "@/core/global-redux/reducers/dialog.reducer";
import style from './form-dynamic.module.scss';

const baseUrl = process.env.baseUrl;

const FormDynamic: NextPage<IFormProps> = (props) => {
  const { title, fields, path, emitForm } = props;
  const [
    formDynamic,
    setFormDynamic,
    formValid,
    buildForm,
    handleChange,
    handleTouch,
    markAllTouch,
    getValues,
  ] = useCustomForm();
  const [isBuildForm, setBuildForm] = useState(false);

  useEffect(() => {
    setForm();
  }, []);

  const dispatch = useDispatch();
  const edit = useSelector(selectDialogEdit);

  const setForm = () => {
    const builtForm = buildForm(fields);
    setBuildForm(true);
    emitForm(builtForm);
  };

  const handler = (evt: ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
  };

  const sendData = async (evt: any) => {
    evt.preventDefault();
    markAllTouch();
    if (!formValid) {
      return;
    }
    const values = getValues();
    if (edit) {
      updateResource(values);
    } else {
      createResoource(values);
    }
  };

  const updateResource = async (data: any) => {
    const res = await fetch(`${baseUrl}/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return "Failed to fetch data";
    }
    const resourceUpdate = await res.json();
    dispatch(refreshData());
    dispatch(closeDialog());
  };

  const createResoource = async (data: any) => {
    const res = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return "Failed to fetch data";
    }
    const resorceCreated = await res.json();
    dispatch(refreshData());
    dispatch(closeDialog());
  };

  const inputValid = "placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
  const inputInvalid = "placeholder:text-red-400 border-red-300 focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1";
  const buttonValid = "text-white bg-sky-900 hover:bg-sky-800";
  const buttonInvalid = "text-slate-400 bg-slate-200";

  return (
    <div className="m-2">
      {isBuildForm && (
        <form className="flex justify-center items-center flex-col">
          <div className="flex justify-center items-center flex-col m-2">
            {fields.map((field, inx) => {
              if (field.hidden) {
                return "";
              }
              return (
                <div key={inx}>
                  <input
                    className={
                      (!formDynamic[field.name].valid && formDynamic[field.name].touch ? inputInvalid : inputValid) 
                      + " m-2 p-3 rounded-full py-2 pl-9 pr-3 placeholder:italic w-full border block shadow-sm sm:text-sm"
                    }
                    type="text"
                    placeholder={field.label}
                    name={field.name}
                    value={formDynamic[field.name].value}
                    onChange={handler}
                    onBlur={handleTouch}
                  />
                  { field.validators?.map((validator, valInx) => {
                    if (formDynamic[field.name].error[validator.validation]) {
                      return <span key={valInx} className="ml-2 pl-3 text-xs text-red-500">{ validator.message }</span>  
                    }
                  })}
                </div>
              );
            })}
          </div>
          <button
            className={(formValid ? buttonValid : buttonInvalid) + " w-full m-2 p-4 rounded-full"}
            onClick={sendData}
          >
            {edit ? "Actualizar" : "Guardar"} {title}
          </button>
        </form>
      )}
    </div>
  );
};

export default FormDynamic;
