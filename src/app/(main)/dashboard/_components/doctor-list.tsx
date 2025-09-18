import { AIDoctorAgents } from "../../../../../shared/list";
import DoctorCard from "./doctor-card";

const DoctorList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-4">
          AI Specialist Doctors
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Our AI doctors are available 24/7 to provide expert medical advice
          tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AIDoctorAgents.map((doctor) => (
          <DoctorCard key={doctor.id} doctorAgent={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
