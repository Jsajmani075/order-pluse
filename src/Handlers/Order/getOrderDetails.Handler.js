import db from "../../db/models"
import { ApiHelper } from "../../utils/api.utils"

export class GetOrderDetailsHandler extends BaseHandler {

  async run() {
    const { id } = this.args

    const findOrder = await db.Order.findOne({
      where: id,
      attirbutes: { exclude: ['createdAt', 'isDeleted', 'updatedAt'] },
    })
    console.log(">>>>>>findOrder>>>>>..", findOrder)
  }

}