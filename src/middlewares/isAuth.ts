import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../modules/user/types";

export const IsAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("Not Authenticated");
  }
  return next();
};
