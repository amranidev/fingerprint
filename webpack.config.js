const path = require('path');

module.exports = {
    "mode": "production",
    "entry": "./src/index.js",
    "output": {
        "path": __dirname + '/dist',
        "filename": "fingerprint.js",
        clean: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
}