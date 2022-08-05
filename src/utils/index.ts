// Generate a random hue from 0 - 255
const getColor = (): number => {
  return Math.round(Math.random() * 255);
};

const getPercentage = (value: number): number => {
  return Math.round((Math.random() * (value * 100)) % 100);
};

const generateColors = (
  length: number,
  initialHue: number,
  analogous = true,
  complementary = true
): string[] => {
  return Array.from({ length }, (_, i) => {
    // analogous colors + complementary colors
    // https://uxplanet.org/how-to-use-a-split-complementary-color-scheme-in-design-a6c3f1e22644

    // base color
    if (i === 0) {
      return `hsl(${initialHue}, 100%, 80%)`;
    }
    // analogous colors
    if (i < length / 1.4 && analogous) {
      return `hsl(${
        initialHue - 30 * (1 - 2 * (i % 2)) * (i > 2 ? i / 2 : i)
      }, 100%, ${76 - i * (1 - 2 * (i % 2)) * 1.75}%)`;
    }

    if (!complementary) {
      return `hsl(${initialHue}, 100%, 80%)`;
    }
    // complementary colors
    return `hsl(${initialHue - 150 * (1 - 2 * (i % 2))}, 100%, ${
      76 - i * (1 - 2 * (i % 2)) * 1.25
    }%)`;
  });
};

const generateRadialGradients = (
  length: number,
  colors: string[]
): string[] => {
  return Array.from({ length }, (_, i) => {
    const color = colors[i];
    const x = getPercentage(i);
    const y = getPercentage(i * 10);

    return `radial-gradient(at ${x}% ${y}%, ${color} 0px, transparent 50%)`;
  });
};

const generateMeshGradient = (length: number) => {
  const color = getColor();

  // get the color for the radial gradient
  const colors = generateColors(length, color);

  // generate the radial gradient
  const proprieties = generateRadialGradients(length, colors);

  const bgColor = `${colors[0]}`;
  const bgImage = `${proprieties.join(",")}`;

  // return [`${bgColor}, ${bgImage}`]
  return [bgColor, bgImage];
};

export {
  getColor,
  getPercentage,
  generateColors,
  generateRadialGradients,
  generateMeshGradient,
};
