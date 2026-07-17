import express from 'express'
import { LoginController } from './controllers/login/login-controller'
const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = 3000

app.post('/api/login', LoginController)

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})