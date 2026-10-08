import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import loginRoute from './modules/login/login-route'
import registerRoute from './modules/registro/registro-route'
import ingresoRoute from './modules/ingresos/ingresos-route'
import gastoRoute from './modules/gastos/gastos-route'
import prestamoRoute from './modules/prestamos/prestamos-route'
import docsRoute from './docs'
import { errorHandler } from './middlewares/errorHandler'


const app = express()
app.use(cors())
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = process.env.PORT || 3000;

app.use("/api", loginRoute);

app.use("/api", registerRoute);

app.use("/api", ingresoRoute);

app.use("/api", gastoRoute)

app.use("/api", prestamoRoute);

// Documentación de endpoints con Scalar (dividida por módulos)
app.use(docsRoute);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Servidor iniciado: http://localhost:${PORT}`)
    console.log(`Documentación Scalar disponible en: http://localhost:${PORT}/docs`)
    console.log(`Especificación OpenAPI en: http://localhost:${PORT}/docs/openapi.json`)
})