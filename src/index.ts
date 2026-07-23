import express from 'express'
import loginRoute from './routes/login-route'
import registerRoute from './routes/register-route'
import registroIngresoRoute from './routes/registro-ingreso-route'

const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = 3000

app.use("/api", loginRoute)
app.use("/api", registerRoute)
app.use("/api", registroIngresoRoute)

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})