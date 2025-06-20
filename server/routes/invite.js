const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../utils/auth');
const { createInvite, getInviteByToken, markInviteUsed } = require('../services/inviteService');
const { createUser } = require('../services/userService');

router.post('/create', verifyToken, requireAdmin, async (req, res) => {
  const { email, role } = req.body;
  const invite = await createInvite(email, role, req.user.orgId);
  res.json({ token: invite.token });
});

router.get('/:token', async (req, res) => {
  const invite = await getInviteByToken(req.params.token);
  if (!invite || invite.used) return res.status(400).json({ error: 'Invalid or used token' });
  res.json({ email: invite.email, role: invite.role });
});

router.post('/:token/signup', async (req, res) => {
  const invite = await getInviteByToken(req.params.token);
  if (!invite || invite.used) return res.status(400).json({ error: 'Invalid or used token' });

  const { password } = req.body;
  await createUser({
    email: invite.email,
    password,
    role: invite.role,
    orgId: invite.orgId,
  });
  await markInviteUsed(req.params.token);
  res.json({ success: true });
});

module.exports = router;
