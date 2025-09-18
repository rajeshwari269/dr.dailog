import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./provider";

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
        </body>
      </html>
    </ClerkProvider>
  );
}
