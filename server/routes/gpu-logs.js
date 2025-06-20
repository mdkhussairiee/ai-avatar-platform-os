
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { requireAuth } = require('./authMiddleware');

router.get('/gpu-logs', requireAuth, async (req, res) => {
  const logs = await prisma.gpuTaskLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  });
  res.json(logs);
});

router.post('/llm-task', requireAuth, async (req, res) => {
  const { prompt, gpu } = req.body;
  await prisma.gpuTaskLog.create({
    data: {
      prompt,
      gpu,
      status: "queued"
    }
  });
  await fetch('http://monitor:8000/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, gpu })
  });
  res.json({ success: true });
});

module.exports = router;
