import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Layout from "./Layout";

describe("Layout", () => {
  it("renders children inside the page layout", () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
