import { REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD } from 'src/utils/regex';
import { validateDomainEmail } from './validateDomainEmail';
import { Users } from '@prisma/client';

function validateFirstname(firstname: string): boolean {
  if (RegExp(REGEX_NAME).test(firstname)) {
    return true;
  }
  throw new Error('Invalid firstname');
}

function validateLastname(lastname: string): boolean {
  if (RegExp(REGEX_NAME).test(lastname)) {
    return true;
  }
  throw new Error('Invalid lastname');
}

function validateEmail(email: string): boolean {
  if (RegExp(REGEX_EMAIL).test(email)) {
    if (validateDomainEmail(email)) {
      return true;
    }
    throw new Error('Invalid domain email');
  }
  throw new Error('Invalid email');
}

function validatePassword(password: string): boolean {
  if (RegExp(REGEX_PASSWORD).test(password)) {
    return true;
  }
  throw new Error(
    'Password must contain at least 10 characters, 1 uppercase, 1 lowercase, 1 number, no special characters',
  );
}

export function validateUser(user: Users): boolean {
  if (user.firstname && user.lastname && user.password && user.email) {
    validateFirstname(user.firstname);
    validateLastname(user.lastname);
    validateEmail(user.email);
    validatePassword(user.password);
    return true;
  }
  return false;
}
