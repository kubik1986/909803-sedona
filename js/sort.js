var sortSection = document.querySelector('.hotels-sort');
var sortMethodLinks = sortSection.querySelectorAll('.hotels-sort__methods-link');
var currentSortMethodLink = sortSection.querySelector('.hotels-sort__methods-link--current');
var sortOrderLinks = sortSection.querySelectorAll('.hotels-sort__order-link');
var currentSortOrderLink = sortSection.querySelector('.hotels-sort__order-link--current');

var addSortMethodLinkHandler = function(sortMethodLink) {
  sortMethodLink.addEventListener('click', function() {
    currentSortMethodLink.classList.remove('hotels-sort__methods-link--current');
    sortMethodLink.classList.add('hotels-sort__methods-link--current');
    currentSortMethodLink = sortMethodLink;
  });
};

for (var i = 0; i < sortMethodLinks.length; i++) {
  addSortMethodLinkHandler(sortMethodLinks[i]);
}

var addSortOrderLinkHandler = function(sortOrderLink) {
  sortOrderLink.addEventListener('click', function() {
    currentSortOrderLink.classList.remove('hotels-sort__order-link--current');
    sortOrderLink.classList.add('hotels-sort__order-link--current');
    currentSortOrderLink = sortOrderLink;
  });
};

for (var i = 0; i < sortOrderLinks.length; i++) {
  addSortOrderLinkHandler(sortOrderLinks[i]);
}
