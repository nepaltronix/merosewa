"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import QrScanner from "@/components/ui/QrScanner";

export default function Home(){

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/payment'); // Replace '/target' with the path of the page you want to navigate to
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [router]);

  return (
      <div className="bg-black h-screen flex flex-col">
        {/* Header */}
        <header className="bg-green-500 text-white p-4 flex justify-center">
          <h1 className="text-lg">Scan To Pay</h1>
          <div></div>
        </header>

        {/* Scan Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="fonepayQR.png"
              alt="Nepal Pay"
              className="h-10"
            />
          </div>
          <p className="mb-4">Scan to Pay</p>
          <div className="border-4 border-green-500 w-48 h-48"></div>
        </div>
      </div>
      );
};
