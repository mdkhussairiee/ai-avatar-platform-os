const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/onboarding', verifyToken, async (req, res) => {
  const { name, themeColor, avatarUrl } = req.body;
  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      name,
      themeColor,
      avatarUrl,
    },
  });
  res.json({ success: true });
});

module.exports = router;
