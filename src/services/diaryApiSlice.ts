import { apiSlice } from './apiSlice';

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export const diaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiaryEntries: builder.query<DiaryEntry[], void>({
      query: () => ({
        url: '/diary',
        method: 'GET',
      }),
      providesTags: ['Diary'],
      transformResponse: (response: any): DiaryEntry[] => {
        return Array.isArray(response) ? response : response?.entries || [];
      },
      transformErrorResponse: (response: any) => response,
    }),

    getDiaryEntry: builder.query<DiaryEntry, string>({
      query: (id) => ({
        url: `/diary/${id}`,
        method: 'GET',
      }),
      providesTags: ['Diary'],
      transformResponse: (response: any): DiaryEntry => {
        return {
          id: response?.id || '',
          title: response?.title || '',
          content: response?.content || '',
          date: response?.date || '',
          createdAt: response?.createdAt,
          updatedAt: response?.updatedAt,
        };
      },
      transformErrorResponse: (response: any) => response,
    }),

    createDiaryEntry: builder.mutation<DiaryEntry, Omit<DiaryEntry, 'id'>>({
      query: (entry) => ({
        url: '/diary',
        method: 'POST',
        body: entry,
      }),
      invalidatesTags: ['Diary'],
      transformResponse: (response: any): DiaryEntry => {
        return {
          id: response?.id || '',
          title: response?.title || '',
          content: response?.content || '',
          date: response?.date || '',
          createdAt: response?.createdAt,
          updatedAt: response?.updatedAt,
        };
      },
      transformErrorResponse: (response: any) => response,
    }),

    updateDiaryEntry: builder.mutation<DiaryEntry, { id: string; entry: Partial<DiaryEntry> }>({
      query: ({ id, entry }) => ({
        url: `/diary/${id}`,
        method: 'PUT',
        body: entry,
      }),
      invalidatesTags: ['Diary'],
      transformResponse: (response: any): DiaryEntry => {
        return {
          id: response?.id || '',
          title: response?.title || '',
          content: response?.content || '',
          date: response?.date || '',
          createdAt: response?.createdAt,
          updatedAt: response?.updatedAt,
        };
      },
      transformErrorResponse: (response: any) => response,
    }),

    deleteDiaryEntry: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/diary/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Diary'],
      transformErrorResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGetDiaryEntriesQuery,
  useGetDiaryEntryQuery,
  useCreateDiaryEntryMutation,
  useUpdateDiaryEntryMutation,
  useDeleteDiaryEntryMutation,
} = diaryApiSlice;
