import { randomUUID } from "node:crypto";

/** Unique, readable test data, e.g. uniqueId("todo") -> "todo-3f9c1a7e". */
export function uniqueId(prefix = "id"): string {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}
