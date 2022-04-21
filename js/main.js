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
var $addTagButton = document.querySelector('.add-tag-button i');
var $entryTagsList = document.querySelector('.entry-tags-list');
var $inputTag = document.querySelector('#input-tag');
var $addEntrySubmit = document.querySelector('#entry-form');

var $slideButton = document.querySelector('.show-more-entries i');
var $entriesList = document.querySelector('.entries-list');
var $recEntries = document.querySelector('#rec-entries');

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
  rec.marker = clickMapEvent;
  rec.name = form.elements.recName.value;
  rec.image = URL.createObjectURL(form.elements.entryImage.files[0]);
  rec.notes = form.elements.notes.value;
  rec.tags = tags;
  rec.entryId = data.nextEntryId;

  rec.friendName = $entryFriendName.textContent;
  rec.friendImg = $entryFriendImage.getAttribute('src');

  data.nextEntryId++;

  data.entries.unshift(rec);

  var newRec = makeEntry(rec);
  $recEntries.prepend(newRec);

  $entryFriendImage.setAttribute('src', 'images/personsample.jpeg');
  $entryFriendName.textContent = 'Friend\'s Rec';
  $addEntryImg.setAttribute('src', 'images/placeholder-image-square 2.jpg');
  removeChildNodes($entryTagsList);
  $entryOverlay.className = 'entry-overlay hidden';
  $addFriend.className = 'add-friend';
  $addEntry.className = 'add-entry hidden';
  $markerButton.className = 'marker-button';

  data.marking = false;

  tags = [];
  form.reset();
}

var tags = [];
function handleAddTag(event) {
  var tagValue = $inputTag.value;

  var tag = document.createElement('span');
  tag.textContent = tagValue;
  var deleteTag = document.createElement('i');
  deleteTag.className = 'fa-solid fa-xmark';
  tag.appendChild(deleteTag);

  $entryTagsList.appendChild(tag);

  $inputTag.value = '';
  tags.push(tagValue);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
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

function makeEntry(rec) {
  /*
  <li class="rec row">
    <div class="col-two-fifth">
      <div class="rec-image">
        <img src="images/placeholder-image-square 2.jpg">
      </div>
    </div>
    <div class="rec-info col-three-fifth">
      <h2 class="font-header">Name of Place</h2>
      <div class="rec-tags-box">

      </div>
      <p class="font-body">notes asfdasfasfa</p>
      <div class="row col-full justify-align-center">
        <div class="rec-friend-img">
          <img src="images/personsample.jpeg">
        </div>
        <h3 class="font-body">Friend's Rec</h3>
      </div>
    </div>
  </li>
  */

  var recBox = document.createElement('li');
  recBox.className = 'rec row';

  ///
  var recBoxLeft = document.createElement('div');
  recBoxLeft.className = 'col-two-fifth';

  var recImgBox = document.createElement('div');
  recImgBox.className = 'rec-image';

  var recImg = document.createElement('img');
  recImg.setAttribute('src', rec.image);

  recBoxLeft.appendChild(recImgBox);
  recImgBox.appendChild(recImg);

  ///
  var recBoxRight = document.createElement('div');
  recBoxRight.className = 'rec-info col-three-fifth';

  var recName = document.createElement('h2');
  recName.className = 'font-header';
  recName.textContent = rec.name;

  var recTags = document.createElement('div');
  recTags.className = 'rec-tags-box font-body row flex-wrap';

  for (var i = 0; i < rec.tags.length; i++) {
    var tag = document.createElement('span');
    tag.textContent = rec.tags[i];
    recTags.appendChild(tag);
  }

  var recNotes = document.createElement('p');
  recNotes.className = 'font-body';
  recNotes.textContent = rec.notes;

  var recFriendBar = document.createElement('div');
  recFriendBar.className = 'row col-full justify-align-center';

  var recFriendImgBox = document.createElement('div');
  recFriendImgBox.className = 'rec-friend-img';

  var recFriendImg = document.createElement('img');
  recFriendImg.setAttribute('src', rec.friendImg);

  var recFriendName = document.createElement('h3');
  recFriendName.className = 'font-body';
  recFriendName.textContent = rec.friendName;

  recBoxRight.append(recName, recTags, recNotes, recFriendBar);
  recFriendBar.append(recFriendImgBox, recFriendName);
  recFriendImgBox.appendChild(recFriendImg);

  ///
  recBox.append(recBoxLeft, recBoxRight);

  return recBox;
}

$markerButton.addEventListener('click', handleMarkerOverlay);

$addFriendImg.addEventListener('click', handleFriendImgUpload);
$fileFriendImg.addEventListener('change', updateImage);
$addFriendSubmit.addEventListener('submit', handleFriendSubmit);

$addEntryImg.addEventListener('click', handleEntryImgUpload);
$fileEntryImg.addEventListener('change', updateImage);
$addTagButton.addEventListener('click', handleAddTag);
$addEntrySubmit.addEventListener('submit', handleEntrySubmit);

$slideButton.addEventListener('click', handleSlide);
$mql.addEventListener('change', handleScreenChange);
