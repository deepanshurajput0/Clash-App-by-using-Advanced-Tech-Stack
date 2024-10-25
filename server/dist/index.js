import express from 'express';
import dotenv from 'dotenv';
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send("<h1> It's working fine </h1>");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
