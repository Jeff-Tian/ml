const fs = require('fs');

const filePath1 = 'node_modules/npm/node_modules/graceful-fs/polyfills.js';

const filePath2 = 'node_modules/.pnpm/npm@5.1.0/node_modules/npm/node_modules/graceful-fs/polyfills.js'

const replaceInFile = filePath => fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const modifiedData = data
        .replace(
            /fs\.stat\s+=\s+statFix\(fs\.stat\)/,
            "// fs.stat = statFix(fs.stat)"
        )
        .replace(
            /fs\.fstat\s+=\s+statFix\(fs\.fstat\)/,
            "// fs.fstat = statFix(fs.fstat)"
        )
        .replace(
            /fs\.lstat\s+=\s+statFix\(fs\.lstat\)/,
            "// fs.lstat = statFix(fs.lstat)"
        )
        ;

    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`File ${filePath} modified successfully!`);
    });
});

// replaceInFile(filePath);
replaceInFile(filePath2);