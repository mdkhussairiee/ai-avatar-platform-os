const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function canAccessUser(requestingUser, targetUserId) {
  if (requestingUser.role === 'admin') return true;

  if (requestingUser.role === 'manager') {
    const targetUser = await prisma.user.findUnique({
      where: { id: Number(targetUserId) },
    });
    return targetUser && targetUser.orgId === requestingUser.orgId;
  }

  return false;
}

module.exports = { canAccessUser };
