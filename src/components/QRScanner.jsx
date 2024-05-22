import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import axios from 'axios';
import jsQR from 'jsqr';
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';

const QRScanner = () => {
    const [decodedUrl, setDecodedUrl] = useState(null);

    const handleResult = (text) => {
        // Check if the decoded text is a URL
        if (text && text.startsWith('http')) {
            setDecodedUrl(text);
        }
    };

    const handleScanResult = (text, result) => {
        handleResult(text);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageData = e.target.result;
            const image = new Image();

            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);

                if (code) {
                    handleResult(code.data);
                } else {
                    console.log('No QR code found.');
                }
            };

            image.src = imageData;
        };

        reader.readAsDataURL(file);
    };

    const handleClick = async () => {
        if (!decodedUrl) return;

        try {
            const encodedData = decodedUrl.split('=')[1] + "="; // Include the second '=' symbol
            console.log(encodedData)
            console.log(decodedUrl)
            const response = await axios.get(decodedUrl, {
                headers: {
                    token: Cookies.get("token")
                }
                // ,
                // params: {
                //     encryptedData: encodedData
                // }
            });
            console.log(response)
            if(response){
                console.log("ananda")
                toast.success(response.data)

            }
            else{
                toast.error(response.data.message)
            }
            console.log(response);
        } catch (error) {
            toast.error(error.message);
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
        <div style={{ maxWidth: '300px', margin: 'auto', marginTop:"5%",marginLeft:"45%",position:"fixed"}}>
            <div style={{ maxWidth: '300px', maxHeight: '300px', margin: 'auto' }}>
                <Scanner
                    onResult={handleScanResult}
                    onError={(error) => console.log(error?.message)}
                />
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'block', marginTop: '10px' }}
            />
            {decodedUrl && (
                <p style={{ marginTop: '10px', cursor: 'pointer' }} onClick={handleClick}>
                    Click to Process QR Code
                </p>
            )}
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default QRScanner;
