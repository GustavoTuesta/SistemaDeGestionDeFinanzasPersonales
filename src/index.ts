import express from 'express'
const app = express()
app.use(express.json()) //middleware que permite transformar la req.body de una peticion a un json

const PORT = 3000

app.get('/test', (req, res) => {
    console.log('Todo funcionando')
    res.send('succesfull')
})

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})