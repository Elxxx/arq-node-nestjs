// src/interfaces/controllers/role/roles.controller.ts
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

import { CreateRoleDto } from '../../../../application/dto/user/role/create-role.dto';
import { UpdateRoleDto } from '../../../../application/dto/user/role/update-role.dto';
import { RoleResponseDto } from '../../../../application/dto/user/role/role.response.dto';
import { ApiResponse as GenericResponse } from '../../../../shared/types/user/api-response.type';

import { CreateRoleUseCase } from '../../../../application/use-cases/user/role/create-role.use-case';
import { GetRoleUseCase } from '../../../../application/use-cases/user/role/get-role.use-case';
import { ListRolesUseCase } from '../../../../application/use-cases/user/role/list-roles.use-case';
import { UpdateRoleUseCase } from '../../../../application/use-cases/user/role/update-role.use-case';
import { DeleteRoleUseCase } from '../../../../application/use-cases/user/role/delete-role.use-case';
import { Role } from '../../../../domain/entities/user/role/role.entity';

@ApiTags('Roles')
@Controller({ path: 'roles', version: '1' })
export class RolesController {
  constructor(
    private readonly createRole: CreateRoleUseCase,
    private readonly getRole: GetRoleUseCase,
    private readonly listRoles: ListRolesUseCase,
    private readonly updateRole: UpdateRoleUseCase,
    private readonly deleteRole: DeleteRoleUseCase,
  ) {}

  private toResponse(role: Role): RoleResponseDto {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Crear un rol' })
  @ApiResponse({ status: 201, type: RoleResponseDto })
  async create(@Body() dto: CreateRoleDto): Promise<GenericResponse<RoleResponseDto>> {
    const role = await this.createRole.execute(dto);
    return { success: true, message: 'Rol creado correctamente', data: this.toResponse(role) };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiResponse({ status: 200, type: RoleResponseDto })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async findOne(@Param('id') id: number): Promise<GenericResponse<RoleResponseDto>> {
    const role = await this.getRole.execute(id);
    return { success: true, message: 'Rol encontrado', data: this.toResponse(role) };
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  @ApiResponse({ status: 200, type: [RoleResponseDto] })
  async findAll(): Promise<GenericResponse<RoleResponseDto[]>> {
    const roles = await this.listRoles.execute();
    return { success: true, message: 'Roles listados correctamente', data: roles.map(r => this.toResponse(r)) };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiResponse({ status: 200, type: RoleResponseDto })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<GenericResponse<RoleResponseDto>> {
    const role = await this.updateRole.execute(id, dto);
    return { success: true, message: 'Rol actualizado correctamente', data: this.toResponse(role) };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiResponse({ status: 204, description: 'Rol eliminado correctamente' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.deleteRole.execute(id);
  }
}
