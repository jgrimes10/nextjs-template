"use client";

import { useEffect, useState } from "react";

import { Switch } from "@heroui/react";
import { IconMoon, IconSun } from "@tabler/icons-react";

import useSystemTheme from "@/hooks/use-system-theme";

export function ThemeSwitcher({ showLabel }: { showLabel?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useSystemTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      color="warning"
      endContent={<IconMoon />}
      size="lg"
      startContent={<IconSun />}
    >
      {showLabel && "Dark mode"}
    </Switch>
  );
}
