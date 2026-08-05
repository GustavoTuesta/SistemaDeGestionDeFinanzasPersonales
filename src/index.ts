import express from 'express'
import loginRoute from './login/login-route'
import registerRoute from './registro/registro-route'
import registroIngresoRoute from './ingresos/ingresos-route'
import eliminarRegistroIngresoRoute from './ingresos/ingresos-route';
import registroGastoRoute from './gastos/gastos-route'
import eliminarRegistroGastoRouter from './gastos/gastos-route'
import registrarPrestamoRoute from './prestamos/prestamos-route'
import eliminarRegistroPrestamoRoute from './prestamos/prestamos-route'


const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = 3000

// endpoint login: /api/login
app.use("/api", loginRoute);
// endpoint registro: /api/register 
app.use("/api", registerRoute);


// endpoint registrar ingresos: /api/registro-ingreso
app.use("/api", registroIngresoRoute);
// endpoint eliminar registro ingreso: /api/ingreso/:id
app.use("/api", eliminarRegistroIngresoRoute);

// endpoint registrar gastos: /api/registro-gasto
app.use("/api", registroGastoRoute);
// endpoint eliminar registro gasto: /api/gasto/:id
app.use("/api", eliminarRegistroGastoRouter)

// endpoint registrar prestamo: /api/registro-prestamo
app.use("/api", registrarPrestamoRoute);
// endpoint eliminar registro prestamo: /api/prestamo/:id
app.use("/api", eliminarRegistroPrestamoRoute)

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})