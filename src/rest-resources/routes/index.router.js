import express from 'express'
import orderRouter from './order.router'

const router = express.Router()

router.use(orderRouter)

export default router
