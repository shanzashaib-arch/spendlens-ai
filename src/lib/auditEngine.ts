export interface ToolData {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditResult {
  tool: string;
  recommendedPlan: string;
  estimatedSavings: number;
  reason: string;
}

export function generateAudit(tools: ToolData[], _teamSize: number): AuditResult[] {
  return tools.map((item) => {
    let savings = 0;
    let recommendation = item.plan;
    let reason = "Your current configuration looks cost-efficient.";

    if (item.tool === "ChatGPT" && item.plan === "Team" && item.seats < 3) {
      savings = item.monthlySpend - 20;
      recommendation = "Lower Tier Plan";
      reason = "You are paying for a Team plan but have low seat usage.";
    }

    if (item.monthlySpend > 100 && item.seats > 5) {
      savings = item.monthlySpend * 0.2;
      recommendation = "Enterprise Negotiation";
      reason = "Bulk seat usage detected. Contact sales for discount.";
    }

    return {
      tool: item.tool,
      recommendedPlan: recommendation,
      estimatedSavings: savings,
      reason: reason,
    };
  });
}