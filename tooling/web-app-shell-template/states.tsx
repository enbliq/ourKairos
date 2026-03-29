export const LoadingState = () => ({
  type: "loading",
  message: "Loading..."
});

export const ErrorState = (message = "Something went wrong") => ({
  type: "error",
  message
});
