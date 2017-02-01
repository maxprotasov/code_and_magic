'use strict';

define (['./utils'], function(utils) {
  return {
    /**
     * @param {Object} data
     * @param {HTMLElement} container
     * @return {HTMLElement}
     */
    renderReviewElement : function (data, container) {
      var elementToClone,
        templateElement = document.querySelector ('template');

      if ( 'content' in templateElement ) {
        elementToClone = templateElement.content.querySelector ('.review');
      } else {
        elementToClone = templateElement.querySelector ('.review');
      }

      var element = elementToClone.cloneNode(true);
      element.querySelector('.review-author').alt = data.author.name;

      var reviewRating = element.querySelector('.review-rating');
      switch ( data.rating ) {
        case 1:
          reviewRating.classList.add('review-rating-one');
          break;
        case 2:
          reviewRating.classList.add('review-rating-two');
          break;
        case 3:
          reviewRating.classList.add('review-rating-three');
          break;
        case 4:
          reviewRating.classList.add('review-rating-four');
          break;
        case 5:
          reviewRating.classList.add('review-rating-five');
          break;
      }

      var avatarImage = new Image (),
        image = element.querySelector('.review-author');

      avatarImage.addEventListener('load', function (event) {
        image.src = event.target.src;
        image.style.width = '124px';
        image.style.height = '124px';
      });

      avatarImage.addEventListener('error', function () {
        element.classList.add('review-load-failure');
      });

      avatarImage.src = data.author.picture;

      element.querySelector('.review-text').textContent = data.description;

      container.appendChild (element);
      return element;
    },
    /**
     * @param {Array.<Object>} reviews
     * @param {number} page
     * @param {boolean} rewrite
     */
    renderReviews : function (reviewsFiltered, page, rewrite) {

      var showMoreButton = document.querySelector('.reviews-controls-more');
      /** @const {number} */
      var REVIEWS_PER_PAGE = 3;
      var reviewsContainer = document.querySelector ('.reviews-list'),
        firstReview = (page - 1) * REVIEWS_PER_PAGE,
        listOfCurrentPage = reviewsFiltered.slice( firstReview , firstReview + REVIEWS_PER_PAGE ),
        rewrite = rewrite || false,
        lastPage = page * REVIEWS_PER_PAGE >= reviewsFiltered.length,
        renderReviewElement = this.renderReviewElement;
      if (rewrite) {
        reviewsContainer.innerHTML = ''
      }
      listOfCurrentPage.forEach (function (item) {
        renderReviewElement (item, reviewsContainer);
      });
      showMoreButton.classList.toggle('invisible', lastPage);
    },
    /** @param {Object.Array.<Object>} reviewsObject */
    setNumberOfReviews : function (reviewsObject) {
      for (let key in reviewsObject) {
        var parentElement = document.querySelector('label[for=' + key + ']'),
          sup = document.createElement('sup');
        sup.textContent = reviewsObject[key].length;
        parentElement.appendChild(sup);

        if (reviewsObject[key].length == 0) {
          utils.setEmptyFilterDisabled(key);
        }
      }
    },
    /** @param {string} filter */
    setFilterEnabled : function (currentListOfReviews) {
      var numberOfCurrentPage = 1;
      this.renderReviews(currentListOfReviews, numberOfCurrentPage, true);
      return numberOfCurrentPage;
    }
  }
});
