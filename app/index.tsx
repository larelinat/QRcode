import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '@/components/Themed';
import React, {useEffect, useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import {Link, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {removeApi, selectApiList} from "@/redux/weatherSlice";

import FlatList = Animated.FlatList;


const MobileCamera = () => {
    const apiList = useAppSelector(selectApiList);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handlePress = (apiId: string) => {
        router.navigate(`/aboutModal/${apiId}`);
    }

    const handleLongPress = (apiId: string) => {
        dispatch(removeApi(apiId));
    }

    useEffect(() => {
    }, [apiList]);
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: 'black', flex: 1}}>
                <FlatList
                    data={apiList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.apiItem}
                            onPress={() => handlePress(item.id)}
                            onLongPress={() => handleLongPress(item.id)}
                        >
                            <Text style={styles.apiItemText}>{item.name}</Text>
                            <Text style={styles.apiItemText}> {item.weatherData?.temperature}</Text>
                        </TouchableOpacity>
                    )}
                />

            </View>
            <Link href={'/modal'} style={styles.openQrScannerButton}>
                <AntDesign name="qrcode" size={70} color="white"/>
            </Link>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    openQrScannerButton: {
        position: 'absolute',
        bottom: 60,
        right: 40,
        borderRadius: 50,
        backgroundColor: 'blue',
    },
    apiItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    apiItemText: {
        color: 'white',
        fontSize: 40,
    }
});


export default MobileCamera;