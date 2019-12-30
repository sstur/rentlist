import { Array, Literal, Record, Static, String, Union } from 'runtypes';

let UserRoleVal = Union(Literal('USER'), Literal('MANAGER'), Literal('ADMIN'));

let UserVal = Record({
  id: String,
  createdAt: String,
  name: String,
  email: String,
  role: UserRoleVal,
});

let UserInputVal = Record({
  name: String,
  email: String,
  password: String,
  role: UserRoleVal,
});

let UserArrayVal = Array(UserVal);

type UserRole = Static<typeof UserRoleVal>;
type User = Static<typeof UserVal>;
type UserInput = Static<typeof UserInputVal>;

export {
  UserVal,
  UserInputVal,
  UserRoleVal,
  UserArrayVal,
  User,
  UserInput,
  UserRole,
};
