import Image from "next/image";
import type { ReactNode } from "react";

type PhoneScreen = { src: string; alt: string; width: number; height: number };

type PhoneFrameProps = {
  /** Tall screenshots stacked into one scrollable track. */
  screens?: PhoneScreen[];
  /** Slow vertical auto-scroll of the track; pauses on hover. */
  animate?: boolean;
  className?: string;
  /** Escape hatch for future content (video, live embed). Replaces `screens`. */
  children?: ReactNode;
};

export default function PhoneFrame({ screens = [], animate = false, className, children }: PhoneFrameProps) {
  return (
    <div className={`phone-frame${className ? ` ${className}` : ""}`}>
      <span className="phone-frame__notch" aria-hidden="true" />
      <div className="phone-frame__screen">
        {children ?? (
          <div className={`phone-frame__track${animate ? " phone-frame__track--scroll" : ""}`}>
            {screens.map((screen) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(max-width: 900px) 70vw, 20rem"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
