'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [range, setRange] = useState(7);
  const [password, setPassword] = useState('');
  const [digit, setDigit] = useState(false);
  const [speChars, setSpeChars] = useState(false);

  const randomNumber = (e) => {
    return Math.floor(Math.random() * e);
  };

  const createPassword = () => {
    let pass = [];
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let nums = '0123456789';
    let Special = '!@#$%^&*()_+?';
    let password = chars;

    if (digit) {
      password += nums;
    }
    if (speChars) {
      password += Special;
    }

    for (let i = 0; i < range; i++) {
      const index = randomNumber(password.length);
      pass.push(password[index]);
    }
    return pass.join('');
  };

  useEffect(() => {
    const pass = createPassword();
    setPassword(pass);
  }, [range, digit, speChars]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy password: ', err);
      });
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Password Generator</h1>
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-80 flex items-center justify-center">
          <input
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            readOnly
            value={password}
          />
          <button
            onClick={copyToClipboard}
            className=" right-2 top-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Copy
          </button>
        </div>
      </div>
      <div className=" text-black flex flex-col items-center gap-4">
        
        <input
          className="w-24 px-2 py-1 border border-gray-300 rounded-md text-center"
          type="number"
          value={range}
          readOnly
        />
        <input
          type="range"
          min="1"
          max="20"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="w-64"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="digit"
            checked={digit}
            onChange={() => setDigit(!digit)}
            className="focus:ring-blue-500"
          />
          <label htmlFor="digit" className="text-gray-700">Include Numbers</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="speChars"
            checked={speChars}
            onChange={() => setSpeChars(!speChars)}
            className="focus:ring-blue-500"
          />
          <label htmlFor="speChars" className="text-gray-700">Include Special Characters</label>
        </div>
      </div>
    </>
  );
}
