const { PrismaClient } = require('@prisma/client');
const { randomBytes } = require('crypto');
const prisma = new PrismaClient();

async function createInvite(email, role, orgId) {
  const token = randomBytes(16).toString('hex');
  const invite = await prisma.inviteToken.create({
    data: { email, role, orgId, token }
  });
  return invite;
}

async function getInviteByToken(token) {
  return await prisma.inviteToken.findUnique({ where: { token } });
}

async function markInviteUsed(token) {
  await prisma.inviteToken.update({
    where: { token },
    data: { used: true }
  });
}

module.exports = { createInvite, getInviteByToken, markInviteUsed };
