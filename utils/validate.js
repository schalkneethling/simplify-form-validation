const validationReponses = require("./validation-responses");

const validate = {
  contactUs: formData => {
    let invalidFields = [];
    let valid = true;

    Object.keys(formData).forEach(entry => {
      if (formData[entry].trim() === "") {
        invalidFields.push(entry);
        valid = false;
      }
    });

    return {
      valid,
      invalidFields: invalidFields.length
        ? validationReponses.contactUs(invalidFields)
        : invalidFields
    };
  }
};

module.exports = validate;
