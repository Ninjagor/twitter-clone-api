import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getUserDetailsWithId(userId) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    return {"username": user.username, "email": user.email}
}