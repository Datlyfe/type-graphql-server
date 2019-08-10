import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import { User } from "../../entity/User";
import { RegisterUserInpput } from "./types";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Query(()=> User)
  async getUser(){
    
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.lastName} ${parent.firstName}`;
  }

  @Mutation(() => User)
  async register(@Arg("user") userInput: RegisterUserInpput): Promise<User> {
    const user = await User.create(userInput).save();
    return user;
  }
}
