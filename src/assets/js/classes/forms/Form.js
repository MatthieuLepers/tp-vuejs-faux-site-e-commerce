/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Form {
  /**
   * @param {Object} data key <=> Value pairs
   * @exemple Name: { value: '', validator: Validator.validateNotEmpty }
   *    validator param is optional, this result to an always validate data
   * @exemple Name: { value: '', validator: Validator.validateString, args: [1] }
   *    args are arguments to pass to validator function
   * @exemple Name: { value: '', validator: Validator.validateString, args: [1], optional: true }
   *    optional params to validate data when empty, validation appear when not empty
   */
  constructor(data = {}) {
    if (Object.getPrototypeOf(this).constructor.name === 'Form') {
      throw new Error('Cannot instanciate Abstract class.');
    }
    this.data = data;
    Object.keys(this.data).forEach((key) => {
      this.data[key].$default = JSON.parse(JSON.stringify(this.data[key].value));
    });
    this.errors = [];
    this.subFormList = {};
    this.successMsg = '';
    this.defineAccessors();
  }

  /**
   * Get all form datas
   * @return {Object}
   */
  getDatas() {
    const resultData = {};

    // Current form
    Object
      .entries(this.data)
      .forEach((entry) => {
        const [key, value] = entry;
        resultData[key] = value.value;
      })
    ;

    // Subforms
    Object
      .entries(this.subFormList)
      .forEach((entry) => {
        const [key, value] = entry;
        resultData[key] = value.getDatas();
      })
    ;
    return resultData;
  }

  /**
   * Get a subForm by identifier
   * @param {String} subFormIdentifier
   * @return {Form|null}
   */
  getSubForm(subFormIdentifier) {
    if (this.subFormList[subFormIdentifier]) {
      return this.subFormList[subFormIdentifier];
    }
    return null;
  }

  /* ----- Setters ----- */
  /**
   * Set a value by his key
   * @param {String} key
   * @param {String|Number|null} value
   * @return {this}
   */
  setData(key, value = null) {
    if (this.data[key] && value) {
      this.data[key].value = value;
    }
    return this;
  }

  /**
   * Set multiple datas at same time
   * @param {Object} data
   * @return {this}
   */
  setDatas(data = {}) {
    this.reset();
    Object.keys(data).forEach((key) => {
      // Is a Subform
      if (typeof this[key] === 'object' && this[key] !== null && !Array.isArray(this[key])) {
        this[key].setDatas(data[key] || {});
      } else { // Not a Subform
        this.setData(key, data[key]);
      }
    });
    return this;
  }

  /* ----- Booleans ----- */
  /**
   * Validate a data with Validator function
   * @param {String} key
   * @param {...any} args Other params to pass to validate function
   * @return {Boolean}
   */
  isDataValid(key, ...args) {
    if (this.data[key]) {
      if (typeof this.data[key].validator === 'function' && ((this.isOptional(key) && !this.isEmpty(key)) || (!this.isOptional(key)))) {
        return this.data[key].validator(this.data[key].value, ...args.concat(this.data[key].args || []));
      }
      return true;
    }
    return false;
  }

  /**
   * Check if a field is optional (to disable validator where empty for example)
   * @param {String} key
   * @return {Boolean}
   */
  isOptional(key) {
    return this.data[key].optional || false;
  }

  /**
   * Check if a field is empty or not
   * @param {String} key
   * @return {Boolean}
   */
  isEmpty(key) {
    let result = false;
    if (typeof this.data[key].value === 'number') {
      result = this.data[key].value !== 0;
    } else if (typeof this.data[key].value === 'string') {
      result = !this.data[key].value.length;
    }
    return result;
  }

  /**
   * @return {Boolean}
   */
  isValid() {
    // SubForms validation
    const subFormListValid = !Object.keys(this.subFormList).length
      ? true
      : Object.values(this.subFormList).map(subForm => subForm.isValid()).reduce((acc, val) => acc && val, true)
    ;
    return Object
      .keys(this.data)
      .map(key => this.isDataValid(key))
      .reduce((acc, val) => acc && val, true)
      && subFormListValid
    ;
  }

  /* ----- Actions ----- */
  /**
   * Add a subform to the current form
   * @param {Form} form
   * @return {String} Identifier of the subForm for getSubForm
   */
  addSubForm(form, identifier = null) {
    const subFormIdentifier = identifier || Object.prototype.getPrototypeOf(form).constructor.name.replace('Form', '').toLowerCase();
    this.subFormList[subFormIdentifier] = form;

    // Subform accessors
    Object.defineProperty(this, subFormIdentifier, {
      get: () => this.subFormList[subFormIdentifier],
      set: (data) => { this.subFormList[subFormIdentifier].setDatas(data); },
    });
    return subFormIdentifier;
  }

  /**
   * Define data key accessors get and set
   */
  defineAccessors() {
    // Data accessors
    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.data[key].value,
        set: (value) => { this.data[key].value = value; },
      });
    });
  }

  /**
   * Push an error
   * @param {String} error
   * @return {this}
   */
  pushError(error = '') {
    this.errors.push(error);
    return this;
  }

  /**
   * @param {Boolean} subFormClear
   * @return {this}
   */
  clearErrors(subFormClear = true) {
    this.errors = [];
    if (subFormClear) {
      Object
        .values(this.subFormList)
        .forEach((subForm) => { subForm.clearErrors(); })
      ;
    }
    return this;
  }

  /**
   * Set a success message
   * @param {String} message
   * @return {this}
   */
  setSuccessMessage(message) {
    this.successMsg = message;
    return this;
  }

  /**
   * Clear errors and success message
   * @param {Boolean} subFormClear
   * @return {this}
   */
  clearMessages(subFormClear = true) {
    this.clearErrors(subFormClear);
    this.successMsg = '';
    if (subFormClear) {
      Object
        .values(this.subFormList)
        .forEach((subForm) => { subForm.clearMessages(); })
      ;
    }
    return this;
  }

  /**
   * Reset form
   * @return {this}
   */
  reset(subFormClear = true) {
    Object.keys(this.data).forEach((key) => {
      this.data[key].value = this.data[key].$default;
    });
    this.clearMessages(subFormClear);
    if (subFormClear) {
      Object
        .values(this.subFormList)
        .forEach((subForm) => { subForm.reset(); })
      ;
    }
    return this;
  }
}
