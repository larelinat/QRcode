import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

import {useColorScheme} from '@/components/useColorScheme';
import {Provider} from "react-redux";
import {persistor, store} from "@/redux/store";
import {PersistGate} from "redux-persist/integration/react";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

const RootLayoutNav = () => {
    const colorScheme = useColorScheme();

    return (

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <Stack>
                    <Stack.Screen name='index'
                                  options={{
                                      title: 'Погода API'
                                  }}/>
                    <Stack.Screen name="modal" options={{
                        presentation: 'modal',
                        title: 'Добавление API'
                    }}/>
                    <Stack.Screen name="aboutModal/[id]" options={{
                        presentation: 'modal',
                        title: 'Погода'
                    }}/>
                </Stack>
                </PersistGate>
            </Provider>
        </ThemeProvider>

    );
}

