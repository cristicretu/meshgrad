// Generate a random hue from 0 - 360
const getColor = (): number => {
  return Math.round(Math.random() * 360);
};

const getPercent = (value: number): number => {
  return Math.round((Math.random() * (value * 100)) % 100);
};

const genColors = (length: number, initialHue: number): string[] => {
  return Array.from({ length }, (_, i) => {
    // analogous colors + complementary colors
    // https://uxplanet.org/how-to-use-a-split-complementary-color-scheme-in-design-a6c3f1e22644

    // base color
    if (i === 0) {
      return `hsl(${initialHue}, 100%, 80%)`;
    }
    // analogous colors
    if (i < length / 1.4) {
      return `hsl(${
        initialHue - 30 * (1 - 2 * (i % 2)) * (i > 2 ? i / 2 : i)
      }, 100%, ${76 - i * (1 - 2 * (i % 2)) * 1.75}%)`;
    }

    // complementary colors
    return `hsl(${initialHue - 150 * (1 - 2 * (i % 2))}, 100%, ${
      76 - i * (1 - 2 * (i % 2)) * 1.25
    }%)`;
  });
};

const genGrad = (length: number, colors: string[]): string[] => {
  return Array.from({ length }, (_, i) => {
    return `radial-gradient(at ${getPercent(i)}% ${getPercent(i * 10)}%, ${
      colors[i]
    } 0px, transparent 50%)\n`;
  });
};

const genStops = (length: number) => {
  // get the color for the radial gradient
  const colors = genColors(length, getColor());

  // generate the radial gradient
  const proprieties = genGrad(length, colors);

  return [colors[0], proprieties.join(",")];
};

const generateMeshGradient = (length: number) => {
  const [bgColor, bgImage] = genStops(length);

  return `background-color: ${bgColor}; background-image:${bgImage}`;
};

const generateJSXMeshGradient = (length: number) => {
  const [bgColor, bgImage] = genStops(length);

  return { backgroundColor: bgColor, backgroundImage: bgImage };
};

export { generateMeshGradient as generateMeshGradient };
export { generateJSXMeshGradient as generateJSXMeshGradient };
