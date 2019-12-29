import { Literal, Record, Static, String, Union } from 'runtypes';

let UserRoleVal = Union(Literal('USER'), Literal('MANAGER'), Literal('ADMIN'));

let UserVal = Record({
  id: String,
  createdAt: String,
  name: String,
  email: String,
  role: UserRoleVal,
});

type UserRole = Static<typeof UserRoleVal>;
type User = Static<typeof UserVal>;

export { UserVal, User, UserRoleVal, UserRole };
