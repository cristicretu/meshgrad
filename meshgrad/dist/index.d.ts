declare const generateMeshGradient: (length: number, baseColor?: string, hash?: number) => string;
declare const generateJSXMeshGradient: (length: number, baseColor?: string, hash?: number) => {
    backgroundColor: string;
    backgroundImage: string;
};

export { generateJSXMeshGradient, generateMeshGradient };
