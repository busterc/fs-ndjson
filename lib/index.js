'use strict';

const fs = require('./fs-universalified');

module.exports = {
  toNdjson: function(data) {
    data = Array.isArray(data) ? data : [data];
    let outNdjson = '';
    data.forEach(item => {
      outNdjson += JSON.stringify(item) + '\n';
    });
    return outNdjson;
  },

  fromNdjson: function(data) {
    let collection = [];
    String(data)
      .split(/\r?\n/)
      .forEach(line => {
        if (line.trim() !== '') {
          collection.push(JSON.parse(line));
        }
      });
    return collection;
  },

  readFile: function(file, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }

    return fs
      .readFile(file, options)
      .then(data => {
        let collection = this.fromNdjson(data);
        if (callback) {
          return callback(null, collection);
        }
        return collection;
      })
      .catch(error => {
        if (callback) {
          return callback(error);
        }
        throw error;
      });
  },

  readFileSync: function(file, options) {
    let data = fs.readFileSync(file, options);
    let collection = this.fromNdjson(data);
    return collection;
  },

  writeFile: function(file, data, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }

    let outNdjson = this.toNdjson(data);

    return fs
      .writeFile(file, outNdjson, options)
      .then(() => {
        if (callback) {
          return callback(null);
        }
      })
      .catch(error => {
        if (callback) {
          return callback(error);
        }
        throw error;
      });
  },

  writeFileSync: function(file, data, options) {
    let outNdjson = this.toNdjson(data);
    fs.writeFileSync(file, outNdjson, options);
  }
};
