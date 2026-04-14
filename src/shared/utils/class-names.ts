type ClassValue = string | number | boolean | null | undefined | ClassValue[];

/**
 * Minimal classNames utility — no external dependency needed.
 * Filters falsy values and flattens arrays.
 */
export function classNames(...values: ClassValue[]): string {
  const result: string[] = [];
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const nested = classNames(...value);
      if (nested) result.push(nested);
    } else {
      result.push(String(value));
    }
  }
  return result.join(" ");
}

/** cx is an alias for classNames */
export const cx = classNames;
