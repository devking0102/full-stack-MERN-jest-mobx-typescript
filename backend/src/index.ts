import app from "../app"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017/studentQA')
const port = process.env.PORT || 5000

app.listen(port, ():void => {
    console.log(`Server is running at http://localhost:${port}`);
})