
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { Parser } = require('json2csv');
const { requireAuth } = require('./authMiddleware');

router.get('/organization/:id/users', requireAuth, async (req, res) => {
  const { id } = req.params;

  // Allow admin or users from same org
  const requester = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (requester.email !== 'admin@ai.com' && requester.organizationId !== id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const users = await prisma.user.findMany({
    where: { organizationId: id },
  });

  if (req.query.format === 'csv') {
    const parser = new Parser();
    const csv = parser.parse(users);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } else {
    res.json(users);
  }
});

router.get('/organization/:id/interactions', requireAuth, async (req, res) => {
  const { id } = req.params;

  const requester = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (requester.email !== 'admin@ai.com' && requester.organizationId !== id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const interactions = await prisma.interaction.findMany({
    where: {
      user: { organizationId: id },
    },
    include: { user: true },
  });

  const rows = interactions.map(i => ({
    user: i.user.email,
    question: i.question,
    answer: i.answer,
    createdAt: i.createdAt,
  }));

  if (req.query.format === 'csv') {
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } else {
    res.json(rows);
  }
});

module.exports = router;
