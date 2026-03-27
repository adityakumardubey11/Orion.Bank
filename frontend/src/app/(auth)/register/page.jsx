"use client";
import { axiosClient } from '@/utils/AxiosClient';
import React, { useState } from 'react'
import {Formik,Form,ErrorMessage,Field} from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import Link from 'next/link';
import { useMainContext } from '@/context/MainContext';
import { useRouter } from 'next/navigation';
const RegisterPage = () => {
    const [loading,setLoading] = useState(false)
        const {fetchUserProfile} = useMainContext()
        const router = useRouter()

//   const [states,setStates] = useState()
//   const onChangeHandler =(e)=>{
//     setStates({...states,[e.target.name]:e.target.value})
//   }

  const initialValues = {
    name:'',
    email:'',
    password:'',
    ac_type:''
  }

  const validationSchema = yup.object({
    name :yup.string().required("Name is Required"),
    email:yup.string().email("Email must be a valid Email").required("Email is Required"),
    password: yup.string().required("Password is required"),
    ac_type:yup.string().oneOf(["saving","current"],"Account Should a valid Saving or current  Account").required("Account Type is Required")
  })

  const onSubmitHandler= async(values,helpers)=>{
 
    try {
        setLoading(true)
      
      const response = await axiosClient.post('/auth/register',values)
      const data = await response.data 

    //   console.log(data);

    toast.success(data.msg)

    // token
    localStorage.setItem("token",data.token)
    fetchUserProfile()
    router.push("/")



      helpers.resetForm()
    } catch (error) { 
      toast.error(error.response.data.msg || error.message)
      
    }finally{
        setLoading(false)
    }
  }

  return (
    <>
          <div className="min-h-[80vh] flex items-center justify-center bg-red-300">
       
                    <div className=" w-full xl:w-[60%] flex items-start border">
                        <div className="hidden lg:block bg-amber-950">
                            <img src="/orion2.jpg" className='h-full w-full object-cover' alt="" />
                        </div>
                        <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
          >
          <Form  className=" w-full lg:w-1/2 px-10 py-10 ">

<div className="mb-3">
  <Field type="text"  name='name' className="w-full py-3 px-3 rounded border outline-none" placeholder="Enter Your Name" />
  <ErrorMessage name='name' className='text-amber-950' component={'p'} />

</div>
<div className="mb-3">
<Field type="text" name='email'  className="w-full py-3 px-3 rounded border outline-none"  placeholder="Enter Your Email"/>
<ErrorMessage name='email' className='text-amber-950' component={'p'} />

</div>
<div className="mb-3">
<Field type="text" name='password'  className="w-full py-3 px-3 rounded border outline-none" placeholder="Enter Your Password" />
<ErrorMessage name='password' className='text-amber-950' component={'p'} />

</div>
<div className="mb-3">
<Field as="select" name="ac_type"  className="w-full py-3 px-3 rounded border outline-none"  id="">
<option value="" >Select Account Type</option>
<option value="saving">Saving</option> 
<option value="current">Current </option> 
</Field>
<ErrorMessage name='ac_type' className='text-amber-950' component={'p'} />

</div>
<div className="mb-3">
        <CustomAuthButton isLoading={loading} text={'Register'} type='submit' />
</div>
<div className="mb-3">
<p className='text-end font-medium'>Already Have An Account ? <Link href={'/login'} className='text-blue-500 '>Login</Link> </p>
</div>
</Form>
          </Formik>
                    </div>

          </div>

          <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-400 to-red-200 text-white text-center p-4 overflow-hidden">
  
  
  <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fadeIn">
    Welcome to Orion Bank
  </h1>
  <p className="text-lg md:text-xl font-medium drop-shadow-md animate-fadeIn delay-200">
    Where Your Wealth Shines!
  </p>

 
  <div className="mt-10 max-w-2xl text-left bg-red-400 bg-opacity-20 backdrop-blur-md rounded-xl p-6 space-y-3 animate-slideUp">
    <p className="font-semibold text-red-700">🔒 General Security Reminder:</p>
    <ul className="list-disc list-inside text-sm text-white">
      <li>For your safety, never share your password or OTP with anyone.</li>
      <li>Orion Bank will never ask for your personal details over phone or email.</li>
    </ul>

    <p className="font-semibold text-red-700 mt-4">⚠️ Login Warning / Caution:</p>
    <ul className="list-disc list-inside text-sm text-white">
      <li>Please verify you are on the official Orion Bank app before logging in.</li>
      <li>Multiple failed login attempts may temporarily lock your account.</li>
      <li>Ensure you are using a secure internet connection to access your account.</li>
    </ul>

    <p className="font-semibold text-red-700 mt-4">🔑 Password / OTP Guidance:</p>
    <ul className="list-disc list-inside text-sm text-white">
      <li>Passwords are case-sensitive. Please enter carefully.</li>
      <li>Your OTP is valid for 5 minutes only. Do not share it with anyone.</li>
    </ul>

    <p className="font-semibold  text-red-700 mt-4">💻 Device/Session Reminder:</p>
    <ul className="list-disc list-inside text-sm text-white">
      <li>Do not use public devices to access your account.</li>
      <li>Always log out after using Orion Bank on shared devices.</li>
    </ul>

    <p className="font-semibold  text-red-700 mt-4">⚖️ Legal / Disclaimer:</p>
    <ul className="list-disc list-inside text-sm text-white">
      <li>Unauthorized access to this application is strictly prohibited and may be punishable by law.</li>
    </ul>
  </div>

  
  <footer className="w-full text-center py-4 text-white text-sm mt-auto animate-fadeIn delay-500">
    &copy; 2025 Aditya Dubey. All rights reserved.
  </footer>

</div>
    </>
  )
}

export default RegisterPage
