import db from "../../db/models"
import { ApiHelper } from "../../utils/api.utils"

export class GetAllOrderDetailsHandler extends BaseHandler {

  async run() {
    const { offset, limit } = ApiHelper.getPagination(this.args.pageNo, this.args.limit)
    const findOrder = await db.Order.findAndCountAll({
      attirbutes: { exclude: ['isDeleted', 'updatedAt'] },
      limit,
      offset,
      Order: [[id, Desc]]
    })



    console.log(">>>>>>findOrder>>>>>..", findOrder)
  }

}