var $markerButton = document.querySelector('.marker-button');
var $markerOverlay = document.querySelector('.marker-overlay');

var $entryOverlay = document.querySelector('.entry-overlay');
var $addFriend = document.querySelector('.add-friend');
var $addFriendImg = document.querySelector('.input-friend-image img');
var $fileFriendImg = document.querySelector('#friendImgUpload');
var $addFriendSubmit = document.querySelector('#friend-form');

var $addEntry = document.querySelector('.add-entry');
var $entryFriendName = document.querySelector('.entry-name-tags h3');
var $entryFriendImage = document.querySelector('.entry-friend-image img');
var $addEntryImg = document.querySelector('.entry-image img');
var $fileEntryImg = document.querySelector('#entryImageUpload');
var $addEntrySubmit = document.querySelector('#entry-form');

var $slideButton = document.querySelector('.show-more-entries i');
var $entriesList = document.querySelector('.entries-list');
var $mql = window.matchMedia('(max-width: 768px)');

function handleMarkerOverlay(event) {
  data.marking = true;
  if (mobile === true) {
    $entriesList.style.height = 100 + 'px';
  }
  $markerButton.className = 'marker-button hidden';
  $markerOverlay.className = 'marker-overlay';
  setTimeout(function () {
    $markerOverlay.className = 'marker-overlay hidden';
  }, 2000);
}

var clickMapEvent;
var mapFromMap;
function openEntry(event, map) {
  $entryOverlay.className = 'entry-overlay';
  clickMapEvent = event;
  mapFromMap = map;
}

function handleFriendImgUpload() {
  $fileFriendImg.click();
}

function updateImage(event) {
  var getFile = event.target.files[0];
  var fileToUrl = URL.createObjectURL(getFile);
  event.target.closest('div').querySelector('img').setAttribute('src', fileToUrl);
}

function handleFriendSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var friend = {};
  friend.photo = form.elements.friendImgUrl.files[0];
  friend.name = form.elements.friend.value;
  friend.friendId = data.nextFriendId;

  data.nextFriendId++;
  data.friends.unshift(friend);

  $addFriend.className = 'add-friend hidden';
  $addEntry.className = 'add-entry';
  $addFriendImg.setAttribute('src', 'images/personsample.jpeg');

  // update entry pop up friend img and name
  $entryFriendName.textContent = friend.name[0].toUpperCase() + friend.name.slice(1) + '\'s Rec';

  var fileToUrl = URL.createObjectURL(friend.photo);
  $entryFriendImage.setAttribute('src', fileToUrl);
  makeMarker(clickMapEvent.latLng, mapFromMap, fileToUrl);

  form.reset();
}

function handleEntryImgUpload() {
  $fileEntryImg.click();
}

function handleEntrySubmit(event) {
  event.preventDefault();

  var rec = {};
  var form = event.target;
  rec.name = form.elements.recName.value;
  rec.image = form.elements.entryImage.files[0];
  // rec.tags
  rec.notes = form.elements.notes.value;
  // rec.friendId = friendId;
  rec.entryId = data.nextEntryId;

  data.nextEntryId++;
  data.entries.unshift(rec);

  $entryFriendImage.setAttribute('src', 'images/personsample.jpeg');
  $entryFriendName.textContent = 'Friend\'s Rec';
  $addEntryImg.setAttribute('src', 'images/placeholder-image-square 2.jpg');

  $entryOverlay.className = 'entry-overlay hidden';
  $addFriend.className = 'add-friend';
  $addEntry.className = 'add-entry hidden';
  $markerButton.className = 'marker-button';

  data.marking = false;

  form.reset();
}

var slide = false;
function handleSlide() {
  if (slide === false) {
    $entriesList.style.height = 500 + 'px';
    slide = true;
  } else if (slide === true) {
    $entriesList.style.height = 100 + 'px';
    slide = false;
  }
}

var mobile = false;
function handleScreenChange(event) {
  if (!event.matches) {
    $entriesList.style.height = '';
    mobile = false;
  } else {
    mobile = true;
  }
}

$markerButton.addEventListener('click', handleMarkerOverlay);

$addFriendImg.addEventListener('click', handleFriendImgUpload);
$fileFriendImg.addEventListener('change', updateImage);
$addFriendSubmit.addEventListener('submit', handleFriendSubmit);

$addEntryImg.addEventListener('click', handleEntryImgUpload);
$fileEntryImg.addEventListener('change', updateImage);
$addEntrySubmit.addEventListener('submit', handleEntrySubmit);

$slideButton.addEventListener('click', handleSlide);
$mql.addEventListener('change', handleScreenChange);
