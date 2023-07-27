interface Location {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

// Визначення типу для масиву об'єктів з місцезнаходженнями
export type LocationsData = Location[];
