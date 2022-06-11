import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DELETE_BOOKING, GET_USER, INSERT_USER, UPDATE_USER } from 'src/app/graphql/user.graphql';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userQueryRef: QueryRef<any>;
  user: User;
  constructor(
    private apollo: Apollo
  ) { }
  createUser(user: any) {
    return this.apollo.mutate({
      mutation: INSERT_USER,
      variables: {
        user
      }
    });
  }

  getUser(id: string) {
    this.userQueryRef = this.apollo.watchQuery({
      query: GET_USER,
      variables: {
        id
      }
    });
    return this.userQueryRef.valueChanges;
  }

  updateUser(id: string, user: any) {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        id,
        user
      }
    });
  }

  deleteBooking(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_BOOKING,
      variables: {
        id
      }
    });
  }
}
