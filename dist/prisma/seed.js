"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const recipe1 = await prisma.user.upsert({
        where: { id: 'p1' },
        update: {},
        create: {
            name: 'pato',
            email: 'pato@example.com',
            password: 'password123',
        }
    });
    const recipe2 = await prisma.user.upsert({
        where: { id: '2' },
        update: {},
        create: {
            name: 'pepe',
            email: 'pepe@example.com',
            password: 'password123',
        }
    });
    console.log({ recipe1, recipe2 });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map