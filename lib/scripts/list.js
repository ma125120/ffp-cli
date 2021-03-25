"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showList = void 0;
const chalk_1 = __importDefault(require("chalk"));
const selects_1 = require("../selects");
const showList = () => {
    selects_1.choiceList.map((v, i) => {
        var _a, _b;
        console.log(chalk_1.default.white(i + '. ' + v.title)
            + `\n`
            + (((_a = v.links) === null || _a === void 0 ? void 0 : _a.length) ? ((_b = v.links) === null || _b === void 0 ? void 0 : _b.map(link => chalk_1.default.blue(link)).join(`\n`)) + `\n` : ''));
    });
    console.log(chalk_1.default.white(`徽章制作网站`)
        + `\n`
        + chalk_1.default.blue(`https://www.shields.io/category/version`)
        + `\n`);
};
exports.showList = showList;
