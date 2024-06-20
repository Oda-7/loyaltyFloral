import { REGEX_ROLE_NAME } from 'src/utils/regex';

export function validateRole(data: string) {
  if (RegExp(REGEX_ROLE_NAME).test(data)) return true;
  throw new Error('Invalid roleName');
}
