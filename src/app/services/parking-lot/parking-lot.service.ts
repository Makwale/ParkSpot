import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_PARKING_LOT, GET_PARKING_LOTS, INSERT_BOOKING, UPDATE_AVAILABLE_SPACES } from 'src/app/graphql/parking-lot.graphql';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  parkingLotsQueryRef: QueryRef<any>;
  parkingLotQueryRef: QueryRef<any>;
  constructor(
    private apollo: Apollo
  ) { }

  getParkingLot(id: string) {
    this.parkingLotQueryRef = this.apollo.watchQuery({
      query: GET_PARKING_LOT,
      variables: {
        id
      }
    });
    return this.parkingLotQueryRef.valueChanges;
  }

  getParkingLots() {
    this.parkingLotsQueryRef = this.apollo.watchQuery({
      query: GET_PARKING_LOTS,
    });
    return this.parkingLotsQueryRef.valueChanges;
  }

  createBooking(booking: any) {
    return this.apollo.mutate({
      mutation: INSERT_BOOKING,
      variables: {
        booking
      }
    });
  }

  updateAvailableSpaces(id: string, parking) {
    return this.apollo.mutate({
      mutation: UPDATE_AVAILABLE_SPACES,
      variables: {
        parking,
        id
      }
    });
  }
}
