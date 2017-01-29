'use strict';

define([
  './utils',
  './render',
  './load'
],  function( utils,render,load ) {
  return function () {
    var showMoreButton = document.querySelector('.reviews-controls-more'),
      filterBlock = document.querySelector('.reviews-filter'),
      elementToClone, reviewsCollection, numberOfCurrentPage = 1;

    /** @const {string} */
    var REVIEWS_URL = '//o0.github.io/assets/json/reviews.json';

    load.getReviews( REVIEWS_URL , function (loadedReviews) {
      var reviewsFromServer = loadedReviews;
      reviewsCollection = utils.makeReviewsCollection(reviewsFromServer);
      render.setNumberOfReviews(reviewsCollection);
      numberOfCurrentPage = render.setFilterEnabled( reviewsCollection[utils.selectedFilterId()] );
      filterBlock.addEventListener('click', function (event) {
        if (event.target.tagName == 'INPUT') {
          numberOfCurrentPage = render.setFilterEnabled( reviewsCollection[event.target.id]);
        };
      });
      showMoreButton.addEventListener('click', function () {
        numberOfCurrentPage++;
        render.renderReviews(reviewsCollection[utils.selectedFilterId()], numberOfCurrentPage);
      });
    });
  };
});
