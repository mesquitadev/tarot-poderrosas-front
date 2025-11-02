import { apiSlice } from './apiSlice';

export interface CreateUserDto {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, CreateUserDto>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = authApiSlice;
