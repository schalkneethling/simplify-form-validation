(function() {
  ("use strict");

  const contactUsForm = document.getElementById("contact-us");

  /**
   * Hides all form error messages
   */
  function hideFormErrors() {
    let validationMessages = [
      ...document.querySelectorAll(".notification.error")
    ];
    validationMessages.forEach(function(msg) {
      msg.classList.add("hidden");
    });
  }

  /**
   * Add and show relevant errors on the specified form
   * @param {Object} form - The HTMLForm object
   * @param {Object} validationErrors - Form validation errors as an Object
   */
  function setFormErrors(form, validationErrors) {
    let objectKeys = Object.keys(validationErrors);

    hideFormErrors();

    objectKeys.forEach(function(key) {
      let fieldErrorContainer = form.querySelector(`#${key}-error`);
      fieldErrorContainer.innerText = validationErrors[key];
      fieldErrorContainer.classList.remove("hidden");
    });
  }

  /**
   * Initialize and return a new XMLHTTPRequest
   * @param {String} method - The HTTP method such as GET or POST
   * @param {String} url - The URL to which the request will be made
   * @returns And XMLHTTPRequest Object with a `responseType` of json
   */
  function initAjaxRequest(method, url) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.resposeType = "json";
    return xmlHttpRequest;
  }

  /**
   * Wraps the `ajaxRequest` in a `Promise` and returns the `Promise`
   * @param {Object} ajaxRequest - The XMLHttpRequest object
   * @returns The `ajaxRequest` as a `Promise`
   */
  function getAjaxResponse(ajaxRequest) {
    return new Promise((resolve, reject) => {
      ajaxRequest.onreadystatechange = () => {
        if (ajaxRequest.readyState === 4) {
          if (ajaxRequest.status === 200 && ajaxRequest.responseText !== "") {
            resolve(ajaxRequest.responseText);
          } else {
            reject(
              `Ajax error: ${ajaxRequest.status} : ${ajaxRequest.responseText}`
            );
          }
        }
      };
    });
  }

  contactUsForm.addEventListener("submit", event => {
    event.preventDefault();

    let formData = new URLSearchParams(new FormData(contactUsForm)).toString();
    let ajaxRequest = initAjaxRequest("post", "/contactus");

    ajaxRequest.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    ajaxRequest.send(formData);

    getAjaxResponse(ajaxRequest).then(data => {
      let parsedJSON = JSON.parse(data);

      if (!data.valid) {
        setFormErrors(contactUsForm, parsedJSON.invalidFields);
      }
    });
  });
})();
