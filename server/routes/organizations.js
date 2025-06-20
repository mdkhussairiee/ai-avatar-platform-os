
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { requireAuth } = require('./authMiddleware');

function checkAdmin(req, res, next) {
  if (req.user.email !== 'admin@ai.com') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
}

router.get('/organizations', requireAuth, checkAdmin, async (req, res) => {
  const orgs = await prisma.organization.findMany({
    include: {
      users: {
        include: {
          interactions: true,
        },
      },
    },
  });
  res.json(orgs);
});

module.exports = router;
