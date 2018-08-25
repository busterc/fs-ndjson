# fs-ndjson [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/busterc/fs-ndjson.svg)](https://greenkeeper.io/)

> read and write NDJSON files (Newline Delimited JSON)

## FYI

While NDJSON is often used for [efficient streaming of JSON](https://www.npmjs.com/package/ndjson), it is also a good format for persisting and retreiving object data collections to and from disk. For example, [NeDB](https://github.com/louischatriot/nedb) uses the format.

See Also:

* http://ndjson.org/
* https://en.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON

## API

The following `fs-ndjson` methods mirror the `fs` core module method APIs, however, the methods have been [universalified](https://github.com/RyanZim/universalify) so that you can use promises or callbacks for async.

* readFile
* readFileSync
* writeFile
* writeFileSync

**BONUS:** `writeFile` and `writeFileSync` will create the parent directory, if it does not already exist.

## Installation

```sh
$ npm install --save fs-ndjson
```

## Usage

Given `/Users/tyler/project-mayhem/enemies.db` contains

```
  {"name":"Equifax","location":"Atlanta, GA"}
  {"name":"Visa","location":"Foster City, CA"}
```

```js
const fsNdjson = require('fs-ndjson');

// can return a promise
fsNdjson.readFile('/Users/tyler/project-mayhem/enemies.db').then(targets => {
  console.log(targets);
  // [
  //   {
  //     name: "Equifax",
  //     location: "Atlanta, GA"
  //   },
  //   {
  //     name: "Visa",
  //     location: "Foster City, CA"
  //   }
  // ]
});

// can use a callback
fsNdjson.readFile('/Users/tyler/project-mayhem/enemies.db', (err, enemies) => {
  if (err) throw err;
  console.log(enemies.length);
  // => 2
});

// can be used synchronously
let enemies = fsNdjson.readFileSync('/Users/tyler/project-mayhem/enemies.db');

// ******** BUT WAIT, THERE'S MORE! ******** //
// Not only does it read, but it writes too! //

// fsNdjson.writeFile     // use callback or promise
// fsNdjson.writeFileSync // does what you think it does
```

## License

ISC © [Buster Collings](https://about.me/buster)

[npm-image]: https://badge.fury.io/js/fs-ndjson.svg
[npm-url]: https://npmjs.org/package/fs-ndjson
[travis-image]: https://travis-ci.org/busterc/fs-ndjson.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/fs-ndjson
[daviddm-image]: https://david-dm.org/busterc/fs-ndjson.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/fs-ndjson
[coveralls-image]: https://coveralls.io/repos/busterc/fs-ndjson/badge.svg
[coveralls-url]: https://coveralls.io/r/busterc/fs-ndjson
