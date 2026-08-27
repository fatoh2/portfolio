export type ContactFormState = {
  status: "idle" | "invalid" | "success" | "failed";
  fieldErrors?: Record<string, string[]>;
};

export const initialContactState: ContactFormState = { status: "idle" };
