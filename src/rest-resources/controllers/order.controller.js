import { CreateOrderHandler } from "../../Handlers/Order/createOrderHandler";
import { DeleteOrderHandler } from "../../Handlers/Order/deleteOrderHandler";
import { GetAllOrderDetailsHandler } from "../../Handlers/Order/getAllOrderDetailsHandler";
import { GetOrderDetailsHandler } from "../../Handlers/Order/getOrderDetails.Handler";
import { UpdateOrderHandler } from "../../Handlers/Order/updateOrderHandler";
import { ApiHelper } from "../../utils/api.utils";

export class OrderController {

  static async createOrder(req, res, next) {
    try {
      req.context.statusCode = 201
      const response = await CreateOrderHandler.execute(req.body, req.context)
      ApiHelper.sendResponse({ req, res, next }, response)

    } catch (error) {
      next(error)
    }
  }

  static async updateOrder(req, res, next) {
    try {

      req.context.statusCode = 204
      const response = await UpdateOrderHandler.execute(req.body, req.context)
      ApiHelper.sendResponse({ req, res, next }, response)

    } catch (error) {
      next(error)
    }
  }

  static async getAllOrders(req, res, next) {
    try {
      const response = await GetAllOrderDetailsHandler.execute(req.query, req.context)
      ApiHelper.sendResponse({ req, res, next }, response)

    } catch (error) {
      next(error)
    }
  }
  static async getOrderDetails(req, res, next) {
    try {
      const response = await GetOrderDetailsHandler.execute(req.params, req.context)
      ApiHelper.sendResponse({ req, res, next }, response)

    } catch (error) {
      next(error)
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      req.context.statusCode = 204
      const response = await DeleteOrderHandler.execute(req.params, req.context)
      ApiHelper.sendResponse({ req, res, next }, response)

    } catch (error) {
      next(error)
    }
  }


}