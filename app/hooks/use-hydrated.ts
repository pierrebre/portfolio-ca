import { useEffect, useState } from "react";

/** false au rendu serveur et avant l'hydratation, true ensuite. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
