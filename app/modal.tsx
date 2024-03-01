
import {StyleSheet} from 'react-native';

import {useState} from "react";
import AddApi from "@/components/AddApi/AddApi";
import QrCodeScanner from "@/components/QrCodeScanner/QrCodeScanner";
import {useRouter} from "expo-router";

const ModalScreen = () => {
    const [startCamera, setStartCamera] = useState(true)
    const [qrData, setQrData] = useState('')

    return (
        <>
            {
                startCamera
                    ? <QrCodeScanner
                        setStartCamera={setStartCamera}
                        setQrData={setQrData}
                    />
                    : <AddApi qrData={qrData}/>

            }
        </>
    );
}

export default ModalScreen;