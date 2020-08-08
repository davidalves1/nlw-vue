import express from 'express'
import routes from './routes'

const app = express()

app.get('/', (req, res) => {
  return res.json({ status: 'OK' })
})

app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
