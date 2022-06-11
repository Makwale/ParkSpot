/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

const uri = 'https://parkspot.hasura.app/v1/graphql';
const headers = new HttpHeaders().set('x-hasura-admin-secret', '1bk36uR1bp53Bcl1Ez0E5d7zXvYzmJV7dN1w6sSOONF5KMYMFyRdUBqRBAibxDx8');

@NgModule({
  imports: [BrowserModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri,
          headers
        }),
      }),
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
