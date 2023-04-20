import {v4 as uuidv4} from "uuid";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class HelperFiles {
    constructor() {
    }

    static makeImgReturnPath(logo){
        console.log('logo', logo)
        const ext = path.extname(logo.name);
        let fileName = uuidv4() + ext;
        console.log('fileName', fileName)
        logo.mv(path.resolve(__dirname, '..', 'static/img', fileName));

        return 'img/' + fileName
    }

    static dellFile(img, callback){
        console.log(img)
        const filePath = path.resolve(__dirname, '..', 'static', img);
        console.log(filePath)

        fs.unlink(filePath, err => {
            if(err) {
                callback({status: 'error', data: err})
            }
            callback({status: 'success', data: true})
        });
    }
}