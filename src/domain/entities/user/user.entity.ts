/**
 * Entidad de dominio `User`.
 *
 * @remarks
 * - Representa el concepto central de **usuario** dentro del dominio.
 * - Es un **POJO** sin dependencias de NestJS ni frameworks.
 * - Encapsula estado y reglas mínimas de negocio.
 */
export class User {
  /** Identificador único del usuario (UUID). */
  readonly id: string;

  /** Primer nombre. */
  firstName: string;

  /** Segundo nombre (opcional). */
  middleName?: string;

  /** Apellido. */
  lastName: string;

  /** Correo electrónico único. */
  email: string;

  /** Teléfono de contacto (opcional). */
  phone?: string;

  /** Código ISO del país (ej: CL, US, ES). */
  countryCode?: string;

  /** Hash de la contraseña (nunca guardar plano). */
  passwordHash: string;

  /** Estado de activación del usuario. */
  active: boolean;

  /** Identificador del rol asociado. */
  roleId: number;

  /** Nombre del rol asociado (opcional, resuelto en la infraestructura). */
  roleName?: string;

  /** Fecha de creación (inmutable). */
  readonly createdAt: Date;

  /** Fecha de última actualización. */
  updatedAt: Date;

  constructor(props: {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone?: string;
    countryCode?: string;
    passwordHash: string;
    active?: boolean;
    roleId: number;
    roleName?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.middleName = props.middleName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.phone = props.phone;
    this.countryCode = props.countryCode;
    this.passwordHash = props.passwordHash;
    this.active = props.active ?? false;
    this.roleId = props.roleId;
    this.roleName = props.roleName;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  changePassword(newPasswordHash: string): void {
    this.passwordHash = newPasswordHash;
    this.touch();
  }

  activate(): void {
    this.active = true;
    this.touch();
  }

  deactivate(): void {
    this.active = false;
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
