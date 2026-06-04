import db from "../../db/models"

export class CreateOrderHandler extends BaseHandler {
  async run() {
    const { customerName, productName, status } = this.args

    await db.Order.create({
      customerName, productName, status
    }, { transaction })



    return {}
  }
}