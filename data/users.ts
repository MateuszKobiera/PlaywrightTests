import { User } from '../models/user';
import { faker } from '@faker-js/faker';
import avatars from '../data/avatars.json';

const firstname = faker.person.firstName().replace(/[^a-zA-Z0-9]/g, '');
const lastname = faker.person.lastName().replace(/[^a-zA-Z0-9]/g, '');
const email = firstname.toLowerCase() + '.' + lastname.toLowerCase() + '@example.com';

export const validUser: User = {
  firstname: firstname,
  lastname: lastname,
  email: email,
  password: faker.internet.password(),
  birthdate: faker.date.birthdate().toISOString().split('T')[0],
  avatar: faker.helpers.arrayElement(avatars.avatarOptions)
};
