import { apiSlice } from './apiSlice';

export interface Mission {
  day?: number;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const missionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMissions: builder.query<Mission[], void>({
      query: () => ({
        url: '/missions',
        method: 'GET',
      }),
      providesTags: ['Missions'],
      transformResponse: (response: any): Mission[] => {
        return Array.isArray(response) ? response : response?.missions || [];
      },
      transformErrorResponse: (response: any) => response,
    }),

    getMission: builder.query<Mission, string>({
      query: (id) => ({
        url: `/missions/${id}`,
        method: 'GET',
      }),
      providesTags: ['Missions'],
      transformResponse: (response: any): Mission => {
        return {
          id: response?.id || '',
          title: response?.title || '',
          description: response?.description || '',
          completed: Boolean(response?.completed),
          createdAt: response?.createdAt,
          updatedAt: response?.updatedAt,
        };
      },
      transformErrorResponse: (response: any) => response,
    }),

    createMission: builder.mutation<Mission, Omit<Mission, 'id'>>({
      query: (mission) => ({
        url: '/missions',
        method: 'POST',
        body: mission,
      }),
      invalidatesTags: ['Missions'],
      transformResponse: (response: any): Mission => {
        return {
          id: response?.id || '',
          title: response?.title || '',
          description: response?.description || '',
          completed: Boolean(response?.completed),
          createdAt: response?.createdAt,
          updatedAt: response?.updatedAt,
        };
      },
      transformErrorResponse: (response: any) => response,
    }),

    updateMission: builder.mutation<Mission, { id: string; mission: Partial<Mission> }>({
      query: ({ id, mission }) => ({
        url: `/missions/${id}`,
        method: 'PUT',
        body: mission,
      }),
      invalidatesTags: ['Missions'],
      transformResponse: (response: any): Mission => {
        return {
          id: response?.id || '',
          title: response?.title || '',
          description: response?.description || '',
          completed: Boolean(response?.completed),
          createdAt: response?.createdAt,
          updatedAt: response?.updatedAt,
        };
      },
      transformErrorResponse: (response: any) => response,
    }),

    deleteMission: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/missions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Missions'],
      transformErrorResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGetMissionsQuery,
  useGetMissionQuery,
  useCreateMissionMutation,
  useUpdateMissionMutation,
  useDeleteMissionMutation,
} = missionsApiSlice;
