export const REGEX_NAME =
  '[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜíîàáâãäåæçèéêëïñòóôõöøœùúûüýÿ\\- ]{3,30}';
export const REGEX_LONGTEXT =
  '[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜíîàáâãäåæçèéêëïñòóôõöøœùúûüýÿ\\- 0-9]{3,150}';
export const REGEX_SHORTTEXT =
  '[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜíîàáâãäåæçèéêëïñòóôõöøœùúûüýÿ\\- 0-9]{3,50}';
export const REGEX_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
export const REGEX_PASSWORD =
  '^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[<>$"\']).*$'; // 10 characters, 1 uppercase, 1 lowercase, 1 number, no special characters
export const REGEX_ROLE_NAME = '^[a-zA-Z]{2,10}$';
export const REGEX_MESSAGE_CONTENT =
  '[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜíîàáâãäåæçèéêëïñòóôõöøœùúûüýÿ\\- 0-9]{3,4000}';
