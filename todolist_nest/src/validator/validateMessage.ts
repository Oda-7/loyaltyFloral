import { Messages } from '@prisma/client';
import { REGEX_LONGTEXT } from 'src/utils/regex';

export function validateMessage(message: Messages) {
  validateContentMessage(message.content);
  return true;
}

function validateContentMessage(message: string) {
  if (RegExp(REGEX_LONGTEXT).test(message)) {
    return true;
  }
  throw new Error('Invalid message content');
}
