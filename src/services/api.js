import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:3001/api/v1'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem('jwtToken') ||
        sessionStorage.getItem('jwtToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      console.log('fetch api: ', headers.get('Authorization'))
      return headers
    },
  }),
  tagTypes: ['Profile', 'Accounts'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: '/user/login',
          method: 'POST',
          body: { email, password },
        }
      },

      async onQueryStarted(
        { email, password, rememberMe },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled
          const accessToken = data.body?.token
          if (!accessToken) throw new Error('Token manquant')
          const storage = rememberMe ? localStorage : sessionStorage
          storage.setItem('jwtToken', accessToken)

          dispatch(apiSlice.util.invalidateTags(['Profile']))
        } catch (err) {
          console.error('Erreur lors de la mise à jour du profil : ', err)
        }
      },
    }),

    getProfile: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
      transformResponse: (response) => response.body,
      providesTags: ['Profile'],
    }),

    getAccounts: builder.query({
      query: (userId) => `/accounts?userId=${userId}`,
      providesTags: ['Accounts'],
    }),

    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetAccountsQuery,
  useUpdateProfileMutation,
} = api