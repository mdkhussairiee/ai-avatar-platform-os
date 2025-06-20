
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { Parser } = require('json2csv');
const { requireAuth } = require('./authMiddleware');

function checkAdmin(req, res, next) {
  if (req.user.email !== 'admin@ai.com') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
}

router.get('/users', requireAuth, checkAdmin, async (req, res) => {
  const users = await prisma.user.findMany();
  if (req.query.format === 'csv') {
    const parser = new Parser();
    const csv = parser.parse(users);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } else {
    res.json(users);
  }
});

router.get('/interactions', requireAuth, checkAdmin, async (req, res) => {
  const interactions = await prisma.interaction.findMany({
    include: { user: true },
  });
  if (req.query.format === 'csv') {
    const rows = interactions.map(i => ({
      email: i.user.email,
      question: i.question,
      answer: i.answer,
      createdAt: i.createdAt,
    }));
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } else {
    res.json(interactions);
  }
});

module.exports = router;
