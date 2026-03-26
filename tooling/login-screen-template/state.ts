export type LoginStep = "enter-email" | "verify-code" | "done";

export interface LoginState {
  email: string;
  code: string;
  step: LoginStep;
  status: "idle" | "submitting" | "error" | "success";
  errorMessage?: string;
}

export const createInitialLoginState = (): LoginState => ({
  email: "",
  code: "",
  step: "enter-email",
  status: "idle"
});
