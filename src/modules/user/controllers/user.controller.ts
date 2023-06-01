import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const users = await this.userService.findAll(page, pageSize);
    const totalUsers = await this.userService.countAll();

    const hasNext = (page - 1) * pageSize + users.length < totalUsers;

    return {
      items: users,
      hasNext,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    
    const isPasswordMatch = await this.userService.comparePassword(loginDto.password, user);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Aqui você pode gerar e retornar um token JWT, realizar outras operações de autenticação, etc.
    return { message: 'Login successful' };
  }
}
