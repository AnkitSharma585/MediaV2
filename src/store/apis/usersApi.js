import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'Users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: (results, error, users) => {
          const tags = results.map((user) => {
            return { type: 'User', id: user.id };
          });
          tags.push({ type: 'Users', id: users.id });
          return tags;
        },
        query: (users) => {
          return {
            url: '/users',
            method: 'GET',
            params: {
              usersId: users.id,
            },
          };
        },
      }),
      addUser: builder.mutation({
        invalidatesTags: (results, error, users) => {
          return [{ type: 'Users', id: users.id }];
        },
        query: (users) => {
          return {
            url: '/users',
            method: 'POST',
            body: {
              usersId: users.id,
              title: faker.person.fullName(),
            },
          };
        },
      }),
      removeUser: builder.mutation({
        invalidatesTags: (results, error, user) => {
          return [{ type: 'User', id: user.id }];
        },
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});
