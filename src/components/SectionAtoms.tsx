import { type ComponentPropsWithoutRef, type ElementType, type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delayClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delayClassName,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("fade-up", visible && "is-visible", delayClassName, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionIntroProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        dark ? "text-[var(--color-cream)]" : "text-[var(--color-ink)]",
      )}
    >
      <p className="section-kicker">{eyebrow}</p>
      <h2 className={cn("section-title", dark && "text-[var(--color-cream)]")}>{title}</h2>
      <p
        className={cn(
          "mt-5 text-sm leading-7 sm:text-base",
          dark ? "text-[rgba(255,243,226,0.72)]" : "text-[var(--color-muted)]",
        )}
      >
        {description}
      </p>
    </Reveal>
  );
}
