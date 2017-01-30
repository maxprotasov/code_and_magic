'use strict';

define ( function () {
  return {
    /** @param {function(Array.<Object>)} callback */
    getReviews : function (url, callback) {
      var reviewsBlock = document.querySelector('.reviews'),
        xhr = new XMLHttpRequest();

      reviewsBlock.classList.add('reviews-list-loading');

      xhr.addEventListener('load', function (event) {
        callback(JSON.parse( event.target.response));
      });

      var failedToLoad = function () {
        reviewsBlock.classList.add('reviews-load-failure');
        reviewsBlock.classList.remove('reviews-list-loading');
      };

      xhr.addEventListener('error', failedToLoad());

      xhr.timeout = 5000;
      xhr.addEventListener('timeout', failedToLoad());

      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == 4) {
          reviewsBlock.classList.remove('reviews-list-loading');
        }
      });

      xhr.open('GET', url );
      xhr.send();

    }
  }
});
