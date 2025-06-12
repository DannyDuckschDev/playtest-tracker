// backend/jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest to handle TypeScript files in tests
    testEnvironment: 'node', // Set the environment to Node.js (not browser-like)
    transform: {
      '^.+\\.tsx?$': 'ts-jest',// Apply ts-jest to all .ts and .tsx files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // List of file extensions Jest can process
    transformIgnorePatterns: [
      '/node_modules/(?!your-specific-package-to-transform)', // Ignore all node_modules except if you want to explicitly transform one
    ],
  };
  