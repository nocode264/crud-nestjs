import { Controller, Post, Body, BadRequestException, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException("Utilisateur non trouvé");
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Mot de passe incorrect");
    }

    // Générer un token JWT
    const token = await this.authService.generateToken(user);

    return { message: "Connexion réussie", user: { id: user.id, name: user.name, email: user.email }, token };
  }
}
