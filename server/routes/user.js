const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/profile', verifyToken, async (req, res) => {
  const { name, avatar } = req.body;
  await prisma.user.update({
    where: { id: req.user.id },
    data: { name, avatar },
  });
  res.json({ success: true });
});

module.exports = router;
