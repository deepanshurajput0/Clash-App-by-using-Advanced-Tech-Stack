import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from "moment";
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
