import Image from "next/image";
import type { ReactNode } from "react";

type PhoneScreen = { src: string; alt: string; width: number; height: number };

type PhoneFrameProps = {
  /** Screens to show. In "fade" mode they cross-fade in place; in "scroll" mode they stack into one auto-scrolling track. */
  screens?: PhoneScreen[];
  mode?: "static" | "fade" | "scroll";
  /** Draw the CSS device shell. Turn off when the artwork already includes the device (full-phone mockup screenshots). */
  framed?: boolean;
  className?: string;
  /** Escape hatch for future content (video, live embed). Replaces `screens`. */
  children?: ReactNode;
};

export default function PhoneFrame({
  screens = [],
  mode = "static",
  framed = true,
  className,
  children,
}: PhoneFrameProps) {
  const [first, ...rest] = screens;

  const content =
    children ??
    (mode === "fade" ? (
      <div className="phone-frame__stage">
        {first ? (
          <Image
            src={first.src}
            alt={first.alt}
            width={first.width}
            height={first.height}
            sizes="(max-width: 900px) 70vw, 22rem"
            loading="lazy"
          />
        ) : null}
        {rest.map((screen, index) => (
          <Image
            key={screen.src}
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            sizes="(max-width: 900px) 70vw, 22rem"
            loading="lazy"
            className="phone-frame__fade"
            style={{ animationDelay: `${index * 1.5}s` }}
          />
        ))}
      </div>
    ) : (
      <div className={`phone-frame__track${mode === "scroll" ? " phone-frame__track--scroll" : ""}`}>
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
    ));

  if (!framed) {
    return <div className={`phone-frame phone-frame--bare${className ? ` ${className}` : ""}`}>{content}</div>;
  }

  return (
    <div className={`phone-frame${className ? ` ${className}` : ""}`}>
      <span className="phone-frame__notch" aria-hidden="true" />
      <div className="phone-frame__screen">{content}</div>
    </div>
  );
}
