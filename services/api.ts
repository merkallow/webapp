   
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const Api = createApi({
  reducerPath: 'merkallowApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page=1) => `/users?page=${page}`, 
    }),
    

  }),
});

export const { useGetUsersQuery } =  Api;