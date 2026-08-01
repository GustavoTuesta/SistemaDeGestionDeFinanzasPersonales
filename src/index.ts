import express from 'express'
import loginRoute from './login/login-route'
import registerRoute from './registro/registro-route'
import registroIngresoRoute from './ingresos/ingresos-route'
import registroGastoRoute from './gastos/gastos-route'
import registrarPrestamoRoute from './prestamos/prestamos-route'

const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = 3000

app.use("/api", loginRoute)
app.use("/api", registerRoute)
app.use("/api", registroIngresoRoute)
app.use("/api", registroGastoRoute)
app.use("/api", registrarPrestamoRoute)

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})