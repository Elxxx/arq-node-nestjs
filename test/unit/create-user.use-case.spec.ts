// test/unit/create-user.use-case.spec.ts
import { CreateUserUseCase } from '../../src/application/use-cases/user/create-user.use-case';
import { UserDomainService } from '../../src/domain/services/user/user.domain-service';
import { UserRepository } from '../../src/domain/repositories/user/user.repository';
import { User } from '../../src/domain/entities/user/user.entity';

/**
 * Implementación simulada (stub) de UserRepository para pruebas unitarias.
 *
 * @remarks
 * - Usa dos Map para simular almacenamiento por id y por email.
 * - Implementa TODO el contrato de UserRepository con tipos fuertes.
 */
class RepoStub implements UserRepository {
  private byId = new Map<string, User>();
  private byEmail = new Map<string, User>();

  /** Crea un usuario en memoria */
  async create(user: User): Promise<User> {
    this.byId.set(user.id, user);
    this.byEmail.set(user.email, user);
    return user;
  }

  /** Busca un usuario por ID */
  async findById(id: string): Promise<User | null> {
    return this.byId.get(id) ?? null;
  }

  /** Busca un usuario por email */
  async findByEmail(email: string): Promise<User | null> {
    return this.byEmail.get(email) ?? null;
  }

  /** Lista todos los usuarios */
  async findAll(): Promise<User[]> {
    return Array.from(this.byId.values());
  }

  /** Actualiza un usuario (reemplaza por ID) */
  async update(user: User): Promise<User> {
    this.byId.set(user.id, user);
    this.byEmail.set(user.email, user);
    return user;
  }

  /** Elimina un usuario por ID */
  async delete(id: string): Promise<void> {
    const existing = this.byId.get(id);
    if (existing) {
      this.byId.delete(id);
      this.byEmail.delete(existing.email);
    }
  }
}

/**
 * Suite de pruebas unitarias para CreateUserUseCase.
 *
 * @remarks
 * Verifica la creación de usuarios y la validación de unicidad de email.
 */
describe('CreateUserUseCase', () => {
  /**
   * Caso de prueba: crear usuario con email único.
   *
   * @expected El usuario creado debe tener un `id` definido
   * y su `email` debe coincidir con el enviado.
   */
  it('debe crear usuario con email único', async () => {
    const repo = new RepoStub();
    const domain = new UserDomainService(repo);
    const useCase = new CreateUserUseCase(domain, repo);

    const user = await useCase.execute({ name: 'Ada', email: 'ada@example.com' });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('ada@example.com');
  });

  /**
   * Caso de prueba: error al intentar crear usuario con email duplicado.
   *
   * @expected La ejecución debe lanzar un error con mensaje "Email already in use".
   */
  it('debe fallar si email existe', async () => {
    const repo = new RepoStub();
    const domain = new UserDomainService(repo);
    const useCase = new CreateUserUseCase(domain, repo);

    // Primer usuario creado correctamente
    await useCase.execute({ name: 'Ada', email: 'ada@example.com' });

    // Segundo intento con mismo email debe fallar
    await expect(
      useCase.execute({ name: 'Other', email: 'ada@example.com' }),
    ).rejects.toThrow('Email already in use');
  });
});
