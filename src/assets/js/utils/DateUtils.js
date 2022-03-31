/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 * @documentation https://www.php.net/manual/fr/datetime.format.php
 */
export default class DateUtils {
  /**
   * @param {Date} date
   * @return {String}
   */
  static d(date) {
    return `${date.getDate()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static j(date) {
    return date.getDate();
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static N(date) {
    return date.getDay() + 1;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static w(date) {
    return date.getDay();
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  static m(date) {
    return `${date.getMonth() + 1}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static n(date) {
    return date.getMonth() + 1;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static t(date) {
    const data = [31, 27 + this.L(date), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return data[date.getMonth()];
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static L(date) {
    return ((date.getFullYear() % 100) !== 0 || (date.getFullYear() % 400) === 0) ? 1 : 0;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static Y(date) {
    return date.getFullYear();
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static y(date) {
    return parseInt(`${date.getFullYear()}`.substr(2, 2), 10);
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  static G(date) {
    return date.getHours();
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  static H(date) {
    return `${date.getHours()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  static i(date) {
    return `${date.getMinutes()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  static s(date) {
    return `${date.getSeconds()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @param {String} format
   * @return {String}
   */
  static format(date, format) {
    return format
      .split('')
      .map(letter => (typeof DateUtils[letter] === 'function' ? DateUtils[letter](date) : letter))
      .join('')
    ;
  }
}
