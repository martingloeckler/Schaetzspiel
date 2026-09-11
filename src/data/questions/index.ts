import { compactPart1 } from "./compact-part1.js";
import { compactPart2 } from "./compact-part2.js";
import { compactPart3 } from "./compact-part3.js";
import { compactPart4 } from "./compact-part4.js";

export const allQuestions = [...compactPart1, ...compactPart2, ...compactPart3, ...compactPart4];

// Server-side only. Answers must never be serialized before a round closes.
export const QUESTION_BANK = allQuestions;
