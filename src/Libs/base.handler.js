import { createError } from "../errors/app.error"
import { logger } from "./logger"

export class BaseHandler {
  constructor(args = {}, context = {}) {
    this.args = args
    this.context = context
    this.dbTransaction = context?.transaction
  }
  static async execute(args = {}, context = {}) {
    const instance = new this(args, context)
    const startTime = new Date()
    const handlerName = this.name.toUpperCase()
    try {
      logger.info(`------------------------ ${handlerName} - Execution started -----------------------------`)
      const result = await instance.run()
      const duration = new Date() - startTime

      logger.info(`------------------------ ${handlerName} - Execution completed in ${duration}ms-----------------------------`)
      if (instance.dbTransaction) await instance.dbTransaction.commit()
      return result
    } catch (error) {
      if (instance.dbTransaction) {
        logger.error(`-------------- Error in ---------------- ${handlerName} rollback transaction-------`, error)
        await instance.dbTransaction.rollback();
      }
      throw (error)
    }
  }
  async run() {
    throw new createError("The run() method must be implemented in childClass")
  }
}
