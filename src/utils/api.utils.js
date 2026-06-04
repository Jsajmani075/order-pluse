export class ApiHelper {

  static getPagination(pageNo = 1, limit = 10) {
    pageNo = Math.max(1, Number(pageNo) || 1)
    limit = Math.max(1, Number(limit) || 10)

    return { offset: (pageNo - 1) * limit, limit, pageNo }
  }
  static sendResponse({ req, res, next }, data) {
    try {
      if (data && !_.isEmpty(data)) {
        res.payload = { data, errors: [] }
        const statusCode = res.statusCode || req?.context?.statusCode || StatusCodes.OK
        res.status(statusCode).json({ ...res.payload })
      } else {
        next(createError(Errors.INTERNAL_ERROR))
      }
    }
    catch (error) {
      next(createError(Errors.INTERNAL_ERROR))
    }
  }
}