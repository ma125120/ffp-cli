"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHusky = void 0;
const utils_1 = require("../utils");
const addHusky = () => {
    utils_1.pushDeps(undefined, `husky`, `lint-staged`);
    utils_1.writePackageJson({
        "husky": {
            "hooks": {
                "pre-commit": "lint-staged"
            }
        },
        "lint-staged": {
            "*.[jt]sx?": "eslint --fix"
        }
    });
};
exports.addHusky = addHusky;
