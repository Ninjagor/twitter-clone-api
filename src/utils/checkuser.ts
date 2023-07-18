import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export async function checkIfUserAlreadyExists(username) {
    const confirmUser = await prisma.user.findFirst({
        where: {
          username: username
        }
      })
      console.log(confirmUser)
      if(confirmUser) {
        return true;
      } else {
        return false;
      }
}