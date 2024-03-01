import React, {useEffect, useState} from "react";
import {View, Text} from "@/components/Themed";
import {useGlobalSearchParams, useLocalSearchParams, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {IWeatherApi, IWeatherData, selectApiList, setWeatherData} from "@/redux/weatherSlice";
import {StyleSheet} from 'react-native';






const aboutModal = () => {

    const {id} = useLocalSearchParams<{id: string}>();
    const apiList = useAppSelector(selectApiList);
    const dispatch = useAppDispatch();
    const [api, setApi] = useState({} as IWeatherApi);

    useEffect(() => {
        dispatch(setWeatherData(id));
        setApi(apiList.find((a) => a.id === id) as IWeatherApi);
    }, [apiList]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{api.name}</Text>
            <Text style={styles.temperature}>{api.weatherData?.temperature} °С</Text>
            <Text style={styles.humidity}>{api.weatherData?.humidity}%</Text>
            <Text style={styles.weather}>{api.weatherData?.weather}</Text>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',

    },
    temperature: {
        marginTop: 20,
        fontSize: 40,

    },
    humidity: {
        marginTop: 20,
        fontSize: 40,

    },
    weather: {
        marginTop: 20,
        fontSize: 30,

    }

})
export default aboutModal;