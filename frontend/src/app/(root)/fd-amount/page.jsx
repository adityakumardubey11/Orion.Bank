"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useEffect, useState } from 'react'
import AddNewFdModel from './+___compoents/AddNewFdModel'
import FDCard from './+___compoents/FDCard'
import { axiosClient } from '@/utils/AxiosClient'
import CustomLoader from '@/components/reuseable/CustomLoader'
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { FaHeadset, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

const FDPage = () => {
  const[deposits,setDeposists] = useState([])

  const [loading,setLoading] = useState(true)
  const [isUpdate,setIsUpdate] = useState(false)

  const fetchAllDeposits = async()=>{
    
    try {
      setLoading(true)
      const response = await axiosClient.get('/fd/get-all',{
        headers:{
          'Authorization':'Bearer '+localStorage.getItem("token")
        }
      })

      const data =await response.data 
      setDeposists(data)

    } catch (error) {
      toast.error(error.data.response.msg || error.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchAllDeposits()
  },[isUpdate])
  if(loading){
    return <div className="w-full min-h-screen flex justify-center items-center">
      <CustomLoader/>
      </div>
  }

  return (
    <>
            <div className="container py-10">
            <HeaderName/>

            <div className="py-10 grid grid-cols-1  items-start gap-x-4 gap-y-3 lg:grid-cols-2 xl:grid-cols-3">

            <AddNewFdModel isUpdate={isUpdate} setIsUpdate={setIsUpdate} />   
            <Suspense fallback={<CustomLoader/>}>
            {
                 deposits.length>0&&           deposits.map((cur,i)=>{
                                return <FDCard  isUpdate={isUpdate} setIsUpdate={setIsUpdate} key={i} data={cur} />
                            })
                        }  
            </Suspense>

            </div>
            </div>

            <motion.footer 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 1.5 }} 
      className="mt-16 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white p-8 rounded-t-3xl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

        {/* Left Section - Logo & Info */}
        <div className="flex flex-col sm:items-start text-center sm:text-left">
          <Image
            src="/logo1.png" 
            alt="Orion Bank Logo" 
            width={150} 
            height={150} 
            className="object-contain mb-2"
          />
          <h3 className="text-lg font-semibold text-indigo-400">Orion Bank</h3>
          <p className="text-sm text-gray-300">© 2025 Orion Bank. All Rights Reserved.</p>
          <p className="text-xs text-gray-400 mt-1">
            Designed & Developed By <span className="font-semibold text-indigo-400">Aditya Kumar Dubey</span>
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="#about" className="hover:text-blue-400 transition">About Us</a>
          <a href="#services" className="hover:text-blue-400 transition">Services</a>
          <a href="#careers" className="hover:text-blue-400 transition">Careers</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Right Section - Social + Support */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3 text-lg">
            <a href="#" className="hover:text-blue-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }} 
            transition={{ type: 'spring', stiffness: 150 }}
            className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-2xl shadow-lg text-sm"
          >
            <FaHeadset /> 24/7 Chat Support
          </motion.button>
        </div>
      </div>
    </motion.footer>
   
   </>
  )
}

export default FDPage

