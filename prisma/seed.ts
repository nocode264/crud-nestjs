// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create two dummy recipes
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
        // close Prisma Client at the end
        await prisma.$disconnect();
    });