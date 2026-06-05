import { AppError, createError } from "../../errors/app.error"
import { Errors } from "../../errors/errorCode"
import { logger } from "../../Libs/logger";

export const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, {
    code: err.code,
    statusCode: err.httpStatusCode,
    explanation: err.explanation
  });

  let formatedError = err
  if (!(formatedError instanceof AppError)) {
    formatedError = createError(Errors.INTERNAL_SERVER_ERROR)
  }
  res.status(formatedError.httpStatusCode || 500).send({ data: {}, errors: formatedError.toResponse() })
}