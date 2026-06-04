import express from 'express'
import router from './routes/index.router'
import { ENV } from '../config/app.config'



const app = express()
const PORT = ENV.PORT
app.use(express.json())
app.use(router)





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})




export default app