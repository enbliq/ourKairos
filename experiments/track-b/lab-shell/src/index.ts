export type SandboxHealth = {
  name: string;
  status: "ready";
  timestamp: string;
};

export const getSandboxHealth = (): SandboxHealth => ({
  name: "@ourkairos/lab-shell",
  status: "ready",
  timestamp: new Date().toISOString(),
});

if (process.env.NODE_ENV !== "test") {
  // Keeps `pnpm dev` visibly alive for contributors.
  console.log(getSandboxHealth());
}
