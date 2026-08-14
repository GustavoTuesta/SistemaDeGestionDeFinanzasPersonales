import express from 'express'
import loginRoute from './modules/login/login-route'
import registerRoute from './modules/registro/registro-route'
import ingresoRoute from './modules/ingresos/ingresos-route'
import gastoRoute from './modules/gastos/gastos-route'
import prestamoRoute from './modules/prestamos/prestamos-route'
import { errorHandler } from './middlewares/errorHandler'


const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = process.env.PORT!;

app.use("/api", loginRoute);

app.use("/api", registerRoute);

app.use("/api", ingresoRoute);

app.use("/api", gastoRoute)

app.use("/api", prestamoRoute);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})