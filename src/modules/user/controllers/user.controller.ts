import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordMatch = await this.userService.comparePassword(loginDto.password, user);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateToken(user);

    return { token };
  }
}
