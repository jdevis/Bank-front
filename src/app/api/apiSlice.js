import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:3001/api/v1' // change this for production

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      console.log('api  token: ', headers.get('Authorization'))
      return headers
    },
  }),
  tagTypes: ['userProfile'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({email, password}) => {
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
        console.log('email: ', email, ' pwd: ', password, ' remerberme: ', rememberMe)
        try {
          const { data } = await queryFulfilled
          const accessToken = data.body?.token
          if (!accessToken) throw new Error('Token manquant')
          const storage = rememberMe ? localStorage : sessionStorage
          storage.setItem('jwtToken', accessToken)

          dispatch(apiSlice.util.invalidateTags(['userProfile']))
        } catch (err) {
          console.error('Erreur: ', err)
        }
      },
    }),

    getProfile: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
      transformResponse: (response) => response.body,
      providesTags: ['userProfile'],
    }),

    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['userProfile'],
    })
  }),
})

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = apiSlice