/**
 * isNotAvailable
 * Checks if value is availble or not
 * if the prop is there or not. Can be used
 * to check str/obj/arr/number/boolean.
 * @param value - The value to check.
 * @returns True if value is available, else false.
 */
export const isNA = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  if (typeof value === 'boolean') return value;
  return false;
};
