"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import AddNewConsultation from "./add-new-consultation";
import axios from "axios";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    getHistoryList();
  },[]);

  const getHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    console.log(result.data);
    setHistoryList(result.data);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      {historyList?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center gap-8 p-8"
        >
          <div className="relative w-64 h-64">
            <Image
              src={"/medical.png"}
              alt="No appointments yet"
              fill
              className="object-contain hover:scale-105 transition-all rounded-2xl drop-shadow-[0_10px_20px_rgba(74,222,128,0.3)]"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              No Appointments Yet
            </h3>
            <p className="text-neutral-300 max-w-md">
              You haven't booked any consultations yet. Start your healthcare
              journey by scheduling your first appointment with our specialists.
            </p>
          </div>

          <AddNewConsultation />
        </motion.div>
      ) : (
        <div className="w-full">
          <div className="text-white">Appointment List</div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
