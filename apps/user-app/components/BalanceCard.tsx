"use client"
import { Card } from "@repo/ui/card";
import { motion } from "framer-motion";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <motion.div
    initial={{ y: -80, opacity: 0.3 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: 'easeInOut',
      type: 'spring',
      damping: 10,}}>  
      <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
          <div>
              Unlocked balance
          </div>
          <div>
              {amount / 100} INR
          </div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
          <div>
              Total Locked Balance
          </div>
          <div>
              {locked / 100} INR
          </div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
          <div>
              Total Balance
          </div>
          <div>
              {(locked + amount) / 100} INR
          </div>
      </div>
  </Card> 
  </motion.div>
}