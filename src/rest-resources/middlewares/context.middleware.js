import db from "../../db/models";

export const contextMiddleware = (automaticTransaction = false) => {
  return async (req, res, next) => {
    if (automaticTransaction) {
      const t = await db.sequelize.transaction();

      req.context = {
        transaction: t
      };
    }
    else {
      req.context = {};
    }

    next();
  };
};