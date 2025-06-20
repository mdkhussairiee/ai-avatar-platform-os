
const express = require('express');
const router = express.Router();
const { requireAuth } = require('./authMiddleware');
const fetch = require('node-fetch');
const prisma = require('../prisma/client');

router.post('/tts', requireAuth, async (req, res) => {
  const { text, voiceId = 'default', expression = 'neutral' } = req.body;
  const orgId = req.user.orgId;
  const ttsUrl = 'http://tts:5002/api/tts';

  try {
    const response = await fetch(ttsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice_id: voiceId })
    });

    const audio = await response.arrayBuffer();
    const timestamp = Date.now();
    const filename = `tts_${orgId}_${timestamp}.wav`;

    await prisma.interaction.create({
      data: {
        orgId,
        input: text,
        output: '[audio]',
        type: 'tts',
        expression,
        audioFile: filename
      }
    });

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('X-Avatar-Expression', expression);
    res.send(Buffer.from(audio));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'TTS Error', details: e.message });
  }
});

module.exports = router;
