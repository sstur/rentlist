/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCreateInput, PropertyCreateInput } from '@prisma/photon';

type UserInput = UserCreateInput;

type PropertyInput = Omit<PropertyCreateInput, 'images' | 'manager'> & {
  key: string;
  images: Array<string>;
};

import propertiesFixtures from './properties.json';
import usersFixtures from './users.json';

export const properties: Array<PropertyInput> = propertiesFixtures.properties as any;
export const users: Array<UserInput> = usersFixtures.users as any;
