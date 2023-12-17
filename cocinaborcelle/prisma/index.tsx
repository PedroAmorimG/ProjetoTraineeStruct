import { PrismaClient } from "@prisma/client";

declare global {
	var prisma_client: PrismaClient;
}

global.prisma_client = global.prisma_client || new PrismaClient();

export default prisma_client;
