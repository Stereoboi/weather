export const weatherFetch = async (city: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GEO_URL}?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    if (response.ok) {
      const data = await response.json();
      // Обробка даних з бекенду
      console.log("Отримані дані:", data[0].lat);
      const { lat, lon } = data[0];
      const responseCurrentWeather = await fetch(
        `${import.meta.env.VITE_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const result = await responseCurrentWeather.json();
      return result;
    } else {
      console.error(
        "Помилка під час запиту:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Сталася помилка:", error);
  }
};
