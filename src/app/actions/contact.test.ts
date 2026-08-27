import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { submitContactBrief } from "./contact";
import { initialContactState } from "@/lib/contact";

function validForm() {
  const form = new FormData();
  form.set("name", "Fathallah Client");
  form.set("reply", "client@example.com");
  form.set("company", "Example Co");
  form.set("category", "product");
  form.set(
    "message",
    "We need a multilingual product with a clear administration workflow.",
  );
  form.set("website", "");
  form.set("startedAt", String(Date.now() - 5000));
  return form;
}

describe("contact brief server action", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.RESEND_API_KEY;
  });

  it("rejects invalid fields before delivery", async () => {
    const form = validForm();
    form.set("message", "Too short");
    const result = await submitContactBrief("en", initialContactState, form);
    expect(result.status).toBe("invalid");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("reports unavailable delivery instead of a false success", async () => {
    delete process.env.RESEND_API_KEY;
    const result = await submitContactBrief("en", initialContactState, validForm());
    expect(result.status).toBe("failed");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends valid project briefs as plain text", async () => {
    const result = await submitContactBrief("ar", initialContactState, validForm());
    expect(result.status).toBe("success");
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["fatoh.haj@gmail.com"],
        replyTo: "client@example.com",
        text: expect.stringContaining("Locale: ar"),
      }),
    );
  });

  it("reports provider failures", async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: "provider_error" } });
    const result = await submitContactBrief("he", initialContactState, validForm());
    expect(result.status).toBe("failed");
  });
});
