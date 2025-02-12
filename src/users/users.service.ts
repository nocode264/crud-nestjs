import { Get, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService, private authService: AuthService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Hachage du mot de passe avant la création
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
        },
        select: { id: true, name: true, email: true },
      });
  
      // Génération du token JWT
      const token = await this.authService.generateToken(user);

      return { user, token };
    } catch (error) {
      console.error('Erreur Prisma:', error);
      return { message: "Erreur lors de la création de l'utilisateur", error };
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true ,createdAt: true, updatedAt: true },
    })
    return users ? users:{message: 'Aucun utilisateur trouvé'  };
  }

  async findOne(name: string) {
    const user = await this.prisma.user.findFirst({
      where: { name },
      select: { name: true, email: true },
    });
  
    return user ? user : { message: 'Aucun utilisateur trouvé' };
  }
  

  async update(id: string, updateUserDto: { name?: string; email?: string }) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          ...(updateUserDto.name && { name: updateUserDto.name }),
          ...(updateUserDto.email && { email: updateUserDto.email }),
        },
        select: { id: true, name: true, email: true },
      });
      return user;
    } catch (error) {
      return { message: "Utilisateur n'existe pas" };
    }
  }
  

  async remove(id: string) {
    return await this.prisma.user.delete({ 
      where: { id},
      
    });
  }
}
