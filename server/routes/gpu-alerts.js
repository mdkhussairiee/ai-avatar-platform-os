
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { requireAuth } = require('./authMiddleware');

router.get('/gpu-alerts', requireAuth, async (req, res) => {
  const alerts = await prisma.gpuAlertLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });
  res.json(alerts);
});

module.exports = router;
