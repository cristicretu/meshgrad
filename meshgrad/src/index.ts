// Seed based random number generator
class SeededRandom {
 private seed: number;

 constructor(seed: number) {
  this.seed = seed % 2147483647;
  if (this.seed <= 0) this.seed += 2147483646;
 }

 next(): number {
  return (this.seed = (this.seed * 16807) % 2147483647);
 }

 nextFloat(): number {
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
const DEFAULT_GRADIENT_SHAPE = "ellipse";

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
 if (!hex) return undefined;
 hex = hex.replace(/#/g, "");
 if (hex.length === 3) {
  hex = hex
   .split("")
   .map(function (hex) {
    return hex + hex;
   })
   .join("");
 }
 var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
 if (!result) {
  return undefined;
 }
 var r = parseInt(result[1], 16);
 var g = parseInt(result[2], 16);
 var b = parseInt(result[3], 16);
 (r /= 255), (g /= 255), (b /= 255);
 var max = Math.max(r, g, b),
  min = Math.min(r, g, b);
 var h = (max + min) / 2;
 if (max == min) {
  h = 0;
 } else {
  var d = max - min;
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
 h = Math.round(360 * h);

 return h;
};

const genColors = (
 length: number,
 initialHue: number,
 seededRandom: SeededRandom // Use the reusable SeededRandom instance
): string[] => {
 return Array.from({ length }, (_, i) => {
  if (i === 0) {
   return `hsl(${initialHue}, ${SATURATION}%, ${LIGHTNESS}%)`;
  }

  const hueShift = Math.round(
   seededRandom.nextFloat() * ANGLE_MULTIPLIER * (1 - 2 * (i % 2))
  );
  const brightnessShift = Math.round(
   seededRandom.nextFloat() * BRIGHTNESS_DECREMENT * (1 - 2 * (i % 2))
  );

  if (i < length / ANALOGOUS_THRESHOLD_RATIO) {
   return `hsl(${(initialHue + hueShift) % MAX_HUE}, ${SATURATION}%, ${
    BRIGHTNESS_START - brightnessShift
   }%)`;
  }

  return `hsl(${(initialHue + hueShift + 180) % MAX_HUE}, ${SATURATION}%, ${
   COMPLEMENTARY_BRIGHTNESS_START - brightnessShift
  }%)`;
 });
};

const genGrad = (
 length: number,
 colors: string[],
 seededRandom: SeededRandom,
 gradientSize: string = DEFAULT_GRADIENT_SIZE,
 transparencyPoint: string = DEFAULT_TRANSPARENCY_POINT,
 gradientShape: string = DEFAULT_GRADIENT_SHAPE
): string[] => {
 return Array.from({ length }, (_, i) => {
  const percentX = getHashPercent(i, seededRandom.next(), length);
  const percentY = getHashPercent(i * 10, seededRandom.next(), length);

  return `radial-gradient(${gradientShape} at ${percentX}% ${percentY}%, ${colors[i]} ${transparencyPoint}, transparent ${gradientSize})`;
 });
};

const genStops = (
 length: number,
 baseColor?: string,
 seed?: number
): [string, string] | undefined => {
 const seededRandom = seed ? new SeededRandom(seed) : randomGenerator;
 const HSLColor = hexToHSL(baseColor);
 const initialHue = HSLColor !== undefined ? HSLColor : getColor();

 const colors = genColors(length, initialHue, seededRandom);
 const gradients = genGrad(length, colors, seededRandom);

 return [colors[0], gradients.join(",")];
};

const generateJSXMeshGradient = (
 length: number,
 baseColor?: string,
 hash?: number
) => {
 const [bgColor, bgImage] = genStops(
  length,
  baseColor ? baseColor : undefined,
  hash ? hash : undefined
 );
 return { backgroundColor: bgColor, backgroundImage: bgImage };
};

const generateMeshGradient = (
 length: number,
 baseColor?: string,
 hash?: number
) => {
 const [bgColor, bgImage] = genStops(
  length,
  baseColor,
  hash ? hash : undefined
 );
 return { backgroundColor: bgColor, backgroundImage: bgImage };
};

export { generateMeshGradient as generateMeshGradient };
export { generateJSXMeshGradient as generateJSXMeshGradient };
