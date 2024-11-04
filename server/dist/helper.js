import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from "moment";
import { supportMimes } from "./config/fileSystem.js";
import { v4 as uuid4 } from 'uuid';
export const formatError = (error) => {
    let errors = {};
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });
    return errors;
};
export const renderEmailEjs = async (fileName, payload) => {
    const _dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(_dirname + `/views/emails/${fileName}.ejs`, payload);
    return html;
};
export const checkDateHourDiff = (date) => {
    const now = moment();
    const tokenSendAt = moment(date);
    const difference = moment.duration(now.diff(tokenSendAt));
    return difference.asHours();
};
export const ImageValidator = (size, mime) => {
    if (bytesToMB(size) > 2) {
        return 'Image size must bev less than 2 MB';
    }
    else if (!supportMimes.includes(mime)) {
        return 'Image must be type of png,jpeg,jpg,webp...';
    }
};
export const bytesToMB = (bytes) => {
    return bytes / (1024 * 1024);
};
export const uploadedFile = async (image) => {
    const imgExt = image.name.split(".")[1];
    const imageName = uuid4() + '.' + imgExt[1];
    const uploadPath = process.cwd() + '/public/images/' + imageName;
    image.mv(uploadPath, (err) => {
        if (err)
            throw err;
    });
    return imageName;
};
