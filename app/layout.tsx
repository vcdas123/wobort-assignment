import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wobort.ai",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter?.variable}>
        <ReduxProvider>
          <ToastContainer />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
