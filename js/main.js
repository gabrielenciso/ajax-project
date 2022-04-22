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
var $noEntries = document.querySelector('.no-entries');

var $mql = window.matchMedia('(max-width: 768px)');

///
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

///
var clickMapEvent;
var mapFromMap;
function openEntry(event, map) {
  $entryOverlay.className = 'entry-overlay';
  clickMapEvent = event;
  mapFromMap = map;
}

///
function handleFriendImgUpdate(event) {
  $addFriendImg.setAttribute('src', event.target.value);
}

///
var friendEntry;
function handleFriendSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var friend = {};
  friend.photo = form.elements.friendImgUrl.value; /// edit
  friend.name = form.elements.friend.value;
  friend.friendId = data.nextFriendId;
  friendEntry = friend;

  data.nextFriendId++;
  data.friends.unshift(friend);

  $addFriend.className = 'add-friend hidden';
  $addEntry.className = 'add-entry';
  $addFriendImg.setAttribute('src', 'images/personsample.jpeg');

  // update entry pop up friend img and name
  $entryFriendName.textContent = friend.name[0].toUpperCase() + friend.name.slice(1) + '\'s Rec';

  $entryFriendImage.setAttribute('src', friend.photo);
  makeMarker(clickMapEvent.latLng, mapFromMap, friend.photo);

  form.reset();
}

///
function handleEntryImgUpdate(event) {
  $addEntryImg.setAttribute('src', event.target.value);
}

///
function handleEntrySubmit(event) {
  event.preventDefault();

  var rec = {};
  var form = event.target;
  rec.marker = clickMapEvent;
  rec.name = form.elements.recName.value;
  rec.image = form.elements.entryImage.value; /// edit
  rec.notes = form.elements.notes.value;
  rec.tags = tags;
  rec.fromFriend = friendEntry;
  rec.entryId = data.nextEntryId;

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
  $noEntries.className = 'no-entries text-align-center hidden';

  data.marking = false;

  tags = [];
  form.reset();
}

///
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

///
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

///
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

///
var mobile = false;
function handleScreenChange(event) {
  if (!event.matches) {
    $entriesList.style.height = '';
    mobile = false;
  } else {
    mobile = true;
  }
}

///
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
  recBox.setAttribute('data-entry-id', rec.entryId);

  ///
  var recBoxLeft = document.createElement('div');
  recBoxLeft.className = 'col-two-fifth';

  var recImgBox = document.createElement('div');
  recImgBox.className = 'rec-image';

  var recImg = document.createElement('img');
  recImg.setAttribute('src', rec.image);

  var recOptionsBox = document.createElement('div');
  recOptionsBox.className = 'options-highlight';

  var recOptions = document.createElement('i');
  recOptions.className = 'fa-solid fa-ellipsis fa-2xl';
  recOptionsBox.appendChild(recOptions);

  var recOptionsPopUp = document.createElement('div');
  recOptionsPopUp.className = 'options-pop-up font-body hidden';

  var editButton = document.createElement('p');
  editButton.setAttribute = ('id', 'edit');
  editButton.textContent = 'edit';
  recOptionsPopUp.appendChild(editButton);

  recBoxLeft.append(recImgBox, recOptionsBox, recOptionsPopUp);
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
  recFriendImg.setAttribute('src', rec.fromFriend.photo);

  var recFriendName = document.createElement('h3');
  recFriendName.className = 'font-body';
  recFriendName.textContent = rec.fromFriend.name[0].toUpperCase() + rec.fromFriend.name.slice(1) + '\'s Rec';

  recBoxRight.append(recName, recTags, recNotes, recFriendBar);
  recFriendBar.append(recFriendImgBox, recFriendName);
  recFriendImgBox.appendChild(recFriendImg);

  ///
  recBox.append(recBoxLeft, recBoxRight);

  return recBox;
}

///
function handleLoadEntry(event) {
  if (data.entries !== []) {
    for (var i = 0; i < data.entries.length; i++) {
      var currEntry = data.entries[i];
      var entry = makeEntry(currEntry);
      $recEntries.appendChild(entry);
      makeMarker(currEntry.marker.latLng, map, currEntry.fromFriend.photo);
    }
  }
}

if (data.entries.length !== 0) {
  $noEntries.className = 'no-entries text-align-center hidden';
} else {
  $noEntries.className = 'no-entries text-align-center';
}

function handleOptions(event) {
  var dataId = event.target.closest('li').getAttribute('data-entry-id');
  var selector = 'li[data-entry-id="' + dataId + '"] div.options-pop-up';
  var optionsList = document.querySelector(selector);
  if (event.target.className === 'options-highlight' || event.target.tagName === 'I') {
    optionsList.className = 'options-pop-up font-body';
  } else {
    optionsList.className = 'options-pop-up font-body hidden';
  }
}

$markerButton.addEventListener('click', handleMarkerOverlay);

$fileFriendImg.addEventListener('input', handleFriendImgUpdate);
$addFriendSubmit.addEventListener('submit', handleFriendSubmit);

$fileEntryImg.addEventListener('input', handleEntryImgUpdate);
$addTagButton.addEventListener('click', handleAddTag);
$addEntrySubmit.addEventListener('submit', handleEntrySubmit);

$recEntries.addEventListener('click', handleOptions);

$slideButton.addEventListener('click', handleSlide);
$mql.addEventListener('change', handleScreenChange);

window.addEventListener('DOMContentLoaded', handleLoadEntry);
