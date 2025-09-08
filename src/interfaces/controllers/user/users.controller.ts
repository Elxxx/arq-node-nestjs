import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../../../application/dto/user/create-user.dto';
import { UpdateUserDto } from '../../../application/dto/user/update-user.dto';
import { ApiResponse as GenericResponse } from '../../../shared/types/user/api-response.type';
import { User } from '../../../domain/entities/user/user.entity';

import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../../application/use-cases/user/get-user.use-case';
import { ListUsersUseCase } from '../../../application/use-cases/user/list-users.use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-case';

/**
 * Controlador REST para gestión de usuarios.
 *
 * Exposición de endpoints CRUD:
 * - POST   `/users` → Crear usuario
 * - GET    `/users/:id` → Obtener usuario por ID
 * - GET    `/users` → Listar usuarios
 * - PUT    `/users/:id` → Actualizar usuario
 * - DELETE `/users/:id` → Eliminar usuario
 *
 * @remarks
 * Cada endpoint delega la lógica de negocio a los **casos de uso** (Application Layer),
 * siguiendo el patrón de Arquitectura Hexagonal.
 */
@ApiTags('Usuarios')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  /**
   * Crear un nuevo usuario.
   *
   * @param dto - Datos de creación (validados por CreateUserDto).
   * @returns Usuario recién creado.
   */
  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({ status: 201, type: GenericResponse })
  async create(@Body() dto: CreateUserDto): Promise<GenericResponse<User>> {
    const data = await this.createUser.execute(dto);
    return {
      success: true,
      message: 'Usuario creado correctamente',
      data,
    };
  }

  /**
   * Obtener un usuario por ID.
   *
   * @param id - Identificador único del usuario.
   * @returns Usuario encontrado o excepción 404.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, type: GenericResponse })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: string): Promise<GenericResponse<User>> {
    const data = await this.getUser.execute(id);
    return {
      success: true,
      message: 'Usuario encontrado',
      data,
    };
  }

  /**
   * Listar todos los usuarios registrados.
   *
   * @returns Lista de usuarios.
   */
  @Get()
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiResponse({ status: 200, type: GenericResponse })
  async findAll(): Promise<GenericResponse<User[]>> {
    const data = await this.listUsers.execute();
    return {
      success: true,
      message: 'Usuarios listados correctamente',
      data,
    };
  }

  /**
   * Actualizar datos de un usuario.
   *
   * @param id - Identificador único del usuario.
   * @param dto - Datos a actualizar (UpdateUserDto).
   * @returns Usuario actualizado.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, type: GenericResponse })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<GenericResponse<User>> {
    const data = await this.updateUser.execute(id, dto);
    return {
      success: true,
      message: 'Usuario actualizado correctamente',
      data,
    };
  }

  /**
   * Eliminar un usuario por ID.
   *
   * @param id - Identificador único del usuario.
   * @returns HTTP 204 sin contenido.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute(id);
  }
}
