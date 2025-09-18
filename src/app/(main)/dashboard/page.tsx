"use client";

import { Button } from "@/components/ui/button";
import HistoryList from "./_components/history-list";
import { motion } from "framer-motion";
import DoctorList from "./_components/doctor-list";
import AddNewConsultation from "./_components/add-new-consultation";

const Dashboard = () => {
  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            My Appointments
          </h2>
          <p className="text-md text-neutral-300">
            Review your consultation history and schedule new appointments
          </p>
        </div>

        <AddNewConsultation />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HistoryList />

        <DoctorList />
      </motion.div>
    </div>
  );
};

export default Dashboard;
