import { useTodayService } from "~/services/today";
import { getCoordinates } from "~/utils/utils";

interface Weather {
    icon?: string;
    tmx?: string;
}

const initialState = () => ({
    weather: {} as Weather,
    isAlreadyCalled: false,
});

export const useWeatherStore = defineStore("weather", {
    state: initialState,
    actions: {
        async updateWeather() {
            if (this.isAlreadyCalled) return;

            const { getTodayWeather } = useTodayService();

            try {
                const coordinate = await getCoordinates();
                const { latitude, longitude } = coordinate;

                const weatherRes = await getTodayWeather(latitude, longitude);

                if (weatherRes.success) {
                    this.weather = weatherRes.data;
                    this.isAlreadyCalled = true;
                } else {
                    this.weather = {
                        icon: "not supported",
                        tmx: "not supported",
                    };
                }
            } catch (error) {
                if (error instanceof Error) console.error(error.message);

                this.weather = {
                    icon: "not supported",
                    tmx: "not supported",
                };
            }
        },
    },
});
