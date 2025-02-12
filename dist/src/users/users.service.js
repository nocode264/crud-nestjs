"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async create(createUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    password: hashedPassword,
                },
                select: { id: true, name: true, email: true },
            });
            const token = await this.authService.generateToken(user);
            return { user, token };
        }
        catch (error) {
            console.error('Erreur Prisma:', error);
            return { message: "Erreur lors de la création de l'utilisateur", error };
        }
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
        });
        return users ? users : { message: 'Aucun utilisateur trouvé' };
    }
    async findOne(name) {
        const user = await this.prisma.user.findFirst({
            where: { name },
            select: { name: true, email: true },
        });
        return user ? user : { message: 'Aucun utilisateur trouvé' };
    }
    async update(id, updateUserDto) {
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
        }
        catch (error) {
            return { message: "Utilisateur n'existe pas" };
        }
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map