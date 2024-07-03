"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useAppStore from '@/lib/useStore';
import axios from 'axios';

export default function Payment() {
    const { transactionId, remainingBalance, merchantId, merchantName, setTransactionId, transactionAmount } = useAppStore()
    const router = useRouter();

    const [amount, setAmount] = useState('');

    const makePaymentReq = () => {
        axios.post('http://server.nepatronix.com:5001/request_payment', {
            merchantId: merchantId,
            transactionAmount: transactionAmount,
            merchantName: merchantName
        })
            .then(function (response) {
                const { _transactionId } = response.data
                setTransactionId(_transactionId)
            })
            .catch(function (error) {
                console.log(error);
            });
        router.push("payment/confirm")
    };

    const handleBackspace = () => {
        setAmount((prev) => prev.slice(0, -1));
    };

    return (
        <div className="bg-black h-dvh flex flex-col text-white">
            {/* Header */}
            <header className="bg-green-500 p-4 flex items-center justify-between">
                <button className="text-white" onClick={() => router.back()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <h1 className="text-lg">Send Money</h1>
                <div></div>
            </header>

            {/* Balance */}
            <div className="p-4 bg-black flex items-center justify-between">
                <div>
                    <p className="text-gray-400">Balance</p>
                    <p className="text-2xl font-semibold">Rs. {remainingBalance}</p>
                </div>

            </div>

            {/* Recipient Info */}
            <div className="p-4 bg-black flex items-center justify-between">
                <div>
                    <p className="text-xl font-semibold">{merchantName}</p>
                    <p className="text-gray-400">meropay ID - {merchantId}</p>
                </div>
            </div>

            {/* Send Amount */}
            <div className="p-4 bg-gray-800 flex items-center justify-between">
                <p className="text-xl">Send Amount</p>
                <p className="text-2xl font-semibold">Rs. {transactionAmount}</p>
            </div>

            {/* Keypad */}
            <div className="flex flex-col flex-1 bg-gray-900 p-4 justify-end">
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((key) => (
                        <button
                            key={key}
                            className="bg-gray-700 p-4 rounded text-xl"
                        >
                            {key}
                        </button>
                    ))}
                    <button
                        className="bg-gray-700 p-4 rounded text-xl"
                        onClick={handleBackspace}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Continue Button */}
            <div className="p-4 bg-gray-900">
                <button className="bg-green-500 w-full p-4 rounded text-lg font-semibold" onClick={makePaymentReq}>
                    Continue
                </button>
            </div>
        </div>
    );
};
