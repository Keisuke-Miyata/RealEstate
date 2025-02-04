// import { PrismaClient } from "@prisma/client"


// const prisma = new PrismaClient()

// export { prisma }
// prismaConfig.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export { prisma };
