
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { requireAuth } = require('./authMiddleware');

router.get('/recordings', requireAuth, async (req, res) => {
  const recordings = await prisma.videoRecording.findMany({
    where: { orgId: req.user.orgId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(recordings);
});

module.exports = router;
