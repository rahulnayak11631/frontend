import { Scanner } from '@yudiel/react-qr-scanner';

const QRScanner = () => {
    return (
        <div style={{ maxWidth: '300px', maxHeight: '300px', margin: 'auto' }}>
            <Scanner
                onResult={(text, result) => console.log(text, result)}
                onError={(error) => console.log(error?.message)}
            />
        </div>
    );
}

export default QRScanner;
