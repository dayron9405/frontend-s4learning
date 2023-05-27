import { EValidation } from "../models/field.enum";

const successClass = 'succes-validation';
const errorClass = 'error-validation';

function required(inputData: any): [boolean, string] {
    if (inputData) {
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        if (value && value != '') {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        }else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.required];
        } 
    }else {
        return [false, EValidation.required];
    }
}

function isEmail(inputData: any): [boolean, string] {
    if (inputData) {
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        const resultValidation = emailValid.test(value);
        if (resultValidation) {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        } else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.email];
        }
    }else{
        return [false, EValidation.email];
    }
    
}

function maxLength(inputData: any, max: any): [boolean, string] {
    if (inputData) {
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        if (value.length <= max) {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        } else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.maxLentgth];
        }
    } else {
        return [false, EValidation.maxLentgth];
    }
    
}

function minLength(inputData: any, min: any): [boolean, string] {
    if (inputData) {
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        if (value.length >= min) {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        } else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.minLentgth];
        }
    } else {
        return [false, EValidation.minLentgth];   
    }
}

function onlyNumbers(inputData: any): [boolean, string] {
    if (inputData) {
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        const numbersValid = /^\d+$/;
        const resultValidation = numbersValid.test(value);
        if (resultValidation) {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        } else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.onlyNumbers];
        }
    } else {
        return [false, EValidation.onlyNumbers];
    }
    
}

function onlyText(inputData: any): [boolean, string] {
    if (inputData) {
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        const textValid = /^[A-Za-z]+$/;
        const resultValidation = textValid.test(value);
        if (resultValidation) {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        } else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.onlyText];
        }
    } else {
        return [false, EValidation.onlyText];
    }
}

function compare(inputData: any, valudCompare: any): [boolean, string] {
    if (inputData) {
        const { value } = inputData;
        errorOrSuccessClassRemove(inputData);
        if (value == valudCompare) {
            inputData.classList.add('fadeIn', successClass);
            return [true, ''];
        } else {
            inputData.classList.add('fadeIn', errorClass, 'input-invalid');
            return [false, EValidation.compare];
        }
    } else {
        return [false, EValidation.compare];
    }
}

function errorOrSuccessClassRemove(inputData: any) {
    inputData.classList.remove(successClass);
    inputData.classList.remove(errorClass, 'input-invalid');
}

function Validators({inputData, validation, param, valueCompare}: any): [boolean, string] {
    switch (validation) {
        case 'required':
            return required(inputData);
        case 'isEmail':   
            return isEmail(inputData);
        case 'maxLength':   
            return maxLength(inputData, param);
        case 'minLength':   
            return minLength(inputData, param);
        case 'onlyNumbers':   
            return onlyNumbers(inputData);
        case 'onlyText':   
            return onlyText(inputData);
        case 'compare':   
            return compare(inputData, param);
        default:
            return [true, ''];
    }
}

export function inputValidate(target: any, field: any, form: any) {
    const IsValid = [];
    for(let item of field){
        if (item.valueCompare) {
            item.param = form[item.valueCompare].value;
        }
        IsValid.push(Validators({ ...item, inputData: target }));
    }
    let error = {};
    const valid = IsValid.every(item => {
        if (!item[0]) {
            const errorTemp = {
                [item[1]]: !item[0]
            }
            error = { ...error, ...errorTemp }
        }
        return item[0];
    });
    if(target){
        if (valid) {
            target.classList.add('fadeIn', successClass);
        } else {
            target.classList.add('fadeIn', errorClass, 'input-invalid');
        }
    }
    return [valid, error];
}