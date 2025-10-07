module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Busca archivos de prueba en una carpeta 'tests' o archivos con sufijo .test.ts o .spec.ts
    testMatch: ['**/tests/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
    // Ignora la carpeta de build 'dist' y 'node_modules'
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};