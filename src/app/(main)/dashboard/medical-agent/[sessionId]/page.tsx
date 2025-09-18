"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DoctorAgent } from "../../_components/doctor-card";
import {
  AlertCircle,
  Circle,
  Mic,
  User,
  PhoneCall,
  PhoneOff,
} from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type SessionDetail = {
  id: number;
  symptoms: string;
  sessionId: number;
  report: JSON;
  selectedDoctor: DoctorAgent;
  createdOn: string;
};

type Messages = {
  role: string;
  text: string;
  timestamp: Date;
};

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    sessionId && getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    try {
      const result = await axios.get(
        `/api/session-chat?sessionId=${sessionId}`
      );
      setSessionDetail(result.data);
    } catch (err) {
      setError("Failed to load session details");
      console.error(err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const StartCall = () => {
    if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
      setError("VAPI API key is missing");
      toast.error("Configuration error - please contact support");
      return;
    }

    setIsLoading(true);
    setError(null);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        console.log(`${message.role}: ${message.transcript}`);
      }
    });
  };

  const EndCall = async () => {
    setIsLoading(true);
    try {
      if (vapiInstance) {
        await vapiInstance.stop();
        toast.success("Call ended successfully!");
      }
    } catch (err) {
      console.error("Error ending call:", err);
      setError("Failed to end call properly");
    } finally {
      setCallStarted(false);
      setVapiInstance(null);
      setIsLoading(false);
    }
  };

  const detail = sessionDetail?.selectedDoctor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-lg text-white p-4 md:p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800/50 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-red-300">{error}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8 md:mb-12">
        <div
          className={`flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm transition-all ${
            callStarted
              ? "bg-emerald-900/20 border-emerald-500/50 text-emerald-300"
              : "bg-zinc-800/50 border-zinc-700 text-zinc-400"
          }`}
        >
          <div className="relative">
            <Circle
              className={`h-3 w-3 ${
                callStarted ? "fill-emerald-500 animate-pulse" : "fill-red-500"
              }`}
            />
            {callStarted && (
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
            )}
          </div>
          <span className="font-medium text-lg">
            {callStarted ? "Active Session" : "Ready to Connect"}
          </span>
        </div>

        <div
          className={`text-3xl font-bold ${
            callStarted ? "text-emerald-400" : "text-zinc-500"
          }`}
        >
          {formatTime(callDuration)}
        </div>
      </div>

      {sessionDetail && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-8 group">
            <div
              className={`absolute -inset-2 rounded-full blur-lg transition-all `}
            ></div>
            <Image
              className="relative z-10 h-36 w-36 md:h-44 md:w-44 object-cover rounded-full border-4 border-emerald-500/70 shadow-xl transition-transform duration-300 group-hover:scale-105"
              src={detail?.image || "/default-image.png"}
              alt={detail?.name || "Default Name"}
              width={176}
              height={176}
              priority
            />
          </div>

          <div className="text-center space-y-3 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              {detail?.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              {detail?.specialist}
            </h2>
            <div className="mt-4">
              <div className="inline-flex flex-col items-center gap-2 px-6 py-3 bg-emerald-900/20 text-emerald-200 rounded-xl border border-emerald-800/50 backdrop-blur-sm shadow-lg">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  Dr.Dialog
                </span>
                <div className="w-full h-px bg-emerald-800/50 my-1"></div>
                <p className="text-center text-lg font-medium text-white">
                  Click below to begin
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl bg-zinc-900/50 rounded-xl border border-zinc-800/70 overflow-hidden shadow-xl mb-8">
            <div className="h-64 md:h-80 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3 justify-start">
                <div className="max-w-[80%] rounded-2xl p-4 bg-emerald-900/30 border border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-6 w-6 rounded-full bg-emerald-800/50 flex items-center justify-center">
                      <Mic className="h-3 w-3 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      10:15
                    </span>
                  </div>
                  <p className="text-white">Hello, how can I help you today?</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="max-w-[80%] rounded-2xl p-4 bg-blue-900/30 border border-blue-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-6 w-6 rounded-full bg-blue-800/50 flex items-center justify-center">
                      <User className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      10:16
                    </span>
                  </div>
                  <p className="text-white">
                    I’d like to start a consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            {!callStarted ? (
              <Button
                onClick={StartCall}
                disabled={isLoading}
                className="px-10 py-7 cursor-pointer text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl hover:shadow-emerald-500/40"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  <>
                    <PhoneCall className="mr-3 h-6 w-6" />
                    Start Consultation
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={EndCall}
                className="px-10 py-7 cursor-pointer text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all shadow-xl hover:shadow-red-500/40"
              >
                <PhoneOff className="mr-3 h-6 w-6" />
                End Consultation
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalVoiceAgent;
