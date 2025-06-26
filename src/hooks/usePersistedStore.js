// hooks/usePersistedStore.js
"use client";

import { useEffect, useState } from "react";
import { store } from "@/redux/store.client";

export function usePersistedStore() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && store.persistor) {
      store.persistor.persist();
      setIsHydrated(true);
    } else {
      setIsHydrated(true);
    }
  }, []);

  return { isHydrated, store };
}
