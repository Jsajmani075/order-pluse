import db from "../../db/models"
import { Errors } from "../../errors/errorCode"

export class DeleteOrderHandler extends BaseHandler {
  async run() {
    const { id } = this.args
    const transaction = this.dbTransaction
    const checkOrder = await db.Order.findOne({
      where: id,
      transaction
    })
    if (!checkOrder) throw new AppError(Errors.ORDER_NOT_FOUND)
    await checkOrder.destroy({ transaction })
    return {
      message: 'Order deleted successfully'
    };
  }
}