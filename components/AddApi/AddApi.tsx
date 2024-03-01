import React, {useEffect, useState} from "react";
import {View} from "@/components/Themed";
import {Button, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import {useAppDispatch} from "@/redux/hooks";
import {addApi, IWeatherApi} from "@/redux/weatherSlice";
import {useRouter} from "expo-router";
import {Checkbox} from "expo-checkbox";
import { Text } from '@/components/Themed';

interface AddApiProps {
    qrData: string
}

const AddApi = ({qrData}: AddApiProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [apiFormData, setApiFormData] = useState({
        name: '',
        url: '',
        city: '',
        mapping: {
            temperature: '',
            humidity: '',
            weather: '',
            isCode: false,
        }
    })

    useEffect(() => {
        setApiFormData({...apiFormData, url: qrData})
    }, [qrData])

    const handleAddApi = () => {
        if (apiFormData.name && apiFormData.url && apiFormData.city) {
            console.log(apiFormData);
            dispatch(addApi({
                ...apiFormData,
                mapping: {
                    ...apiFormData.mapping,
                    temperature: apiFormData.mapping.temperature.split('/'),
                    humidity: apiFormData.mapping.humidity.split('/'),
                    weather: apiFormData.mapping.weather.split('/'),
                }
            } as IWeatherApi));
            router.back();
        } else {
            Alert.alert(
                'Ошибка!', // Заголовок Alert
                'Заполните все поля', // Сообщение Alert
                [
                    {text: 'OK'},
                ],
            );
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder={'Название'}
                placeholderTextColor={'#808080'}
                value={apiFormData.name}
                onChangeText={text => setApiFormData({...apiFormData, name: text})}
            />
            <TextInput
                style={styles.textInput}
                placeholder={'URL'}
                placeholderTextColor={'#808080'}
                value={apiFormData.url}
                onChangeText={text => setApiFormData({...apiFormData, url: text})}
            />
            <TextInput
                style={styles.textInput}
                placeholder={'Город'}
                placeholderTextColor={'#808080'}
                value={apiFormData.city}
                onChangeText={text => setApiFormData({...apiFormData, city: text})}
            />
            <TextInput
                style={styles.textInput}
                placeholder={'Путь к температуре: "current/temperature"'}
                placeholderTextColor={'#808080'}
                value={apiFormData.mapping.temperature}
                onChangeText={text => setApiFormData({
                    ...apiFormData,
                    mapping: {...apiFormData.mapping, temperature: text}
                })}
            />
            <TextInput
                style={styles.textInput}
                placeholder={'Путь к влажности: "current/humidity"'}
                placeholderTextColor={'#808080'}
                value={apiFormData.mapping.humidity}
                onChangeText={text => setApiFormData({
                    ...apiFormData,
                    mapping: {...apiFormData.mapping, humidity: text}
                })}
            />
            <TextInput
                style={styles.textInput}
                placeholder={'Путь к погоде: "current/weather"'}
                placeholderTextColor={'#808080'}
                value={apiFormData.mapping.weather}
                onChangeText={text => setApiFormData({
                    ...apiFormData,
                    mapping: {...apiFormData.mapping, weather: text}
                })}
            />
            <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', alignItems: 'center', width: "80%", marginBottom: 20}}>
                <Text>Погода приходит в виде кода BMO?</Text>
                <Checkbox
                    value={apiFormData.mapping.isCode}
                    onValueChange={value => setApiFormData({
                        ...apiFormData,
                        mapping: {...apiFormData.mapping, isCode: value}
                    })}
                    color={'blue'}
                />
            </View>
            <TouchableOpacity
                onPress={handleAddApi}
                style={styles.addButton}
            >
                <Text style={{color: 'white'}}>Создать</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        color: 'black',
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        width: '80%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AddApi;