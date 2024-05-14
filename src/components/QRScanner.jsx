// import React, { useState } from 'react';
// import {QrReader} from 'react-qr-reader';

// const QRScanner = () => {
//   const [result, setResult] = useState('');

//   const handleScan = (data) => {
//     if (data) {
//       setResult(data);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
//       <div className="w-full max-w-md">
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: '100%' }}
//         />
//       </div>
//       <p className="mt-4 text-gray-700">{result}</p>
//     </div>
//   );
// };

// export default QRScanner;


import React, { useEffect, useRef } from 'react';

const QRScanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new ZXing.BrowserQRCodeReader();
    codeReader.getVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          const selectedDeviceId = videoInputDevices[0].deviceId;
          codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
            if (result) {
              alert(`QR Code scanned: ${result.text}`);
            } else if (error && !(error instanceof ZXing.NotFoundException)) {
              console.error('Error decoding QR code:', error);
            }
          });
        } else {
          console.error('No video input devices found');
        }
      })
      .catch((err) => {
        console.error('Error getting video input devices:', err);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '400px', maxHeight: '300px' }}></video>
    </div>
  );
};

export default QRScanner;
