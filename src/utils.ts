/** Unique, readable test data, e.g. uniqueId("todo") -> "todo-k3j9x2a1". */
export function uniqueId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
