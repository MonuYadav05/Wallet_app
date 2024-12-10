
import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth"

import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import TransactionDetail from "../../../components/TransactionCard";
import { redirect } from "next/navigation";

async function getTransaction() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin'); // Redirect to the signin page
}
  const userid = session?.user?.id;
  // console.log('User ID:', userid); 
  const transactions = await prisma.p2pTransfer.findMany({
    where:{
      OR:[
       { fromUserId:Number(userid)}, 
      {toUserId:Number(userid)}
      ]
    },
    select:{
      id:true,
      amount:true,
      toUserId:true,
      fromUserId:true,
      timestamp:true,
    }
  })
  
  return transactions;
}

export default async function Transaction(){
  const transactions = await getTransaction();
  const session = await getServerSession(authOptions);
  const userid = session?.user?.id || null;

  if(!transactions.length)
    return (
        <div className="m-8 p-6">

            <Card title="Transactions">
            <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
            </Card>
        </div>
    )
    
    return (
        <div className="md:m-8 m-2 md:p-6 p-3 ">
            <Card title="Transactions">
           <TransactionDetail  transactions={transactions} userId={userid} />
            </Card>
        </div>
    )
  }