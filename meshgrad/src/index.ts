// Seed based random number generator
class SeededRandom {
 private seed: number;

 constructor(seed: number) {
  this.seed = seed % 2147483647;
  if (this.seed <= 0) this.seed += 2147483646;
 }

 next() {
  return (this.seed = (this.seed * 16807) % 2147483647);
 }

 nextFloat() {
  return (this.next() - 1) / 2147483646;
 }
}

// Constants
const MAX_HUE = 360;
const MAX_PERCENT = 100;
const ANGLE_MULTIPLIER = 30;
const BRIGHTNESS_START = 64;
const BRIGHTNESS_DECREMENT = 1.75;
const COMPLEMENTARY_BRIGHTNESS_START = 66;
const ANALOGOUS_THRESHOLD_RATIO = 1.4;
const SATURATION = 100;
const LIGHTNESS = 74;
const DEFAULT_GRADIENT_SIZE = "55%";
const DEFAULT_TRANSPARENCY_POINT = "0px";

const randomGenerator = new SeededRandom(1337);

const getColor = (): number => {
 return Math.round(randomGenerator.nextFloat() * MAX_HUE);
};

const getPercent = (): number => {
 return Math.round(randomGenerator.nextFloat() * MAX_PERCENT);
};

const getHashPercent = (
 index: number,
 hash: number,
 length: number
): number => {
 return Math.round(((hash / length) * (index * 100)) % MAX_PERCENT);
};

const hexToHSL = (hex?: string): number | undefined => {
 if (!hex || hex[0] !== "#" || (hex.length !== 4 && hex.length !== 7)) {
  return undefined;
 }

 let r: number, g: number, b: number;
 if (hex.length === 4) {
  r = parseInt(hex[1] + hex[1], 16);
  g = parseInt(hex[2] + hex[2], 16);
  b = parseInt(hex[3] + hex[3], 16);
 } else {
  r = parseInt(hex.substring(1, 3), 16);
  g = parseInt(hex.substring(3, 5), 16);
  b = parseInt(hex.substring(5, 7), 16);
 }

 r /= 255;
 g /= 255;
 b /= 255;
 const max = Math.max(r, g, b),
  min = Math.min(r, g, b);
 let h: number,
  s: number,
  l = (max + min) / 2;

 if (max === min) {
  h = s = 0; // achromatic
 } else {
  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
   case r:
    h = (g - b) / d + (g < b ? 6 : 0);
    break;
   case g:
    h = (b - r) / d + 2;
    break;
   case b:
    h = (r - g) / d + 4;
    break;
  }
  h /= 6;
 }
 h = Math.round(h * 360);
 s = Math.round(s * 100);
 l = Math.round(l * 100);

 return h;
};

const genColors = (
 length: number,
 initialHue: number,
 seed: number
): string[] => {
 const seededRandom = seed ? new SeededRandom(seed) : undefined;
 return Array.from({ length }, (_, i) => {
  if (i === 0) {
   return `hsl(${initialHue}, ${SATURATION}%, ${LIGHTNESS}%)`; // Base color remains the same
  }

  const hueShift = seededRandom
   ? Math.round(seededRandom.nextFloat() * ANGLE_MULTIPLIER * (1 - 2 * (i % 2)))
   : ANGLE_MULTIPLIER * (1 - 2 * (i % 2)) * (i > 2 ? i / 2 : i);
  const brightnessShift = seededRandom
   ? Math.round(
      seededRandom.nextFloat() * BRIGHTNESS_DECREMENT * (1 - 2 * (i % 2))
     )
   : BRIGHTNESS_DECREMENT * (1 - 2 * (i % 2)) * i;

  // analogous colors
  if (i < length / ANALOGOUS_THRESHOLD_RATIO) {
   return `hsl(${(initialHue + hueShift) % MAX_HUE}, ${SATURATION}%, ${
    BRIGHTNESS_START - brightnessShift
   }%)`;
  }
  // complementary colors
  return `hsl(${(initialHue + hueShift + 180) % MAX_HUE}, ${SATURATION}%, ${
   COMPLEMENTARY_BRIGHTNESS_START - brightnessShift
  }%)`;
 });
};

const genGrad = (
 length: number,
 colors: string[],
 seed?: number,
 gradientSize: string = DEFAULT_GRADIENT_SIZE,
 transparencyPoint: string = DEFAULT_TRANSPARENCY_POINT
): string[] => {
 const seededRandom = seed ? new SeededRandom(seed) : undefined;

 return Array.from({ length }, (_, i) => {
  const percentX = seededRandom
   ? getHashPercent(i, seededRandom.next(), length)
   : getPercent();
  const percentY = seededRandom
   ? getHashPercent(i * 10, seededRandom.next(), length)
   : getPercent();

  return `radial-gradient(at ${percentX}% ${percentY}%, ${colors[i]} ${transparencyPoint}, transparent ${gradientSize})\n`;
 });
};

const genStops = (length: number, baseColor?: number, seed?: number) => {
 // get the color for the radial gradient
 const colors = genColors(length, baseColor ? baseColor : getColor(), seed);
 // generate the radial gradient
 const proprieties = genGrad(length, colors, seed);
 return [colors[0], proprieties.join(",")];
};

const generateMeshGradient = (
 length: number,
 baseColor?: string,
 hash?: number
) => {
 const [bgColor, bgImage] = genStops(
  length,
  hexToHSL(baseColor) ? hexToHSL(baseColor) : undefined,
  hash ? hash : undefined
 );
 return `background-color: ${bgColor}; background-image:${bgImage}`;
};

const generateJSXMeshGradient = (
 length: number,
 baseColor?: string,
 hash?: number
) => {
 const [bgColor, bgImage] = genStops(
  length,
  hexToHSL(baseColor) ? hexToHSL(baseColor) : undefined,
  hash ? hash : undefined
 );
 return { backgroundColor: bgColor, backgroundImage: bgImage };
};

export { generateMeshGradient as generateMeshGradient };
export { generateJSXMeshGradient as generateJSXMeshGradient };
