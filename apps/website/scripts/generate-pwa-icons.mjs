import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';

function createPNG(size) {
  const width = size;
  const height = size;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rawData = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    rawData[y * (width * 3 + 1)] = 0;
    for (let x = 0; x < width; x++) {
      const offset = y * (width * 3 + 1) + 1 + x * 3;
      rawData[offset] = 255;
      rawData[offset + 1] = 107;
      rawData[offset + 2] = 0;
    }
  }

  const compressed = deflateSync(rawData);

  function makeChunk(type, data) {
    const chunk = Buffer.alloc(4 + 4 + data.length + 4);
    chunk.writeUInt32BE(data.length, 0);
    chunk.write(type, 4);
    data.copy(chunk, 8);
    const crcData = Buffer.concat([Buffer.from(type), data]);
    let crc = 0xffffffff;
    for (const byte of crcData) {
      crc ^= byte;
      for (let i = 0; i < 8; i++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
      }
    }
    chunk.writeInt32BE(~crc, 8 + data.length);
    return chunk;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const sizes = [192, 512];
for (const size of sizes) {
  const png = createPNG(size);
  writeFileSync(`public/pwa-${size}.png`, png);
  writeFileSync(`public/pwa-maskable-${size}.png`, png);
  console.log(`Generated pwa-${size}.png`);
}

console.log('PWA icons generated.');
