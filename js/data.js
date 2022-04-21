/* exported data */

var data = {
  entries: [],
  friends: [],
  editing: null,
  marking: false,
  nextEntryId: 1,
  nextFriendId: 1
};

var previousData = localStorage.getItem('rec-data');

if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('rec-data', dataJSON);
}
