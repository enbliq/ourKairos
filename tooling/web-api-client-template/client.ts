export interface ApiClientOptions {
  baseUrl: string;
  headers?: Record<string, string>;
}

export const createApiClient = ({ baseUrl, headers = {} }: ApiClientOptions) => ({
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers
    });
    return response.json() as Promise<T>;
  },
  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...headers
      },
      body: JSON.stringify(body)
    });
    return response.json() as Promise<T>;
  }
});
