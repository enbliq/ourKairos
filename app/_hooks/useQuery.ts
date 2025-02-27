import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

export interface ApiError {
  message: string;
  status: number;
}

export async function fetchData<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw {
      message: `API Error: ${response.statusText}`,
      status: response.status,
    } as ApiError;
  }
  return response.json();
}

export function useCustomQuery<T>(
  queryKey: string[],
  fetchFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, ApiError, T>, "queryKey" | "queryFn">,
) {
  return useQuery<T, ApiError>({
    queryKey,
    queryFn: fetchFn,
    ...options,
  });
}

export function useCustomMutation<T, TVariables>(
  mutationFn: (variables: TVariables) => Promise<T>,
  options?: Omit<UseMutationOptions<T, ApiError, TVariables>, "mutationFn">,
) {
  return useMutation<T, ApiError, TVariables>({
    mutationFn,
    ...options,
  });
}
