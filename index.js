import { execFile } from 'child_process';
import dwebp from 'dwebp-bin';
import fs from 'fs';
convert();

function convert() {
    const path = process.argv[2];

    if (!path || !path.includes('.') || !path.endsWith('/'))
        return console.log('Please provide a path to the folder containing the webp files! (e.g. "node index.js ../" or "node . ../" or "node . ../emotes")');

    const files = fs.readdirSync(`${path}`).filter(file => file.endsWith('.webp'));
    if (!files.length) return console.log('No files to convert');

    for (const file of files) {
        execFile(dwebp, [`${path}${file}`, '-o', `./images/${file.replace('.webp', '.png')}`], error => {
            if (error) throw error;

            console.log(`Converted ${file} to png`)
        });
    }
}