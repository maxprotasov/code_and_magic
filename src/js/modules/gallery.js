'use strict';

define( function () {

  var Gallery = function (src) {
    this.pictures = src;
    this.activePicture = null;
    this.galleryContainer = document.querySelector('.overlay-gallery');
    this.galleryClose = this.galleryContainer.querySelector('.overlay-gallery-close');
    this.controlPrevious = this.galleryContainer.querySelector('.overlay-gallery-control-left');
    this.controlNext = this.galleryContainer.querySelector('.overlay-gallery-control-right');
    this.numberCurrentImg = this.galleryContainer.querySelector('.preview-number-current');
    this.numberTotalImg = this.galleryContainer.querySelector('.preview-number-total');

    this.numberTotalImg.innerText = this.pictures.length;

  };
  Gallery.prototype = {

    show: function(activePicture) {
      var self = this;

      this.galleryClose.onclick = function() {
        self.hide();
      };

      this.controlPrevious.onclick = function() {
        self.showPrevious();
      };

      this.controlNext.onclick = function() {
        self.showNext();
      };

      this.galleryContainer.classList.remove('invisible');

      this.setActivePicture(activePicture);
    },

    showPrevious: function () {
      if (this.activePicture > 0) {
        this.setActivePicture(this.activePicture - 1);
      }
    },

    showNext: function () {
      if (this.activePicture < this.pictures.length - 1) {
        this.setActivePicture(this.activePicture + 1);
      }
    },

    hide: function () {
      this.galleryContainer.classList.add('invisible');
      this.galleryClose.onclick = null;
      this.controlPrevious.onclick = null;
      this.controlNext.onclick = null;
    },
    setActivePicture: function (activePicture) {
      var galleryPreview = document.querySelector('.overlay-gallery-preview');
      this.activePicture = activePicture;

      var image = new Image();

      image.src = this.pictures[activePicture];
      if (galleryPreview.lastElementChild.nodeName === 'IMG') {
        galleryPreview.replaceChild(image, galleryPreview.lastElementChild);
      } else {
        galleryPreview.appendChild(image);
      }

      this.numberCurrentImg.innerText = activePicture + 1;

    }
  };
  return Gallery;
});
