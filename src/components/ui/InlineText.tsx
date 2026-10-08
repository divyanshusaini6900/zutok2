import { Fragment } from "react";
import Link from "next/link";
import { inlineParts, isExternal } from "@/lib/inline-links";

/** Renders copy that may hold "[label](href)" links (see src/lib/inline-links.ts). Outside sources open in a new tab. */
export function InlineText({
  text,
  linkClassName = "font-bold underline decoration-2 underline-offset-4",
}: {
  text: string;
  linkClassName?: string;
}) {
  return (
    <>
      {inlineParts(text).map((p, i) => (
        <Fragment key={i}>
          {!p.href ? (
            p.text
          ) : isExternal(p.href) ? (
            <a href={p.href} target="_blank" rel="noopener nofollow" className={linkClassName}>
              {p.text}
            </a>
          ) : (
            <Link href={p.href} className={linkClassName}>
              {p.text}
            </Link>
          )}
        </Fragment>
      ))}
    </>
  );
}
