import { String, Record, Static } from 'runtypes';

let AuthInput = Record({
  email: String,
  password: String,
});

type AuthInputType = Static<typeof AuthInput>;

export { AuthInput, AuthInputType };
