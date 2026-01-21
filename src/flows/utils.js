// Validaciones y helpers

import { GLOBAL_KEYWORDS } from "../config/keywords.js";

export function normalizeText(text = "") {
  return text.toLowerCase().trim();
}

export function isGlobalBack(input) {
  return GLOBAL_KEYWORDS.includes(input);
}
