import db from "../../db/models"
import { AppError } from "../../errors/app.error"
import { Errors } from "../../errors/errorCode"
import { BaseHandler } from "../../Libs/base.handler"

export class UpdateOrderHandler extends BaseHandler {
  async run() {
    const { id, customerName, productName, status } = this.args
    const transaction = this.dbTransaction

    const findOrder = await db.Order.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }, { transaction })

    if (!findOrder) throw new AppError(Errors.ORDER_NOT_FOUND)

    const updatedData = {
      customerName,
      productName,
      status,
    }
    await findOrder.update(updatedData, { transaction })

    return { success: true, message: 'order updated successfully' }
  }
}