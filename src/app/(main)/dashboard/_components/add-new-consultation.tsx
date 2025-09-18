"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope, Loader2 } from "lucide-react";
import { useState } from "react";
import { DoctorAgent } from "./doctor-card";
import SuggestedDoctors from "./suggested-doctors"; 
import axios from "axios";
import { useRouter } from "next/navigation";

const AddNewConsultation = () => {
    const [symptoms, setSymptoms] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [suggestedDoctor, setSuggestedDoctor] = useState<DoctorAgent | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent | null>(null);

    const router = useRouter();

    const onClickNext = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/suggest-doctors", {
                symptoms: symptoms,
            });

            setSuggestedDoctor(result.data); 
        } catch (error) {
            console.error("Failed to fetch doctor:", error);
        }
        setLoading(false);
    };

    const onStartConsultation = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/session-chat", {
                symptoms,
                selectedDoctor,
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
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer group px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5" />
                        <span>Consult a Doctor</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl w-full backdrop-blur-xl bg-zinc-900/70 border border-emerald-700/30 shadow-2xl rounded-2xl p-8">
                    <DialogHeader>
                        <DialogTitle className="text-white text-2xl font-bold">
                            Begin Your AI Consultation
                        </DialogTitle>
                        <DialogDescription asChild>
                            <form className="space-y-6 mt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white text-sm">Full Name</Label>
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        id="name"
                                        placeholder="Enter your full name"
                                        className="bg-transparent text-white border border-white/30 placeholder:text-gray-400 focus:ring-emerald-400 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="symptoms" className="text-white text-sm">Symptoms</Label>
                                    <Textarea
                                        id="symptoms"
                                        onChange={(e) => setSymptoms(e.target.value)}
                                        placeholder="Describe any symptoms you're experiencing..."
                                        className="bg-transparent text-white border border-white/30 placeholder:text-gray-400 focus:ring-emerald-400 rounded-lg"
                                        rows={5}
                                    />
                                </div>

                                {!suggestedDoctor ? (
                                    <div className="flex justify-end gap-4 pt-4">
                                        <DialogClose className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-semibold rounded-lg shadow-md cursor-pointer transition-all duration-300">
                                            Cancel
                                        </DialogClose>
                                        <Button
                                            onClick={onClickNext}
                                            disabled={loading || !symptoms || !name}
                                            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <Loader2 className="animate-spin w-5 h-5" />
                                            ) : (
                                                "Next"
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="pt-6">
                                            <h2 className="text-white font-semibold mb-3">Select the doctor</h2>
                                            <div className="flex gap-4 overflow-x-auto">
                                                <SuggestedDoctors
                                                    doctorAgent={suggestedDoctor}
                                                    setSelectedDoctor={setSelectedDoctor}
                                                    selectedDoctor={selectedDoctor}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-6">
                                            <DialogClose className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-semibold rounded-lg shadow-md cursor-pointer transition-all duration-300">
                                                Cancel
                                            </DialogClose>
                                            <Button
                                                onClick={onStartConsultation}
                                                disabled={!selectedDoctor || loading}
                                                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <Loader2 className="animate-spin w-5 h-5" />
                                                ) : (
                                                    "Start Consultation"
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewConsultation;
