import { PrismaClient } from "@prisma/client";

export function getClient() {
  const client = new PrismaClient();
  client.$connect();
  return client;
}