/**
 * Tipo utilitario que representa cualquier valor JSON válido.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
