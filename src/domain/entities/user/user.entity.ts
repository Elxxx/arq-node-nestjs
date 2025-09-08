/**
 * Entidad de dominio `User`.
 *
 * @remarks
 * - Representa el concepto central de **usuario** dentro del dominio.
 * - Es un **POJO** (Plain Old JavaScript Object), sin dependencias de NestJS ni frameworks.
 * - Contiene solo **estado** (propiedades) y reglas mínimas de inicialización.
 *
 * @example
 * const user = new User({
 *   id: 'uuid-123',
 *   name: 'Ada Lovelace',
 *   email: 'ada@example.com'
 * });
 */
export class User {
  /** Identificador único del usuario (UUID). */
  readonly id: string;

  /** Nombre visible del usuario. */
  name: string;

  /** Correo electrónico único del usuario. */
  email: string;

  /** Fecha de creación (inmutable). */
  readonly createdAt: Date;

  /** Fecha de última actualización. */
  updatedAt: Date;

  /**
   * Constructor de la entidad `User`.
   *
   * @param props - Propiedades necesarias para inicializar un usuario.
   * @param props.id - Identificador único (generalmente UUID).
   * @param props.name - Nombre visible del usuario.
   * @param props.email - Correo electrónico único.
   * @param props.createdAt - (opcional) Fecha de creación; si no se pasa, se asigna `new Date()`.
   * @param props.updatedAt - (opcional) Fecha de última actualización; si no se pasa, se asigna `new Date()`.
   */
  constructor(props: {
    id: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
