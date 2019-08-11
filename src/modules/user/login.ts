import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entity/User";
import { MyContext } from "./types";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Failed Login")
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Failed Login")
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
