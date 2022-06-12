import gql from 'graphql-tag';

export const INSERT_USER = gql`
mutation InsertUser($user: user_insert_input!){
  insert_user_one(object: $user){
    id
  }
}`;

export const GET_USER = gql`
query GetUser($id: uuid!) {
  user: user_by_pk(id: $id) {
    email
    id
    name
    surname
    bookings(where: {deleted_at: {_is_null: true}}) {
      id
      creationDate: created_at
      amount
      duration
      parkingLot: parking_lot {
        id
        name
        geo
      }
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($id: uuid!, $user: user_set_input!) {
  update_user(where: {id: {_eq: $id}}, _set: $user) {
    returning {
      email
    }
  }
}`;

export const DELETE_BOOKING = gql`
mutation CanceelBooking($id: uuid!) {
  update_booking_by_pk(pk_columns: {id: $id}, _set: {deleted_at: now}) {
    id
  }
}`;


