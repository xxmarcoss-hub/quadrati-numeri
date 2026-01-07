const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Colori del gioco
const COLORS = {
  background: '#1a1a2e',
  square1: '#e94560',
  square2: '#0f3460',
  square3: '#16213e',
  text: '#ffffff'
};

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Sfondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Calcola dimensioni proporzionali
  const padding = size * 0.12;
  const squareSize = (size - padding * 3) / 2;
  const cornerRadius = size * 0.08;

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

  // Quadrato 1 (rosso, numero 2)
  ctx.fillStyle = '#e94560';
  roundRect(padding, padding, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Quadrato 2 (blu, numero 4)
  ctx.fillStyle = '#0f3460';
  roundRect(padding * 2 + squareSize, padding, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Quadrato 3 (verde, numero 2)
  ctx.fillStyle = '#00d9c0';
  roundRect(padding, padding * 2 + squareSize, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Quadrato 4 (arancione, numero 8)
  ctx.fillStyle = '#ff6b35';
  roundRect(padding * 2 + squareSize, padding * 2 + squareSize, squareSize, squareSize, cornerRadius);
  ctx.fill();

  // Numeri
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = squareSize * 0.55;
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  const positions = [
    { x: padding + squareSize / 2, y: padding + squareSize / 2, num: '2' },
    { x: padding * 2 + squareSize * 1.5, y: padding + squareSize / 2, num: '4' },
    { x: padding + squareSize / 2, y: padding * 2 + squareSize * 1.5, num: '2' },
    { x: padding * 2 + squareSize * 1.5, y: padding * 2 + squareSize * 1.5, num: '8' }
  ];

  positions.forEach(pos => {
    ctx.fillText(pos.num, pos.x, pos.y);
  });

  return canvas;
}

// Dimensioni icone iOS
const iosSizes = [
  { size: 1024, name: 'AppIcon-1024.png' },
  { size: 180, name: 'AppIcon-180.png' },
  { size: 167, name: 'AppIcon-167.png' },
  { size: 152, name: 'AppIcon-152.png' },
  { size: 120, name: 'AppIcon-120.png' },
  { size: 87, name: 'AppIcon-87.png' },
  { size: 80, name: 'AppIcon-80.png' },
  { size: 76, name: 'AppIcon-76.png' },
  { size: 60, name: 'AppIcon-60.png' },
  { size: 58, name: 'AppIcon-58.png' },
  { size: 40, name: 'AppIcon-40.png' },
  { size: 29, name: 'AppIcon-29.png' },
  { size: 20, name: 'AppIcon-20.png' }
];

// Dimensioni icone Android
const androidSizes = [
  { size: 432, folder: 'mipmap-xxxhdpi', name: 'ic_launcher.png' },
  { size: 324, folder: 'mipmap-xxhdpi', name: 'ic_launcher.png' },
  { size: 216, folder: 'mipmap-xhdpi', name: 'ic_launcher.png' },
  { size: 162, folder: 'mipmap-hdpi', name: 'ic_launcher.png' },
  { size: 108, folder: 'mipmap-mdpi', name: 'ic_launcher.png' },
  // Foreground (per adaptive icons)
  { size: 432, folder: 'mipmap-xxxhdpi', name: 'ic_launcher_foreground.png' },
  { size: 324, folder: 'mipmap-xxhdpi', name: 'ic_launcher_foreground.png' },
  { size: 216, folder: 'mipmap-xhdpi', name: 'ic_launcher_foreground.png' },
  { size: 162, folder: 'mipmap-hdpi', name: 'ic_launcher_foreground.png' },
  { size: 108, folder: 'mipmap-mdpi', name: 'ic_launcher_foreground.png' }
];

// Crea directory se non esiste
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Genera icone iOS
console.log('Generating iOS icons...');
const iosPath = path.join(__dirname, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');
ensureDir(iosPath);

iosSizes.forEach(({ size, name }) => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iosPath, name), buffer);
  console.log(`  Created ${name} (${size}x${size})`);
});

// Genera Contents.json per iOS
const contentsJson = {
  images: [
    { size: "20x20", idiom: "iphone", filename: "AppIcon-40.png", scale: "2x" },
    { size: "20x20", idiom: "iphone", filename: "AppIcon-60.png", scale: "3x" },
    { size: "29x29", idiom: "iphone", filename: "AppIcon-58.png", scale: "2x" },
    { size: "29x29", idiom: "iphone", filename: "AppIcon-87.png", scale: "3x" },
    { size: "40x40", idiom: "iphone", filename: "AppIcon-80.png", scale: "2x" },
    { size: "40x40", idiom: "iphone", filename: "AppIcon-120.png", scale: "3x" },
    { size: "60x60", idiom: "iphone", filename: "AppIcon-120.png", scale: "2x" },
    { size: "60x60", idiom: "iphone", filename: "AppIcon-180.png", scale: "3x" },
    { size: "20x20", idiom: "ipad", filename: "AppIcon-20.png", scale: "1x" },
    { size: "20x20", idiom: "ipad", filename: "AppIcon-40.png", scale: "2x" },
    { size: "29x29", idiom: "ipad", filename: "AppIcon-29.png", scale: "1x" },
    { size: "29x29", idiom: "ipad", filename: "AppIcon-58.png", scale: "2x" },
    { size: "40x40", idiom: "ipad", filename: "AppIcon-40.png", scale: "1x" },
    { size: "40x40", idiom: "ipad", filename: "AppIcon-80.png", scale: "2x" },
    { size: "76x76", idiom: "ipad", filename: "AppIcon-76.png", scale: "1x" },
    { size: "76x76", idiom: "ipad", filename: "AppIcon-152.png", scale: "2x" },
    { size: "83.5x83.5", idiom: "ipad", filename: "AppIcon-167.png", scale: "2x" },
    { size: "1024x1024", idiom: "ios-marketing", filename: "AppIcon-1024.png", scale: "1x" }
  ],
  info: { version: 1, author: "xcode" }
};

fs.writeFileSync(path.join(iosPath, 'Contents.json'), JSON.stringify(contentsJson, null, 2));
console.log('  Created Contents.json');

// Genera icone Android
console.log('\nGenerating Android icons...');
const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

androidSizes.forEach(({ size, folder, name }) => {
  const folderPath = path.join(androidResPath, folder);
  ensureDir(folderPath);
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(folderPath, name), buffer);
  console.log(`  Created ${folder}/${name} (${size}x${size})`);
});

// Genera icone round per Android
console.log('\nGenerating Android round icons...');
androidSizes.slice(0, 5).forEach(({ size, folder }) => {
  const folderPath = path.join(androidResPath, folder);
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(folderPath, 'ic_launcher_round.png'), buffer);
  console.log(`  Created ${folder}/ic_launcher_round.png (${size}x${size})`);
});

console.log('\nAll icons generated successfully!');
