import { StatusCodes } from "http-status-codes";

export const Errors = {
  ORDER_NOT_FOUND: {
    name: "Order Not Found",
    message: "Order Not Found",
    explanation:
      "ORder did not found with this request.",
    code: 1001,
    httpStatusCode: 400,
  },
  INTERNAL_ERROR: {
    name: "InternalServerError",
    message: "Internal Server Error",
    explanation:
      "An unexpected error occurred while processing your request. Please try again later.",
    code: 1002,
    httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
}