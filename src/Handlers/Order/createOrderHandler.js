import db from "../../db/models"
import { BaseHandler } from "../../Libs/base.handler"

export class CreateOrderHandler extends BaseHandler {
  async run() {
    const { customerName, productName, status } = this.args
    const transaction = this.dbTransaction
    const order = await db.Order.create(
      {
        customerName,
        productName,
        status
      },
      { transaction }
    );
    return { success: true }
  }
}