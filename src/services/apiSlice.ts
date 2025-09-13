import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_AUTH_API,
  prepareHeaders: (headers) => {
    const token = Cookies.get('poderrosas.token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Cards', 'Missions', 'Diary', 'Alertas', 'Examples', 'Challenges', 'CurrentWeek', 'ChallengeProgress', 'ChallengeStats'],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
