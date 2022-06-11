export interface ParkingLot {
    id: string;
    name: string;
    availableSpots: number;
    geo: Geo;
    pricings: Pricing[];
}

export interface Geo {
    lat: number;
    lon: number;
}

export interface Pricing {
    duration: number;
    price: number;
}
