module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
};
