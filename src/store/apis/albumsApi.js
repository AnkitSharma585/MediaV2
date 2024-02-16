import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const albumsApi = createApi({
  reducerPath: 'Albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (results, error, albums) => {
          const tags = results.map((album) => {
            return { type: 'Album', id: album.id };
          });
          tags.push({ type: 'Albums', id: albums.id });
          return tags;
        },
        query: (albums) => {
          return {
            url: '/albums',
            method: 'GET',
            params: {
              albumsId: albums.id,
            },
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (results, error, albums) => {
          return [{ type: 'Albums', id: albums.id }];
        },
        query: (albums) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              albumsId: albums.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});
