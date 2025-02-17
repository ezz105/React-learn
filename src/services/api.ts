import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const sendData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const useEndpoint = <T>(
  endpoint: string, 
  queryKey: string[],
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T, Error>({
    queryKey: queryKey,
    queryFn: () => fetchData<T>(endpoint),
    ...options
  });
};

export const usePostEndpoint = <T>(
  endpoint: string,
  options?: Omit<UseMutationOptions<T, Error, unknown>, 'mutationFn'>
) => {
  return useMutation<T, Error, unknown>({
    mutationFn: (data: unknown) => sendData<T>(endpoint, data),
    ...options
  });
};
