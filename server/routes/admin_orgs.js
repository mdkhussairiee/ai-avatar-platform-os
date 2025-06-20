
const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../utils/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.patch('/:id/branding', verifyToken, requireAdmin, async (req, res) => {
  const { logoUrl, themeColor } = req.body;
  const updated = await prisma.organization.update({
    where: { id: Number(req.params.id) },
    data: { logoUrl, themeColor },
  });
  res.json(updated);
});

module.exports = router;
