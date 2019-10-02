'use strict';

const path = require('path');
const assert = require('assert');
const fsNdjson = require('../index.js');
const fs = require('fs');
const diff = require('deep-diff');

const outData = [
  {
    id: 'abc',
    isNum: true,
    val: 123
  },
  {
    id: 'xyz',
    isNum: false,
    val: null
  }
];

const moreData = [
  {
    id: 'bar',
    isNum: false,
    val: 'foo'
  }
];

const allData = outData.concat(moreData);

const appendFileSyncFile = path.resolve(__dirname, 'output.appendFileSync.ndjson');

describe('fsNdjson', () => {
  afterAll(() => fs.unlinkSync(appendFileSyncFile));

  it('readFile returns promise', () => {
    return fsNdjson.readFile(path.resolve(__dirname, 'input.ndjson')).then(collection => {
      assert(collection.length === 4);
      assert(collection[0].name === 'kyle');
    });
  });

  it('readFile uses callback', () => {
    return fsNdjson.readFile(
      path.resolve(__dirname, 'input.ndjson'),
      (error, collection) => {
        assert(collection.length === 4);
        assert(collection[1].hero === 'toolshed');
      }
    );
  });

  it('readFileSync', () => {
    let collection = fsNdjson.readFileSync(path.resolve(__dirname, 'input.ndjson'));
    assert(collection.length === 4);
    assert(collection[3].hero === 'the coon');
  });

  it('readFile promise catches errors', () => {
    let empty = null;
    return fsNdjson
      .readFile(path.resolve(__dirname, 'missing_input.ndjson'))
      .then(collection => {
        empty = collection;
      })
      .catch(() => {
        assert(empty === null);
      });
  });

  it('readFile callback handles errors', () => {
    return fsNdjson.readFile(path.resolve(__dirname, 'missing_input.ndjson'), error => {
      assert(error !== null);
    });
  });

  it('writeFile returns promise', () => {
    const outFile = path.resolve(__dirname, 'output.writeFile.promise.ndjson');
    return fsNdjson.writeFile(outFile, outData).then(() => {
      return fsNdjson.readFile(outFile).then(collection => {
        assert(!diff(outData, collection));
      });
    });
  });

  it('writeFile uses callback', () => {
    const outFile = path.resolve(
      __dirname,
      'new-dir',
      'output.writeFile.callback.ndjson'
    );
    return fsNdjson.writeFile(outFile, outData, error => {
      assert(!error);
      return fsNdjson.readFile(outFile, (error, collection) => {
        assert(!diff(outData, collection));
      });
    });
  });

  it('writeFileSync', () => {
    const outFile = path.resolve(__dirname, 'output.writeFileSync.ndjson');
    fsNdjson.writeFileSync(outFile, outData);
    let collection = fsNdjson.readFileSync(outFile);
    assert(!diff(outData, collection));
  });

  it('writeFile promise catches errors', () => {
    let empty = null;
    return fsNdjson
      .writeFile('foo\u0000bar')
      .then(collection => {
        empty = collection;
        assert(false);
      })
      .catch(error => {
        assert(error);
        assert(empty === null);
      });
  });

  it('writeFile promise [no file] catches errors', () => {
    let empty = null;
    return fsNdjson
      .writeFile()
      .then(collection => {
        empty = collection;
        assert(false);
      })
      .catch(error => {
        assert(error);
        assert(empty === null);
      });
  });

  it('writeFile callback handles errors', () => {
    return fsNdjson.writeFile('foo\u0000bar', undefined, error => {
      assert(error);
    });
  });

  it('writeFile callback [no file] handles errors', () => {
    return fsNdjson.writeFile(undefined, undefined, error => {
      assert(error);
    });
  });

  it('appendFileSync', () => {
    fsNdjson.appendFileSync(appendFileSyncFile, outData);
    let collection = fsNdjson.readFileSync(appendFileSyncFile);
    assert(!diff(outData, collection));
    fsNdjson.appendFileSync(appendFileSyncFile, moreData);
    collection = fsNdjson.readFileSync(appendFileSyncFile);
    assert(!diff(allData, collection));
  });
});
