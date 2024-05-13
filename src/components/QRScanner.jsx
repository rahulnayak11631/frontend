import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

const QRScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <div className="w-full max-w-md">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      <p className="mt-4 text-gray-700">{result}</p>
    </div>
  );
};

export default QRScanner;
