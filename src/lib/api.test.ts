import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { api } from "./api";

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({ get: vi.fn() })),
  },
}));

describe("api client", () => {
  it("creates an axios client with the configured base URL", () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    expect(api).toBeDefined();
  });
});
