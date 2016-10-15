'use strict';

window.form = (function() {
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

  return form;
})();

var formElements = document.querySelector('.review-form').elements;

var marksBlock = document.querySelector('.review-form-group-mark');
var marks = formElements['review-mark'];

var nameField = formElements['review-name'];
var textField = formElements['review-text'];

var nameLink = document.querySelector('.review-fields-name');
var textLink = document.querySelector('.review-fields-text');
var submitBtn = document.querySelector('.review-submit');
var linksBlock = document.querySelector('.review-fields');

nameField.required = true;
textLink.classList.add('invisible');
submitBtn.disabled = true;

function toggleClass(element, className, shouldAdd) {

  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }

}

function getRadioValue() {
  for (var i = 0; i < marks.length; i++) {

    if (marks[i].checked) {
      return marks[i].value;
    }

  }
  return '';
}

function checkFormValid() {
  var isFormValid = nameField.validity.valid && textField.validity.valid;

  submitBtn.disabled = !isFormValid;
  toggleClass(linksBlock, 'invisible', isFormValid);
  toggleClass(textLink, 'invisible', textField.validity.valid);
  toggleClass(nameLink, 'invisible', nameField.validity.valid);
}

marksBlock.onchange = function() {
  var isRatingBad = Number(getRadioValue()) <= 2;

  textField.required = isRatingBad;

  checkFormValid();
};

nameField.oninput = checkFormValid;

textField.oninput = checkFormValid;
