import { AppError } from "../../errors/app.error"
import { Errors } from "../../errors/errorCode"

export const requestValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    if (!result.success) {
      throw new AppError({
        ...Errors.REQUEST_INPUT_VALIDATION_ERROR,
        explanation: result.error.errors
      });

    }
    req.validated = {
      body: result.data.body,
      query: result.data.query,
      params: result.data.params
    }
    next()
  }
}