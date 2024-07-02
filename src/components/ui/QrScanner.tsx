"use client"

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";

const QrScanner: React.FC = () => {
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string>("");

    useEffect(() => {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");

        return () => {
            if (html5QrCodeRef.current && isScanning) {
                html5QrCodeRef.current.stop().then(() => {
                    html5QrCodeRef.current?.clear();
                }).catch(err => console.error("Failed to clear html5QrCode.", err));
            }
        };
        
    }, []);

    const startScanning = () => {
        if (html5QrCodeRef.current && !isScanning) {
            html5QrCodeRef.current.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 250
                },
                (decodedText: string, decodedResult: Html5QrcodeResult) => {
                    setScanResult(decodedText);
                    console.log(decodedResult);
                },
                (errorMessage: string) => {
                    console.error("Error scanning:", errorMessage);
                }
            ).then(() => {
                setIsScanning(true);
            }).catch(err => {
                console.error("Error starting scanner:", err);
            });
        }
    };

    const stopScanning = () => {
        if (html5QrCodeRef.current && isScanning) {
            html5QrCodeRef.current.stop().then(() => {
                setIsScanning(false);
            }).catch(err => {
                console.error("Error stopping scanner:", err);
            });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <div id="qr-reader" style={{ width: 500, height: 400, marginBottom: 20, backgroundColor: '#000' }}></div>
            <button onClick={startScanning} style={{ margin: 5, padding: '10px 20px', fontSize: 16 }} disabled={isScanning}>Start Scanning</button>
            <button onClick={stopScanning} style={{ margin: 5, padding: '10px 20px', fontSize: 16 }} disabled={!isScanning}>Stop Scanning</button>
            <p id="scan-result" style={{ marginTop: 20, fontSize: 18 }}>{scanResult}</p>
            <form style={{ marginTop: 20 }}>
                <label>
                    Scanned Result:
                    <input type="text" value={scanResult} readOnly style={{ marginLeft: 10, padding: '5px', fontSize: 16 }} />
                </label>
            </form>
        </div>
    );
};

export default QrScanner;