import { generateColors, generateRadialGradients, getColor, getPercentage } from "./utils";

const ELEMENTS = 6;

// base color
const color = getColor(); 

// get the color for the radial gradient
const colors = generateColors(ELEMENTS, color); 

// generate the radial gradient
const proprieties = generateRadialGradients(ELEMENTS, colors); 
