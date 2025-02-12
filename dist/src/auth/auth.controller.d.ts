import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
export declare class AuthController {
    private readonly prisma;
    private readonly authService;
    constructor(prisma: PrismaService, authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
    }>;
}
