import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md rounded-2xl shadow-lg bg-[#0d1f1a] border border-green-600 p-6">
        <button className="absolute top-3 right-4 text-green-400 hover:text-green-200 text-xl font-bold">
          ✕
        </button>
        <h2 className="text-center text-2xl font-semibold text-green-400 mb-4">
          Welcome Back
        </h2>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-green-500 hover:bg-green-600 text-white",
              card: "bg-[#0d1f1a] border border-green-600 shadow-md rounded-xl",
              headerTitle: "text-green-400",
              headerSubtitle: "text-green-300",
              formFieldLabel: "text-green-300",
              formFieldInput:
                "bg-[#142d25] text-green-200 border-green-600 placeholder:text-green-500",
              footerActionText: "text-green-300",
              footerActionLink: "text-green-400 hover:text-green-300 underline",
            },
          }}
        />
      </div>
    </div>
  );
}
