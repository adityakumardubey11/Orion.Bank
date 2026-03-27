"use client";
import React, { useState } from 'react'
import './Card.css'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseCardModel from './UseCard';
const ViewATMCard = () => {

  const {atm,user} = useMainContext()
  const [isSHow,setISShow] = useState(false)

  if(!atm || !atm.card_no){
    return <>
          <div className=" w-[96%] rounded py-10 px-10 lg:w-1/2  shadow text-xl">
             <img src="/ATM.png" className='w-full h-full'  alt="no ATM" />
          </div>
    </>
  }

  const circl1 = atm.card_type ==="basic"? "bg-teal-600": atm.card_type ==="classic"?"bg-indigo-600":"bg-rose-600"
  const circl2 = atm.card_type ==="basic"? "bg-amber-600": atm.card_type ==="classic"?"bg-rose-600":"bg-indigo-600"

  return (
        <>
<div className='flex flex-col'>
  <h1 className='text-white'> Copied from GeeksforGeeks</h1>
 
 <div
  className={`credit-card ${atm.card_type === "basic" ? "basic" : atm.card_type === "classic" ? "classic" : "premium"}`}
>
  <div className={`circle1 ${circl1}`} />
  <div className={`circle2 ${circl2}`} />

  <div className="head">
    <div className="chip"></div>
    <div className="brand-logo">Orion {atm.card_type} Card
    </div>
  </div>

  <div className="number">
    {atm.card_no.match(/.{1,4}/g).join(" ")}
  </div>

  <div className="tail">
    <div className="capitalize">{user.name}</div>
    <div className="flex items-center justify-center gap-x-2">
      <span>CVV: {isSHow ? atm.cvv : "".padStart(3, "x")}</span>
      <button
        onClick={() => setISShow(!isSHow)}
        className="text-xl text-white cursor-pointer"
      >
        {isSHow ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    <div className="exp">
      Exp:{" "}
      <span className="exp-date">
        {new Date(atm.expiry).getMonth() + 1}/
        {new Date(atm.expiry).getUTCFullYear().toString().slice(-2)}
      </span>
    </div>
  </div>
</div>


</div>

    

    </>
  )
}

export default ViewATMCard

/**
 * account
: 
"680b6bdd386bd07fb5901f82"
card_no
: 
"2759611527357498"
card_type
: 
"classic"
createdAt
: 
"2025-05-03T11:33:26.146Z"
cvv
: 
289
date
: 
"2025-05-03T11:33:26.143Z"
expiry
: 
"2025-08-03T11:33:26.141Z"
updatedAt
: 
"2025-05-03T11:33:26.146Z"
user
: 
"67f9e9d30279b55f3b94d700"
__v
: 
0
_id
: 
"6815ff06b829182eaa9cbf58"
 */