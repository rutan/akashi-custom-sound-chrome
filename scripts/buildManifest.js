const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const YAML = require('yaml');

const PACKAGE_JSON_PATH = path.resolve(__dirname, '..', 'package.json');
const SRC_PATH = path.resolve(__dirname, '..', 'manifest.yml');
const DIST_PATH = path.resolve(__dirname, '..', 'app', 'manifest.json');

function build() {
  const src = fs.readFileSync(SRC_PATH, 'utf-8');
  const text = ejs.render(src, {
    version: JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8')).version,
  });
  const data = YAML.parse(text);
  fs.writeFileSync(DIST_PATH, JSON.stringify(data, null, 2));
  console.log(`compile to ${DIST_PATH}`);
}

const isWatchMode = process.argv.some((n) => n === '-w');

if (isWatchMode) {
  const chokidar = require('chokidar');
  const watcher = chokidar.watch(SRC_PATH);
  watcher.on('add', build);
  watcher.on('change', build);
} else {
  build();
}
