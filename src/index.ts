import express from 'express'
import loginRoute from './login/login-route'
import registerRoute from './registro/registro-route'
import ingresoRoute from './ingresos/ingresos-route'
import gastoRoute from './gastos/gastos-route'
import prestamoRoute from './prestamos/prestamos-route'
import { errorHandler } from './middlewares/errorHandler'


const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = process.env.PORT!;

// endpoint login: /api/login
app.use("/api", loginRoute);
// endpoint registro: /api/register 
app.use("/api", registerRoute);

// endpoint registrar ingresos: /api/registro-ingreso
// endpoint eliminar registro ingreso: /api/ingreso/:id
app.use("/api", ingresoRoute);

// endpoint registrar gastos: /api/registro-gasto
// endpoint eliminar registro gasto: /api/gasto/:id
app.use("/api", gastoRoute)

// endpoint registrar prestamo: /api/registro-prestamo
// endpoint eliminar registro prestamo: /api/prestamo/:id
app.use("/api", prestamoRoute);

app.use(errorHandler);


app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})