export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    bookings: Booking[];
}


export interface Booking {
    id: string;
    creationDate: Date;
    parkingLot: ParkingLot;
    amount: number;
    duration: number;
}

export interface ParkingLot {
    id: string;
    name: string;
    geo: any;
}

