import { useState, useCallback } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

/**
 * Sync state to localStorage. Handles SSR and JSON parse errors gracefully.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Storage quota exceeded or private browsing — silently fail
        }
        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch {
      // noop
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
