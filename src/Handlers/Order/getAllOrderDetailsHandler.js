import db from "../../db/models"
import { BaseHandler } from "../../Libs/base.handler"
import { ApiHelper } from "../../utils/api.utils"

export class GetAllOrderDetailsHandler extends BaseHandler {

  async run() {
    const { offset, limit, pageNo } = ApiHelper.getPagination(this.args.pageNo, this.args.limit)
    const { count, rows } =
      await db.Order.findAndCountAll({
        attributes: {
          exclude: ['updatedAt']
        },
        limit,
        offset,
        order: [['id', 'DESC']]
      });

    return {
      success: true,
      currentPage: Number(pageNo),
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
      data: rows
    };
  }

}