declare const generateMeshGradient: (length: number) => string;
declare const generateJSXMeshGradient: (length: number) => {
    backgroundColor: string;
    backgroundImage: string;
};

export { generateJSXMeshGradient, generateMeshGradient };
