import { describe, expect, test } from "vitest";
import { generateAudit } from "../lib/auditEngine";

describe("Audit Engine", () => {

  test("detects oversized collaborative plans", () => {

    const result = generateAudit(
      [
        {
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 120,
          seats: 2,
        },
      ],
      2
    );

    expect(
      result[0].estimatedSavings
    ).toBeGreaterThan(0);
  });

  test("calculates annual savings correctly", () => {

    const result = generateAudit(
      [
        {
          tool: "Cursor",
          plan: "Business",
          monthlySpend: 300,
          seats: 2,
        },
      ],
      2
    );

    expect(
      result[0].estimatedSavings
    ).toBeGreaterThan(50);
  });

  test("handles optimized configurations", () => {

    const result = generateAudit(
      [
        {
          tool: "Claude",
          plan: "Pro",
          monthlySpend: 20,
          seats: 1,
        },
      ],
      1
    );

    expect(result[0].reason).toContain(
      "cost-efficient"
    );
  });

  test("recommends lower tier plans", () => {

    const result = generateAudit(
      [
        {
          tool: "ChatGPT",
          plan: "Business",
          monthlySpend: 200,
          seats: 2,
        },
      ],
      2
    );

    expect(
      result[0].recommendedPlan
    ).toBe("Lower Tier Plan");
  });

  test("handles multiple tools", () => {

    const result = generateAudit(
      [
        {
          tool: "Cursor",
          plan: "Business",
          monthlySpend: 200,
          seats: 2,
        },

        {
          tool: "Claude",
          plan: "Team",
          monthlySpend: 150,
          seats: 2,
        },
      ],
      2
    );

    expect(result.length).toBe(2);
  });

});