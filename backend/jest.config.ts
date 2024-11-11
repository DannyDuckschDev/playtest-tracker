// jest.config.js
module.exports = {
    preset: 'ts-jest', // Verwende ts-jest als Preset für TypeScript-Transformation
    testEnvironment: 'node', // Setze die Testumgebung auf Node
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Nutze ts-jest für alle .ts und .tsx Dateien
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Unterstützte Dateiendungen
    transformIgnorePatterns: [
      '/node_modules/(?!your-specific-package-to-transform)', // Dies ignoriert node_modules außer wenn spezifische Pakete transformiert werden müssen
    ],
  };
  