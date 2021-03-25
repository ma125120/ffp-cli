"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommit = void 0;
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../utils");
const addCommit = () => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.pushDeps(undefined, `commitizen`, `@commitlint/config-conventional`, `@commitlint/cli`, `husky`, `lint-staged`);
    yield utils_1.exec(`npx husky init`);
    if (utils_1.isExist(`.husky/commit-msg`)) {
        console.log(chalk_1.default.bgGrey(`有关 commit-msg 已存在，如有必要请需自行修改`));
    }
    else {
        utils_1.exec(`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`);
    }
    if (utils_1.isExist(`.husky/pre-commit`)) {
        console.log(chalk_1.default.bgGrey(`有关 pre-commit 已存在，如有必要请需自行修改`));
    }
    else {
        utils_1.exec(`npx husky add .husky/pre-commit "npx --no-install lint-staged"`);
    }
    utils_1.writePackageJson({
        "lint-staged": {
            "*.[jt]sx?": "eslint --fix"
        },
        scripts: {
            cz: "cz",
        },
        commitlint: {
            extends: ['@commitlint/config-conventional']
        }
    });
});
exports.addCommit = addCommit;
