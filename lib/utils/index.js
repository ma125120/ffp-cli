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
exports.pushDeps = exports.devDependencies = exports.dependencies = exports.deps = exports.writePackageJson = exports.getPackageJson = exports.pushSafe = exports.installDeps = exports.exec = exports.extendConfig = exports.logFn = exports.logFnBase = exports.writeFileSafe = exports.writeFile = exports.loadYml = exports.pack = exports.isYarn = exports.isExistTs = exports.isExist = exports.getPath = exports.ROOT = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const js_yaml_1 = __importDefault(require("js-yaml"));
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
exports.ROOT = process.cwd();
const getPath = name => path_1.resolve(exports.ROOT, name);
exports.getPath = getPath;
const isExist = (name) => fs_1.existsSync(name.includes(exports.ROOT) ? name : exports.getPath(name));
exports.isExist = isExist;
const isExistTs = () => exports.isExist('tsconfig.json');
exports.isExistTs = isExistTs;
exports.isYarn = exports.isExist(`yarn.lock`);
exports.pack = exports.isExist(`yarn.lock`) ? `yarn add ` : `npm install `;
const loadYml = name => js_yaml_1.default.load(fs_1.readFileSync(exports.getPath(name), 'utf8'));
exports.loadYml = loadYml;
const writeFile = (name, obj) => {
    fs_1.writeFileSync(exports.getPath(name), typeof obj === 'string' ? obj : js_yaml_1.default.dump(obj));
}; // createWriteStream(getPath(name)).write(typeof obj === 'string' ? obj : yaml.dump(obj))
exports.writeFile = writeFile;
const writeFileSafe = (name, obj) => {
    if (!exports.isExist(exports.getPath(name))) {
        exports.writeFile(name, obj);
    }
};
exports.writeFileSafe = writeFileSafe;
const logFnBase = (fn, prefix, suffix) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (prefix) {
            console.log(chalk_1.default.white(prefix));
        }
        yield fn();
        if (suffix) {
            console.log(chalk_1.default.green(suffix));
            chalk_1.default.green(suffix);
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.logFnBase = logFnBase;
const logFn = (fn, name) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.logFnBase(fn, `${name}任务开始`, `${name}任务已结束`);
});
exports.logFn = logFn;
const extendConfig = (config, tmpl) => {
    Object.keys(tmpl).map(key => {
        var _a, _b;
        const item = tmpl[key];
        const isArray = Array.isArray(item);
        if (!isArray) {
            if (typeof item === 'object') {
                if (config[key] === undefined)
                    config[key] = {};
                exports.extendConfig(config[key], item);
            }
            else {
                config[key] = (_a = config[key]) !== null && _a !== void 0 ? _a : item;
            }
        }
        else if (isArray) {
            config[key] = (_b = config[key]) !== null && _b !== void 0 ? _b : item;
        }
    });
};
exports.extendConfig = extendConfig;
const exec = (str) => {
    console.log(chalk_1.default.gray(`\n执行命令： ${str}，请耐心等待...`));
    return new Promise((resolve) => {
        child_process_1.exec(str, {
            cwd: process.cwd(),
        }, (err, stdout) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(chalk_1.default.green(`命令 ${str} 执行完成`));
            }
            resolve(stdout);
        });
    });
};
exports.exec = exec;
const installDeps = () => {
    setTimeout(() => {
        (exports.dependencies === null || exports.dependencies === void 0 ? void 0 : exports.dependencies.length) && exports.exec(`${exports.pack} ${exports.dependencies.join(` `)}`);
        (exports.devDependencies === null || exports.devDependencies === void 0 ? void 0 : exports.devDependencies.length) && exports.exec(`${exports.pack} ${exports.devDependencies.join(` `)} -D`);
    }, 100);
};
exports.installDeps = installDeps;
const pushSafe = (list = [], item) => {
    if (!list.includes(item)) {
        list.push(item);
    }
};
exports.pushSafe = pushSafe;
const getPackageJson = () => require(exports.getPath(`package.json`));
exports.getPackageJson = getPackageJson;
const writePackageJson = (obj) => {
    const json = exports.getPackageJson();
    exports.extendConfig(json, obj);
    exports.writeFile(`package.json`, JSON.stringify(json, null, '  '));
};
exports.writePackageJson = writePackageJson;
exports.deps = Object.assign(Object.assign({}, (exports.getPackageJson().devDependencies || {})), (exports.getPackageJson().dependencies || {}));
exports.dependencies = [];
exports.devDependencies = [];
const pushDeps = (type = 'dev', ...list) => {
    const _list = type === 'dev' ? exports.devDependencies : exports.dependencies;
    list.map(v => {
        if (!exports.deps[v]) {
            _list.push(v);
            // deps.push(v)
        }
    });
};
exports.pushDeps = pushDeps;
