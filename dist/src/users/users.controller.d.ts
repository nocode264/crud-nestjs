import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
