const sharp = require('sharp');

async function createUltraProDashboard() {
  const img1Path = 'C:/Users/SEVERIN/.gemini/antigravity/brain/25297891-3b3e-46c3-8dbd-783038da92cb/.user_uploaded/media_1793990190228_48d5941c.jpg';
  const img2Path = 'C:/Users/SEVERIN/.gemini/antigravity/brain/25297891-3b3e-46c3-8dbd-783038da92cb/.user_uploaded/media_1793990224685_65d39445.jpg';
  const outPath = 'c:/Users/SEVERIN/landing page baa/public/app-screens/dashboard_pro.jpg';

  // 1. Badge Admin doré extrait de img2
  const adminBadge = await sharp(img2Path)
    .extract({ left: 300, top: 65, width: 95, height: 45 })
    .toBuffer();

  // 2. Extraire les 3 commandes très propres de img2 (ALI, ALI, ZERBO)
  // Dans img2:
  // Commande 1: ALI (Confection sur-mesure)
  // Commande 2: ALI (Robe · À livrer le 10 oct.)
  // Commande 3: ZERBO (Confection sur-mesure)
  const cleanOrders = await sharp(img2Path)
    .extract({ left: 18, top: 520, width: 421, height: 320 })
    .toBuffer();

  // 3. Bouton FAB flottant "+ Client" en terracotta
  const fabButton = await sharp(img1Path)
    .extract({ left: 290, top: 760, width: 145, height: 75 })
    .toBuffer();

  const layers = [
    { input: adminBadge, left: 300, top: 65 },
    { input: cleanOrders, left: 18, top: 520 },
    { input: fabButton, left: 290, top: 760 }
  ];

  await sharp(img1Path)
    .composite(layers)
    .toFile(outPath);

  console.log('Ultra Pro Dashboard generated at', outPath);
}

createUltraProDashboard().catch(console.error);
