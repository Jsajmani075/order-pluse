import db from "../../db/models"
import { AppError } from "../../errors/app.error"
import { Errors } from "../../errors/errorCode"
import { BaseHandler } from "../../Libs/base.handler"

export class DeleteOrderHandler extends BaseHandler {
  async run() {
    const { id } = this.args
    const transaction = this.dbTransaction
    const checkOrder = await db.Order.findOne({
      where: { id },
      transaction
    })
    if (!checkOrder) throw new AppError(Errors.ORDER_NOT_FOUND)
    await checkOrder.destroy({ transaction })
    return {
      success: true,
      message: 'Order deleted successfully'
    };
  }
}