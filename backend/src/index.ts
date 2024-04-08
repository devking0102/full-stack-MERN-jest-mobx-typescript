import app from "../app"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import chalk from "chalk"

mongoose.connect('mongodb://127.0.0.1:27017/studentQA').then(() => {
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
})
const port = process.env.PORT || 5000

app.listen(port, ():void => {
    console.log(`${chalk.green('✓')} ${chalk.blue('Server is running at http://localhost:')}${port}`);
})