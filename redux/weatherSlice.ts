import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {uuid} from "expo-modules-core";
import {adaptApiResponse} from "@/components/GetWeather/getWeather";
import {RootState} from "@/redux/store";


export interface IWeatherData {
    temperature: number,
    humidity: number,
    weather: string
}

export interface IWeatherMapping {
    temperature: string[],
    humidity: string[],
    weather: string[],
    isCode: boolean

}

export interface IWeatherApi {
    id: string,
    name: string,
    url: string,
    city: string,
    mapping: IWeatherMapping,
    weatherData?: IWeatherData
}

export interface IWeatherState {
    loading: boolean,
    apiList: IWeatherApi[]
}

const initialState: IWeatherState = {
    loading: false,
    apiList: [
        {
            id: uuid.v4(),
            name: 'Open-Meteo',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=43.1056&longitude=131.8735&current=temperature_2m,relative_humidity_2m,rain,weather_code&forecast_days=1',
            city: 'London',
            mapping: {
                temperature: ['current', 'temperature_2m'],
                humidity: ['current', 'relative_humidity_2m'],
                weather: ['current', 'weather_code'],
                isCode: true
            },
            weatherData: {
                temperature: 0,
                humidity: 0,
                weather: ''
            }
        }
    ]
}

export const setWeatherData = createAsyncThunk(
    'weather/setWeatherData',
    async (apiId: string, thunkAPI) => {
        const state: RootState = thunkAPI.getState() as RootState;

        const api = state.weather.apiList.find((a) => a.id === apiId);
        if (!api) {
            return { apiId, weatherData: {} };
        }
        const response = await fetch(api.url);
        const data = await response.json();
        return { apiId, weatherData: data };
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        addApi: (state, action: PayloadAction<IWeatherApi>) => {
            state.apiList.push({...action.payload, id: uuid.v4()})
        },
        removeApi: (state, action: PayloadAction<string>) => {
            state.apiList = state.apiList.filter(api => api.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setWeatherData.pending, (state) => {
                state.loading = true;
            })
            .addCase(setWeatherData.fulfilled, (state, action) => {

                const {apiId, weatherData} = action.payload;
                const api = state.apiList.find((a) => a.id === apiId);
                if (api) {
                    const data = adaptApiResponse(weatherData, api.mapping);
                    api.weatherData = adaptApiResponse(weatherData, api.mapping);
                }
                state.loading = false;
            })
            .addCase(setWeatherData.rejected, (state) => {
                state.loading = false;
            });
    }
})

export const {addApi, removeApi} = weatherSlice.actions
export const selectApiList = (state: { weather: IWeatherState }) => state.weather.apiList
export default weatherSlice.reducer