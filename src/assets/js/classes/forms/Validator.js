/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Validator {
  /**
   * @return {Integer}
   */
  static get MIN_PASSWORD_LENGTH() {
    return 8;
  }

  /**
   * @return {Integer}
   */
  static get MAX_PASSWORD_LENGTH() {
    return 16;
  }

  /**
   * Validate with a regex
   * @param {String} val
   * @param {String} regex
   * @return {Boolean}
   */
  static validateRegex(val, regex) {
    return regex.test(val);
  }

  /**
   * Validate a couple of passwords or a single one
   * @param {String} pass1 First password
   * @param {String|null} pass2 Second password
   * @return {Boolean}
   */
  static validatePasswords(pass1, pass2 = null) {
    const regex = new RegExp(`[a-zA-Z0-9]{${Validator.MIN_PASSWORD_LENGTH},${Validator.MAX_PASSWORD_LENGTH}}`);
    const result = regex.test(pass1)
      && /[0-9]/.test(pass1) // min 1 occurence of 0-9
      && /[a-z]/.test(pass1) // min 1 occurence of a-z
      && /[A-Z]/.test(pass1) // min 1 occurence of A-Z
    ;

    return result && (pass2 === null ? true : pass1 === pass2);
  }

  /**
   * Validate an email address
   * @param {String} email Email to validate
   * @return {Boolean}
   */
  static validateEmail(email) {
    return Validator.validateRegex(email, /.+@.+\..{2,}/);
  }

  /**
   * Validate a string by length
   * @param {String} str
   * @param {Integer} minLen
   * @param {Integer|null} maxLen
   * @return {Boolean}
   */
  static validateString(str, minLen = 0, maxLen = null) {
    return !!str
      && str.length >= minLen
      && (maxLen === null || (maxLen !== null && str.length <= maxLen));
  }

  /**
   * Validate a phone number
   * @param {String} num Phone number (see following valid exemple sample)
   * @valid : 06 00 00 00 00
   * @valid : 0 600 000 000
   * @valid : (+33)6 00 00 00 00
   * @valid : (+33) 6 000 000 00
   * @valid : (+33) 600 000 000
   * @valid : +33 6 00 00 00 00
   */
  static validatePhone(num) {
    return Validator.validateRegex(num, /^(?:(?:\(?\+[0-9]+\)?)|[0-9]+)(?:\s*[0-9]){7,}$/);
  }

  /**
   * Validate a number
   * @param {Number} num
   * @eturn {Boolean}
   */
  static validateNumber(num) {
    return !!((num && !Number.isNaN(parseInt(num, 10))));
  }

  /**
   * Validate a non-null value
   * @param {any} val
   * @return {Boolean}
   */
  static validateNotNull(val) {
    return val !== null;
  }

  /**
   * Validate not empty
   * @param {Number|String|Array|Object} val
   * @return {Boolean|false}
   */
  static validateNotEmpty(val) {
    return (typeof val === 'number' && val !== 0)
      || (typeof val === 'string' && !!val.length)
      || (Array.isArray(val) && !!val.length)
      || (typeof val === 'object' && !!Object.keys(val).length)
      || false;
  }

  /**
   * Validate a postal code
   * @param {String} val
   * @return {Boolean}
   */
  static validatePostalCode(val) {
    return Validator.validateRegex(val, /^[0-9]{4,5}$/);
  }

  /**
   * Validate a datetimepicker string
   * @param {String} val
   * @return {Boolean}
   */
  static validateDateTime(val, dateSeparator = '/', timeSeparator = ':') {
    return Validator.validateRegex(val, new RegExp(`^(?:[0-9]{2}${dateSeparator}){2}[0-9]{4} [0-9]{1,2}(?:${timeSeparator}[0-9]{2}){1,}$`));
  }

  /**
   * Validate a datepicker string
   * @param {String} val
   * @return {Boolean}
   */
  static validateDate(val, separator = '/') {
    return Validator.validateRegex(val, new RegExp(`^(?:[0-9]{2}${separator}){2}[0-9]{4}$`));
  }

  /**
   * Validate a timepicker string
   * @param {String} val
   * @return {Boolean}
   */
  static validateTime(val, separator = ':') {
    return Validator.validateRegex(val, new RegExp(`^[0-9]{1,2}(?:${separator}[0-9]{2}){1,}$`));
  }

  /**
   * @param {any} val
   * @param {Boolean} array
   */
  static validateInArray(val, array = []) {
    return array.indexOf(val) >= 0;
  }
}
