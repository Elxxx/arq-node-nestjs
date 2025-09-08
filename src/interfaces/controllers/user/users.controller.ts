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
import { UserResponseDto } from '../../../application/dto/user/user.response.dto';
import { ApiResponse as GenericResponse } from '../../../shared/types/user/api-response.type';

import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../../application/use-cases/user/get-user.use-case';
import { ListUsersUseCase } from '../../../application/use-cases/user/list-users.use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-case';
import { User } from '../../../domain/entities/user/user.entity';

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

  private toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      countryCode: user.countryCode,
      active: user.active,
      roleId: user.roleId,
      roleName: user.roleName ?? 'N/A', // ✅ ahora viene desde repo
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<GenericResponse<UserResponseDto>> {
    const user = await this.createUser.execute(dto);
    return {
      success: true,
      message: 'Usuario creado correctamente',
      data: this.toResponse(user),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: string): Promise<GenericResponse<UserResponseDto>> {
    const user = await this.getUser.execute(id);
    return {
      success: true,
      message: 'Usuario encontrado',
      data: this.toResponse(user),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async findAll(): Promise<GenericResponse<UserResponseDto[]>> {
    const users = await this.listUsers.execute();
    return {
      success: true,
      message: 'Usuarios listados correctamente',
      data: users.map((u) => this.toResponse(u)),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<GenericResponse<UserResponseDto>> {
    const user = await this.updateUser.execute(id, dto);
    return {
      success: true,
      message: 'Usuario actualizado correctamente',
      data: this.toResponse(user),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute(id);
  }
}
