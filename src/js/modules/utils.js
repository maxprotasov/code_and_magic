'use strict';

define ( function () {
  return {
    selectedFilterId : function () {
      return document.querySelector('input[name=reviews]:checked').id;
    },
    /** @param {Array.<Object>} reviewsObject */
    setEmptyFilterDisabled : function (nameOfList) {
      document.querySelector('#' + nameOfList).disabled = true;
      document.querySelector('label[for=' + nameOfList + ']').classList.add('reviews-filter-item-disabled');
    },
    /**
     * @param {Array.<Object>} loadedReviews
     * @return {Object.Array.<Object>} reviewsObject
     */
    makeReviewsCollection : function (loadedReviews) {
      var list = loadedReviews.slice(0),
        reviewsObject = new Object();

      reviewsObject['reviews-all'] = list;

      reviewsObject['reviews-recent'] = list.filter( function (item) {
        var dateNow = new Date(),
          dateOfPost = new Date(item.date);
        return (dateNow - dateOfPost) <= (4*24*60*60*1000);
      }).sort(function (first, second){
        var firstDate = new Date(first.date),
          secondDate = new Date(second.date);
        return secondDate - firstDate;
      });

      list = loadedReviews.slice(0);

      reviewsObject['reviews-good'] = list.filter( function(item) {
        return item.rating >= 3;
      }).sort(function (first, second){
        return second.rating - first.rating;
      });

      list = loadedReviews.slice(0);

      reviewsObject['reviews-bad'] = list.filter( function(item) {
        return item.rating <= 2;
      }).sort(function (first, second){
        return first.rating - second.rating;
      });

      list = loadedReviews.slice(0);

      reviewsObject['reviews-popular'] = list.sort(function (first, second){
        return second.review_usefulness - first.review_usefulness;
      });

      return reviewsObject;
    }
  }
});
