
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/branding', async (req, res) => {
  // Hanya demo static return: boleh guna host/domain sebenar
  const defaultOrg = await prisma.organization.findFirst();
  if (!defaultOrg) {
    return res.json({ brandName: "AI Avatar", logoUrl: "", primaryColor: "#2563eb" });
  }
  res.json({
    brandName: defaultOrg.brandName,
    logoUrl: defaultOrg.logoUrl,
    primaryColor: defaultOrg.primaryColor,
  });
});

module.exports = router;
