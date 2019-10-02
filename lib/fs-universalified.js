'use strict';

const fs = require('fs');
const univeralify = require('universalify').fromCallback;

const _ = {};

_.readFile = univeralify(fs.readFile);
_.writeFile = univeralify(fs.writeFile);
_.readFileSync = fs.readFileSync;
_.writeFileSync = fs.writeFileSync;
_.appendFileSync = fs.appendFileSync;

module.exports = _;
