import { listDomainEmail } from 'src/utils/listDomainEmail';

export function validateDomainEmail(email: string): boolean {
  const domains = email.substring(email.indexOf('@') + 1, email.indexOf('.'));
  if (listDomainEmail.includes(domains)) {
    return true;
  }
  return false;
}
