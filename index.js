import { execFile } from 'child_process';
import dwebp from 'dwebp-bin';
import fs from 'fs';

// Examples
// 1. ./images (This project inside images folder)
// 2. ../images (Directory above this project inside images folder)
// 3. ../../images (Directory 2 folders above this project inside images folder)
// And it goes on...

if (!process.argv[2].endsWith('/'))
    process.argv[2] += '/';
const path = process.argv[2];

const files = fs.readdirSync(`${path}`).filter(file => file.endsWith('.webp'));
if (!files.length) {
    console.log('No files to convert');
    process.exit(1);
}

for (const file of files) {
    execFile(dwebp, [`${path}${file}`, '-o', `./images/${file.replace('.webp', '.png')}`], error => {
        if (error) throw error;

        console.log(`Converted ${file} to png`)
    });
}