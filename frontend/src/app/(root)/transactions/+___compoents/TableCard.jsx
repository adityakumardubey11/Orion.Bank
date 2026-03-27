import React from 'react'
import moment from 'moment'
import { txn_type } from '@/utils/constant'
const TableCard = ({id,data:Datas}) => {

        const data = Datas.type=='credit'?txn_type.credit : Datas.type=='debit' ?txn_type.debit:txn_type.fix_deposit

  return (
    <>
        <tr className={` border-b bg-black border-violet-500 `}>
        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
          {Datas._id}  
        </th>
        <td className="px-6 py-4">
       <span title={data.desc} className={` px-5 py-1 border rounded ${data['bg-color']} ${data.color}`}>{Datas.type}</span>
        </td>
        <td className="px-6 py-4  ">
            {Datas.amount}
</td>
        <td className="px-6 py-4  ">
          {moment(Datas.createdAt).format('LL')}
        </td>
        <td className={`px-6 py-4 hidden lg:block ${Datas.isSuccess?'bg-green-700  border-green-400 text-white ':'bg-red-700  border-red-500 text-white '}`}>
          {Datas.remark}
        </td>
      </tr>
    </>
  )
}

export default TableCard

