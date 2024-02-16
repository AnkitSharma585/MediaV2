import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const photosApi = createApi({
  reducerPath: 'Photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (results, error, photos) => {
          const tags = results.map((photo) => {
            return { type: 'Photo', id: photo.id };
          });
          tags.push({ type: 'Photos', id: photos.id });
          return tags;
        },
        query: (photos) => {
          return {
            url: '/photos',
            method: 'GET',
            params: {
              photosId: photos.id,
            },
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (results, error, photos) => {
          return [{ type: 'Photos', id: photos.id }];
        },
        query: (photos) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              photosId: photos.id,
              url: faker.image.urlPicsumPhotos({ width: 150, height: 150 }),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (results, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});
