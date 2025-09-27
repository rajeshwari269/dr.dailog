"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Lock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export type DoctorAgent = {
  id: number;
  specialist: string;
  name: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired?: boolean;
};

type Props = {
  doctorAgent: DoctorAgent;
};

const DoctorCard = ({ doctorAgent }: Props) => {
  const { has } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const paidUser = has ? has({ plan: "pro" }) : false;

  const requiresSubscription = doctorAgent.subscriptionRequired;
  const isLocked = requiresSubscription && !paidUser;

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        symptoms: "New Symptom",
        selectedDoctor: doctorAgent,
      });

      if (result.data?.sessionId) {
        router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
      }
    } catch (error) {
      console.error("Failed to start consultation:", error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {requiresSubscription && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
          PREMIUM
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 space-y-4">
        <span className="inline-block px-3 py-1 text-sm font-bold text-emerald-300 bg-black/30 backdrop-blur-lg  rounded-full border border-emerald-400/30">
          {doctorAgent.specialist}
        </span>

        <h3 className="text-2xl font-bold tracking-tight drop-shadow-lg">
          {doctorAgent.name}
        </h3>

        <p className="text-sm text-gray-200 line-clamp-2">
          {doctorAgent.description}
        </p>

        <div className="pt-2">
          <button
            onClick={onStartConsultation}
            disabled={isLocked || loading}
            className={`w-full py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              isLocked
                ? "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Consulting
              </>
            ) : isLocked ? (
              <>
                <Lock className="h-5 w-5" />
                Upgrade to Consult
              </>
            ) : (
              <>
                <MessageCircle className="h-5 w-5" />
                Consult Now
              </>
            )}
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

export default DoctorCard;
