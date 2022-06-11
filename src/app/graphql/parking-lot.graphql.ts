import gql from 'graphql-tag';

export const GET_PARKING_LOT = gql`
query GetParkingLot($id: uuid!) {
  parkingLot: parking_lot_by_pk(id: $id) {
    geo
    id
    name
    availableSpots: number_available_spot
    pricings
  }
}`;

export const GET_PARKING_LOTS = gql`
query GetParkingLots {
  parkingLots: parking_lot {
    geo
    id
    name
    availableSpots: number_available_spot
    pricings
  }
}
`;

export const INSERT_BOOKING = gql`
mutation InsertBooking($booking: booking_insert_input!){
  insert_booking_one(object: $booking){
    id
  }
}`;

export const UPDATE_AVAILABLE_SPACES = gql`
mutation UpateParkingLot($id: uuid!, $parking: parking_lot_set_input!) {
  update_parking_lot(_set: $parking, where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}`;
