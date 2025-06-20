
const express = require('express');
const router = express.Router();
const { requireAuth } = require('./authMiddleware');
const fetch = require('node-fetch');

router.post('/llm', requireAuth, async (req, res) => {
  const { prompt, model = 'llama3' } = req.body;
  const ollamaUrl = 'http://ollama:11434/api/generate';

  try {
    const response = await fetch(ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false
      })
    });
    const data = await response.json();
    res.json({ output: data.response });
  } catch (e) {
    res.status(500).json({ error: 'LLM Error', details: e.message });
  }
});

module.exports = router;
