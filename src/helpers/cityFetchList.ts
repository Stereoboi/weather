export const cityFetch = async (city: any) => {
  if (city.value) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_GEO_URL}?q=${city.value}&appid=${
          import.meta.env.VITE_API_KEY
        }&limit=5`
      );
      if (response.ok) {
        const data = await response.json();
        // Обробка даних з бекенду
        console.log("Отримані дані:", data);

        return data;
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
  }
  return;
};
