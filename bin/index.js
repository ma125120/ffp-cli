#!/usr/bin/env node
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
const commander_1 = __importDefault(require("commander"));
const prompts_1 = __importDefault(require("prompts"));
const commit_1 = require("../lib/scripts/commit");
const eslint_1 = require("../lib/scripts/eslint");
const jest_1 = require("../lib/scripts/jest");
const list_1 = require("../lib/scripts/list");
const release_1 = require("../lib/scripts/release");
const travis_1 = require("../lib/scripts/travis");
const selects_1 = require("../lib/selects");
const utils_1 = require("../lib/utils");
const program = commander_1.default.program;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        program
            .option('-D, --dep [dep...]', '需要集成的工具，支持 fp -D jest eslint ts editorConfig commit release travis')
            .option('-a, --all', '是否全部集成')
            .option('-l, --list', '查看支持的工具')
            .parse(process.argv);
        let { dep } = program.opts();
        const { all, list } = program.opts();
        if (dep === undefined && !all && !list) {
            const { value } = yield prompts_1.default(selects_1.selectListOption);
            dep = Array.isArray(value) ? value : value ? [value] : [];
            if (!(dep === null || dep === void 0 ? void 0 : dep.length)) {
                throw new Error(`必须选择dep`);
            }
        }
        dep = dep || [];
        const hasEditorConfig = dep.includes(selects_1.ChoiceEnum.editorConfig);
        if (hasEditorConfig || all) {
            utils_1.logFn(() => eslint_1.addEditorConfig(), `editorConfig`);
        }
        const hasTs = dep.includes(selects_1.ChoiceEnum.ts);
        if (hasTs || all) {
            utils_1.logFn(() => eslint_1.addTs(), `ts`);
        }
        const hasEslint = dep.includes(selects_1.ChoiceEnum.eslint);
        if (hasEslint || all) {
            utils_1.logFn(() => eslint_1.addEslint(hasEditorConfig), `eslint`);
        }
        const hasCommit = dep.includes(selects_1.ChoiceEnum.commit);
        if (hasCommit || all) {
            utils_1.logFn(() => commit_1.addCommit(), `commit`);
        }
        const hasRelease = dep.includes(selects_1.ChoiceEnum.release);
        if (hasRelease || all) {
            utils_1.logFn(() => release_1.addRelease(), `release`);
        }
        const hasJest = dep.includes(selects_1.ChoiceEnum.jest);
        if (hasJest || all) {
            utils_1.logFn(() => jest_1.addJest(), `jest`);
        }
        const hasTravis = dep.includes(selects_1.ChoiceEnum.travis);
        if (hasTravis || all) {
            utils_1.logFn(() => travis_1.addTravis(), `jest`);
        }
        if (list) {
            list_1.showList();
        }
        utils_1.installDeps();
    });
}
start();
