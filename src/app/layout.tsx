import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500", "400", "700"],
});

export const metadata: Metadata = {
  title: "Dr. Dialog",
  description: "An AI-powered doctor for your health",
  icons:{
    icon:"/st.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${quickSand.className}`}
      >
        {children}
      </body>
    </html>
  );
}
