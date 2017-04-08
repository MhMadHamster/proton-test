export class Restaurant {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  active: boolean;
}
