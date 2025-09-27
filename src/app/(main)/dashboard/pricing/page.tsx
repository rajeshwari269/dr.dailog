import { PricingTable } from "@clerk/nextjs";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
        Join Our Subscription
      </h2>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <PricingTable />
      </div>
      <p className="text-sm text-white/80 mt-6 text-center max-w-md">
        Get access to premium features and unlock the full potential of our platform. 
        Flexible plans tailored for individuals and teams.
      </p>
    </div>
  );
};

export default Pricing;
