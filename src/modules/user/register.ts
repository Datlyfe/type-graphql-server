import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  UseMiddleware
} from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entity/User";
import { RegisterUserInpput } from "./types";
import { IsAuth } from "../../middlewares/isAuth";

@Resolver(User)
export class RegisterResolver {
  @UseMiddleware(IsAuth)
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.lastName} ${parent.firstName}`;
  }

  @Mutation(() => User)
  async register(@Arg("user") userInput: RegisterUserInpput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    const user = await User.create({
      ...userInput,
      password: hashedPassword
    }).save();
    return user;
  }
}
