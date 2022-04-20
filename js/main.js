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

function handleMarkerOverlay(event) {
  data.marking = true;
  $markerButton.className = 'marker-button hidden';
  $markerOverlay.className = 'marker-overlay';
  setTimeout(function () {
    $markerOverlay.className = 'marker-overlay hidden';
  }, 3000);
}

function openEntry() {
  $entryOverlay.className = 'entry-overlay';
}

function handleFriendImgUpload() {
  $fileFriendImg.click();
}

function updateImage(event) {
  var getFile = event.target;
  var reader = new FileReader();
  reader.onload = function () {
    getFile.closest('div').querySelector('img').setAttribute('src', reader.result);
  };
  reader.readAsDataURL(getFile.files[0]);
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

  var reader = new FileReader();
  reader.onload = function () {
    $entryFriendImage.setAttribute('src', reader.result);
  };
  reader.readAsDataURL(friend.photo);

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

$markerButton.addEventListener('click', handleMarkerOverlay);

$addFriendImg.addEventListener('click', handleFriendImgUpload);
$fileFriendImg.addEventListener('change', updateImage);
$addFriendSubmit.addEventListener('submit', handleFriendSubmit);

$addEntryImg.addEventListener('click', handleEntryImgUpload);
$fileEntryImg.addEventListener('change', updateImage);
$addEntrySubmit.addEventListener('submit', handleEntrySubmit);
