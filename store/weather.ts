import { useTodayService } from "~/services/today";
import { getCoordinates } from "~/utils/utils";

// interface Weather {
//     icon?: string;
//     tmx?: string;
// }

interface Location {
    latitude?: string;
    longitude?: string;
}

const initialState = () => ({
    location: {} as Location,
    // isAlreadyCalled: false,
    // weather: {} as Weather,
});

export const useWeatherStore = defineStore("weather", {
    state: initialState,
    actions: {
        async updateLocation() {
            const coordinate = await getCoordinates();
            const { latitude, longitude } = coordinate;
            this.location = {
                latitude: String(latitude),
                longitude: String(longitude),
            };
        },
        //// 240111 - vue-query 사용으로 미사용
        // async updateWeather() {
        //     const { getTodayWeather } = useTodayService();

        //     try {
        //         const coordinate = await getCoordinates();
        //         const { latitude, longitude } = coordinate;

        //         const weatherRes = await getTodayWeather(latitude, longitude);

        //         if (weatherRes.success) {
        //             this.weather = weatherRes.data;
        //             this.isAlreadyCalled = true;
        //         } else {
        //             this.weather = {
        //                 icon: "not supported",
        //                 tmx: "not supported",
        //             };
        //         }
        //     } catch (error) {
        //         if (error instanceof Error) console.error(error.message);

        //         this.weather = {
        //             icon: "not supported",
        //             tmx: "not supported",
        //         };
        //     }
        // },
        //// 240111 - vue-query 사용으로 미사용
    },
});
