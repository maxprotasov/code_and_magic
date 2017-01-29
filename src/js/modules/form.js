'use strict';

define( function () {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  var formElements = document.querySelector(".review-form");
  var labelName = document.querySelector(".review-fields-name");
  var labelText = document.querySelector(".review-fields-text");
  var formLabels = document.querySelector(".review-fields");
  var formButton = document.querySelector(".review-submit");
  var inputName = document.querySelector("#review-name");
  var inputArea = document.querySelector("#review-text");
  var radioGroup = document.querySelector(".review-form-group-mark");
  var browserCookies = require("browser-cookies");


  formButton.disabled = true;
  inputName.required = true;

  var checkMark = function() {
    var radioChecked = document.querySelector('input[name=review-mark]:checked');
    if (radioChecked.value < 3) {
      labelText.classList.remove('invisible');
      inputArea.required = true;
    } else {
      labelText.classList.add('invisible');
      inputArea.required = false;
    }

  };

  var checkName = function () {
    inputName.value = browserCookies.get('name') || '';
  };

  var formValidityCheck = function() {
    var formIsValid = inputName.validity.valid && inputArea.validity.valid;
    formButton.disabled = !formIsValid;
    formLabels.classList.toggle('invisible', formIsValid);
  };

  var setRating = function() {
    var ratingFromCookies = browserCookies.get('rating'),
      radios = document.querySelectorAll('input[name=review-mark]');
    if (ratingFromCookies) {
      for (let item of radios) {
        item.checked = ratingFromCookies && (item.value == ratingFromCookies);
      }
    }
  };
  setRating();
  checkName();
  formValidityCheck();
  checkMark();

  var findExpirePeriod = function() {
    var currentYearBirthDate = new Date('2016-04-05'),
      dateNow = new Date();
    currentYearBirthDate.setFullYear(dateNow.getFullYear());
    if (dateNow - currentYearBirthDate <= 0) {
      currentYearBirthDate.setFullYear(currentYearBirthDate.getFullYear() - 1);
    }
    var date = +dateNow - +currentYearBirthDate;
    return new Date(dateNow * 2 - currentYearBirthDate);
  };

  inputName.oninput = function () {
    labelName.classList.toggle('invisible', inputName.validity.valid);
    formValidityCheck();
  };

  inputArea.oninput = function () {
    labelText.classList.toggle('invisible', inputArea.validity.valid);
    formValidityCheck();
  };

  radioGroup.onchange = function() {
    checkMark();
    formValidityCheck();
  };

  formElements.onsubmit = function () {
    var radioChecked = document.querySelector('input[name=review-mark]:checked');
    browserCookies.set('rating', radioChecked.value, {
      expires: findExpirePeriod()
    });
    browserCookies.set('name', inputName.value, {
      expires: findExpirePeriod()
    });

  };

  return form;
});
