"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
const exec = (str) => child_process_1.execSync(str, { encoding: 'utf-8' });
exports.exec = exec;
const res = exports.exec(`yarn -v`);
console.log(res);
