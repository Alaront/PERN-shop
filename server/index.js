import express from 'express'
import {config} from "dotenv";
import sequelize from './db.js'
import cors from 'cors';
import * as models from './models/models.js';
import router from './routes/index.js'
import errorHandler from "./middleware/ErrorHandingMiddleware.js"
import fileUpload from 'express-fileupload'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from "path";
import {User, UserShop} from "./models/models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config()

const app = new express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.use(errorHandler)

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