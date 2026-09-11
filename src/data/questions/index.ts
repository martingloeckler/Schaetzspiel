import { compactPart1 } from "./compact-part1.js";
import { compactPart2 } from "./compact-part2.js";
import { compactPart3 } from "./compact-part3.js";
import { compactPart4 } from "./compact-part4.js";
import { curatedQuestions } from "./curated.js";

const legacyQuestions = [...compactPart1, ...compactPart2, ...compactPart3, ...compactPart4];

// These legacy entries were mainly arithmetic exercises or dry recall questions.
// They remain in the source files for traceability but are intentionally excluded
// from game selection in favour of knowledge-based estimation questions.
const excludedLegacyIds = new Set([
  "curi-015","curi-016","curi-021","curi-024",
  "curi-037","curi-038","curi-039","curi-040","curi-041","curi-042","curi-043","curi-044","curi-045","curi-046","curi-047","curi-048","curi-049","curi-050",
  "curi-052","curi-064","curi-065","curi-066","curi-067","curi-068","curi-069","curi-070",
  "scie-001","scie-002","scie-004","scie-006","scie-007","scie-008","scie-011","scie-014","scie-015","scie-016","scie-024","scie-025","scie-026","scie-034"
]);

export const allQuestions = [
  ...legacyQuestions.filter(question => !excludedLegacyIds.has(question.id)),
  ...curatedQuestions
];

if (allQuestions.length !== 250) {
  throw new Error(`Question catalog must contain exactly 250 active questions, got ${allQuestions.length}.`);
}

// Server-side only. Answers must never be serialized before a round closes.
export const QUESTION_BANK = allQuestions;
