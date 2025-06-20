const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/auth');
const { canAccessUser } = require('../utils/access');
const { PrismaClient } = require('@prisma/client');
const { getDashboardStats, updateUserPlan } = require('../services/userService');
const { getAuditLogs } = require('../services/auditService');
const prisma = new PrismaClient();

router.get('/users', verifyToken, async (req, res) => {
  if (req.user.role === 'admin') {
    const users = await prisma.user.findMany();
    return res.json({ users });
  }

  if (req.user.role === 'manager') {
    const users = await prisma.user.findMany({
      where: { orgId: req.user.orgId },
    });
    return res.json({ users });
  }

  res.status(403).json({ error: 'Access denied' });
});

router.get('/stats', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const stats = await getDashboardStats();
  res.json(stats);
});

router.get('/logs', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const logs = await getAuditLogs();
  res.json({ logs });
});

router.delete('/users/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  await prisma.auditLog.create({
    data: {
      userId: req.user.id,
      action: `Deleted user ${req.params.id}`,
    },
  });
  res.json({ success: true });
});

router.patch('/users/:id', verifyToken, async (req, res) => {
  const { plan } = req.body;
  const targetId = Number(req.params.id);

  const allowed = await canAccessUser(req.user, targetId);
  if (!allowed) return res.status(403).json({ error: 'Forbidden' });

  await updateUserPlan(targetId, plan, req.user.id);
  res.json({ success: true });
});

router.patch('/users/:id/role', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  const { role } = req.body;
  await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { role },
  });
  await prisma.auditLog.create({
    data: {
      userId: req.user.id,
      action: `Updated role for user ${req.params.id} to ${role}`,
    },
  });
  res.json({ success: true });
});

module.exports = router;
