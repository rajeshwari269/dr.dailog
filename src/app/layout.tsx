import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./provider";
import { Toaster } from "sonner";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500", "400", "700"],
});

export const metadata: Metadata = {
  title: "Dr. Dialog",
  description: "An AI-powered doctor for your health",
  icons: {
    icon: "/st.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning={true}
          className={`${quickSand.className}`}
        >
          <Provider>{children}</Provider>
          <Toaster
            position="top-right"
            expand={true}
            toastOptions={{
              style: {
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                borderRadius: "16px",
                color: "white",
                fontWeight: 500,
              },
              className: "shadow-lg",
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
