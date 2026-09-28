/**
 * Joins class names with single spaces and drops empty parts.
 * Class strings then never carry stray whitespace, so a browser extension that
 * rewrites `class` through `classList` can't cause a hydration mismatch.
 */
export function cx(...parts: (string | false | null | undefined)[]) {
  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
