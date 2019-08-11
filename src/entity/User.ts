import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @IsEmail()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  active: boolean;

  @Field()
  name: string;
}
