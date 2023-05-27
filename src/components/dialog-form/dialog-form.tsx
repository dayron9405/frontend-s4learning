import { closeDialog, selectDialogEdit, selectDialogFields, selectDialogPath, selectDialogTitle } from '@/core/global-redux/reducers/dialog.reducer';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormDynamic from '../form-dynamic/form-dynamic';

const DialogForm = () => {
    const dispatch = useDispatch();
    const fields = useSelector(selectDialogFields);
    const title = useSelector(selectDialogTitle);
    const path = useSelector(selectDialogPath);
    const edit = useSelector(selectDialogEdit);

    const setForm = (evt: any) => {
        // console.log('setForm evt', evt)
      }

  return (

    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20" onClick={() => dispatch(closeDialog())}></div>
      <div className="bg-white rounded-lg p-6 z-30">
        <div className='flex justify-between items-center'>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md focus:outline-none"
                onClick={() => dispatch(closeDialog())}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4">
                <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <div className="mb-4">
            <FormDynamic title={title} fields={fields} emitForm={setForm} path={path} edit={edit} />
        </div>
      </div>
    </div>

    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="bg-white rounded-lg p-6">
    //     <h2 className="text-xl font-bold mb-4">titulo</h2>
    //     <div className="mb-4">contenido</div>
    //     <button
    //       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
    //     >
    //       Cerrar
    //     </button>
    //   </div>
    // </div>

//     <div className="fixed inset-0 flex items-center justify-center">
//   <div className="relative">
//     <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
//     <div className="absolute inset-0 flex items-center justify-center">
//       Contenido del hijo centrado
//     </div>
//   </div>
// </div>

    // <div className='absolute h-full w-full z-30'>
    //     <div className='absolute h-50 w-50 z-40 bg-scale-300'  onClick={() => dispatch(closeDialog())}></div>
    //     <div className='h-50 w-50'>
    //         DialogForm Component
    //     </div>
    // </div>
  )
}

export default DialogForm