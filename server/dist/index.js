import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));
import ejs from 'ejs';
import { sendEmail } from './config/mail.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import Routes from './routes/index.js';
import { Server } from 'socket.io';
import { setupSocket } from './socket.js';
import { createServer } from 'http';
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL
    }
});
export { io };
setupSocket(io);
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.set('view engine', 'ejs');
app.set('views', path.resolve(_dirname, './views'));
app.use(applimiter);
app.use(Routes);
app.get('/', async (req, res) => {
    const html = await ejs.renderFile(_dirname + `/views/emails/welcome.ejs`, {
        name: "Deepanshu"
    });
    await sendEmail("kebade2664@bulatox.com", 'Testing SMTP', html);
    await emailQueue.add(emailQueueName, { to: 'kebade2664@bulatox.com', subject: 'Testing queue email', body: html });
    //  res.render('emails/welcome',{name:"Deepanshu"});
    res.json({ msg: "Email send successfully" });
});
import './jobs/index.js';
import { emailQueue, emailQueueName } from './jobs/EmailJob.js';
import { applimiter } from './config/ratelimit.js';
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
