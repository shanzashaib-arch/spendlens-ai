export interface AuditTool {
  id: number;
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormData {
  tools: AuditTool[];
  teamSize: number;
  useCase: string;
}