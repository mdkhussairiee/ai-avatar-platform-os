const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllOrganizations() {
  return await prisma.organization.findMany({
    include: {
      users: {
        select: { id: true, email: true, plan: true, role: true },
      },
    },
  });
}

async function createOrganization(name) {
  return await prisma.organization.create({ data: { name } });
}

async function deleteOrganization(id) {
  return await prisma.organization.delete({ where: { id } });
}

module.exports = { getAllOrganizations, createOrganization, deleteOrganization };
