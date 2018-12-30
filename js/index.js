// Search-form pop-up
var searchForm = document.querySelector('.search-form');
var formOpenBtn = document.querySelector('.hotel-search__button');
var formInputCheckIn = searchForm.querySelector('#check-in-date');
var formAdults = searchForm.querySelector('#adults');
var formChilds = searchForm.querySelector('#childs');
var formSubmit = searchForm.querySelector('.search-form__submit-btn');
var fields = searchForm.querySelectorAll('.input');
var keys = {
  'Tab': 9,
  'Esc': 27
};

var clearStatus = function() {
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].classList.contains('input--error')) {
      fields[i].classList.remove('input--error');
    }
    if (fields[i].hasAttribute('aria-invalid')) {
      fields[i].removeAttribute('aria-invalid');
    }
  }
};

formOpenBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  clearStatus();
  if ((!searchForm.classList.contains('search-form--closed') && !searchForm.classList.contains('search-form--opened')) || searchForm.classList.contains('search-form--closed')) {
    searchForm.classList.remove('search-form--closed');
    searchForm.offsetWidth = searchForm.offsetWidth;
    searchForm.classList.add('search-form--opened');
    formOpenBtn.setAttribute('aria-label', 'Закрыть форму поиска гостиниц');
    setTimeout(function() {fields[0].focus();}, 600); // used to set timeout cause the first frame of animation has visibility: hidden

    window.addEventListener('keydown', function(evtEsc) {
      if (evtEsc.keyCode === keys['Esc']) {
        evtEsc.preventDefault();
        searchForm.classList.remove('search-form--opened');
        searchForm.offsetWidth = searchForm.offsetWidth;
        searchForm.classList.add('search-form--closed');
        formOpenBtn.setAttribute('aria-label', 'Открыть форму поиска гостиниц');
        formOpenBtn.focus();
      }
    });

    formOpenBtn.addEventListener('keydown', function(evt) {
      if (evt.keyCode === keys['Tab'] && evt.shiftKey && searchForm.classList.contains('search-form--opened')) {
        evt.preventDefault();
        formSubmit.focus();
      }
    });

    formSubmit.addEventListener('keydown', function(evt) {
      if (evt.keyCode === keys['Tab'] && !evt.shiftKey) {
        evt.preventDefault();
        formOpenBtn.focus();
      }
    });
  } else  {
    searchForm.classList.remove('search-form--opened');
    searchForm.offsetWidth = searchForm.offsetWidth;
    searchForm.classList.add('search-form--closed');
    formOpenBtn.setAttribute('aria-label', 'Открыть форму поиска гостиниц');
  }
});

formOpenBtn.addEventListener('mouseup', function(evt) {
  this.blur();
});

searchForm.addEventListener('submit', function(evt) {
  clearStatus();
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      evt.preventDefault();
      fields[i].offsetWidth = fields[i].offsetWidth;
      fields[i].classList.add('input--error');
      fields[i].setAttribute('aria-invalid', 'true');
      fields[i].focus();
      return;
    }
  }
});

function QuantityObj(quantitySection) {
  this.section = quantitySection; // num-fields and btns container
  this.field = quantitySection.querySelector('.search-form__input-num');
  this.btnMinus = quantitySection.querySelector('.search-form__counter-btn--minus');
  this.btnPlus = quantitySection.querySelector('.search-form__counter-btn--plus');
  this.minQuantity = +this.field.getAttribute('min');
  addQuantitySectionHandler(this);
  addQuantityFieldHandler(this);
}

var addQuantitySectionHandler = function(quantityObj) { // сount-btns actions
  quantityObj.section.addEventListener('click', function(evt) {
    var target = evt.target;
    while (!target.classList.contains('search-form__item')) {
      if (target.tagName === 'BUTTON') {
        if (target === quantityObj.btnPlus) {
          quantityObj.field.value = +quantityObj.field.value + 1;
        }
        if (target === quantityObj.btnMinus) {
          if (+quantityObj.field.value === quantityObj.minQuantity) {
            return;
          }
          quantityObj.field.value = +quantityObj.field.value - 1;
        }
      }
      target = target.parentNode;
    }
  });
  quantityObj.btnMinus.addEventListener('mouseup', function(evt) {
    this.blur();
  });
  quantityObj.btnPlus.addEventListener('mouseup', function(evt) {
    this.blur();
  });
};

var addQuantityFieldHandler = function(quantityObject) {  // simple fields validation
  quantityObject.field.addEventListener('change', function() {
    var value = Math.round(+quantityObject.field.value);
    if (value < quantityObject.minQuantity) {
      value = quantityObject.minQuantity;
    }
    quantityObject.field.value = value;
  });
};

var adultsObj = new QuantityObj(searchForm.querySelector('.adults-quantity'));
var childsObj = new QuantityObj(searchForm.querySelector('.childs-quantity'));


// Slider.
var sliderContainer = document.querySelector('.greeting');
var slider = sliderContainer.querySelector('.greeting__slider');
var prevBtn = sliderContainer.querySelector('.greeting__slider-btn--prev');
var nextBtn = sliderContainer.querySelector('.greeting__slider-btn--next');
var playBtn = sliderContainer.querySelector('.greeting__slider-btn--play');
var slidesCol = slider.querySelectorAll('.greeting__slide');
var slidesArr = Array.prototype.slice.call(slidesCol, 0);
var currentSlide = slidesArr[0];
var currentSlideIndex = +0;
var timer;
var isSlideShowStop = false;

var checkIndex = function(index) {
  if (index === slidesArr.length) {
    currentSlideIndex = +0;
  }
  if (index < 0) {
    currentSlideIndex = +(slidesArr.length - 1);
  }
};

var changeSlide = function(index) {
  currentSlide.classList.remove('greeting__slide--current');
  currentSlide = slidesArr[index];
  currentSlide.classList.add('greeting__slide--current');
}

var startTimer = function() {
  timer = setInterval(function() {  // automatic slide switch
    currentSlideIndex++;
    checkIndex(currentSlideIndex);
    changeSlide(currentSlideIndex);
  }, 7000);
};

sliderContainer.addEventListener('click', function(evt) {  // manual slide switch
  if (evt.target === nextBtn || evt.target === prevBtn) {
    if (!isSlideShowStop) {
      clearInterval(timer);
      playBtn.classList.remove('greeting__slider-btn--play--stop');
      playBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
      isSlideShowStop = true;
    }
    if (evt.target === nextBtn) {
      currentSlideIndex++;
    }
    if (evt.target === prevBtn) {
      currentSlideIndex--;
    }
    checkIndex(currentSlideIndex);
    changeSlide(currentSlideIndex);
  }
  if (evt.target === playBtn) {
    if (isSlideShowStop) {
      playBtn.classList.add('greeting__slider-btn--play--stop');
      playBtn.setAttribute('aria-label', 'Остановить слайд-шоу');
      currentSlideIndex++;
      checkIndex(currentSlideIndex);
      changeSlide(currentSlideIndex);
      startTimer();
      isSlideShowStop = false;
      return;
    }
    if (!isSlideShowStop) {
      clearInterval(timer);
      playBtn.classList.remove('greeting__slider-btn--play--stop');
      playBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
      isSlideShowStop = true;
      return;
    }
  }
});

prevBtn.addEventListener('mouseup', function(evt) {
  this.blur();
});
nextBtn.addEventListener('mouseup', function(evt) {
  this.blur();
});
playBtn.addEventListener('mouseup', function(evt) {
  this.blur();
});

startTimer();
