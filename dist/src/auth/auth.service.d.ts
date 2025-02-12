import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: {
        id: string;
        email: string;
    }): Promise<string>;
}
