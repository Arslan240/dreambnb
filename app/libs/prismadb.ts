import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

// we declare prisma in global because it prevents next hot reload from creating a lot of prisma client by new PrismaClient(); globalThis is not affected by hot relaod
const client = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;
}
export default client;