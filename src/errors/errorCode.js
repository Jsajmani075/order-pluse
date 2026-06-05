
export const Errors = {
  ORDER_NOT_FOUND: {
    name: "Order Not Found",
    message: "Order Not Found",
    explanation:
      "Order did not found with this request.",
    code: 1001,
    httpStatusCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    name: "InternalServerError",
    message: "Internal Server Error",
    explanation:
      "An unexpected error occurred while processing your request. Please try again later.",
    code: 1002,
    httpStatusCode: 500,
  },
  REQUEST_INPUT_VALIDATION_ERROR: {
    name: 'RequestInputValidationError',
    message: 'Please check the request data',
    explanation: 'An unexpected error occurred while processing your request. Please try again later.',
    httpStatusCode: 400,
    code: 1003,
  },
}