module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js",
    },
}