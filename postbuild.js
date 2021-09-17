const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// find the styles css file
const files = getFilesFromPath('./dist/portal', '.css');
let data = [];

if (!files && files.length <= 0) {
    console.log('cannot find style files to purge');
    return;
}

for (const f of files) {
    // get original file size
    const originalSize = getFilesizeInKiloBytes('./dist/portal/' + f) + 'kb';
    const o = {file: f, originalSize: originalSize, newSize: ''};
    data.push(o);
}

console.log('Run PurgeCSS...');

exec('purgecss -css dist/portal/*.css --content dist/portal/index.html dist/portal/*.js dist/portal/**/*.js -o dist/portal/', function(error, stdout, stderr) {
    console.log('PurgeCSS done');
    console.log();

    for (const d of data) {
        // get new file size
        const newSize = getFilesizeInKiloBytes('./dist/portal/' + d.file) + 'kb';
        d.newSize = newSize;
    }

    console.table(data);
});

function getFilesizeInKiloBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size / 1024;
    return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
    const files = fs.readdirSync(dir);
    return files.filter(e => path.extname(e).toLowerCase() === extension);
}
