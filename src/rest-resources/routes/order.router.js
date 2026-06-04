import { OrderController } from '../controllers/order.controller'
import express from 'express'
const orderRouter = express.Router()

orderRouter.route('/').post(OrderController.createOrder)
orderRouter.route('/').put(OrderController.updateOrder)
orderRouter.route('/').delete(OrderController.deleteOrder)
orderRouter.route('/').get(OrderController.getAllOrders)
orderRouter.route('/:id').get(OrderController.getOrderDetails)

export default orderRouter
