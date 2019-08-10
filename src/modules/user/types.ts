import { InputType, Field } from "type-graphql";
import { User } from "../../entity/User";

@InputType({ description: "register user input" })
export class RegisterUserInpput implements Partial<User> {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
