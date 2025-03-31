"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group border shadow-lg",
          success: "!bg-[#e8d6c4] !border !text-[#2e160e]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "#e8d6c4",
          "--success-border": "#2e160e",
          "--success-text": "#2e160e",
          "--error-bg": "var(--card)",
          "--error-border": "var(--destructive)",
          "--error-text": "var(--card-foreground)",
          "--radius": "var(--radius-lg)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
