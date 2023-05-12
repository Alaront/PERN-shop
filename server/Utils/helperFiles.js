import {v4 as uuidv4} from "uuid";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import * as url from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default class HelperFiles {
    constructor() { }


    static async makeImgReturnPath(photo){
        console.log('logo', photo)
        const ext = path.extname(photo.name);
        let fileName = uuidv4() + ext;
        console.log('fileName', fileName)
        photo.mv(path.resolve(__dirname, '..', 'static/img', fileName));

        const newImgUrl = `${process.env.DOMAIN}/img/${fileName}`;

        let result = {
            public_id: null,
            newUrl: newImgUrl
        };

        try {
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            };

            const data = await cloudinary.uploader.upload(newImgUrl, options);
            console.log('data', data);
            result = {
                public_id: data.public_id,
                newUrl: data.url
            }
            return JSON.stringify(result);
        } catch (error) {
            console.error('error', error);
            return JSON.stringify(result);
        }
    }

    static async dellFile(imgJson, callback){
        try {
            console.log(imgJson)
            const img = JSON.parse(imgJson)

            if(img.public_id) await cloudinary.api.delete_resources(img.public_id)

            const pathSplit = img.newUrl.split('/');
            const pathImg = `${pathSplit[pathSplit.length - 2]}/${pathSplit[pathSplit.length - 1]}`;
            const filePath = path.resolve(__dirname, '..', 'static', pathImg);

            fs.unlinkSync(filePath);
        } catch (e) {
            console.log(e)
        }
    }
}