const fs = require('fs');
const path = require('path');

const packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

module.exports = {
  // output file name
  output: `_dist/${packageJSON.name}_${packageJSON.version}.zip`,

  // ignore file (format: .gitignore)
  ignore: ['.DS_Store', 'thumb.db'],
};
