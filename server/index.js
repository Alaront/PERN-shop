import express from 'express'
import {config} from "dotenv";
import sequelize from './db.js'
import cors from 'cors';
import * as models from './models/models.js';
import router from './routes/index.js'

config()

const app = new express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.get('/', (req, res) => {
    res.json('work')
})

const startServer = async () => {
  try {
      await sequelize.authenticate();
      await sequelize.sync();

      app.listen(PORT, () => {
          console.log('Server started ', PORT)
      })
  }  catch (e) {
      console.log(e)
  }
}

startServer()