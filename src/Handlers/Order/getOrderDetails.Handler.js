import db from '../../db/models';
import { BaseHandler } from '../../Libs/base.handler';

export class GetOrderDetailsHandler extends BaseHandler {
  async run() {
    const { id } = this.args;

    const order = await db.Order.findOne({
      where: { id },
      attributes: {
        exclude: ['updatedAt']
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return {
      success: true,
      data: order
    };
  }
}