const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawSplash(width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Sfondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Dimensione dell'icona al centro (proporzionale)
  const iconSize = Math.min(width, height) * 0.3;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calcola dimensioni proporzionali per i quadrati
  const padding = iconSize * 0.12;
  const squareSize = (iconSize - padding * 3) / 2;
  const cornerRadius = iconSize * 0.08;
  const startX = centerX - iconSize / 2;
  const startY = centerY - iconSize / 2;

  // Funzione per disegnare quadrato arrotondato
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Quadrato 1 (rosso)
  ctx.fillStyle = '#e94560';
  roundRect(startX + padding, startY + padding, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Quadrato 2 (blu)
  ctx.fillStyle = '#0f3460';
  roundRect(startX + padding * 2 + squareSize, startY + padding, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Quadrato 3 (verde/teal)
  ctx.fillStyle = '#00d9c0';
  roundRect(startX + padding, startY + padding * 2 + squareSize, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Quadrato 4 (arancione)
  ctx.fillStyle = '#ff6b35';
  roundRect(startX + padding * 2 + squareSize, startY + padding * 2 + squareSize, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Numeri
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = squareSize * 0.55;
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  const positions = [
    { x: startX + padding + squareSize / 2, y: startY + padding + squareSize / 2, num: '2' },
    { x: startX + padding * 2 + squareSize * 1.5, y: startY + padding + squareSize / 2, num: '4' },
    { x: startX + padding + squareSize / 2, y: startY + padding * 2 + squareSize * 1.5, num: '2' },
    { x: startX + padding * 2 + squareSize * 1.5, y: startY + padding * 2 + squareSize * 1.5, num: '8' }
  ];

  positions.forEach(pos => {
    ctx.fillText(pos.num, pos.x, pos.y);
  });

  // Titolo sotto l'icona
  const titleY = centerY + iconSize / 2 + iconSize * 0.2;
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${iconSize * 0.15}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText('Quadrati Numeri', centerX, titleY);

  return canvas;
}

// Crea directory se non esiste
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Splash screens iOS - Storyboard basati (una singola immagine universal)
console.log('Generating iOS splash screens...');
const iosSplashPath = path.join(__dirname, 'ios', 'App', 'App', 'Assets.xcassets', 'Splash.imageset');
ensureDir(iosSplashPath);

// Genera un'immagine universale grande
const splashCanvas = drawSplash(2732, 2732);
const splashBuffer = splashCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(iosSplashPath, 'splash-2732x2732.png'), splashBuffer);
console.log('  Created splash-2732x2732.png');

// Versioni per diverse scale
const splash2x = drawSplash(1366, 1366);
fs.writeFileSync(path.join(iosSplashPath, 'splash-2732x2732-1x.png'), splash2x.toBuffer('image/png'));
console.log('  Created splash-2732x2732-1x.png');

// Contents.json per iOS splash
const splashContentsJson = {
  images: [
    { idiom: "universal", filename: "splash-2732x2732-1x.png", scale: "1x" },
    { idiom: "universal", filename: "splash-2732x2732.png", scale: "2x" },
    { idiom: "universal", filename: "splash-2732x2732.png", scale: "3x" }
  ],
  info: { version: 1, author: "xcode" }
};

fs.writeFileSync(path.join(iosSplashPath, 'Contents.json'), JSON.stringify(splashContentsJson, null, 2));
console.log('  Created Contents.json');

// Splash screens Android
console.log('\nGenerating Android splash screens...');
const androidDrawablePath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

const androidSplashSizes = [
  { width: 480, height: 800, folder: 'drawable-hdpi' },
  { width: 320, height: 480, folder: 'drawable-mdpi' },
  { width: 720, height: 1280, folder: 'drawable-xhdpi' },
  { width: 1080, height: 1920, folder: 'drawable-xxhdpi' },
  { width: 1440, height: 2560, folder: 'drawable-xxxhdpi' }
];

androidSplashSizes.forEach(({ width, height, folder }) => {
  const folderPath = path.join(androidDrawablePath, folder);
  ensureDir(folderPath);
  const canvas = drawSplash(width, height);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(folderPath, 'splash.png'), buffer);
  console.log(`  Created ${folder}/splash.png (${width}x${height})`);
});

// Crea anche una versione per drawable (default)
const drawablePath = path.join(androidDrawablePath, 'drawable');
ensureDir(drawablePath);
const defaultSplash = drawSplash(480, 800);
fs.writeFileSync(path.join(drawablePath, 'splash.png'), defaultSplash.toBuffer('image/png'));
console.log('  Created drawable/splash.png (480x800)');

console.log('\nAll splash screens generated successfully!');
