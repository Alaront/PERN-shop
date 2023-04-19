import express from 'express'
import {config} from "dotenv";

config()
const app = new express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json('work')
})

app.listen(PORT, () => {
    console.log('Server started ', PORT)
})