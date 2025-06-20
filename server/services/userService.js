const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser({ email, password }) {
  const domain = email.split('@')[1];
  const existingOrg = await prisma.organization.findFirst({
    where: { name: domain }
  });

  const org = existingOrg || await prisma.organization.create({
    data: { name: domain }
  });

  return await prisma.user.create({
    data: { email, password, orgId: org.id }
  });
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function updateUserPlan(userId, plan, adminId = null) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { plan }
  });

  if (adminId) {
    await prisma.auditLog.create({
      data: {
        userId: adminId,
        action: `Updated plan for user ${userId} to ${plan}`
      }
    });
  }

  return user;
}

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getDashboardStats() {
  const totalUsers = await prisma.user.count();
  const plans = await prisma.user.groupBy({
    by: ['plan'],
    _count: true,
  });
  return { totalUsers, plans };
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUserPlan,
  getAllUsers,
  getDashboardStats,
};
