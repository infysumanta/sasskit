"use client";

import { FALLBACK_LOCALE, Locales } from "@/i18/settings";
import { createContext, useContext } from "react";

const Context = createContext<Locales>(FALLBACK_LOCALE);

export function LocaleProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Locales;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useLocale() {
  return useContext(Context);
}
