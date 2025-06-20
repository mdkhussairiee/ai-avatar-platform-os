
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Missing audio file' });

  const inputPath = req.file.path;
  const outputPath = `${inputPath}.txt`;

  // Whisper.cpp must be compiled and whisper binary available in path
  const command = `./whisper --model models/ggml-base.en.bin --file ${inputPath} --output_txt -of ${inputPath}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).json({ error: 'Transcription failed' });
    }
    fs.readFile(outputPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Read transcription failed' });
      res.json({ transcript: data.trim() });
    });
  });
});

module.exports = router;
