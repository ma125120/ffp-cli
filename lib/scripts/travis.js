"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTravis = void 0;
const travis_1 = require("../template/travis");
const utils_1 = require("../utils");
const addTravis = () => {
    utils_1.writeFileSafe(`.travis.yml`, travis_1.getTravisTmpl());
};
exports.addTravis = addTravis;
