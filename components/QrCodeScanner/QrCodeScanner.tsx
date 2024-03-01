import React, {useEffect, useState} from "react";
import {BarcodeType, CameraView, useCameraPermissions} from "expo-camera/next";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useRouter} from "expo-router";


interface QrCodeScannerProps {
    setStartCamera: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setQrData: (value: (((prevState: string) => string) | string)) => void
}

const QrCodeScanner = ({setStartCamera, setQrData}: QrCodeScannerProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const router = useRouter();
    const barTypes: BarcodeType[] = [
        "qr",
        "pdf417",
        "ean13",
        "code128",
        "code39",
        "upc_a",
        "upc_e",
        "ean8",
        "itf14",
        "codabar",];
    useEffect(() => {
        requestPermission();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setStartCamera(false);
        setQrData(data);
    };

    return (
        <CameraView
            barCodeScannerSettings={{
                barCodeTypes: barTypes,
                interval: 10,
            }}
            style={{flex: 1, width: "100%"}}
            onBarcodeScanned={handleBarCodeScanned}
        >
            <TouchableOpacity
                onPress={() => {
                    router.back();
                }}
                style={styles.closeButton}
            >
                <AntDesign name="closecircleo" size={50} color="white"/>
            </TouchableOpacity>
        </CameraView>


    )


}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        bottom: Dimensions.get('window').height / 2 - 120,
        right: 30,
        borderRadius: 50,
        width: 65,
        height: 65,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default QrCodeScanner;