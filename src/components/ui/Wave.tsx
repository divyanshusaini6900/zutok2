import { cx } from "@/lib/cx";

type Props = {
  fill: string;
  flip?: boolean;
  className?: string;
  animated?: boolean;
  back?: string;
};

const PATH =
  "M0 60 C 120 20, 240 20, 360 50 S 600 100, 720 60 S 960 10, 1080 45 S 1320 100, 1440 60 L1440 120 L0 120 Z";

export function Wave({ fill, flip = false, className = "", animated = true, back }: Props) {
  return (
    <div
      className={cx(`pointer-events-none relative h-16 w-full overflow-hidden sm:h-24 ${flip ? "rotate-180" : ""} ${className}`)}
      aria-hidden
    >
      {back && (
        <div className={cx(`absolute inset-0 flex w-[200%] opacity-60 ${animated ? "animate-wave [animation-duration:22s]" : ""}`)}>
          {[0, 1].map((k) => (
            <svg key={k} viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-1/2 -translate-y-2">
              <path d={PATH} fill={back} />
            </svg>
          ))}
        </div>
      )}
      <div className={cx(`absolute inset-0 flex w-[200%] ${animated ? "animate-wave" : ""}`)}>
        {[0, 1].map((k) => (
          <svg key={k} viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={PATH} fill={fill} />
          </svg>
        ))}
      </div>
    </div>
  );
}
