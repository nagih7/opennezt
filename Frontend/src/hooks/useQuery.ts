import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from 'react-query'
import api from '../api/callApi'

interface FetchOptions {
   url: string
   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
   params?: Record<string, any>
   headers?: Record<string, string>
   body?: any
   signal?: AbortSignal
}

interface MutationOptions {
   url: string
   method: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
   headers?: Record<string, string>
   onSuccess?: (data: any) => void
   onError?: (error: Error) => void
}

/**
 * Custom hook to fetch data using react-query
 * @param key - Query key for caching and refetching
 * @param options - Fetch options
 * @param queryOptions - Additional react-query options
 */
export function useFetchQuery<TData = any, TError = Error>(
   key: string | readonly unknown[],
   options: FetchOptions,
   queryOptions?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
   return useQuery<TData, TError>(
      key,
      async () => {
         const response = await api({
            url: options.url,
            method: options.method || 'GET',
            params: options.params,
            data: options.body,
            headers: options.headers,
            signal: options.signal,
         })
         return response.data
      },
      {
         refetchOnWindowFocus: false,
         retry: 1,
         ...queryOptions,
      }
   )
}

/**
 * Custom hook to perform mutations with react-query
 * @param options - Mutation options
 * @param mutationOptions - Additional react-query mutation options
 */
export function useMutateData<TData = any, TError = Error, TVariables = any>(
   options: MutationOptions,
   mutationOptions?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
   const queryClient = useQueryClient()

   return useMutation<TData, TError, TVariables>(
      async (variables) => {
         const response = await api({
            url: options.url,
            method: options.method,
            data: variables,
            headers: options.headers,
         })
         return response.data
      },
      {
         onSuccess: (data) => {
            if (options.onSuccess) {
               options.onSuccess(data)
            }
         },
         onError: (error: any) => {
            if (options.onError) {
               options.onError(error)
            }
         },
         ...mutationOptions,
      }
   )
}

/**
 * Custom hook to fetch paginated data
 * @param key - Query key for caching and refetching
 * @param url - API endpoint
 * @param page - Current page number
 * @param pageSize - Number of items per page
 * @param filters - Additional filters
 * @param queryOptions - Additional react-query options
 */
export function usePaginatedQuery<TData = any, TError = Error>(
   key: string | readonly unknown[],
   url: string,
   page: number,
   pageSize: number,
   filters?: Record<string, any>,
   queryOptions?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
   return useQuery<TData, TError>(
      [key, page, pageSize, filters],
      async () => {
         const response = await api({
            url,
            method: 'GET',
            params: {
               page,
               limit: pageSize,
               ...filters,
            },
         })
         return response.data
      },
      {
         keepPreviousData: true,
         refetchOnWindowFocus: false,
         ...queryOptions,
      }
   )
}

/**
 * Custom hook to fetch data by ID
 * @param key - Query key for caching and refetching
 * @param url - API endpoint
 * @param id - Item ID
 * @param queryOptions - Additional react-query options
 */
export function useQueryById<TData = any, TError = Error>(
   key: string,
   url: string,
   id: string | number | null | undefined,
   queryOptions?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
   return useQuery<TData, TError>(
      [key, id],
      async () => {
         if (!id) {
            throw new Error('ID is required')
         }

         const response = await api({
            url: `${url}/${id}`,
            method: 'GET',
         })

         return response.data
      },
      {
         enabled: !!id,
         refetchOnWindowFocus: false,
         ...queryOptions,
      }
   )
}
