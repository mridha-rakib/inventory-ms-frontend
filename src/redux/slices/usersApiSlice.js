import { apiSlice } from "./apiSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${API_BASE_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${API_BASE_URL}/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `${API_BASE_URL}/auth/current-user`,
      }),
      providesTags: ["User"],
    }),
    getTotalUser: builder.query({
      query: () => ({
        url: `${API_BASE_URL}/auth/users-count`,
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${API_BASE_URL}/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
} = userApiSlice;
