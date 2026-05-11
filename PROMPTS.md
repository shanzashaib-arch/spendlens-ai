# Prompts

## AI Summary Prompt

Generate a concise professional AI spend audit summary.

Include:
- estimated savings
- overspending observations
- optimization opportunities
- concise actionable tone

Audit Results:
{{results}}

Total Monthly Savings:
{{totalSavings}}

## Why I Wrote It This Way

I intentionally kept the prompt structured and constrained to reduce hallucinations and overly generic summaries.

The summary is designed to sound actionable and executive-friendly while remaining concise enough for dashboard presentation.

## What I Tried That Did Not Work

Initially, I experimented with longer prompts asking the AI to provide detailed optimization recommendations.

However, this caused:
- repetitive explanations
- inconsistent reasoning
- recommendations conflicting with the rule-based audit engine

I simplified the prompt so the AI only summarizes existing audit findings rather than generating new optimization logic.