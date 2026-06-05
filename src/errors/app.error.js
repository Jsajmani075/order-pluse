
export class AppError extends Error {
  constructor({ name, message, explanation, httpStatusCode, code }) {
    super(message)
    this.name = name || 'InternalServerError',
      this.message = message || 'An unexpected error occurred',
      this.explanation = explanation || '',
      this.httpStatusCode = httpStatusCode || 500,
      this.code = code || 500
  }
  toResponse() {
    return {
      statusCode: this.httpStatusCode,
      error: this.name,
      message: this.message,
      code: this.code,
      explanation: this.explanation
    }
  }
}
export const createError = (errorType) => {
  if (typeof errorType === "string") {
    return new AppError({ message: errorType })
  }
  return new AppError(errorType)
}