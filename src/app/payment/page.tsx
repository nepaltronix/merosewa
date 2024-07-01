"use client"
import { useRouter } from 'next/navigation';
// pages/send-money.js
import React, { useState } from 'react';

export default function Payment() {

    const router = useRouter();

  const [amount, setAmount] = useState('');
  const [useEscrow, setUseEscrow] = useState(false);

  const pushmpin = () => {
    router.push("payment/Mpin")
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        <button className="text-white">
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
      <div className="p-4 bg-gray-800 flex items-center justify-between">
        <div>
          <p className="text-gray-400">NPR</p>
          <p className="text-2xl font-semibold">XXXX.XX</p>
          <p className="text-gray-400">Balance</p>
        </div>
        <button>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>

      {/* Recipient Info */}
      <div className="p-4 bg-gray-700 flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Sa***** Shrestha</p>
          <p className="text-gray-400">eSewa ID - 9860059690</p>
        </div>
          <span
            className={`${
              useEscrow ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
      </div>

      {/* Send Amount */}
      <div className="p-4 bg-gray-800 flex items-center justify-between">
        <p className="text-xl">Send Amount</p>
        <p className="text-2xl font-semibold">रु. {amount || '00.00'}</p>
      </div>

      {/* Keypad */}
      <div className="flex flex-col flex-1 bg-gray-900 p-4">
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
        <button className="bg-green-500 w-full p-4 rounded text-lg font-semibold" onClick={ pushmpin }>
          CONTINUE
        </button>
      </div>
    </div>
  );
};
