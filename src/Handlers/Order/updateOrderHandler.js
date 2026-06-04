import db from "../../db/models"
import { Errors } from "../../errors/errorCode"

export class UpdateOrderHandler extends BaseHandler {
  async run() {
    const { id, customerName, productName, status } = this.args

    const findOrder = await db.Order.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }, { transaction })

    if (!findOrder) throw new AppError(Errors.ORDER_NOT_FOUND)
    const updatedData = {
      customerName,
      productName,
      status,
      isDeleted
    }
    await Order.update(updatedData, { transaction })

    return { message: 'order updated successfully' }
  }
}