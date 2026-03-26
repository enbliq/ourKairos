import type { LoginState } from "./state";

export type LoginAction =
  | { type: "update-email"; email: string }
  | { type: "request-code" }
  | { type: "request-code-success" }
  | { type: "request-code-error"; message: string }
  | { type: "update-code"; code: string }
  | { type: "verify-success" };

export const reduceLoginState = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "update-email":
      return { ...state, email: action.email };
    case "request-code":
      return { ...state, status: "submitting", errorMessage: undefined };
    case "request-code-success":
      return { ...state, step: "verify-code", status: "success" };
    case "request-code-error":
      return { ...state, status: "error", errorMessage: action.message };
    case "update-code":
      return { ...state, code: action.code };
    case "verify-success":
      return { ...state, step: "done", status: "success" };
  }
};
