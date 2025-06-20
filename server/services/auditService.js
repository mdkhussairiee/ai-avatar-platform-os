const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAuditLogs() {
  return await prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
}

module.exports = { getAuditLogs };
