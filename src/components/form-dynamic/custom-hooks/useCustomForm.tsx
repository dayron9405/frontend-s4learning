import { ChangeEvent, useState } from "react";
import { IDetailsField, IFieldFormDynamic, IFormDynamic, IFormService } from "../models/form-dynamic.interface";
import { inputValidate } from "./validators.service";
import { useSelector } from "react-redux";
import { selectDialogEdit } from "@/core/global-redux/reducers/dialog.reducer";

export const useCustomForm = (): [
    IFormService['formDynamic'], 
    IFormService['setFormDynamic'],
    IFormService['formValid'],
    IFormService['buildForm'],
    IFormService['handleChange'],
    IFormService['handleTouch'],
    IFormService['markAllTouch'],
    IFormService['getValues']
] => {
    const [ formDynamic, setFormDynamic ] = useState<IFormDynamic>({});
    const [ formValid, setFormValid ] = useState(true);
    const edit = useSelector(selectDialogEdit);

    const buildForm = (fields: IFieldFormDynamic[]): IFormDynamic => {
        let newFormDinamic: IFormDynamic = {};
        fields.forEach(field => {
            if (field.validators && field.validators.length > 0) {
                setFormValid(false)
            }
            const newFieldTemp = {
                [field.name]: {
                    value: field.value || '',
                    validators: field.validators,
                    valid: !(field.validators && field.validators.length > 0),
                    touch: false,
                    hidden: !!field.hidden,
                    error: {}
                }
            }
            newFormDinamic = { ...newFormDinamic, ...newFieldTemp };
            return field;
        });
        setFormDynamic(newFormDinamic);
        return newFormDinamic;
    }

    const handleTouch = (evt: ChangeEvent<HTMLInputElement>) => {
        const name = evt.target.name;
        const currentValues: IDetailsField = formDynamic[name];
        const newDataForm = {
            ...formDynamic,
            [name]: {
                ...currentValues,
                touch: true
            }
        }
        setFormDynamic(newDataForm as IFormDynamic);
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const name = evt.target.name;
        const currentValues: IDetailsField = formDynamic[name];
        const validations = validField(evt.target, currentValues);
        if (!validations[0]) {
            setFormValid(!!validations[0]); 
        }
        validForm();
        const newDataForm = {
            ...formDynamic,
            [name]: {
                ...currentValues,
                value: evt.target.value,
                valid: validations[0],
                error: validations[1]
            }
        }
        setFormDynamic(newDataForm as IFormDynamic);
    }

    const validForm = () => {
        const validAll = [];
        Object.entries(formDynamic).map(item => {
            const [ key, value ] = item;
            if (!value.valid) {
                validAll.push(value.valid)
            }
            return item;
        });
        const validFormAll = validAll.length > 0;
        setFormValid(!validFormAll);
    }

    const markAllTouch = () => {
        const validAll = [];
        Object.entries(formDynamic).map(item => {
            const [ key, value ] = item;
            value.touch = true;
            if (!value.valid) {
                validAll.push(value.valid)
            }
        });
        const validFormAll = validAll.length > 0;
        setFormValid(!validFormAll);
    }

    const validField = (taget: any, currentValues: any) => {
        return currentValues.validators && currentValues.validators.length > 0 ? inputValidate(
            taget,
            currentValues.validators,
            formDynamic
        ): [true, {}];
    }

    const getValues = () => {
        let values = {}
        Object.entries(formDynamic).forEach(item => {
            const [key, data] = item;
            if (!data.hidden || edit) {
                const valueTemp = data.value
                values = { ...values, [key]: valueTemp }   
            }
            return item;
        });
        return values;
    }

    return [ formDynamic, setFormDynamic, formValid, buildForm, handleChange, handleTouch, markAllTouch, getValues ];
}