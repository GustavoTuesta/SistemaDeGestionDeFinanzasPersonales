import express from 'express'
import { login } from './controllers/login-controller'
const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = 3000

app.post('/api/login', login)

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})