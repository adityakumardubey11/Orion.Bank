"use client";
import Loader from '@/components/Loader';
import { useMainContext } from '@/context/MainContext';
import { setIsToggle, SidebarSlicePath } from '@/redux/slice/sidebarSlice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {MdDashboard} from 'react-icons/md'
import { GiBank, GiFalloutShelter } from 'react-icons/gi';
import { GrCurrency } from "react-icons/gr";
import { PiNewspaperClipping } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoCardSharp } from "react-icons/io5";
import { FaCreditCard, FaHistory, FaMoneyBillAlt, FaPiggyBank } from 'react-icons/fa';

const RootTemplate = ({children}) => {

  const {user} = useMainContext()
  const [loading,setLoading] = useState(true)

const router = useRouter()
const isToggle = useSelector(SidebarSlicePath)
const dispatch = useDispatch()
  
useEffect(()=>{
  if(!user){
    router.push("/login")
   
  }else{
    setLoading(false)
  }
},[user])

if(loading){
  return <div className='min-h-screen flex items-center justify-center'>
    <Loader/>
  </div>
}

const CustomMenu = ({link,text,Icon})=>{
  const pathname= usePathname()
  return <>
  <MenuItem
  style={{
    background:pathname === link?'#02072b':'#ffff',
    color:pathname === link?'white':'black',
    borderRadius:pathname === link?"10px":'0px'
  }}
  icon={<Icon className="text-2xl" />}
  component={<Link href={link} />}> {text} </MenuItem>
  </>
}

  return (
    <>  
        <section className="flex item-start sticky">

<Sidebar breakPoint="lg" toggled={isToggle} onBackdropClick={() => dispatch(setIsToggle())}>
  <Menu className="!bg-white !min-h-screen lg:!min-h-[90vh] px-3 py-10 flex flex-col justify-between">

    {/* --- Top Menu Items --- */}
    <div>
      <CustomMenu link="/" text="Home" Icon={MdDashboard} />
      <CustomMenu link="/amount" text="Account" Icon={FaMoneyBillAlt} />
      <CustomMenu link="/fd-amount" text="Fix Deposit" Icon={FaPiggyBank} />
      <CustomMenu link="/transactions" text="Transactions" Icon={FaHistory} />
      <CustomMenu link="/atm-cards" text="ATM Cards" Icon={FaCreditCard} />
      <CustomMenu link="/profile" text="Bank Profile" Icon={GiBank} />
    </div>

    {/* --- Footer Section --- */}
    <div className="mt-8 mb-2">
      <div className="bg-[#001f3f] text-white rounded-2xl px-4 py-5 flex flex-col items-center text-center shadow-md">
        <img src="/logo.png" alt="Orion Bank Logo" className="w-20 h-15 mb-3  bg-[#001f3f] p-1" />
        <h3 className="text-lg font-semibold">Orion Bank</h3>
        <p className="text-xs opacity-80 mt-1">© 2025 Orion Bank. All Rights Reserved.</p>
        <p className="text-[11px] mt-2 font-light italic opacity-90">
          Designed & Developed By <br /> <span className="font-medium">Aditya Kumar Dubey</span>
        </p>
      </div>
    </div>

  </Menu>
</Sidebar>


<main className='px-1 md:px-3 w-full'>
     {children}
  </main>
        </section>
    </>
  )
}

export default RootTemplate
