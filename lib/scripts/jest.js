"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJest = void 0;
const fs_1 = require("fs");
const jest_1 = require("../template/jest");
const utils_1 = require("../utils");
const addJest = () => {
    utils_1.pushDeps(undefined, `babel-jest`, `ts-jest`, `jest`, `@types/jest`);
    fs_1.mkdirSync(`config/jest`, { recursive: true });
    utils_1.writeFileSafe(`config/jest/cssTransform.js`, jest_1.cssTransform);
    utils_1.writeFileSafe(`config/jest/fileTransform.js`, jest_1.fileTransform);
    utils_1.writeFileSafe(`jest.config.js`, jest_1.jestTmpl);
    utils_1.writeFileSafe(`config/jest/setup.js`, jest_1.setupTmpl);
    utils_1.writePackageJson({
        scripts: {
            test: "jest"
        }
    });
};
exports.addJest = addJest;
