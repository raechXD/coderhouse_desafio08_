"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filePath = _path.default.resolve(__dirname, './../texto.txt');

const data = _fs.default.readFileSync(filePath, 'utf-8');

console.log(data);