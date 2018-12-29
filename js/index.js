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
  this.section = quantitySection;
  this.field = quantitySection.querySelector('.search-form__input-num');
  this.btnMinus = quantitySection.querySelector('.search-form__counter-btn--minus');
  this.btnPlus = quantitySection.querySelector('.search-form__counter-btn--plus');
  this.minQuantity = +this.field.getAttribute('min');
  addQuantitySectionHandler(this);
  addQuantityFieldHandler(this);
}

var addQuantitySectionHandler = function(quantityObj) {
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
};

var addQuantityFieldHandler = function(quantityObject) {
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
