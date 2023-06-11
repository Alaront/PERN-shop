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
import {
    Device,
    DeviceInfo,
    Question,
    QuestionAnswer,
    Review,
    ReviewComment,
    User,
    UserOperation,
    UserShop
} from "./models/models.js";
import './cloudinary.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config()

const app = new express();
const PORT = process.env.PORT || 5000;



app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname, 'static/pdf')))
app.get('/', (req, res) => {
    return res.json('this is main page')
})
app.use('/api', router)

app.use(errorHandler)

const startServer = async () => {
  try {
      await sequelize.authenticate();
      await sequelize.sync();
      //await UserOperation.sync({ alter: true })
      //await UserOperation.sync({ force: true })
      app.listen(PORT, () => {
          console.log('Server started ', PORT)
      })
  }  catch (e) {
      console.log(e)
  }
}

startServer()
