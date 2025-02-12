import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersService {
    private readonly prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
        message?: undefined;
        error?: undefined;
    } | {
        message: string;
        error: any;
        user?: undefined;
        token?: undefined;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
        message: string;
    }>;
    findOne(name: string): Promise<{
        email: string;
        name: string;
    } | {
        message: string;
    }>;
    update(id: string, updateUserDto: {
        name?: string;
        email?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
    } | {
        message: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
