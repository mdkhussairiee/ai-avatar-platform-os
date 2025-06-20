
const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const { requireAuth } = require('./authMiddleware');
const path = require('path');
const prisma = require('../prisma/client');

let ffmpegProcess = null;
let currentFilename = '';

router.post('/record/start', requireAuth, async (req, res) => {
  const { orgId } = req.user;
  const timestamp = Date.now();
  currentFilename = `recording_${orgId}_${timestamp}.mp4`;
  const outputPath = path.join(__dirname, '../../recordings', currentFilename);

  ffmpegProcess = spawn('ffmpeg', [
    '-y',
    '-i', 'http://wav2lip:5000/stream',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-t', '60',
    outputPath
  ]);

  ffmpegProcess.stderr.on('data', (data) => {
    console.log('ffmpeg:', data.toString());
  });

  await prisma.videoRecording.create({
    data: {
      filename: currentFilename,
      orgId,
    }
  });

  res.json({ message: 'Rakaman dimulakan', file: currentFilename });
});

router.post('/record/stop', requireAuth, (req, res) => {
  if (ffmpegProcess) {
    ffmpegProcess.kill('SIGINT');
    ffmpegProcess = null;
    res.json({ message: 'Rakaman dihentikan', file: currentFilename });
  } else {
    res.status(400).json({ error: 'Tiada rakaman aktif' });
  }
});

module.exports = router;
