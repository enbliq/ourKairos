import { createApiClient, type ApiClientOptions } from "./client";

export const createCapsulesClient = (options: ApiClientOptions) => {
  const client = createApiClient(options);

  return {
    list(ownerId: string) {
      return client.get(`/owners/${ownerId}/capsules`);
    },
    createDraft(payload: unknown) {
      return client.post("/capsules", payload);
    },
    detail(id: string) {
      return client.get(`/capsules/${id}`);
    }
  };
};
