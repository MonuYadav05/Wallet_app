"use client"
import { Card } from "@repo/ui/card"
import { motion } from "framer-motion"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return  <motion.div
        initial={{ y: -80, opacity: 0.3 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          type: 'spring',
          damping: 10,}}> 
            <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
        </motion.div>
    }
    return  <motion.div
    initial={{ y: -80, opacity: 0.3 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: 'easeInOut',
      type: 'spring',
      damping: 10,}}>
         <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t:any ) => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
      </motion.div>
   
}
