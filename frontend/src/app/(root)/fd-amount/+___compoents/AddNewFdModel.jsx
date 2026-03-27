"use client";
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useState } from 'react'
import { LiaPlusSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import { RiCloseLargeLine } from "react-icons/ri";

import * as yup from 'yup'
export default function AddNewFdModel({isUpdate,setIsUpdate}) {
  let [isOpen, setIsOpen] = useState(false)
  const { user,fetchUserProfile} = useMainContext()
  const [loading,setLoading] = useState(false)

  const initialStates = {
    amount:0,
    account:'',
    apply_for:''
  }

  const validationSchema = yup.object({
    amount:yup.number().min(1,"Minium 1 Rs ").required("Amount is Required"),
    account:yup.string().required("Account is Required"),
    apply_for:yup.string().required("Purpose is Required"),
  })

  const onSubmitHandler =async (values,{resetForm})=>{
    try {
      setLoading(true)
      // req
      const response = await axiosClient.post('/fd/add-new',values,{
        headers:{
          'Authorization':'Bearer '+localStorage.getItem("token")
        }
      })

      const data = await response.data
      // console.log(data);
      
      await fetchUserProfile()
      toast.success(data.msg)
      closeModal()

      
    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    }finally{
      setLoading(false)
      setIsUpdate(!isUpdate)
    }
  }


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <> 
        

        <div       onClick={openModal} className="w-full  border border-dashed border-red-900 rounded shadow px-4 py-3 flex items-center justify-center flex-col hover:bg-violet-700 hover:text-white transition-all duration-300 cursor-pointer text-rose-700  ">
                <LiaPlusSolid className="text-5xl  transition-all duration-300" />
                <p className="  transition-all duration-300 font-medium">Open FD</p>
        </div>
   

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg flex items-center justify-between font-medium leading-6 text-violet-500"
                  >
                    <p>Apply for New Fix Deposit</p>
                    <button  onClick={closeModal} type='button' className='text-xl p-2 bg-white rounded-full text-rose-700 cursor-pointer'>
                      <RiCloseLargeLine/>
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                    Get Per day <b>0.1%</b> interest by Orion Bank Application
                    </p>
                  </div>
            <Formik validationSchema={validationSchema} onSubmit={onSubmitHandler} initialValues={initialStates}>

            <Form className='py-5'>
              <div className="mb-3">
                <label htmlFor="apply_for" className='text-violet-600'>Purpose</label>
                <Field type="text" name='apply_for' id='apply_for' className='w-full bg-transparent border border-violet-500 rounded-md py-3 px-4 outline-none text-violet-200' placeholder='Enter FD Purpose...' />
                <ErrorMessage className='text-red-500' component={'p'} name='apply_for' />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className='text-violet-600'>Amount</label>
                <Field type="number" name='amount' id='amount' className='w-full bg-transparent border border-violet-500 rounded-md py-3 px-4 outline-none text-violet-200' placeholder='Enter FD Amount' />
                <ErrorMessage className='text-red-500' component={'p'} name='amount' />
              </div>


              <div className="mb-3">
                <label htmlFor="account" className='text-violet-600'>Account</label>
                <Field  as="select" name='account' id='account' className='w-full bg-transparent border border-violet-500 rounded-md py-3 px-4 outline-none text-violet-200'   >
                 {
                  user && user.account_no && user.account_no.length>0 ? <>
                  <option value="">Select</option>
                   { user.account_no.map((cur,i)=>{
                    return <option key={i} className='' value={cur._id}>{`${cur._id} - ₹${cur.amount}`}</option>
                  })}
                  </>:
                  <option value="">No Account Have</option>
                 }
                </Field>
                <ErrorMessage className='text-red-500' component={'p'} name='account' />
              </div>

              <div className="mb-3">
                <CustomAuthButton  isLoading={loading} text={'Add FD'} />
              </div>
              


            </Form>

            </Formik>





                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
