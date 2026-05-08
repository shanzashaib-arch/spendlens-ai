export interface AuditResult {
  tool: string;
  currentSpend: number;
  recommendedPlan: string;
  estimatedSavings: number;
  reason: string;
}

export function generateAudit(
  tools: any[],
  teamSize: number
): AuditResult[] {

  return tools.map((tool) => {

    let recommendedPlan = tool.plan;
    let estimatedSavings = 0;
    let reason = "Current setup looks reasonable.";

    // RULE 1
    if (
      teamSize <= 2 &&
      (tool.plan === "Team" ||
        tool.plan === "Business")
    ) {
      recommendedPlan = "Lower Tier Plan";

      estimatedSavings = Math.round(
        tool.monthlySpend * 0.35
      );

      reason =
        "Your team size is small for a collaborative plan. A lower tier likely provides enough value.";
    }

    // RULE 2
    if (
      tool.monthlySpend > 200 &&
      tool.seats <= 3
    ) {
      estimatedSavings += 50;

      reason =
        "Your spend appears high relative to seat count. There may be unused capacity or unnecessary upgrades.";
    }

    // RULE 3
    if (
      tool.tool === "Cursor" &&
      tool.plan === "Business"
    ) {
      estimatedSavings += 20;

      reason =
        "GitHub Copilot Business may provide similar coding assistance at a lower monthly cost.";
    }

    // RULE 4
    if (estimatedSavings === 0) {
      reason =
        "Your current configuration already appears cost-efficient.";
    }

    return {
      tool: tool.tool,
      currentSpend: tool.monthlySpend,
      recommendedPlan,
      estimatedSavings,
      reason,
    };
  });
}