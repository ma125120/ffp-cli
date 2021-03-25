"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRelease = void 0;
const utils_1 = require("../utils");
const addRelease = () => {
    utils_1.pushDeps(undefined, `standard-version`);
    utils_1.writePackageJson({
        "scripts": {
            "release": "standard-version",
            "release:rc": "standard-version --prerelease rc",
            "pup": "npm run release && git push --follow-tags origin master",
            "pub": "npm run pup && npm publish"
        },
        // "standard-version": {
        //   "scripts": {
        //     "posttag": "git push --follow-tags origin master && npm publish"
        //   }
        // }
    });
};
exports.addRelease = addRelease;
