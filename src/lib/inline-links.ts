/**
 * Minimal link markup for copy kept in data modules: "[label](/solutions/whatsapp-crm/)" for a page on this site,
 * "[label](https://…)" for an outside source. Pages render it with <InlineText>; JSON-LD, meta tags and the llms
 * files use plainText() or the absolute-URL Markdown from llms.ts, so every format says the same words.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export type InlinePart = { text: string; href?: string };

/** Splits copy into plain text and links, in order. */
export function inlineParts(s: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let last = 0;
  for (const m of s.matchAll(LINK_RE)) {
    const at = m.index ?? 0;
    if (at > last) parts.push({ text: s.slice(last, at) });
    parts.push({ text: m[1], href: m[2] });
    last = at + m[0].length;
  }
  if (last < s.length) parts.push({ text: s.slice(last) });
  return parts;
}

/** The copy with link markup removed, as a reader sees it. */
export const plainText = (s: string) => s.replace(LINK_RE, "$1");

/** Every link target in the copy. */
export const linkTargets = (s: string) => [...s.matchAll(LINK_RE)].map((m) => m[2]);

/** Rewrites each link target with `fn`, keeping the markup (for Markdown output with absolute URLs). */
export const mapLinks = (s: string, fn: (href: string) => string) => s.replace(LINK_RE, (_, label, href) => `[${label}](${fn(href)})`);

export const isExternal = (href: string) => /^https?:\/\//.test(href);
