const validationResponses = {
  contactUs: invalidFields => {
    const messages = {
      name: "Please enter your name",
      contactNumber: "Please provide a telephone number where we may reach you"
    };
    let responseMesssages = {};

    invalidFields.forEach(field => {
      responseMesssages[field] = messages[field];
    });

    return responseMesssages;
  }
};

module.exports = validationResponses;
