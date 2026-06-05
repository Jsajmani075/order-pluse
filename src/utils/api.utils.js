import { createError } from "../errors/app.error"
import { Errors } from "../errors/errorCode"

export class ApiHelper {
  static sendResponse({ req, res, next }, data) {
    try {
      if (data) {
        res.payload = { data, errors: [] }
        const statusCode =
          req?.context?.statusCode ||
          res.statusCode ||
          200;
        res.status(statusCode).json({ ...res.payload })
      } else {
        next(createError(Errors.INTERNAL_SERVER_ERROR))
      }
    }
    catch (error) {
      next(createError(Errors.INTERNAL_SERVER_ERROR))
    }
  }
  static getPagination(pageNo = 1, limit = 10) {
    pageNo = Math.max(1, Number(pageNo) || 1)
    limit = Math.max(1, Number(limit) || 5)
    return { pageNumber: pageNo, limit, offset: (pageNo - 1) * limit }
  }

}