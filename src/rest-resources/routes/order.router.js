import { OrderController } from '../controllers/order.controller'
import express from 'express'
import { contextMiddleware } from '../middlewares/context.middleware'
import { createOrderSchema } from '../../json-schema/createOrder.schema'
import { requestValidationMiddleware } from '../middlewares/response.middleware'
import { updateOrderSchema } from '../../json-schema/update.order.schema'
import { deleteRecordSchema } from '../../json-schema/deleteOrder.schema'
const orderRouter = express.Router()

orderRouter.route('/').post(
  requestValidationMiddleware(createOrderSchema),
  contextMiddleware(true),
  OrderController.createOrder)

orderRouter.route('/').put(
  requestValidationMiddleware(updateOrderSchema),
  contextMiddleware(true),
  OrderController.updateOrder
)
orderRouter.route('/:id').delete(
  requestValidationMiddleware(deleteRecordSchema),
  contextMiddleware(true),
  OrderController.deleteOrder
)
orderRouter.route('/').get(contextMiddleware(false), OrderController.getAllOrders)
orderRouter.route('/:id').get(contextMiddleware(false), OrderController.getOrderDetails)

export default orderRouter
