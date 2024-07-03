"use client"

import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation";
import useAppStore from '@/lib/useStore';
import axios from "axios";

export default function Confirm() {
    const router = useRouter();
    const { transactionAmount, updateRemainingBalance, transactionId, merchantId, merchantName } = useAppStore();
    const [value, setValue] = useState("")

    const handleButtonClick = function (event: React.MouseEvent<HTMLButtonElement>) {
        const value = event.currentTarget.textContent;
        if (value) {
            setValue((prevInput) => prevInput + value);
        }
    }

    const verifyPinAndConfirm = function () {
        if (value == '123456') {
            axios.post('https://server.nepatronix.com/confirm_payment', {
                transactionId: transactionId,
            })
                .then(function (response) {
                    console.log(response.data)
                    window.alert('Transaction Completed.')
                    axios.get('https://utsav.app.n8n.cloud/webhook/655c0bbc-ff5c-4315-b8dc-e6b2abc5f2fd')
                    updateRemainingBalance();
                    router.push("/")
                })
                .catch(function (error) {
                    window.alert('Transaction Failed.')
                    console.log(error);
                });

        } else {
            window.alert("Incorrect Pin")
            setValue('')
        }
    }

    const handleOnBackClick = function () {
        router.back();
    }

    const handleBackSpace = function () {
        setValue((prev) => prev.slice(0, -1));
    }

    return (
        <div className="bg-black h-dvh flex flex-col text-white">
            {/* Header */}
            <header className="bg-green-500 p-4 flex items-center justify-between">
                <button className="text-white" onClick={handleOnBackClick}>
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
                    <p className="text-gray-400">NPR</p>
                    <p className="text-2xl font-semibold">{transactionAmount}</p>
                </div>
            </div>

            {/* Recipient Info */}
            <div className="p-4 bg-black flex items-center justify-between">
                <div>
                    <p className="text-xl font-semibold">{merchantId}</p>
                    <p className="text-gray-400">meropay ID - {merchantName}</p>
                </div>
            </div>

            {/* Send Amount */}
            <div className="p-4 bg-gray-800 flex items-center justify-between">
                <p className="text-xl">PIN</p>
                <div className="space-y-2">
                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>

            {/* Keypad */}
            <div className="flex flex-col flex-1 bg-gray-900 p-4 justify-end">
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((key) => (
                        <button
                            key={key}
                            className="bg-gray-700 p-4 rounded text-xl"
                            onClick={(event) => handleButtonClick(event)}
                        >
                            {key}
                        </button>
                    ))}
                    <button
                        className="bg-gray-700 p-4 rounded text-xl"
                        onClick={handleBackSpace}
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
                <button className="bg-green-500 w-full p-4 rounded text-lg font-semibold" onClick={verifyPinAndConfirm}>
                    Confirm Payment
                </button>
            </div>
        </div>
    );
}