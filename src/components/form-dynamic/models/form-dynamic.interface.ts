import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ETypeField, EValidation } from "./field.enum";

export interface IFormService {
    formDynamic: IFormDynamic;
    setFormDynamic: Dispatch<SetStateAction<IFormDynamic>>;
    formValid: boolean;
    buildForm(fields: IFieldFormDynamic[]): IFormDynamic;
    handleChange(evt: ChangeEvent<HTMLInputElement>): void;
    handleTouch(evt: ChangeEvent<HTMLInputElement>): void;
    markAllTouch(): void;
    getValues(): object;
}

export interface IFormDynamic {
    [key: string]: IDetailsField;
}

export interface IDetailsField {
    value: any;
    validators?: IValidator[];
    valid: boolean;
    touch: boolean;
    hidden: boolean;
    error: any;
}

export interface IFormProps {
    title: string;
    fields: IFieldFormDynamic[];
    path: string;
    edit: boolean;
    emitForm({}): void;
}

export interface IFieldFormDynamic {
    type: ETypeField;
    name: string;
    label: string;
    value?: any;
    hidden?: boolean;
    validators?: IValidator[];
}

export interface IValidator {
    validation: EValidation;
    message: string;
    valueValid?: any;
}