import Image from "next/image";
import { motion } from "framer-motion";

export type DoctorAgent = {
  id: number;
  specialist: string;
  name: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired?: boolean;
};

type Props = {
  doctorAgent: DoctorAgent;
};

const DoctorCard = ({ doctorAgent }: Props) => {
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

      {doctorAgent.subscriptionRequired && (
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
            className={`w-full py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              doctorAgent.subscriptionRequired
                ? "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
            }`}
            disabled={doctorAgent.subscriptionRequired}
          >
            {doctorAgent.subscriptionRequired ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Upgrade to Consult
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
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
