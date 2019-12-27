import { String, Record, Static } from 'runtypes';

let UserInput = Record({
  name: String,
  email: String,
  password: String,
});

type UserInputType = Static<typeof UserInput>;

export { UserInput, UserInputType };
