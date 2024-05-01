import React, { useState, useEffect } from "react";

function Otp() {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const filled = inputs.every((value) => /^\d$/.test(value));
    setIsFilled(filled);
  }, [inputs]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && index < 5) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      document.getElementById(`otp-input-${index + 1}`).focus();
    } else if (/^\d$/.test(value) && index === 5) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index >= 0) {
      const newInputs = [...inputs];
      newInputs[index] = "";
      setInputs(newInputs);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-lg">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1 ">One Time Password Verification</h1>
          <p className="text-[15px] text-slate-500">Enter the 6-digit verification code that was sent to your phone number.</p>
        </header>
        <form id="otp-form">
          <div className="flex items-center justify-center gap-3">
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              disabled={!isFilled}
              className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ${isFilled ? 'bg-indigo-500 hover:bg-indigo-600 focus:ring focus:ring-indigo-300' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">Didn't receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div>
      </div>
    </div>
  );
}

export default Otp;
