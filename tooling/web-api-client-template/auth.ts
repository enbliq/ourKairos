import { createApiClient, type ApiClientOptions } from "./client";

export const createAuthClient = (options: ApiClientOptions) => {
  const client = createApiClient(options);

  return {
    requestCode(email: string) {
      return client.post("/auth/challenge", { email });
    },
    currentUser() {
      return client.get("/me");
    }
  };
};
