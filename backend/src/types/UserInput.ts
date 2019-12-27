import { String, Record, Static, Undefined, Union, Literal } from 'runtypes';

let UserInput = Record({
  name: String,
  email: String,
  password: String,
  role: Union(Literal('USER'), Literal('MANAGER'), Literal('ADMIN'), Undefined),
});

type UserInputType = Static<typeof UserInput>;

export { UserInput, UserInputType };
