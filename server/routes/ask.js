
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const prisma = require('../prisma/client');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question' });

  try {
    const chat = await openai.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'gpt-3.5-turbo',
    });
    const answer = chat.choices[0].message.content;

    // Log interaction
    await prisma.interaction.create({
      data: {
        userId: 'demo-user', // Replace with real user auth later
        question,
        answer,
      },
    });

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'GPT request failed' });
  }
});

module.exports = router;
