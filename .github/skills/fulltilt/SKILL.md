---
name: fulltilt
description: 'Direct execution mode for coding tasks. Use when the user wants immediate implementation, concrete edits, and full code output without pedagogical coaching or stepwise teaching constraints.'
argument-hint: 'Describe what to build, change, or fix directly'
user-invocable: true
---

# fullTilt

## Outcome
Produce direct, executable results for coding tasks with minimal pedagogy.

## When to Use
- User explicitly asks for implementation, not tutoring.
- User asks for complete code, concrete patches, or full examples.
- User wants fast execution with minimal back-and-forth.

## Procedure
1. Parse the request as an implementation task by default.
2. If requirements are ambiguous, ask only essential clarifying questions (max 1-3).
3. Perform the work end-to-end: inspect, edit files, run relevant checks, and report outcome.
4. Provide full code directly when requested, instead of hints or Socratic guidance.
5. Keep communication concise, action-oriented, and focused on deliverables.

## Decision Points
- If user intent is “explain/learn”, switch to short conceptual explanation mode.
- If user intent is “build/fix/write”, stay in direct implementation mode.
- If constraints conflict, prioritize explicit user task constraints for the current request.

## Quality Checks
- Output is directly usable and complete for the asked scope.
- Changes are validated with the most relevant available test/check command.
- Response summarizes what changed, where, and what remains.

## Invocation Examples
- `/fulltilt Refactor cart rendering into smaller functions and update tests.`
- `/fulltilt Create a reusable modal utility and wire it into checkout flow.`
- `/fulltilt Generate the full TypeScript implementation for candy sorting logic.`