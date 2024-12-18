import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        let obj = [];
        let pathway = path.join(process.cwd(), '/public/songs'); // Fixed process.cwd()

        // Ensure the directory exists
        if (!fs.existsSync(pathway)) {
            return NextResponse.json({ status: 404, message: 'Directory not found' });
        }

        let file1 = fs.readdirSync(pathway);

        if (file1.length > 0) {
            file1.forEach((file) => {
                let pathway = path.join(process.cwd(), `/public/songs/${file}`);
                let subfile = fs.readdirSync(pathway);
                let pathway2 = path.join(process.cwd(), `/public/songs/${file}/${subfile[0]}`);
                let subfile2 = fs.readdirSync(pathway2);
                let arr = [];
                subfile2.forEach(e => {
                    arr.push(encodeURIComponent(e));
                });
                let obj2 = {
                    "name": file.split('-')[0].trim(),
                    "artist": file.split('-')[1].trim(),
                    "image": `/songs/${file}/${subfile[1]}`,
                    "audio": arr
                };
                obj.push(obj2);
            });
        }

        // Update the `audio` property for each object in `obj`
        obj = obj.map(file => {
            file.audio = file.audio.map(e => `/songs/${file.name} - ${file.artist}/audio/${e}`);
            return file;
        });

        // console.log(obj);

        return NextResponse.json(obj);
    } catch (error) {
        console.error(error); // Log any errors
        return NextResponse.json({ status: 500, message: 'Internal server error' });
    }
}
