interface WeatherCodes {
    [key: string]: string;
}
import weatherCodesJson from './weatherCodes.json';
const weatherCodes: WeatherCodes = weatherCodesJson;
interface UnifiedWeatherResponse {
    temperature: number;
    humidity: number;
    weather: string;
}


interface ApiResponseMapping {
    temperature: string[];
    humidity: string[];
    weather: string[];
    isCode: boolean;
}

const getValueFromPath = (obj: any, path: string[]): any => {
    return path.reduce((o, k) => (o || {})[k], obj);
}

export const adaptApiResponse = (apiResponse: any, mapping: ApiResponseMapping): UnifiedWeatherResponse => {
    if (mapping.isCode) {
        let weatherCode = getValueFromPath(apiResponse, mapping.weather).toString();
        let weather = weatherCodes[weatherCode.length === 1 ? `0${weatherCode}` : weatherCode];
        return {
            temperature: getValueFromPath(apiResponse, mapping.temperature),
            humidity: getValueFromPath(apiResponse, mapping.humidity),
            weather: weather,
        };
    }

    return {
        temperature: getValueFromPath(apiResponse, mapping.temperature),
        humidity: getValueFromPath(apiResponse, mapping.humidity),
        weather: getValueFromPath(apiResponse, mapping.weather),
    };
}

