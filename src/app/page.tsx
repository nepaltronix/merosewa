"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";

export default function Home() {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [scanResult, setScanResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode("qr-reader");

    const startScanning = () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText: string, decodedResult: Html5QrcodeResult) => {
              setScanResult(decodedText);
              console.log(decodedResult);
              router.push("/payment");
            },
            (errorMessage: string) => {
              console.error("Error scanning:", errorMessage);
            }
          )
          .catch((err) => {
            console.error("Error starting scanner:", err);
          });
      }
    };

    if(isScanning){startScanning()};

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            html5QrCodeRef.current?.clear();
          })
          .catch((err) => console.error("Failed to clear html5QrCode.", err));
      }
    };
  }, [router]);

  return (
    <div className="bg-black h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-500 text-white p-4 flex justify-center">
        <h1 className="text-lg">Scan To Pay</h1>
      </header>

      {/* Scan Area */}
      <div className="flex-1 flex items-center justify-center text-white">
        <div id="qr-reader" className="w-full h-full"></div>
        <p id="scan-result" className="mt-4 text-lg">{scanResult}</p>
      </div>
    </div>
  );
}
