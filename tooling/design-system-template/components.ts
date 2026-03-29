export type ButtonTone = "primary" | "secondary" | "danger";
export type BadgeTone = "neutral" | "success" | "warning";

export const buttonStyles: Record<ButtonTone, string> = {
  primary: "rounded-md bg-[var(--brand-accent)] px-4 py-2 text-white",
  secondary: "rounded-md border border-[var(--brand-border)] px-4 py-2",
  danger: "rounded-md bg-red-700 px-4 py-2 text-white"
};

export const badgeStyles: Record<BadgeTone, string> = {
  neutral: "rounded-full border px-2 py-1 text-xs",
  success: "rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-800",
  warning: "rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800"
};
