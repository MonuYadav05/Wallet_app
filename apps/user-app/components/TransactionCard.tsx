"use client"

import { useSession } from "next-auth/react"

type Transaction={
    id:number
    amount:number,
    toUserId:number,
    fromUserId:number,
    timestamp:Date,
}[]

export default function TransactionDetail({transactions , userId}:{
    transactions:Transaction,
    userId:number,
}){
   
    
    return (
        <div className="m-3">
           <div className="pt-2 ">
        {transactions.map(t => <div key={t.id} className="flex my-4 justify-between">
            <div>
                <div className="text-sm flex">
                {(t.fromUserId == userId) ? <p>Send INR</p> : <p>Received INR </p>}  
                </div>
                <div className="text-slate-600 text-xs">
                    {t.timestamp.toDateString()}
                    {(new Date(t.timestamp).toLocaleString()).slice(9)}

                </div>
            </div>
            <div className="flex gap-1 justify-center">
            {(t.fromUserId == userId) ? <p>-</p> : <p>+ {" "}</p>} Rs {t.amount / 100}
            </div>

        </div>)}
    </div>
        </div>
    )
}   