import express, {Application} from "express";
import bodyParser from "body-parser"
import cors from "cors"
import userRoutes from "./routes/user.routes"
import questionRoutes from "./routes/question.routes"
import answerRoutes from "./routes/answer.routes"

const app:Application = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api/user', userRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/answer', answerRoutes)

export default app