'use strict';


define([
  './modules/game',
  './modules/form',
  './modules/reviews',
  './modules/gallery'
], function(Game, form, reviews, Gallery){
  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };

  reviews();

  var galleryPicturesLinks = document.querySelectorAll('.photogallery-image');

  var galleryPictures = document.querySelectorAll('.photogallery-image img');

  var pictures = Array.prototype.map.call(galleryPictures, function(picture) {
    return picture.src;
  });

  var gallery = new Gallery(pictures);
  Array.prototype.forEach.call(galleryPicturesLinks, function(picture, activePicture) {
    picture.onclick = function() {
      gallery.show(activePicture);
    };
  });

});
